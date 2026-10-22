#!/usr/bin/env python3
"""AAB zu Google Play hochladen und im Produktions-Track veröffentlichen.

Nur Standardbibliothek + pyjwt/cryptography (kein google-api-python-client).
Dienstkonto-Key: ~/.config/play-publisher/key.json
  (play-upload@wellbooked-501311.iam.gserviceaccount.com, braucht Admin-Recht
   für die App — sonst kommt 403 PERMISSION_DENIED.)

Ablauf (eine Edit-Transaktion):
  edits.insert -> bundles.upload -> tracks.update -> :validate -> :commit

Beispiele:
  # an alle Nutzer veröffentlichen (Standardweg)
  python3 scripts/play-upload.py --aab app-release.aab --complete \
      --notes "Levelwechsel repariert, Werbung verdeckt die Knöpfe nicht mehr."

  # optional gestuft: erst 20 %, später auf alle ausweiten (ohne neues AAB)
  python3 scripts/play-upload.py --aab app-release.aab --fraction 0.2
  python3 scripts/play-upload.py --promote 15 --complete

  # nur nachsehen, was gerade im Produktions-Track liegt
  python3 scripts/play-upload.py --status
"""
import argparse
import glob
import json
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

PKG = os.environ.get('PLAY_PACKAGE') or 'at.gallab.mypeak'
# Pfad zum Dienstkonto-Key; in der CI über die Umgebungsvariable PLAY_KEY gesetzt.
KEY = os.environ.get('PLAY_KEY') or os.path.expanduser('~/.config/play-publisher/key.json')
API = 'https://androidpublisher.googleapis.com/androidpublisher/v3'
UPLOAD = 'https://androidpublisher.googleapis.com/upload/androidpublisher/v3'


def token() -> str:
    """Dienstkonto-JWT gegen ein Bearer-Token tauschen."""
    try:
        import jwt  # pyjwt
    except ImportError:
        sys.exit('Fehlt: pip3 install pyjwt cryptography')
    if not os.path.exists(KEY):
        sys.exit(f'Dienstkonto-Key nicht gefunden: {KEY}')
    with open(KEY) as fh:
        k = json.load(fh)
    now = int(time.time())
    assertion = jwt.encode(
        {
            'iss': k['client_email'],
            'scope': 'https://www.googleapis.com/auth/androidpublisher',
            'aud': 'https://oauth2.googleapis.com/token',
            'iat': now,
            'exp': now + 3600,
        },
        k['private_key'],
        algorithm='RS256',
    )
    body = urllib.parse.urlencode({
        'grant_type': 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        'assertion': assertion,
    }).encode()
    req = urllib.request.Request('https://oauth2.googleapis.com/token', data=body)
    with urllib.request.urlopen(req) as r:
        return json.load(r)['access_token']


class ApiError(Exception):
    def __init__(self, code, detail):
        super().__init__(f'{code}: {detail}')
        self.code, self.detail = code, detail


def call(tok, method, url, data=None, ctype='application/json', fatal=True):
    if data is not None and ctype == 'application/json':
        data = json.dumps(data).encode()
    req = urllib.request.Request(url, data=data, method=method)
    req.add_header('Authorization', f'Bearer {tok}')
    if data is not None:
        req.add_header('Content-Type', ctype)
    try:
        with urllib.request.urlopen(req) as r:
            raw = r.read()
            return json.loads(raw) if raw else {}
    except urllib.error.HTTPError as e:
        detail = e.read().decode(errors='replace')
        if not fatal:
            raise ApiError(e.code, detail) from None
        sys.exit(f'\nFEHLER {e.code} bei {method} {url}\n{detail}\n')


