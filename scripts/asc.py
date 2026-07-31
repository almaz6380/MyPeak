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
"""
import argparse
import json
import os
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

API = 'https://api.appstoreconnect.apple.com/v1'
BUNDLE = os.environ.get('ASC_BUNDLE_ID') or 'at.gallab.mypeak'


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


def app_id(tok):
    res = api(tok, f'apps?filter[bundleId]={urllib.parse.quote(BUNDLE)}')
    if not res.get('data'):
        sys.exit(f'Keine App mit Bundle-ID {BUNDLE} gefunden.')
    app = res['data'][0]
    print(f'App: {app["attributes"]["name"]}  ({BUNDLE}, id {app["id"]})')
    return app['id']


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
    p = argparse.ArgumentParser()
    p.add_argument('--status', action='store_true',
                   help='Zeigt Name, Versionen, Builds, Abos, Screenshots')
    a = p.parse_args()
    if not a.status:
        p.error('--status angeben')
    zeige_status(token())


if __name__ == '__main__':
    main()
