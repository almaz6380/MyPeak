#!/usr/bin/env python3
"""App Store Connect über die API steuern.

Nur Standardbibliothek + pyjwt/cryptography. Zugang über drei Umgebungs-
variablen, die in der CI aus den Repo-Secrets kommen:

  ASC_KEY_ID      z. B. VGHCB8Z8Q2
  ASC_ISSUER_ID   UUID des Teams
  ASC_KEY_P8      Inhalt der .p8-Datei (nicht base64)

Apple signiert die Tokens mit ES256 und laesst hoechstens 20 Minuten Laufzeit
zu — deshalb kurz halten, nicht zwischenspeichern.

    python3 scripts/asc.py --status
    python3 scripts/asc.py --name          # Anzeigename + Untertitel setzen
    python3 scripts/asc.py --build 5       # Build der offenen Version zuweisen
    python3 scripts/asc.py --screenshots   # iPhone- + iPad-Bilder ersetzen
    python3 scripts/asc.py --abo-screenshot
    python3 scripts/asc.py --einreichen

Schreibende Befehle nehmen --dry-run: dann steht im Protokoll, was passieren
wuerde, es geht aber nichts zu Apple.
"""
import argparse
import hashlib
import json
import os
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

API = 'https://api.appstoreconnect.apple.com/v1'
BUNDLE = os.environ.get('ASC_BUNDLE_ID') or 'at.gallab.mypeak'
WURZEL = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Store-Namen aus CLAUDE.md, je <= 30 Zeichen (Apples Grenze fuer name,
# 30 fuer subtitle).
NAMEN = {
    'de-DE': ('FullRep: Training & Ernährung', 'Workout-Tracker & KI-Coach'),
    'en-US': ('FullRep: Workout & Nutrition', 'Workout Tracker & AI Coach'),
}

# Welcher Ordner in welchen Screenshot-Typ gehoert. 1320x2868 ist das
# iPhone-6,9"-Format, 2048x2732 das iPad-12,9".
BILDER = [
    ('store-assets/ios', 'APP_IPHONE_67'),
    ('store-assets/ios-ipad', 'APP_IPAD_PRO_3GEN_129'),
]

TROCKEN = False
TROTZDEM = False


def token() -> str:
    try:
        import jwt  # pyjwt
    except ImportError:
        sys.exit('Fehlt: pip3 install pyjwt cryptography')
    key_id = os.environ.get('ASC_KEY_ID')
    issuer = os.environ.get('ASC_ISSUER_ID')
    p8 = os.environ.get('ASC_KEY_P8')
    fehlt = [n for n, v in (('ASC_KEY_ID', key_id), ('ASC_ISSUER_ID', issuer),
                            ('ASC_KEY_P8', p8)) if not v]
    if fehlt:
        sys.exit(f'Fehlende Umgebungsvariablen: {", ".join(fehlt)}')
    now = int(time.time())
    return jwt.encode(
        {'iss': issuer, 'iat': now, 'exp': now + 15 * 60,
         'aud': 'appstoreconnect-v1'},
        p8,
        algorithm='ES256',
        headers={'kid': key_id, 'typ': 'JWT'},
    )


def api(tok, pfad, method='GET', body=None, fatal=True):
    url = pfad if pfad.startswith('http') else f'{API}/{pfad.lstrip("/")}'
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(url, data=data, method=method)
    req.add_header('Authorization', f'Bearer {tok}')
    if data is not None:
        req.add_header('Content-Type', 'application/json')
    try:
        with urllib.request.urlopen(req) as r:
            roh = r.read()
            return json.loads(roh) if roh else {}
    except urllib.error.HTTPError as e:
        detail = e.read().decode(errors='replace')
        if not fatal:
            return {'_fehler': e.code, '_detail': detail}
        sys.exit(f'\nFEHLER {e.code} bei {method} {url}\n{detail}\n')


def fehler_text(res):
    """Apples Fehlerobjekt auf eine Zeile eindampfen."""
    try:
        d = json.loads(res.get('_detail') or '{}')
        return '; '.join(
            f'{e.get("title")}: {e.get("detail")}' for e in d.get('errors', []))
    except (ValueError, AttributeError):
        return res.get('_detail', '')


def app_id(tok):
    res = api(tok, f'apps?filter[bundleId]={urllib.parse.quote(BUNDLE)}')
    if not res.get('data'):
        sys.exit(f'Keine App mit Bundle-ID {BUNDLE} gefunden.')
    app = res['data'][0]
    print(f'App: {app["attributes"]["name"]}  ({BUNDLE}, id {app["id"]})')
    return app['id']


def offene_version(tok, aid):
    """Die Version, an der noch gearbeitet wird (nicht READY_FOR_SALE)."""
    vers = api(tok, f'apps/{aid}/appStoreVersions?limit=10')
    fertig = {'READY_FOR_SALE', 'REPLACED_BY_NEW_VERSION',
              'REMOVED_FROM_SALE', 'DEVELOPER_REMOVED_FROM_SALE'}
    for v in vers.get('data', []):
        if v['attributes'].get('appStoreState') not in fertig:
            return v
    sys.exit('Keine offene Version gefunden — in ASC eine neue Version anlegen.')


# ── Datei-Upload ───────────────────────────────────────────────────────────
# Apple laeuft dreistufig: reservieren (POST, liefert uploadOperations),
# Stuecke hochladen, dann bestaetigen (PATCH uploaded=true + MD5). Bricht
# man in der Mitte ab, bleibt eine halbe Datei stehen, die spaeter als
# "asset delivery failed" auffaellt — deshalb kein frueher return.

def _hochladen(tok, res, pfad, art):
    daten = open(pfad, 'rb').read()
    for op in res['data']['attributes']['uploadOperations']:
        stueck = daten[op['offset']:op['offset'] + op['length']]
        req = urllib.request.Request(op['url'], data=stueck, method=op['method'])
        for h in op.get('requestHeaders', []):
            req.add_header(h['name'], h['value'])
        with urllib.request.urlopen(req) as r:
            r.read()
    md5 = hashlib.md5(daten).hexdigest()
    return api(tok, f'{art}/{res["data"]["id"]}', 'PATCH', {
        'data': {'type': art, 'id': res['data']['id'],
                 'attributes': {'uploaded': True, 'sourceFileChecksum': md5}},
    }, fatal=False)


def datei_hoch(tok, art, pfad, beziehung):
    """art z. B. 'appScreenshots', beziehung = {'name': {'data': {...}}}."""
    name = os.path.basename(pfad)
    groesse = os.path.getsize(pfad)
    if TROCKEN:
        print(f'    [trocken] {name} ({groesse} Bytes) -> {art}')
        return True
    res = api(tok, art, 'POST', {
        'data': {'type': art,
                 'attributes': {'fileSize': groesse, 'fileName': name},
                 'relationships': beziehung},
    }, fatal=False)
    if res.get('_fehler'):
        print(f'    FEHLER beim Reservieren von {name}: {fehler_text(res)}')
        return False
    fertig = _hochladen(tok, res, pfad, art)
    if fertig.get('_fehler'):
        print(f'    FEHLER beim Bestaetigen von {name}: {fehler_text(fertig)}')
        return False
    print(f'    {name} hochgeladen')
    return True


# ── Befehle ────────────────────────────────────────────────────────────────

def setze_namen(tok):
    aid = app_id(tok)
    infos = api(tok, f'apps/{aid}/appInfos')
    # Der Anzeigename haengt am appInfo, nicht an der Version. Bei einer
    # eingereichten App gibt es zwei: das lebende und das bearbeitbare.
    # Nur letzteres nimmt einen PATCH an.
    for info in infos.get('data', []):
        zustand = (info['attributes'].get('appStoreState')
                   or info['attributes'].get('state') or '?')
        locs = api(tok, f'appInfos/{info["id"]}/appInfoLocalizations')
        for loc in locs.get('data', []):
            a = loc['attributes']
            soll = NAMEN.get(a['locale'])
            if not soll:
                continue
            name, untertitel = soll
            if a.get('name') == name and a.get('subtitle') == untertitel:
                print(f'  {a["locale"]}: steht schon richtig')
                continue
            print(f'  {a["locale"]} ({zustand}): {a.get("name")!r} -> {name!r}')
            if TROCKEN:
                continue
            res = api(tok, f'appInfoLocalizations/{loc["id"]}', 'PATCH', {
                'data': {'type': 'appInfoLocalizations', 'id': loc['id'],
                         'attributes': {'name': name, 'subtitle': untertitel}},
            }, fatal=False)
            if res.get('_fehler'):
                print(f'    nicht aenderbar: {fehler_text(res)}')
            else:
                print('    gesetzt')



# ── Version anlegen ────────────────────────────────────────────────────────
# Nach einer Freigabe gibt es in ASC keine offene Version mehr; alle
# schreibenden Befehle hier brauchen aber eine. Die Oberflaeche nennt das
# "+ Version oder Plattform". Ueber die API ist es ein POST auf
# appStoreVersions — plus der Text "Neu in dieser Version", der bei einem
# Update Pflicht ist.

WHATS_NEW = """Die Datumsauswahl im Gewichtsdiagramm zeigt das Datum jetzt im \
richtigen Format. Die Store-Seite gibt es jetzt auch auf Englisch, Spanisch, \
Französisch, Portugiesisch und Arabisch — die App selbst spricht alle sechs \
Sprachen."""

# "Neu in dieser Version" fuer die weiteren Sprachen der Store-Seite. Apple
# verlangt den Text bei einem Update fuer JEDE Lokalisierung der Version —
# lokalisieren() setzt ihn mit, sonst scheitert die Einreichung.
WHATS_NEW_SPRACHEN = {
    'en': "The date picker in the weight chart now shows dates in the right "
          "format. Small fixes and improvements.",
    'es': "El selector de fecha del gráfico de peso ahora muestra las fechas en "
          "el formato correcto. Pequeñas mejoras y correcciones.",
    'fr': "Le sélecteur de date du graphique de poids affiche désormais les dates "
          "au bon format. Petites corrections et améliorations.",
    'pt': "O seletor de data do gráfico de peso agora mostra as datas no formato "
          "correto. Pequenas correções e melhorias.",
    'ar': "يعرض منتقي التاريخ في مخطط الوزن التواريخ الآن بالتنسيق الصحيح. "
          "تحسينات وإصلاحات صغيرة.",
}


def version_anlegen(tok, nummer):
    """Eine neue App-Store-Version anlegen und "Neu in dieser Version" setzen."""
    aid = app_id(tok)
    vers = api(tok, f'apps/{aid}/appStoreVersions?limit=10')
    fertig = {'READY_FOR_SALE', 'REPLACED_BY_NEW_VERSION',
              'REMOVED_FROM_SALE', 'DEVELOPER_REMOVED_FROM_SALE'}
    for v in vers.get('data', []):
        if v['attributes'].get('appStoreState') not in fertig:
            print(f'  Version {v["attributes"]["versionString"]} ist schon offen '
                  f'({v["attributes"].get("appStoreState")}) — nichts anzulegen.')
            _whats_new(tok, v)
            return
    if TROCKEN:
        print(f'  [trocken] wuerde Version {nummer} anlegen')
        return
    res = api(tok, 'appStoreVersions', 'POST', {
        'data': {'type': 'appStoreVersions',
                 'attributes': {'platform': 'IOS', 'versionString': str(nummer),
                                'releaseType': 'AFTER_APPROVAL'},
                 'relationships': {'app': {
                     'data': {'type': 'apps', 'id': aid}}}},
    }, fatal=False)
    if res.get('_fehler'):
        sys.exit(f'  Version nicht anlegbar: {fehler_text(res)}')
    v = res['data']
    print(f'  Version {nummer} angelegt ({v["id"]})')
    _whats_new(tok, v)


def _whats_new(tok, v):
    """"Neu in dieser Version" je Sprache setzen. ASC legt die
    Lokalisierungen beim Anlegen automatisch aus der Vorversion an; fehlt
    de-DE trotzdem, wird sie erzeugt."""
    locs = api(tok, f'appStoreVersions/{v["id"]}/appStoreVersionLocalizations',
               fatal=False)
    vorhanden = {l['attributes'].get('locale'): l for l in locs.get('data', [])}
    print(f'  Lokalisierungen: {", ".join(sorted(vorhanden)) or "keine"}')
    for locale in ('de-DE',):
        loc = vorhanden.get(locale)
        if TROCKEN:
            print(f'  [trocken] wuerde whatsNew fuer {locale} setzen '
                  f'({len(WHATS_NEW)} Zeichen)')
            continue
        if loc:
            res = api(tok, f'appStoreVersionLocalizations/{loc["id"]}', 'PATCH', {
                'data': {'type': 'appStoreVersionLocalizations', 'id': loc['id'],
                         'attributes': {'whatsNew': WHATS_NEW}},
            }, fatal=False)
        else:
            res = api(tok, 'appStoreVersionLocalizations', 'POST', {
                'data': {'type': 'appStoreVersionLocalizations',
                         'attributes': {'locale': locale, 'whatsNew': WHATS_NEW},
                         'relationships': {'appStoreVersion': {
                             'data': {'type': 'appStoreVersions', 'id': v['id']}}}},
            }, fatal=False)
        if res.get('_fehler'):
            print(f'  {locale}: FEHLER {fehler_text(res)}')
        else:
            print(f'  {locale}: "Neu in dieser Version" gesetzt '
                  f'({len(WHATS_NEW)} Zeichen)')



# ── Beschreibung + URLs ───────────────────────────────────────────────────
# Apple hat 1.5.0 am 02.09. automatisch abgelehnt (3.1.2): Bei einem Abo muss
# ein FUNKTIONIERENDER Link auf die Nutzungsbedingungen in der BESCHREIBUNG
# stehen, nicht nur in der App. Der Abo-Block unten ist der Fix.
#
# Der Fliesstext wird aus store-assets/play-listing.de-DE.json gelesen —
# dieselbe Quelle, die play-upload.py fuer Google benutzt. Eine zweite Kopie
# im Skript waere genau der Grund, warum in ASC monatelang noch "MyPeak" und
# "ueber 220 Uebungen" standen, waehrend Play laengst umgestellt war.

LISTING_DE = 'store-assets/play-listing.de-DE.json'
SUPPORT_URL = 'https://fullrep.pages.dev/legal/imprint'
MARKETING_URL = 'https://fullrep.pages.dev'
BESCHREIBUNG_GRENZE = 4000

ABO_BLOCK = """

ABO — FULLREP PREMIUM
\u2022 4,99 \u20ac pro Monat oder 44,99 \u20ac pro Jahr, mit automatischer Verl\u00e4ngerung
\u2022 7 Tage kostenlos testen, danach beginnt das Abo, wenn du nicht k\u00fcndigst
\u2022 Die Zahlung wird bei Best\u00e4tigung des Kaufs \u00fcber deine Apple-ID abgebucht
\u2022 Das Abo verl\u00e4ngert sich automatisch, sofern es nicht sp\u00e4testens 24 Stunden vor Ablauf gek\u00fcndigt wird \u2014 verwalten und k\u00fcndigen in den Einstellungen deiner Apple-ID
\u2022 Nutzungsbedingungen: https://fullrep.pages.dev/legal/terms
\u2022 Datenschutzerkl\u00e4rung: https://fullrep.pages.dev/legal/privacy"""


def beschreibung(tok):
    """Beschreibung, Support- und Marketing-URL der offenen Version setzen."""
    with open(LISTING_DE, encoding='utf-8') as f:
        text = json.load(f)['fullDescription'].rstrip()
    text += ABO_BLOCK
    if len(text) > BESCHREIBUNG_GRENZE:
        sys.exit(f'  Beschreibung {len(text)} Zeichen > {BESCHREIBUNG_GRENZE} — '
                 f'Apple weist sie ab, statt sie zu kuerzen.')
    print(f'  Beschreibung: {len(text)} von {BESCHREIBUNG_GRENZE} Zeichen')

    aid = app_id(tok)
    v = offene_version(tok, aid)
    print(f'  Version {v["attributes"]["versionString"]} '
          f'({v["attributes"].get("appStoreState")})')
    locs = api(tok, f'appStoreVersions/{v["id"]}/appStoreVersionLocalizations')
    for loc in locs.get('data', []):
        locale = loc['attributes'].get('locale')
        if locale != 'de-DE':
            print(f'  {locale}: uebersprungen (nur de-DE gepflegt)')
            continue
        alt = loc['attributes'].get('description') or ''
        print(f'  {locale}: {len(alt)} -> {len(text)} Zeichen')
        if TROCKEN:
            print('  [trocken] wuerde Beschreibung + URLs setzen')
            continue
        res = api(tok, f'appStoreVersionLocalizations/{loc["id"]}', 'PATCH', {
            'data': {'type': 'appStoreVersionLocalizations', 'id': loc['id'],
                     'attributes': {'description': text,
                                    'supportUrl': SUPPORT_URL,
                                    'marketingUrl': MARKETING_URL}},
        }, fatal=False)
        if res.get('_fehler'):
            print(f'  FEHLER: {fehler_text(res)}')
        else:
            print('  gesetzt (Beschreibung, Support-URL, Marketing-URL)')


# ── Weitere Sprachen (EN, ES, FR, PT, AR) ─────────────────────────────────
# Bis 10/2026 gab es in ASC NUR de-DE. Wer in den USA, Spanien oder Brasilien
# sucht, sah eine deutsche Seite — oder fand FullRep gar nicht, weil Keywords
# je Locale indexiert werden. Die App selbst kann sechs Sprachen.
#
# Quellen, keine Kopien: Fliesstext aus play-listing.<locale>.json (wie Play),
# Name/Untertitel/Keywords/Werbetext aus store-texte.md §2b.
#
# ASC-Locale -> (Abschnitt in store-texte.md, Play-JSON, Abo-Block-Sprache).
# en-GB/es-MX sind eigene Store-Fronten: ohne eigenen Eintrag fallen UK und
# Lateinamerika auf die Hauptsprache (Deutsch) zurueck.
SPRACHEN = {
    'en-US': ('Englisch', 'en-US', 'en'),
    'en-GB': ('Englisch', 'en-US', 'en'),
    'es-ES': ('Spanisch', 'es-ES', 'es'),
    'es-MX': ('Spanisch', 'es-ES', 'es'),
    'fr-FR': ('Französisch', 'fr-FR', 'fr'),
    'pt-BR': ('Portugiesisch', 'pt-BR', 'pt'),
    'ar-SA': ('Arabisch', 'ar', 'ar'),
}

# 3.1.2: Der Link auf die Nutzungsbedingungen muss in JEDER Beschreibung
# stehen, die ein Nutzer sehen kann. Preise bewusst ohne Betrag — ausserhalb
# der Eurozone stimmte "4,99 EUR" nicht, Apple zeigt den echten Preis.
ABO_BLOECKE = {
    'en': """

SUBSCRIPTION — FULLREP PREMIUM
• Monthly or yearly subscription with automatic renewal; the price in your currency is shown in the app before purchase
• 7-day free trial; the subscription starts afterwards unless you cancel
• Payment is charged to your Apple ID at confirmation of purchase
• The subscription renews automatically unless cancelled at least 24 hours before the end of the current period — manage and cancel in your Apple ID settings
• Terms of Use: https://fullrep.pages.dev/legal/terms
• Privacy Policy: https://fullrep.pages.dev/legal/privacy""",
    'es': """

SUSCRIPCIÓN — FULLREP PREMIUM
• Suscripción mensual o anual con renovación automática; el precio en tu moneda se muestra en la app antes de comprar
• 7 días de prueba gratis; después empieza la suscripción si no la cancelas
• El pago se carga a tu Apple ID al confirmar la compra
• La suscripción se renueva automáticamente salvo que la canceles al menos 24 horas antes del fin del periodo — gestiónala y cancélala en los ajustes de tu Apple ID
• Condiciones de uso: https://fullrep.pages.dev/legal/terms
• Política de privacidad: https://fullrep.pages.dev/legal/privacy""",
    'fr': """

ABONNEMENT — FULLREP PREMIUM
• Abonnement mensuel ou annuel à renouvellement automatique ; le prix dans ta devise est affiché dans l'app avant l'achat
• 7 jours d'essai gratuit ; l'abonnement commence ensuite si tu ne résilies pas
• Le paiement est débité de ton identifiant Apple à la confirmation de l'achat
• L'abonnement se renouvelle automatiquement sauf résiliation au moins 24 heures avant la fin de la période — gère-le et résilie-le dans les réglages de ton identifiant Apple
• Conditions d'utilisation : https://fullrep.pages.dev/legal/terms
• Politique de confidentialité : https://fullrep.pages.dev/legal/privacy""",
    'pt': """

ASSINATURA — FULLREP PREMIUM
• Assinatura mensal ou anual com renovação automática; o preço na sua moeda aparece no app antes da compra
• 7 dias de teste grátis; depois a assinatura começa se você não cancelar
• O pagamento é cobrado no seu ID Apple na confirmação da compra
• A assinatura renova automaticamente, a menos que seja cancelada pelo menos 24 horas antes do fim do período — gerencie e cancele nos ajustes do seu ID Apple
• Termos de uso: https://fullrep.pages.dev/legal/terms
• Política de privacidade: https://fullrep.pages.dev/legal/privacy""",
    'ar': """

الاشتراك — FULLREP PREMIUM
• اشتراك شهري أو سنوي يتجدد تلقائيًا؛ يظهر السعر بعملتك داخل التطبيق قبل الشراء
• تجربة مجانية لمدة 7 أيام، ثم يبدأ الاشتراك ما لم تُلغِه
• يُخصم المبلغ من حساب Apple ID عند تأكيد الشراء
• يتجدد الاشتراك تلقائيًا ما لم يُلغَ قبل 24 ساعة على الأقل من نهاية الفترة الحالية — يمكنك إدارته وإلغاؤه من إعدادات Apple ID
• شروط الاستخدام: https://fullrep.pages.dev/legal/terms
• سياسة الخصوصية: https://fullrep.pages.dev/legal/privacy""",
}


def _ios_felder(abschnitt):
    """Name/Untertitel/Keywords/Werbetext einer Sprache aus store-texte.md.
    Muster: ### <Sprache> — <Feld> (max. N Zeichen …) + ```-Block."""
    import re
    with open(os.path.join(WURZEL, 'store-assets/store-texte.md'), encoding='utf-8') as f:
        md = f.read()
    felder = {}
    for feld in ('Name', 'Untertitel', 'Keywords', 'Werbetext'):
        m = re.search(rf'^###\s+{re.escape(abschnitt)}\s+—\s+{feld}\b[^\n]*\n+```\n(.*?)\n```',
                      md, re.M | re.S)
        if not m:
            sys.exit(f'  store-texte.md: "{abschnitt} — {feld}" nicht gefunden')
        felder[feld] = m.group(1).strip()
    return felder


def _sprachtexte(locale):
    abschnitt, play, abo = SPRACHEN[locale]
    f = _ios_felder(abschnitt)
    with open(os.path.join(WURZEL, f'store-assets/play-listing.{play}.json'),
              encoding='utf-8') as d:
        text = json.load(d)['fullDescription'].rstrip() + ABO_BLOECKE[abo]
    # Werbetext steht in der md umgebrochen; Apple will Fliesstext.
    werbung = ' '.join(f['Werbetext'].split())
    t = {'name': f['Name'], 'subtitle': f['Untertitel'],
         'keywords': f['Keywords'], 'promotionalText': werbung,
         'description': text}
    for feld, grenze in (('name', 30), ('subtitle', 30), ('keywords', 100),
                         ('promotionalText', 170),
                         ('description', BESCHREIBUNG_GRENZE)):
        if len(t[feld]) > grenze:
            sys.exit(f'  {locale}: {feld} {len(t[feld])} > {grenze} Zeichen')
    return t


def _anlegen_oder_setzen(tok, art, vorhanden, attribute, beziehung, label):
    if TROCKEN:
        print(f'    [trocken] {"PATCH" if vorhanden else "POST"} {art} ({label})')
        return
    if vorhanden:
        res = api(tok, f'{art}/{vorhanden["id"]}', 'PATCH', {
            'data': {'type': art, 'id': vorhanden['id'], 'attributes': attribute}},
            fatal=False)
    else:
        res = api(tok, art, 'POST', {
            'data': {'type': art, 'attributes': attribute,
                     'relationships': beziehung}}, fatal=False)
    if res.get('_fehler'):
        print(f'    {label}: FEHLER {fehler_text(res)}')
    else:
        print(f'    {label}: {"aktualisiert" if vorhanden else "angelegt"}')


def lokalisieren(tok, locales):
    """Store-Seiten in weiteren Sprachen anlegen bzw. aktualisieren."""
    texte = {l: _sprachtexte(l) for l in locales}  # erst alles pruefen, dann schreiben
    aid = app_id(tok)
    v = offene_version(tok, aid)
    print(f'  Version {v["attributes"]["versionString"]} '
          f'({v["attributes"].get("appStoreState")})')

    # Name/Untertitel haengen am appInfo. Nur das bearbeitbare nimmt Aenderungen
    # an — das lebende (READY_FOR_SALE) wird uebersprungen.
    infos = api(tok, f'apps/{aid}/appInfos').get('data', [])
    lebend = {'READY_FOR_DISTRIBUTION', 'READY_FOR_SALE'}
    info = next((i for i in infos if (i['attributes'].get('state')
                 or i['attributes'].get('appStoreState')) not in lebend), None)
    if not info:
        sys.exit('  Kein bearbeitbares appInfo — erst eine neue Version anlegen.')
    info_locs = {l['attributes']['locale']: l for l in
                 api(tok, f'appInfos/{info["id"]}/appInfoLocalizations').get('data', [])}
    for locale in locales:
        t = texte[locale]
        print(f'\n  {locale}: {t["name"]!r} · {len(t["description"])} Zeichen Beschreibung')
        _anlegen_oder_setzen(
            tok, 'appInfoLocalizations', info_locs.get(locale),
            {**({} if info_locs.get(locale) else {'locale': locale}),
             'name': t['name'], 'subtitle': t['subtitle'],
             'privacyPolicyUrl': 'https://fullrep.pages.dev/legal/privacy'},
            {'appInfo': {'data': {'type': 'appInfos', 'id': info['id']}}},
            'Name + Untertitel')
        # ⚠ ERST JETZT die Versions-Lokalisierungen lesen: Legt man eine
        # appInfoLocalization an, erzeugt Apple die passende
        # appStoreVersionLocalization automatisch mit. Vorab gelesen, wollte
        # das Skript sie ein zweites Mal anlegen — "already exists" (03.10.).
        ver_locs = {} if TROCKEN else {
            l['attributes']['locale']: l for l in
            api(tok, f'appStoreVersions/{v["id"]}/appStoreVersionLocalizations'
                ).get('data', [])}
        _anlegen_oder_setzen(
            tok, 'appStoreVersionLocalizations', ver_locs.get(locale),
            {**({} if ver_locs.get(locale) else {'locale': locale}),
             'description': t['description'], 'keywords': t['keywords'],
             'promotionalText': t['promotionalText'],
             'whatsNew': WHATS_NEW_SPRACHEN[SPRACHEN[locale][2]],
             'supportUrl': SUPPORT_URL, 'marketingUrl': MARKETING_URL},
            {'appStoreVersion': {'data': {'type': 'appStoreVersions', 'id': v['id']}}},
            'Beschreibung, Keywords, Werbetext')
    print('\n  Screenshots: ohne eigene Bilder zeigt Apple die der Hauptsprache.')


def setze_build(tok, nummer):
    aid = app_id(tok)
    v = offene_version(tok, aid)
    print(f'  Version {v["attributes"]["versionString"]} '
          f'({v["attributes"].get("appStoreState")})')
    builds = api(tok, f'builds?filter[app]={aid}&limit=20&sort=-version')
    treffer = [b for b in builds.get('data', [])
               if b['attributes'].get('version') == str(nummer)]
    if not treffer:
        sys.exit(f'  Build {nummer} nicht gefunden.')
    b = treffer[0]
    zustand = b['attributes'].get('processingState')
    print(f'  Build {nummer}: {zustand}')
    if zustand != 'VALID':
        sys.exit('  Build ist noch nicht VALID — Apple verarbeitet ihn noch.')
    if TROCKEN:
        print('  [trocken] wuerde zugewiesen')
        return
    res = api(tok, f'appStoreVersions/{v["id"]}/relationships/build', 'PATCH', {
        'data': {'type': 'builds', 'id': b['id']},
    }, fatal=False)
    if res.get('_fehler'):
        print(f'  FEHLER: {fehler_text(res)}')
    else:
        print('  zugewiesen')


def setze_screenshots(tok):
    aid = app_id(tok)
    v = offene_version(tok, aid)
    print(f'  Version {v["attributes"]["versionString"]}')
    locs = api(tok, f'appStoreVersions/{v["id"]}/appStoreVersionLocalizations')
    for loc in locs.get('data', []):
        lc = loc['attributes']['locale']
        print(f'\n  Sprache {lc}')
        sets = api(tok, f'appStoreVersionLocalizations/{loc["id"]}/appScreenshotSets')
        vorhanden = {s['attributes']['screenshotDisplayType']: s['id']
                     for s in sets.get('data', [])}
        # Je Sprache eigener Ordner (store-rahmen.mjs): de liegt in den
        # alten Pfaden, alle anderen unter store-assets/<sprache>/. Fehlt der
        # Ordner, bleibt die Sprache unangetastet — deutsche Bilder unter
        # einer englischen Seite waeren schlechter als Apples Rueckfall.
        sprache = lc.split('-')[0]
        for ordner, typ in BILDER:
            if sprache != 'de':
                ordner = ordner.replace('store-assets/', f'store-assets/{sprache}/', 1)
            if not os.path.isdir(os.path.join(WURZEL, ordner)):
                print(f'    {typ}: kein Ordner {ordner} — uebersprungen')
                continue
            pfade = sorted(
                os.path.join(WURZEL, ordner, f)
                for f in os.listdir(os.path.join(WURZEL, ordner))
                if f.endswith('.png') and f[0].isdigit())
            if not pfade:
                print(f'    {typ}: keine Bilder in {ordner}')
                continue
            sid = vorhanden.get(typ)
            if sid:
                alt = api(tok, f'appScreenshotSets/{sid}/appScreenshots')
                for s in alt.get('data', []):
                    if TROCKEN:
                        print(f'    [trocken] alt loeschen {s["id"]}')
                    else:
                        api(tok, f'appScreenshots/{s["id"]}', 'DELETE',
                            fatal=False)
                if not TROCKEN and alt.get('data'):
                    print(f'    {typ}: {len(alt["data"])} alte geloescht')
            elif TROCKEN:
                print(f'    [trocken] Set {typ} anlegen')
                sid = 'TROCKEN'
            else:
                neu = api(tok, 'appScreenshotSets', 'POST', {
                    'data': {'type': 'appScreenshotSets',
                             'attributes': {'screenshotDisplayType': typ},
                             'relationships': {'appStoreVersionLocalization': {
                                 'data': {'type': 'appStoreVersionLocalizations',
                                          'id': loc['id']}}}},
                }, fatal=False)
                if neu.get('_fehler'):
                    print(f'    {typ} nicht anlegbar: {fehler_text(neu)}')
                    continue
                sid = neu['data']['id']
                print(f'    Set {typ} angelegt')
            for p in pfade:
                datei_hoch(tok, 'appScreenshots', p, {
                    'appScreenshotSet': {
                        'data': {'type': 'appScreenshotSets', 'id': sid}}})


def setze_abo_screenshot(tok):
    aid = app_id(tok)
    pfad = os.path.join(WURZEL, 'store-assets', 'ios', 'paywall-review.png')
    if not os.path.exists(pfad):
        sys.exit(f'Fehlt: {pfad} (scripts/paywall-screenshot.mjs erzeugt ihn)')
    grp = api(tok, f'apps/{aid}/subscriptionGroups')
    for g in grp.get('data', []):
        subs = api(tok, f'subscriptionGroups/{g["id"]}/subscriptions')
        for s in subs.get('data', []):
            a = s['attributes']
            print(f'\n  {a.get("productId")}  {a.get("state")}')
            vorher = api(tok, f'subscriptions/{s["id"]}/appStoreReviewScreenshot',
                         fatal=False)
            if vorher.get('data'):
                alt = vorher['data']['id']
                if TROCKEN:
                    print(f'    [trocken] alten Screenshot loeschen {alt}')
                else:
                    api(tok, f'subscriptionAppStoreReviewScreenshots/{alt}',
                        'DELETE', fatal=False)
                    print('    alten geloescht')
            datei_hoch(tok, 'subscriptionAppStoreReviewScreenshots', pfad, {
                'subscription': {'data': {'type': 'subscriptions',
                                          'id': s['id']}}})


# Antwort auf die Ablehnung vom 14.08. (2.1(b), Build 4). Der Pruefer sieht
# sonst nur, DASS sich etwas geaendert hat, nicht wo. Englisch, weil das App
# Review liest.
#
# WICHTIG: Der Satz zu den Abos muss stimmen. Die Fassung fuer Build 4 sagte
# "submitted together with this version", die Abos standen aber auf
# MISSING_METADATA und fuhren nicht mit — genau dafuer kam 2.1(b) ein zweites
# Mal. Diesen Absatz erst schreiben, wenn beide Abos READY_TO_SUBMIT sind.
PRUEFNOTIZ = """What is new in 1.5.0 (previous App Store version: 1.0)

Five languages were added
The interface, the knowledge library, the recipes and the legal texts are now
available in German, English, Spanish, French, Portuguese and Arabic. Arabic
lays out right to left. The language is chosen in Profile > Language.

Apple Health - read only
FullRep reads two things, and only after the user turns the switch on in
Profile > Apple Health: step count (shown on the home screen) and body weight
(added to the existing weight history). The app writes nothing to Health.
NSHealthUpdateUsageDescription is present because the linked framework
requires a purpose string, not because the app writes data.

Home screen redesign
Calories are shown as a ring with the four macros below it; the workout
scheduled for today can be started from the home screen; the weight trend is
always visible.

Home screen widget
Shows the current streak, the level and the number of workouts this week.

Subscriptions (unchanged, already approved)
  mypeak_premium_monthly - EUR 4.99 / month
  mypeak_premium_annual  - EUR 44.99 / year
Reachable at Profile > "FullRep Premium". A 7-day free trial is offered first.
Purchases use StoreKit through RevenueCat; there is no external payment path.
The product identifiers still start with "mypeak" because identifiers cannot
be changed after creation - the app itself is called FullRep.

Health and medical content (unchanged since the approved build)
Every health-related article ends with a permanently visible "Sources" list,
and a medical disclaimer appears on every health-related screen. A dedicated
page is reachable at Profile > Health notice.

Demo account (not required - the app is fully usable as a guest):
appreview@wellbooked.at / MyPeak-Review#2026
"""


def setze_pruefnotiz(tok):
    aid = app_id(tok)
    v = offene_version(tok, aid)
    print(f'  Version {v["attributes"]["versionString"]}')
    detail = api(tok, f'appStoreVersions/{v["id"]}/appStoreReviewDetail',
                 fatal=False)
    if TROCKEN:
        alt = (detail.get('data') or {}).get('attributes', {}).get('notes') or ''
        print(f'  [trocken] Notiz ersetzen ({len(alt)} -> {len(PRUEFNOTIZ)} Zeichen)')
        return
    if detail.get('data'):
        res = api(tok, f'appStoreReviewDetails/{detail["data"]["id"]}', 'PATCH', {
            'data': {'type': 'appStoreReviewDetails', 'id': detail['data']['id'],
                     'attributes': {'notes': PRUEFNOTIZ}},
        }, fatal=False)
    else:
        res = api(tok, 'appStoreReviewDetails', 'POST', {
            'data': {'type': 'appStoreReviewDetails',
                     'attributes': {'notes': PRUEFNOTIZ},
                     'relationships': {'appStoreVersion': {'data': {
                         'type': 'appStoreVersions', 'id': v['id']}}}},
        }, fatal=False)
    if res.get('_fehler'):
        print(f'  FEHLER: {fehler_text(res)}')
    else:
        print(f'  Notiz gesetzt ({len(PRUEFNOTIZ)} Zeichen)')


# Zustaende, in denen eine Einreichung die Version blockiert. UNRESOLVED_ISSUES
# ist der entscheidende: die Einreichung vom 18.07. steckt dort fest, haelt die
# Version besetzt, und Apple meldet beim naechsten Versuch nur
# "is not in valid state" — ohne zu sagen, dass es an einer alten Einreichung
# liegt. Wer nur nach WAITING_FOR_REVIEW sucht, sieht sie nicht.
BLOCKIERT = {'UNRESOLVED_ISSUES', 'READY_FOR_REVIEW', 'WAITING_FOR_REVIEW',
             'IN_REVIEW'}


def zeige_einreichungen(tok):
    aid = app_id(tok)
    subm = api(tok, f'apps/{aid}/reviewSubmissions?limit=20')
    if not subm.get('data'):
        print('  Keine Einreichungen.')
        return
    for s in subm.get('data', []):
        a = s['attributes']
        print(f'\n  {s["id"]}')
        print(f'    Zustand: {a.get("state")}  platform={a.get("platform")}')
        print(f'    eingereicht: {a.get("submittedDate")}')
        items = api(tok, f'reviewSubmissions/{s["id"]}/items', fatal=False)
        for i in items.get('data', []):
            ziele = [f'{n}={b["data"]["id"]}'
                     for n, b in (i.get('relationships') or {}).items()
                     if (b or {}).get('data')]
            print(f'    Element {i["attributes"].get("state")}: '
                  f'{", ".join(ziele) or "—"}')
        if not items.get('data'):
            print('    Elemente: keine')


def aufraeumen(tok):
    """Festhaengende Einreichungen zurueckziehen.

    Solange eine alte Einreichung die Version haelt, laesst sich keine neue
    anlegen — Apple sagt dazu nur "is not in valid state".
    """
    aid = app_id(tok)
    subm = api(tok, f'apps/{aid}/reviewSubmissions?limit=20')
    getan = False
    for s in subm.get('data', []):
        a = s['attributes']
        if a.get('state') not in BLOCKIERT:
            continue
        getan = True
        print(f'  {s["id"]}  {a.get("state")}  -> zurueckziehen')
        if TROCKEN:
            continue
        res = api(tok, f'reviewSubmissions/{s["id"]}', 'PATCH', {
            'data': {'type': 'reviewSubmissions', 'id': s['id'],
                     'attributes': {'canceled': True}},
        }, fatal=False)
        if res.get('_fehler'):
            print(f'    FEHLER: {fehler_text(res)}')
        else:
            print(f'    Zustand jetzt '
                  f'{res["data"]["attributes"].get("state")}')
    if not getan:
        print('  Keine blockierende Einreichung gefunden.')


def einreichen(tok):
    """Version + Abos in einer Einreichung zu Apple schicken.

    2.1(b) ist genau daran gescheitert, dass das IAP-Produkt nie mitkam.
    Ob die API das ueberhaupt annimmt, zeigt erst der Aufruf — Apples
    Dokumentation zaehlt die erlaubten Element-Typen nicht auf.
    """
    aid = app_id(tok)
    v = offene_version(tok, aid)
    print(f'  Version {v["attributes"]["versionString"]} '
          f'({v["attributes"].get("appStoreState")})')

    # Ohne Zustandsfilter holen und selbst aussortieren. Ein serverseitiger
    # Filter verschweigt, was man nicht abgefragt hat — genau so blieb die
    # festhaengende Einreichung vom 18.07. unsichtbar.
    offen = api(tok, f'apps/{aid}/reviewSubmissions?limit=20', fatal=False)
    lauf = [s for s in offen.get('data', [])
            if s['attributes'].get('state') in ('WAITING_FOR_REVIEW', 'IN_REVIEW')]
    if lauf:
        print(f'  Es laeuft schon eine Einreichung ({lauf[0]["attributes"]["state"]}) '
              f'— nichts zu tun.')
        return

    steckt = [s for s in offen.get('data', [])
              if s['attributes'].get('state') == 'UNRESOLVED_ISSUES']
    if steckt:
        print(f'  ABBRUCH: Einreichung {steckt[0]["id"]} steht auf '
              f'UNRESOLVED_ISSUES und haelt die Version besetzt.')
        print('  Deshalb meldet Apple "is not in valid state" — es fehlt kein')
        print('  Feld. Erst mit --aufraeumen zurueckziehen, dann erneut.')
        return

    entwurf = [s for s in offen.get('data', [])
               if s['attributes'].get('state') == 'READY_FOR_REVIEW']
    if entwurf:
        sub = entwurf[0]
        print(f'  Vorhandener Entwurf {sub["id"]} wird benutzt')
    elif TROCKEN:
        print('  [trocken] wuerde reviewSubmission anlegen')
        return
    else:
        res = api(tok, 'reviewSubmissions', 'POST', {
            'data': {'type': 'reviewSubmissions',
                     'attributes': {'platform': 'IOS'},
                     'relationships': {'app': {
                         'data': {'type': 'apps', 'id': aid}}}},
        }, fatal=False)
        if res.get('_fehler'):
            print(f'  Einreichung nicht anlegbar: {fehler_text(res)}')
            return
        sub = res['data']
        print(f'  Einreichung {sub["id"]} angelegt')

    drin = api(tok, f'reviewSubmissions/{sub["id"]}/items', fatal=False)
    hab = set()
    for i in drin.get('data', []):
        for name, bez in (i.get('relationships') or {}).items():
            if (bez or {}).get('data'):
                hab.add(bez['data']['id'])
    print(f'  bisher {len(drin.get("data", []))} Elemente')

    def anhaengen(bezug, art, ident, label):
        # Die Beziehung heisst im Singular ('appStoreVersion'), der Typ im
        # Plural ('appStoreVersions'). Beides gleich zu benennen quittiert
        # Apple mit "unknown relationship".
        if ident in hab:
            print(f'    {label}: schon enthalten')
            return
        if TROCKEN:
            print(f'    [trocken] {label} anhaengen')
            return
        res = api(tok, 'reviewSubmissionItems', 'POST', {
            'data': {'type': 'reviewSubmissionItems',
                     'relationships': {
                         'reviewSubmission': {'data': {
                             'type': 'reviewSubmissions', 'id': sub['id']}},
                         bezug: {'data': {'type': art, 'id': ident}}}},
        }, fatal=False)
        if res.get('_fehler'):
            print(f'    {label} NICHT angenommen: {fehler_text(res)}')
        else:
            print(f'    {label} angehaengt')

    anhaengen('appStoreVersion', 'appStoreVersions', v['id'],
              f'Version {v["attributes"]["versionString"]}')

    # Abos lassen sich NICHT anhaengen — 'subscription' ist keine Beziehung
    # an reviewSubmissionItems (am 31.07. am echten Endpunkt geprueft, Apple
    # antwortet "unknown relationship"). Sie fahren mit der Version mit,
    # sobald sie READY_TO_SUBMIT sind. Deshalb hier nur der Zustand: steht
    # eines auf MISSING_METADATA, geht die Version zwar durch, das Abo aber
    # nicht — und genau daran ist 2.1(b) gescheitert.
    print('  Abos (fahren mit der Version mit, nicht anhaengbar):')
    grp = api(tok, f'apps/{aid}/subscriptionGroups')
    offen_abo = []
    for g in grp.get('data', []):
        subs = api(tok, f'subscriptionGroups/{g["id"]}/subscriptions')
        for s in subs.get('data', []):
            a = s['attributes']
            print(f'    {a.get("productId")}: {a.get("state")}')
            if a.get('state') not in ('READY_TO_SUBMIT', 'APPROVED',
                                      'WAITING_FOR_REVIEW', 'IN_REVIEW'):
                offen_abo.append(a.get('productId'))
    if offen_abo and not TROTZDEM:
        # Harte Sperre, kein blosser Hinweis. Ginge die Version ohne die Abos
        # zur Pruefung, waere das exakt der Zustand, fuer den Apple am
        # 29.07. 2.1(b) vergeben hat — ein Fehlversuch kostet hier keine
        # Minuten, sondern eine weitere Ablehnung samt Wartezeit.
        print(f'\n  ABBRUCH: {", ".join(offen_abo)} noch nicht einreichbar.')
        print('  Die Version ginge durch, die Abos nicht — genau daran ist')
        print('  2.1(b) gescheitert. Erst klaeren, dann einreichen.')
        print('  Wer es trotzdem will: --trotzdem.')
        return

    if TROCKEN:
        print('  [trocken] wuerde submitted=true setzen')
        return
    res = api(tok, f'reviewSubmissions/{sub["id"]}', 'PATCH', {
        'data': {'type': 'reviewSubmissions', 'id': sub['id'],
                 'attributes': {'submitted': True}},
    }, fatal=False)
    if res.get('_fehler'):
        print(f'  ABSENDEN FEHLGESCHLAGEN: {fehler_text(res)}')
    else:
        print(f'  abgesendet — Zustand jetzt '
              f'{res["data"]["attributes"].get("state")}')


def diagnose(tok):
    """Warum laesst sich die Version nicht einreichen?

    Apple antwortet beim Einreichen nur "is not in valid state" und verweist
    auf "associated errors" — die stehen aber an den einzelnen Ressourcen.
    Hier werden die ueblichen Sperren einzeln abgefragt.
    """
    aid = app_id(tok)

    # App-weite Pflichtfelder. contentRightsDeclaration ist der Klassiker:
    # fehlt sie, sperrt sie die Einreichung, ohne dass an Version oder Abo
    # etwas fehlt — man sucht dann lange an der falschen Stelle.
    print('\n── App-weite Angaben ──')
    app = api(tok, f'apps/{aid}', fatal=False)
    aa = (app.get('data') or {}).get('attributes', {})
    for feld in ('primaryLocale', 'contentRightsDeclaration',
                 'availableInNewTerritories'):
        wert = aa.get(feld)
        marke = '  ⚠ nicht gesetzt' if wert is None else ''
        print(f'  {feld}: {wert!r}{marke}')

    v = offene_version(tok, aid)
    va = v['attributes']
    print(f'\n── Version {va["versionString"]} ({va.get("appStoreState")}) ──')
    for feld in ('releaseType', 'earliestReleaseDate', 'downloadable'):
        print(f'  {feld}: {va.get(feld)}')

    print('\n── Build + Exportbestimmungen ──')
    b = api(tok, f'appStoreVersions/{v["id"]}/build', fatal=False)
    if not b.get('data'):
        print('  KEIN Build zugewiesen — das allein blockiert die Einreichung.')
    else:
        ba = b['data']['attributes']
        ver = ba.get('version')
        enc = ba.get('usesNonExemptEncryption')
        print(f'  Build {ver}  {ba.get("processingState")}')
        print(f'  usesNonExemptEncryption: {enc!r}')
        if enc is None:
            print('  ⚠ unbeantwortet — ASC verlangt die Antwort vor dem '
                  'Einreichen. Mit --exportfrage beantworten.')

    print('\n── Texte je Sprache ──')
    locs = api(tok, f'appStoreVersions/{v["id"]}/appStoreVersionLocalizations')
    for loc in locs.get('data', []):
        a = loc['attributes']
        leer = [f for f in ('description', 'keywords', 'supportUrl',
                            'whatsNew', 'marketingUrl', 'promotionalText')
                if not a.get(f)]
        print(f'  {a["locale"]:8} leer: {", ".join(leer) or "nichts"}')

    # Apple hat die Alterseinstufung irgendwann vom appStoreVersion an den
    # appInfo verschoben. Beide Orte abfragen, sonst meldet man "fehlt",
    # obwohl sie nur woanders liegt.
    print('\n── Alterseinstufung ──')
    ar = api(tok, f'appStoreVersions/{v["id"]}/ageRatingDeclaration', fatal=False)
    print(f'  an der Version: {"gesetzt" if ar.get("data") else "nicht dort"}')
    for info in api(tok, f'apps/{aid}/appInfos').get('data', []):
        ai = api(tok, f'appInfos/{info["id"]}/ageRatingDeclaration', fatal=False)
        zustand = (info['attributes'].get('appStoreState')
                   or info['attributes'].get('state') or '?')
        print(f'  an appInfo {info["id"][:8]} ({zustand}): '
              f'{"gesetzt" if ai.get("data") else "FEHLT"}')

    print('\n── Abos: warum MISSING_METADATA ──')
    grp = api(tok, f'apps/{aid}/subscriptionGroups')
    for g in grp.get('data', []):
        gl = api(tok, f'subscriptionGroups/{g["id"]}/subscriptionGroupLocalizations',
                 fatal=False)
        print(f'  Gruppe {g["attributes"].get("referenceName")}: '
              f'{len(gl.get("data", []))} Lokalisierung(en)')
        subs = api(tok, f'subscriptionGroups/{g["id"]}/subscriptions')
        for s in subs.get('data', []):
            a = s['attributes']
            print(f'\n  {a.get("productId")}  {a.get("state")}')
            sl = api(tok, f'subscriptions/{s["id"]}/subscriptionLocalizations',
                     fatal=False)
            for loc in sl.get('data', []):
                la = loc['attributes']
                print(f'      {la.get("locale"):8} name={la.get("name")!r} '
                      f'beschreibung={"ja" if la.get("description") else "FEHLT"}')
            if not sl.get('data'):
                print('      Lokalisierungen: KEINE')
            for zeile in preise(tok, s['id']):
                print(f'      {zeile}')
            av = api(tok, f'subscriptions/{s["id"]}/subscriptionAvailability',
                     fatal=False)
            if av.get('data'):
                aa = av['data']['attributes']
                terr = api(tok, f'subscriptionAvailabilities/{av["data"]["id"]}'
                                f'/availableTerritories?limit=1', fatal=False)
                anz = (terr.get('meta') or {}).get('paging', {}).get('total', '?')
                print(f'      Verfuegbarkeit: alleNeuen={aa.get("availableInNewTerritories")} '
                      f'Laender={anz}')
            else:
                print('      Verfuegbarkeit: FEHLT — Abo ist nirgends verkaeuflich')
            shot = api(tok, f'subscriptions/{s["id"]}/appStoreReviewScreenshot',
                       fatal=False)
            d = shot.get('data')
            if d:
                sa = d['attributes']
                print(f'      Review-Screenshot: hochgeladen={sa.get("assetDeliveryState", {}).get("state")}')
            else:
                print('      Review-Screenshot: FEHLT')
            # Alles Erwartbare ist vorhanden und der Zustand bleibt trotzdem
            # MISSING_METADATA — also die Rohdaten zeigen, statt weiter zu
            # raten, welches Feld Apple vermisst.
            print(f'      roh: {json.dumps(a, ensure_ascii=False, sort_keys=True)}')
            for bez in ('introductoryOffers', 'promotionalOffers',
                        'promotedPurchase', 'offerCodes', 'images'):
                r = api(tok, f'subscriptions/{s["id"]}/{bez}?limit=1', fatal=False)
                if r.get('_fehler'):
                    print(f'      {bez}: (kein Endpunkt)')
                else:
                    dd = r.get('data')
                    anz = len(dd) if isinstance(dd, list) else (1 if dd else 0)
                    print(f'      {bez}: {anz}')


def preise(tok, sub_id):
    """Abopreise als lesbare Zeilen — Betrag und Land, nicht die Anzahl.

    Am 31.07. hat genau hier eine Anzahl-Messung Stunden gekostet: die
    Beziehung 'prices' lieferte auch fuer das Jahresabo OHNE Preis einen
    Eintrag, das Skript meldete "Preise hinterlegt: 1", und ASC sperrte die
    Einreichung trotzdem mit "Fuege einen Abopreis hinzu". Ein Eintrag ohne
    aufgeloesten Preispunkt ist kein Preis. Deshalb wird der Betrag selbst
    gelesen; laesst sich keiner aufloesen, ist das ein FEHLT, kein Treffer.
    """
    res = api(tok, f'subscriptions/{sub_id}/prices'
                   f'?include=subscriptionPricePoint,territory&limit=200',
              fatal=False)
    if res.get('_fehler'):
        return [f'Preise: nicht lesbar ({fehler_text(res)})']
    punkte = {i['id']: i.get('attributes', {})
              for i in res.get('included', [])
              if i.get('type') == 'subscriptionPricePoints'}
    # Auch ein aufgeloester Betrag beweist noch nicht, dass ASC den Preis als
    # gesetzt ansieht: am 14.08. meldete diese Funktion "Preis: 4.49 (DEU)",
    # waehrend die Oberflaeche gleichzeitig "Fuege einen Abopreis hinzu"
    # anzeigte. Deshalb hier die Rohattribute jedes Eintrags mitschreiben
    # (startDate, preserved) — die Vermutung ist ein Eintrag, der erst in der
    # Zukunft greift oder nur ein Vorschlag ist. Lieber zu viel zeigen als
    # noch einmal "alles da" melden und in eine Ablehnung laufen.
    zeilen = []
    gefunden = []
    for p in res.get('data', []):
        bez = p.get('relationships', {})
        pp = (bez.get('subscriptionPricePoint') or {}).get('data') or {}
        terr = (bez.get('territory') or {}).get('data') or {}
        betrag = punkte.get(pp.get('id'), {}).get('customerPrice')
        land = terr.get('id') or '?'
        zeilen.append(f'  Preiseintrag {land}: betrag={betrag!r} '
                      f'attr={json.dumps(p.get("attributes", {}), sort_keys=True)}')
        if betrag:
            gefunden.append((land, betrag))
    if not gefunden:
        zeilen.insert(0, f'Preis: FEHLT — {len(res.get("data", []))} Eintrag/'
                         f'Eintraege ohne aufloesbaren Betrag.')
    else:
        zeilen.insert(0, 'Preis laut API: ' + ', '.join(
            f'{b} ({l})' for l, b in gefunden[:3]))
    return zeilen[:8]


def abo_namen(tok):
    """Anzeigenamen der Abos von MyPeak auf FullRep ziehen.

    Die Produkt-IDs bleiben (nach Anlage unveraenderlich), aber der Name im
    Kaufdialog ist sichtbar — er darf nicht die alte Marke tragen.
    """
    aid = app_id(tok)
    for g in api(tok, f'apps/{aid}/subscriptionGroups').get('data', []):
        for art, pfad in (('subscriptionGroupLocalizations',
                           f'subscriptionGroups/{g["id"]}/subscriptionGroupLocalizations'),
                          (None, None)):
            if not art:
                continue
            for loc in api(tok, pfad, fatal=False).get('data', []):
                a = loc['attributes']
                neu = (a.get('name') or '').replace('MyPeak', 'FullRep')
                if not neu or neu == a.get('name'):
                    continue
                print(f'  Gruppe {a.get("locale")}: {a.get("name")!r} -> {neu!r}')
                if TROCKEN:
                    continue
                res = api(tok, f'{art}/{loc["id"]}', 'PATCH', {
                    'data': {'type': art, 'id': loc['id'],
                             'attributes': {'name': neu}},
                }, fatal=False)
                print('    gesetzt' if not res.get('_fehler')
                      else f'    FEHLER: {fehler_text(res)}')

        for s in api(tok, f'subscriptionGroups/{g["id"]}/subscriptions').get('data', []):
            pid = s['attributes'].get('productId')
            for loc in api(tok, f'subscriptions/{s["id"]}/subscriptionLocalizations',
                           fatal=False).get('data', []):
                a = loc['attributes']
                felder = {}
                for f in ('name', 'description'):
                    wert = a.get(f) or ''
                    if 'MyPeak' in wert:
                        felder[f] = wert.replace('MyPeak', 'FullRep')
                if not felder:
                    print(f'  {pid} {a.get("locale")}: steht schon richtig')
                    continue
                print(f'  {pid} {a.get("locale")}: {felder}')
                if TROCKEN:
                    continue
                res = api(tok, f'subscriptionLocalizations/{loc["id"]}', 'PATCH', {
                    'data': {'type': 'subscriptionLocalizations',
                             'id': loc['id'], 'attributes': felder},
                }, fatal=False)
                print('    gesetzt' if not res.get('_fehler')
                      else f'    FEHLER: {fehler_text(res)}')


def inhaberrechte(tok):
    """contentRightsDeclaration setzen — app-weites Pflichtfeld.

    FullRep zeigt keine Inhalte Dritter, für die Rechte nachzuweisen wären:
    Übungsfotos stammen aus der Public Domain (free-exercise-db), die
    Quellenangaben sind bibliografische Zitate. Also
    DOES_NOT_USE_THIRD_PARTY_CONTENT.
    """
    aid = app_id(tok)
    app = api(tok, f'apps/{aid}')
    jetzt = app['data']['attributes'].get('contentRightsDeclaration')
    soll = 'DOES_NOT_USE_THIRD_PARTY_CONTENT'
    print(f'  contentRightsDeclaration: {jetzt!r} -> {soll}')
    if jetzt == soll:
        print('  steht schon so')
        return
    if TROCKEN:
        print('  [trocken] wuerde gesetzt')
        return
    res = api(tok, f'apps/{aid}', 'PATCH', {
        'data': {'type': 'apps', 'id': aid,
                 'attributes': {'contentRightsDeclaration': soll}},
    }, fatal=False)
    print('  gesetzt' if not res.get('_fehler')
          else f'  FEHLER: {fehler_text(res)}')


# Prueferhinweis am Abo. Gilt als optional — in den Rohdaten ist es aber das
# einzige leere Feld, und der Hinweis gehoert inhaltlich ohnehin dorthin.
ABO_NOTIZ = (
    'The subscription unlocks the AI coach, blood-marker guidance and the '
    'AI meal photo analysis. To reach it in the app: Profile tab > '
    '"FullRep Premium" card. A 7-day free trial is offered before any '
    'purchase, so the paywall can be reviewed without buying. '
    'No account is required — the app is fully usable as a guest.'
)


def abo_notiz(tok):
    aid = app_id(tok)
    for g in api(tok, f'apps/{aid}/subscriptionGroups').get('data', []):
        for s in api(tok, f'subscriptionGroups/{g["id"]}/subscriptions').get('data', []):
            a = s['attributes']
            if a.get('reviewNote') == ABO_NOTIZ:
                print(f'  {a.get("productId")}: steht schon richtig')
                continue
            print(f'  {a.get("productId")}: Notiz setzen ({len(ABO_NOTIZ)} Zeichen)')
            if TROCKEN:
                continue
            res = api(tok, f'subscriptions/{s["id"]}', 'PATCH', {
                'data': {'type': 'subscriptions', 'id': s['id'],
                         'attributes': {'reviewNote': ABO_NOTIZ}},
            }, fatal=False)
            if res.get('_fehler'):
                print(f'    FEHLER: {fehler_text(res)}')
            else:
                neu = res['data']['attributes'].get('state')
                print(f'    gesetzt — Zustand jetzt {neu}')


def exportfrage(tok, wert=False):
    """Die Frage nach Verschluesselung am Build beantworten.

    Bleibt sie offen, laesst ASC die Version nicht einreichen. FullRep nutzt
    nur HTTPS — das faellt unter die Ausnahme, also 'false'.
    """
    aid = app_id(tok)
    v = offene_version(tok, aid)
    b = api(tok, f'appStoreVersions/{v["id"]}/build', fatal=False)
    if not b.get('data'):
        sys.exit('  Kein Build zugewiesen.')
    bid = b['data']['id']
    jetzt = b['data']['attributes'].get('usesNonExemptEncryption')
    print(f'  Build {b["data"]["attributes"].get("version")}: '
          f'usesNonExemptEncryption {jetzt!r} -> {wert}')
    if jetzt == wert:
        print('  steht schon so')
        return
    if TROCKEN:
        print('  [trocken] wuerde gesetzt')
        return
    res = api(tok, f'builds/{bid}', 'PATCH', {
        'data': {'type': 'builds', 'id': bid,
                 'attributes': {'usesNonExemptEncryption': wert}},
    }, fatal=False)
    if res.get('_fehler'):
        print(f'  FEHLER: {fehler_text(res)}')
    else:
        print('  gesetzt')


def zeige_status(tok):
    aid = app_id(tok)

    print('\n── Anzeigename je Sprache ──')
    infos = api(tok, f'apps/{aid}/appInfos')
    for info in infos.get('data', []):
        zustand = info['attributes'].get('appStoreState') or \
                  info['attributes'].get('state') or '?'
        print(f'  appInfo {info["id"]}  Zustand {zustand}')
        locs = api(tok, f'appInfos/{info["id"]}/appInfoLocalizations')
        for loc in locs.get('data', []):
            a = loc['attributes']
            print(f'    {a["locale"]:8} name={a.get("name")!r}  '
                  f'subtitle={a.get("subtitle")!r}')

    print('\n── Versionen ──')
    vers = api(tok, f'apps/{aid}/appStoreVersions?limit=5')
    for v in vers.get('data', []):
        a = v['attributes']
        print(f'  {a["versionString"]:8} {a.get("appStoreState")}  '
              f'platform={a.get("platform")}  id={v["id"]}')
        b = api(tok, f'appStoreVersions/{v["id"]}/build', fatal=False)
        if b.get('data'):
            print(f'      zugewiesener Build: {b["data"]["attributes"].get("version")}')
        else:
            print('      zugewiesener Build: keiner')

    print('\n── Builds (neueste zuerst) ──')
    builds = api(tok, f'builds?filter[app]={aid}&limit=5&sort=-version')
    for b in builds.get('data', []):
        a = b['attributes']
        print(f'  Build {a.get("version"):4}  {a.get("processingState")}  '
              f'hochgeladen {a.get("uploadedDate")}  id={b["id"]}')

    print('\n── Abos ──')
    grp = api(tok, f'apps/{aid}/subscriptionGroups', fatal=False)
    for g in grp.get('data', []):
        subs = api(tok, f'subscriptionGroups/{g["id"]}/subscriptions', fatal=False)
        for s in subs.get('data', []):
            a = s['attributes']
            print(f'  {a.get("productId")}  {a.get("state")}  id={s["id"]}')
            shots = api(tok, f'subscriptions/{s["id"]}/appStoreReviewScreenshot',
                        fatal=False)
            print(f'      Review-Screenshot: '
                  f'{"vorhanden" if shots.get("data") else "FEHLT"}')

    print('\n── Screenshots je Version ──')
    for v in vers.get('data', [])[:1]:
        locs = api(tok, f'appStoreVersions/{v["id"]}/appStoreVersionLocalizations')
        for loc in locs.get('data', []):
            lc = loc['attributes']['locale']
            sets = api(tok, f'appStoreVersionLocalizations/{loc["id"]}/appScreenshotSets')
            for st in sets.get('data', []):
                typ = st['attributes']['screenshotDisplayType']
                shots = api(tok, f'appScreenshotSets/{st["id"]}/appScreenshots')
                print(f'  {lc:8} {typ:28} {len(shots.get("data", []))} Bilder')

    print('\n── Offene Einreichungen ──')
    subm = api(tok, f'apps/{aid}/reviewSubmissions?limit=5', fatal=False)
    for s in subm.get('data', []):
        a = s['attributes']
        print(f'  {a.get("state")}  platform={a.get("platform")}  id={s["id"]}')
        items = api(tok, f'reviewSubmissions/{s["id"]}/items', fatal=False)
        print(f'      Elemente: {len(items.get("data", []))}')


def main():
    global TROCKEN, TROTZDEM
    p = argparse.ArgumentParser()
    p.add_argument('--status', action='store_true',
                   help='Zeigt Name, Versionen, Builds, Abos, Screenshots')
    p.add_argument('--name', action='store_true',
                   help='Anzeigename + Untertitel auf FullRep setzen')
    p.add_argument('--version-anlegen', metavar='NR', dest='version_anlegen',
                   help='neue App-Store-Version anlegen (z. B. 1.5.0) + whatsNew')
    p.add_argument('--beschreibung', action='store_true',
                   help='Beschreibung + Support-/Marketing-URL setzen (3.1.2)')
    p.add_argument('--lokalisieren', nargs='?', const='alle', metavar='LOCALES',
                   help='Store-Seite in weiteren Sprachen anlegen/aktualisieren, '
                        f'kommagetrennt aus {",".join(SPRACHEN)} (Standard: alle)')
    p.add_argument('--build', metavar='NR',
                   help='Diesen Build der offenen Version zuweisen')
    p.add_argument('--screenshots', action='store_true',
                   help='iPhone- und iPad-Screenshots ersetzen')
    p.add_argument('--abo-screenshot', action='store_true',
                   help='Paywall-Bild als Review-Screenshot an alle Abos')
    p.add_argument('--warum', action='store_true',
                   help='Was blockiert die Einreichung? (liest nur)')
    p.add_argument('--abo-namen', action='store_true',
                   help='Abo-Anzeigenamen von MyPeak auf FullRep ziehen')
    p.add_argument('--einreichungen', action='store_true',
                   help='alle Einreichungen samt Zustand und Elementen zeigen')
    p.add_argument('--aufraeumen', action='store_true',
                   help='festhaengende Einreichungen zurueckziehen')
    p.add_argument('--abo-notiz', action='store_true',
                   help='Prueferhinweis am Abo setzen (einziges leeres Feld)')
    p.add_argument('--inhaberrechte', action='store_true',
                   help='contentRightsDeclaration setzen (app-weites Pflichtfeld)')
    p.add_argument('--exportfrage', action='store_true',
                   help='usesNonExemptEncryption am Build auf false setzen')
    p.add_argument('--pruefnotiz', action='store_true',
                   help='App-Review-Notiz: was sich seit der Ablehnung aendert')
    p.add_argument('--einreichen', action='store_true',
                   help='Version samt Abos zur Pruefung schicken')
    p.add_argument('--alles', action='store_true',
                   help='name, build (Nummer aus --build), screenshots, '
                        'abo-screenshot, pruefnotiz, einreichen')
    p.add_argument('--trotzdem', action='store_true',
                   help='einreichen, auch wenn Abos nicht mitkoennen')
    p.add_argument('--dry-run', action='store_true',
                   help='nur zeigen, nichts an Apple senden')
    a = p.parse_args()
    TROCKEN = a.dry_run
    TROTZDEM = a.trotzdem

    tat = [a.status, a.name, a.build, a.version_anlegen, a.beschreibung, a.lokalisieren,
           a.screenshots, a.abo_screenshot,
           a.warum, a.einreichungen, a.aufraeumen, a.abo_namen, a.abo_notiz,
           a.inhaberrechte, a.exportfrage, a.pruefnotiz,
           a.einreichen, a.alles]
    if not any(tat):
        p.error('Einen Befehl angeben, z. B. --status')

    # --alles hatte die Build-Nummer fest verdrahtet. Nach der Ablehnung vom
    # 14.08. verlangt Apple ausdruecklich einen NEUEN Build — eine feste 4 im
    # Code haette beim naechsten Durchlauf still den alten, abgelehnten Build
    # wieder zugewiesen, ohne dass der Lauf gescheitert waere.
    if a.alles and not a.build:
        p.error('--alles braucht die Build-Nummer: --alles --build 5')

    tok = token()
    if a.status:
        zeige_status(tok)
    if a.alles:
        for titel, fn in (('Anzeigename', lambda: setze_namen(tok)),
                          (f'Build {a.build}', lambda: setze_build(tok, a.build)),
                          ('Screenshots', lambda: setze_screenshots(tok)),
                          ('Abo-Screenshot', lambda: setze_abo_screenshot(tok)),
                          ('Abo-Namen', lambda: abo_namen(tok)),
                          ('Abo-Notiz', lambda: abo_notiz(tok)),
                          ('Inhaberrechte', lambda: inhaberrechte(tok)),
                          ('Pruefnotiz', lambda: setze_pruefnotiz(tok)),
                          ('Einreichen', lambda: einreichen(tok))):
            print(f'\n═══ {titel} ═══')
            fn()
        return
    if a.version_anlegen:
        version_anlegen(tok, a.version_anlegen)
    if a.beschreibung:
        beschreibung(tok)
    if a.lokalisieren:
        gewaehlt = (list(SPRACHEN) if a.lokalisieren == 'alle'
                    else [s.strip() for s in a.lokalisieren.split(',') if s.strip()])
        unbekannt = [s for s in gewaehlt if s not in SPRACHEN]
        if unbekannt:
            p.error(f'Unbekannte Locale: {", ".join(unbekannt)}')
        lokalisieren(tok, gewaehlt)
    if a.name:
        setze_namen(tok)
    if a.build:
        setze_build(tok, a.build)
    if a.screenshots:
        setze_screenshots(tok)
    if a.abo_screenshot:
        setze_abo_screenshot(tok)
    if a.warum:
        diagnose(tok)
    if a.abo_namen:
        abo_namen(tok)
    if a.einreichungen:
        zeige_einreichungen(tok)
    if a.aufraeumen:
        aufraeumen(tok)
    if a.abo_notiz:
        abo_notiz(tok)
    if a.inhaberrechte:
        inhaberrechte(tok)
    if a.exportfrage:
        exportfrage(tok)
    if a.pruefnotiz:
        setze_pruefnotiz(tok)
    if a.einreichen:
        einreichen(tok)


if __name__ == '__main__':
    main()