def commit_edit(tok, eid):
    """Edit pruefen und abschliessen.

    Normalerweise reicht Google die Aenderung gleich zur Pruefung ein. Steht die
    App aber unter einer laufenden Richtlinienpruefung, lehnt die API genau das
    ab (400, "Changes cannot be sent for review automatically") — und zwar schon
    bei :validate, nicht erst bei :commit. Deshalb wird der ganze Abschluss
    wiederholt, beide Aufrufe mit changesNotSentForReview=true.

    Die Aenderung ist dann gespeichert, liegt aber als Entwurf in der Play
    Console und muss dort von Hand zur Pruefung geschickt werden.

    Ohne diesen Zweig verfaellt die Edit-Transaktion und die ganze vorherige
    Arbeit (bei einem AAB: Minuten an Upload) ist weg.
    """
    basis = f'{API}/applications/{PKG}/edits/{eid}'

    def blockiert(e):
        # 400: laufende Richtlinienpruefung — Google sagt es im Klartext.
        #
        # 403 PERMISSION_DENIED: eine Pflichterklaerung im Play-Eintrag fehlt
        # (bei uns am 02.09.: „You must let us know whether your app includes
        # any health features."). Das ist eine Anforderung an die EINREICHUNG,
        # nicht an das Bundle — deshalb hat ein Commit ohne Einreichen eine
        # echte Chance, waehrend :validate zwangslaeufig ablehnt.
        #
        # ⚠ Der 403 wird NICHT verschluckt: Er wird gemeldet, und wenn auch der
        # Commit scheitert, bricht das Skript mit Googles Originaltext ab.
        # Ohne diesen Zweig verfiel die Edit-Transaktion samt 26-MB-Upload,
        # obwohl der letzte Aufruf des Skripts genau dafuer gedacht ist.
        return ('changesNotSentForReview' in e.detail if e.code == 400
                else e.code == 403)

    def hart_raus(e, stufe):
        sys.exit(f'\nFEHLER {e.code} bei {stufe} von Edit {eid}\n{e.detail}\n')

    # :validate nimmt changesNotSentForReview NICHT entgegen ("could not be found
    # in request message"). Der 400er dort heisst also nur: Vorpruefung geht
    # gerade nicht — dann ohne sie weiter, direkt zum Commit.
    ohne_pruefung = False
    try:
        call(tok, 'POST', f'{basis}:validate', fatal=False)
        print('  validiert')
    except ApiError as e:
        if not blockiert(e):
            hart_raus(e, ':validate')
        ohne_pruefung = True
        print(f'  Vorpruefung abgelehnt ({e.code}) — Google laesst gerade kein')
        print('  automatisches Einreichen zu. Grund laut API:')
        print(f'  {e.detail.strip()[:400]}')
        print('  Weiter ohne Vorpruefung, Commit ohne Einreichen.')

    # ⚠ Der schlichte :commit wird IMMER versucht, auch nach einer abgelehnten
    # Vorpruefung. Frueher stand hier `if not ohne_pruefung:` — damit sprang der
    # Code nach einem Fehlschlag bei :validate direkt zur Parameter-Variante und
    # uebersprang genau den Aufruf, der fuer diese App der richtige ist:
    #
    #   :commit?changesNotSentForReview=true
    #   → 400 "Changes are sent for review automatically.
    #          The query parameter changesNotSentForReview must not be set."
    #
    # Fuer at.gallab.mypeak reicht Google jede Aenderung automatisch zur
    # Pruefung ein; der Parameter ist schlicht verboten. Die Reihenfolge ist
    # deshalb: erst ohne Parameter, und nur wenn Google ihn ausdruecklich
    # verlangt (der 400er oben), mit.
    if ohne_pruefung:
        print('  Versuche Commit ohne Vorpruefung …')
    try:
        call(tok, 'POST', f'{basis}:commit', fatal=False)
        print('  committet — im Play-Eintrag jetzt sichtbar.')
        return
    except ApiError as e:
        if not blockiert(e):
            hart_raus(e, ':commit')
        print(f'  Commit abgelehnt ({e.code}): {e.detail.strip()[:300]}')

    call(tok, 'POST', f'{basis}:commit?changesNotSentForReview=true')
    print('  committet — ABER NICHT zur Pruefung eingereicht.')
    print('  Die Aenderung liegt jetzt als Entwurf in der Play Console und muss')
    print('  dort von Hand zur Pruefung geschickt werden.')


def lade_einzelbild(tok, datei, lang, image_type, dry_run=False):
    """App-Symbol oder Vorstellungsgrafik ersetzen.

    Die beiden stecken NICHT in der App — sie sind eigene Uploads im
    Store-Eintrag und wandern beim App-Update nicht mit. Genau deshalb standen
    sie nach der Umbenennung noch auf MyPeak, obwohl die App laengst FullRep
    hiess. Beim naechsten Logo- oder Namenswechsel also mit erneuern.
    """
    if not os.path.exists(datei):
        sys.exit(f'Bild nicht gefunden: {datei}')
    print(f'{image_type} fuer {lang}: {os.path.basename(datei)} '
          f'({os.path.getsize(datei) // 1024} KB)')

    if dry_run:
        print('\n--dry-run: nichts hochgeladen, nichts geaendert.')
        return

    eid = call(tok, 'POST', f'{API}/applications/{PKG}/edits')['id']
    print(f'\nEdit {eid} geoeffnet')
    base = f'applications/{PKG}/edits/{eid}/listings/{lang}/{image_type}'

    # Play erlaubt hier genau ein Bild — das alte muss weg, sonst kommt 409.
    call(tok, 'DELETE', f'{API}/{base}')
    with open(datei, 'rb') as fh:
        call(tok, 'POST', f'{UPLOAD}/{base}?uploadType=media',
             data=fh.read(), ctype='image/png')
    print(f'  hochgeladen: {os.path.basename(datei)}')

    commit_edit(tok, eid)


def lade_screenshots(tok, verzeichnis, lang, dry_run=False, image_type='phoneScreenshots'):
    """Store-Eintrag-Screenshots ersetzen — alte loeschen, neue in Dateinamen-
    Reihenfolge hochladen. Play zeigt sie in genau dieser Reihenfolge an.

    Achtung: Das Listing ist oeffentlich. Ohne --dry-run ist die Aenderung nach
    dem Commit sofort sichtbar.
    """
    # Dateien muessen mit einer Nummer beginnen — sie bestimmt die Reihenfolge
    # im Store. Sortiert wird NUMERISCH, nicht alphabetisch: sonst stuende
    # "10-…" vor "2-…". Ein- und zweistellig ist beides erlaubt, weil die Repos
    # es unterschiedlich halten (01-menu.png hier, 1-menu.png dort).
    bilder = []
    for pfad in glob.glob(os.path.join(verzeichnis, '*')):
        name = os.path.basename(pfad)
        if not name.lower().endswith(('.png', '.jpg', '.jpeg')):
            continue
        m = re.match(r'(\d+)[-_ ]', name)
        if m:
            bilder.append((int(m.group(1)), name, pfad))
    bilder.sort()
    if not bilder:
        vorhanden = sorted(os.path.basename(p) for p in glob.glob(os.path.join(verzeichnis, '*')))
        sys.exit(
            f'Keine nummerierten Bilder in {verzeichnis}.\n'
            'Erwartet werden Dateinamen, die mit einer Nummer beginnen — sie legt\n'
            'die Reihenfolge im Store fest, z. B. 1-start.png oder 01-start.png.\n'
            + (f'Gefunden wurde stattdessen: {", ".join(vorhanden[:8])}' if vorhanden
               else 'Das Verzeichnis ist leer oder fehlt.')
        )
    bilder = [p for _, _, p in bilder]

    print(f'{len(bilder)} Screenshots fuer {lang} / {image_type}:')
    for b in bilder:
        print(f'  {os.path.basename(b):26} {os.path.getsize(b) // 1024:>5} KB')

    if dry_run:
        print('\n--dry-run: nichts hochgeladen, nichts geaendert.')
        return

    eid = call(tok, 'POST', f'{API}/applications/{PKG}/edits')['id']
    print(f'\nEdit {eid} geoeffnet')
    base = f'applications/{PKG}/edits/{eid}/listings/{lang}/{image_type}'

    call(tok, 'DELETE', f'{API}/{base}')
    print('  alte Bilder entfernt')

    for b in bilder:
        with open(b, 'rb') as fh:
            call(tok, 'POST', f'{UPLOAD}/{base}?uploadType=media',
                 data=fh.read(), ctype='image/png')
        print(f'  hochgeladen: {os.path.basename(b)}')

    commit_edit(tok, eid)


# Play weist Ueberlaenge erst beim Commit ab, mit einer wenig sprechenden
# Meldung. Deshalb vorher selbst pruefen.
LISTING_LIMITS = {'title': 30, 'shortDescription': 80, 'fullDescription': 4000}


def setze_listing(tok, datei, lang, dry_run=False):
    """Titel, Kurz- und Volltext des Store-Eintrags setzen.

    Der Titel ist der Name, unter dem die App im Play Store steht — die
    Paket-ID (at.gallab.mypeak) bleibt davon unberuehrt, die ist nach der
    Veroeffentlichung unveraenderlich.

    Gesendet wird per PATCH, also nur die Felder aus der Datei. Was der
    Eintrag sonst noch hat (z. B. ein Promo-Video), bleibt stehen.
    """
    with open(datei, encoding='utf-8') as fh:
        neu = json.load(fh)

    unbekannt = set(neu) - set(LISTING_LIMITS)
    if unbekannt:
        sys.exit(f'Unbekannte Felder in {datei}: {", ".join(sorted(unbekannt))}')
    for feld, grenze in LISTING_LIMITS.items():
        if feld in neu and len(neu[feld]) > grenze:
            sys.exit(f'{feld} ist {len(neu[feld])} Zeichen lang, erlaubt sind {grenze}.')

    eid = call(tok, 'POST', f'{API}/applications/{PKG}/edits')['id']
    url = f'{API}/applications/{PKG}/edits/{eid}/listings/{lang}'
    # Eine Sprache, die es im Eintrag noch nicht gibt, antwortet mit 404 —
    # bis 10/2026 brach das Skript dort ab, weil es nur de-DE kannte. Dann
    # wird die Sprache per PUT (listings.update) angelegt statt per PATCH.
    try:
        alt = call(tok, 'GET', url, fatal=False)
        neu_anlegen = False
    except ApiError as e:
        if e.code != 404:
            sys.exit(f'\nFEHLER {e.code} bei GET {url}\n{e.detail}\n')
        alt, neu_anlegen = {}, True

    print(f'Store-Eintrag {lang}:' + (' (NEU — Sprache wird angelegt)' if neu_anlegen else ''))
    for feld in ('title', 'shortDescription', 'fullDescription'):
        if feld not in neu:
            continue
        vorher, nachher = alt.get(feld, ''), neu[feld]
        if vorher == nachher:
            print(f'  {feld}: unveraendert')
            continue
        print(f'  {feld}: {len(vorher)} -> {len(nachher)} Zeichen')
        # Ab der ersten abweichenden Stelle zeigen, nicht ab Zeichen 0: bei einem
        # angehaengten Absatz waeren sonst beide Ausschnitte identisch und der
        # Trockenlauf wertlos.
        i = 0
        while i < min(len(vorher), len(nachher)) and vorher[i] == nachher[i]:
            i += 1
        if i:
            print(f'    ... die ersten {i} Zeichen sind gleich, ab da:')
        for name, wert in (('vorher ', vorher), ('nachher', nachher)):
            rest = wert[i:i + 200].replace('\n', '⏎')
            print(f'    {name}: {rest or "(nichts)"}{"…" if len(wert) > i + 200 else ""}')

    if dry_run:
        call(tok, 'DELETE', f'{API}/applications/{PKG}/edits/{eid}')
        print('\n--dry-run: Edit verworfen, am Eintrag hat sich nichts geaendert.')
        return

    call(tok, 'PUT' if neu_anlegen else 'PATCH', url, data=dict(neu, language=lang))
    print()
    commit_edit(tok, eid)


def setze_website(tok, url, dry_run=False):
    """Website im Play-Eintrag setzen (edits.details, Feld contactWebsite).

    Daran haengt auch app-ads.txt: Google sucht die Datei unter
    <contactWebsite>/app-ads.txt. Nach dem Umzug auf Cloudflare (04.10.2026)
    stand hier noch die gesperrte Vercel-Adresse. Die Datenschutz-URL liegt
    NICHT hier, sondern unter „App-Inhalte“ und geht nur von Hand.
    """
    if not url.startswith('https://'):
        sys.exit(f'Website muss mit https:// beginnen: {url}')
    eid = call(tok, 'POST', f'{API}/applications/{PKG}/edits')['id']
    durl = f'{API}/applications/{PKG}/edits/{eid}/details'
    alt = call(tok, 'GET', durl)
    print(f"Website: {alt.get('contactWebsite') or '(leer)'} -> {url}")
    print(f"  (E-Mail {alt.get('contactEmail')}, Standardsprache {alt.get('defaultLanguage')} bleiben)")
    if alt.get('contactWebsite') == url:
        call(tok, 'DELETE', f'{API}/applications/{PKG}/edits/{eid}')
        print('Schon gesetzt, nichts zu tun.')
        return
    if dry_run:
        call(tok, 'DELETE', f'{API}/applications/{PKG}/edits/{eid}')
        print('--dry-run: Edit verworfen.')
        return
    call(tok, 'PATCH', durl, data={'contactWebsite': url})
    commit_edit(tok, eid)


def setze_standardsprache(tok, sprache, dry_run=False):
    """Standardsprache des Play-Eintrags setzen (edits.details, defaultLanguage).

    Sie ist der Rueckfall fuer jedes Land ohne eigenes Listing. Seit
    22.10.2026 en-US statt de-DE. Play verlangt, dass es in der neuen
    Standardsprache ein vollstaendiges Listing gibt — das pruefen wir vorher
    selbst, statt Googles 400 zu deuten.
    """
    eid = call(tok, 'POST', f'{API}/applications/{PKG}/edits')['id']
    durl = f'{API}/applications/{PKG}/edits/{eid}/details'
    alt = call(tok, 'GET', durl)
    print(f"Standardsprache: {alt.get('defaultLanguage')} -> {sprache}")
    if alt.get('defaultLanguage') == sprache:
        call(tok, 'DELETE', f'{API}/applications/{PKG}/edits/{eid}')
        print('Schon gesetzt, nichts zu tun.')
        return
    try:
        lst = call(tok, 'GET', f'{API}/applications/{PKG}/edits/{eid}/listings/{sprache}', fatal=False)
    except ApiError:
        lst = {}
    fehlt = [f for f in ('title', 'shortDescription', 'fullDescription') if not lst.get(f)]
    if fehlt:
        call(tok, 'DELETE', f'{API}/applications/{PKG}/edits/{eid}')
        sys.exit(f'Listing {sprache} unvollstaendig ({", ".join(fehlt)}) — erst --listing hochladen.')
    print(f"  Listing {sprache}: {lst.get('title')!r}")
    if dry_run:
        call(tok, 'DELETE', f'{API}/applications/{PKG}/edits/{eid}')
        print('--dry-run: Edit verworfen.')
        return
    call(tok, 'PATCH', durl, data={'defaultLanguage': sprache})
    commit_edit(tok, eid)


def zeige_abos(tok):
    """Play-Abos lesen: Produkt, Basis-Tarife, Zustand, Preise.

    Liest nur. Gedacht als Gegenprobe vor der RevenueCat-Einrichtung: ein Abo
    nuetzt nichts, solange sein Basis-Tarif nicht ACTIVE ist, und der Preis in
    Play muss zu dem passen, den die Paywall anzeigt.

    ⚠️ Bei den iOS-Abos hat am 14.08. zweimal eine API-Antwort „Preis
    vorhanden" gemeldet, waehrend die Oberflaeche „Fuege einen Abopreis hinzu"
    anzeigte. Deshalb hier Betrag UND Region ausschreiben und die Anzahl der
    Regionen dazu — wer nur eine Region sieht, wo 175 stehen sollten, erkennt
    das dann selbst.
    """
    res = call(tok, 'GET', f'{API}/applications/{PKG}/subscriptions?pageSize=50')
    abos = res.get('subscriptions', [])
    if not abos:
        print('  KEINE Abos in Play angelegt.')
        return
    for s in abos:
        print(f'\n  {s.get("productId")}')
        for lst in s.get('listings', []):
            print(f'      {lst.get("languageCode"):8} {lst.get("title")!r}')
        for bp in s.get('basePlans', []):
            art = ('auto-renew' if bp.get('autoRenewingBasePlanType')
                   else 'prepaid' if bp.get('prepaidBasePlanType') else '?')
            dauer = ((bp.get('autoRenewingBasePlanType')
                      or bp.get('prepaidBasePlanType') or {}).get('billingPeriodDuration'))
            zustand = bp.get('state', '?')
            marke = '' if zustand == 'ACTIVE' else '   ⚠ nicht ACTIVE — nicht kaufbar'
            print(f'      Tarif {bp.get("basePlanId")}  {art} {dauer}  '
                  f'{zustand}{marke}')
            regionen = bp.get('regionalConfigs', [])
            preise = []
            for rc in regionen:
                pr = rc.get('price') or {}
                if pr.get('units') is None and pr.get('nanos') is None:
                    continue
                betrag = int(pr.get('units') or 0) + int(pr.get('nanos') or 0) / 1e9
                preise.append(f'{betrag:.2f} {pr.get("currencyCode")} ({rc.get("regionCode")})')
            if not preise:
                print(f'        Preis: FEHLT (Regionen konfiguriert: {len(regionen)})')
            else:
                print(f'        Preis: {", ".join(preise[:3])}'
                      + (f' … +{len(preise) - 3} weitere' if len(preise) > 3 else ''))
                print(f'        Regionen mit Preis: {len(preise)} von {len(regionen)}')
            if bp.get('offerTags'):
                print(f'        offerTags: {[t.get("tag") for t in bp["offerTags"]]}')


def _betrag(text):
    """'4,99' oder '4.99' -> (units, nanos) wie Play sie erwartet."""
    ganz, _, rest = text.replace(',', '.').partition('.')
    return str(int(ganz)), int((rest + '000000000')[:9])


def setze_abo(tok, produkt, preise=None, titel=None, lang='de-DE', dry_run=False):
    """Abopreise (nur EUR-Regionen) und/oder den Anzeigenamen setzen.

    ⚠️ Nur die EUR-Regionen. Play rechnet die uebrigen Waehrungen NUR in der
    Console automatisch um — ueber die API muesste man fuer jede der 173
    Regionen einen Betrag selbst erfinden. Das waere geraten, nicht gerechnet,
    deshalb bleiben Nicht-EUR-Regionen unangetastet und behalten ihre bisherige
    Umrechnung. Wer sie mitziehen will, macht das in der Console.

    preise: {'monthly': '4,99', 'annual': '44,99'} — Schluessel sind die
    Basis-Tarif-IDs.
    """
    url = f'{API}/applications/{PKG}/subscriptions/{produkt}'
    # regionsVersion ist bei JEDEM schreibenden Aufruf am Abo Pflicht, nicht nur
    # bei Regionalpreisen — am 15.08. quittierte Google den reinen Titel-PATCH
    # mit "Regions Version must be specified." Die Version bezeichnet Googles
    # Regionskatalog, nicht unsere Daten.
    REG = 'regionsVersion.version=2022/02'
    abo = call(tok, 'GET', url)

    if titel:
        listings = abo.get('listings', [])
        treffer = [l for l in listings if l.get('languageCode') == lang]
        if not treffer:
            sys.exit(f'Keine Lokalisierung {lang} an {produkt}.')
        alt = treffer[0].get('title')
        print(f'  Titel {lang}: {alt!r} -> {titel!r}')
        treffer[0]['title'] = titel
        if not dry_run:
            call(tok, 'PATCH', f'{url}?updateMask=listings&{REG}', data=abo)
            print('    gesetzt')

    if preise:
        for bp in abo.get('basePlans', []):
            neu = preise.get(bp.get('basePlanId'))
            if not neu:
                continue
            units, nanos = _betrag(neu)
            geaendert = 0
            for rc in bp.get('regionalConfigs', []):
                pr = rc.get('price') or {}
                if pr.get('currencyCode') != 'EUR':
                    continue
                rc['price'] = {'currencyCode': 'EUR', 'units': units, 'nanos': nanos}
                geaendert += 1
            print(f'  Tarif {bp.get("basePlanId")}: {geaendert} EUR-Region(en) '
                  f'-> {neu} EUR')
            if geaendert == 0:
                print('    ⚠ keine EUR-Region gefunden — nichts geaendert')
        if not dry_run:
            res = call(tok, 'PATCH', f'{url}?updateMask=basePlans&{REG}',
                       data=abo, fatal=False)
            if isinstance(res, dict) and not res.get('_fehler'):
                print('    gesetzt')

    if dry_run:
        print('\n--dry-run: nichts an Play gesendet.')


def zeige_status(tok, track='production'):
    eid = call(tok, 'POST', f'{API}/applications/{PKG}/edits')['id']
    tr = call(tok, 'GET', f'{API}/applications/{PKG}/edits/{eid}/tracks/{track}')
    call(tok, 'DELETE', f'{API}/applications/{PKG}/edits/{eid}')  # Edit verwerfen
    print(json.dumps(tr, indent=2, ensure_ascii=False))


def main():
    p = argparse.ArgumentParser()
    p.add_argument('--aab', help='Pfad zur .aab (Neu-Upload)')
    p.add_argument('--promote', type=int, metavar='VERSIONCODE',
                   help='vorhandenen versionCode weiter ausrollen (ohne Upload)')
    p.add_argument('--fraction', type=float, help='Anteil der Nutzer, z. B. 0.2')
    p.add_argument('--complete', action='store_true', help='an alle ausrollen')
    p.add_argument('--notes', default='', help='Was-ist-neu-Text (de-DE)')
    p.add_argument('--status', action='store_true', help='nur den Track anzeigen')
    p.add_argument('--abos', action='store_true',
                   help='Play-Abos anzeigen: Basis-Tarife, Zustand, Preise (liest nur)')
    p.add_argument('--abo-setzen', metavar='PRODUKT',
                   help='Abo aendern, z. B. mypeak_premium_monthly')
    p.add_argument('--abo-preise', metavar='TARIF=BETRAG,...',
                   help='EUR-Preise je Basis-Tarif, z. B. monthly=4,99;annual=44,99')
    p.add_argument('--abo-titel', metavar='TEXT',
                   help='Anzeigename des Abos in --lang')
    p.add_argument('--screenshots', metavar='VERZEICHNIS',
                   help='Store-Eintrag-Screenshots ersetzen (z. B. store-assets/android)')
    p.add_argument('--listing', metavar='JSON',
                   help='Titel/Beschreibung setzen (z. B. store-assets/play-listing.de-DE.json)')
    p.add_argument('--icon', metavar='PNG',
                   help='App-Symbol im Store-Eintrag ersetzen (512x512)')
    p.add_argument('--feature', metavar='PNG',
                   help='Vorstellungsgrafik ersetzen (1024x500)')
    p.add_argument('--website', metavar='URL',
                   help='Website im Play-Eintrag setzen (contactWebsite, fuer app-ads.txt)')
    p.add_argument('--standardsprache', metavar='LOCALE',
                   help='Standardsprache des Eintrags setzen, z. B. en-US')
    p.add_argument('--lang', default='de-DE', help='Sprache des Eintrags (Standard: de-DE)')
    p.add_argument('--dry-run', action='store_true',
                   help='nur auflisten, nichts hochladen — das Listing ist oeffentlich')
    p.add_argument('--track', default='production',
                   choices=['production', 'beta', 'alpha', 'internal'],
                   help='Play-Track (Standard: production)')
    a = p.parse_args()

    if not (a.aab or a.promote or a.status or a.abos or a.abo_setzen or a.screenshots
            or a.listing or a.icon or a.feature or a.website or a.standardsprache):
        p.error('--aab, --promote, --status, --abos, --screenshots, --listing, '
                '--icon, --feature oder --website angeben')
    if a.aab and not a.complete and a.fraction is None:
        p.error('--fraction 0.2 oder --complete angeben')

    tok = token()
    if a.abos:
        return zeige_abos(tok)
    if a.abo_setzen:
        preise = None
        if a.abo_preise:
            preise = dict(teil.split('=', 1)
                          for teil in a.abo_preise.split(';') if teil)
        return setze_abo(tok, a.abo_setzen, preise, a.abo_titel, a.lang, a.dry_run)
    if a.status:
        return zeige_status(tok, a.track)
    if a.screenshots:
        return lade_screenshots(tok, a.screenshots, a.lang, a.dry_run)
    if a.listing:
        return setze_listing(tok, a.listing, a.lang, a.dry_run)
    if a.website:
        return setze_website(tok, a.website, a.dry_run)
    if a.standardsprache:
        return setze_standardsprache(tok, a.standardsprache, a.dry_run)
    if a.icon:
        return lade_einzelbild(tok, a.icon, a.lang, 'icon', a.dry_run)
    if a.feature:
        return lade_einzelbild(tok, a.feature, a.lang, 'featureGraphic', a.dry_run)

    eid = call(tok, 'POST', f'{API}/applications/{PKG}/edits')['id']
    print(f'Edit {eid} geöffnet')

    vc = a.promote
    if a.aab:
        with open(a.aab, 'rb') as fh:
            blob = fh.read()
        print(f'Lade {a.aab} hoch ({len(blob) / 1e6:.1f} MB) …')
        res = call(tok, 'POST', f'{UPLOAD}/applications/{PKG}/edits/{eid}/bundles?uploadType=media',
                   data=blob, ctype='application/octet-stream')
        vc = res['versionCode']
        print(f'  hochgeladen als versionCode {vc}')

    release = {'name': f'{vc}', 'versionCodes': [str(vc)]}
    if a.complete:
        release['status'] = 'completed'
    else:
        release['status'] = 'inProgress'
        release['userFraction'] = a.fraction
    if a.notes:
        release['releaseNotes'] = [{'language': 'de-DE', 'text': a.notes}]

    call(tok, 'PUT', f'{API}/applications/{PKG}/edits/{eid}/tracks/{a.track}',
         data={'track': a.track, 'releases': [release]})
    ziel = 'alle Nutzer' if a.complete else f'{a.fraction * 100:.0f} % der Nutzer'
    print(f'Track {a.track} gesetzt: versionCode {vc} an {ziel}')

    # Ueber den Helfer: steht die App unter Richtlinienpruefung, wuerde ein
    # direkter Abschluss die ganze Hochlade-Arbeit verwerfen.
    commit_edit(tok, eid)


if __name__ == '__main__':
    main()
