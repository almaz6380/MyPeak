#!/usr/bin/env python3
# Provisioning-Profil zur Bauzeit frisch von der App-Store-Connect-API holen.
#
# Warum nicht mehr das Profil aus dem GitHub-Secret: Sobald an einer Bundle-ID
# eine Faehigkeit dazukommt (App Group fuers Widget, spaeter HealthKit), erklaert
# Apple alle bestehenden Profile dieser ID fuer INVALID — das statische Secret
# waere ab da bei jedem Lauf tot, und niemand kann Secrets aus einer
# Claude-Sitzung heraus erneuern. Dieses Skript holt je Bundle-ID das Profil
# mit dem erwarteten Namen; ist es ungueltig oder fehlt es, wird es geloescht
# und neu angelegt (Profile sind bei Apple nicht aenderbar, nur ersetzbar).
#
# Es kann auch die Bundle-ID selbst anlegen (--bundle-anlegen), fuer die
# Widget-Extension. ⚠ App Groups ANLEGEN oder ZUORDNEN kann die API NICHT
# (gepr. 01.09.2026, Apple-Forum bestaetigt) — das ist der eine Handgriff im
# Developer-Portal, ohne den das Widget-Profil die application-groups-
# Berechtigung nicht enthaelt und codesign abbricht.
#
# Env: ASC_KEY_ID, ASC_ISSUER_ID, ASC_KEY_P8 (Inhalt der .p8).
# Braucht: pyjwt, cryptography (der Workflow installiert beide in eine venv).
import argparse
import base64
import json
import os
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

import jwt

API = 'https://api.appstoreconnect.apple.com'


def token():
    key_id = os.environ['ASC_KEY_ID']
    issuer = os.environ['ASC_ISSUER_ID']
    p8 = os.environ['ASC_KEY_P8']
    now = int(time.time())
    return jwt.encode(
        {'iss': issuer, 'iat': now, 'exp': now + 900, 'aud': 'appstoreconnect-v1'},
        p8, algorithm='ES256', headers={'kid': key_id})


def call(tok, method, path, data=None):
    req = urllib.request.Request(API + path, method=method)
    req.add_header('Authorization', f'Bearer {tok}')
    body = None
    if data is not None:
        req.add_header('Content-Type', 'application/json')
        body = json.dumps(data).encode()
    try:
        with urllib.request.urlopen(req, body, timeout=60) as r:
            raw = r.read()
            return json.loads(raw) if raw else {}
    except urllib.error.HTTPError as e:
        detail = e.read().decode(errors='replace')[:600]
        raise SystemExit(f'ASC {method} {path} -> {e.code}: {detail}')


def bundle_id_resource(tok, identifier, anlegen_name=None):
    res = call(tok, 'GET', f'/v1/bundleIds?filter[identifier]={identifier}&limit=5')
    # Der Filter matcht auch Praefixe (at.gallab.mypeak findet .widget mit) —
    # deshalb exakt nachvergleichen.
    for d in res.get('data', []):
        if d['attributes']['identifier'] == identifier:
            return d['id']
    if not anlegen_name:
        raise SystemExit(f'Bundle-ID {identifier} existiert nicht (und --bundle-anlegen fehlt).')
    print(f'Bundle-ID {identifier} fehlt — lege sie an ("{anlegen_name}") …')
    res = call(tok, 'POST', '/v1/bundleIds', {'data': {
        'type': 'bundleIds',
        'attributes': {'identifier': identifier, 'name': anlegen_name, 'platform': 'IOS'},
    }})
    return res['data']['id']


def faehigkeit_einschalten(tok, bundle_resource_id, typ):
    # Einfache Faehigkeiten (HEALTHKIT, APP_GROUPS) lassen sich per API an der
    # Bundle-ID einschalten. Schon vorhanden ⇒ Apple antwortet mit einem
    # Konflikt/Fehler — der ist hier bewusst kein Abbruch.
    try:
        call(tok, 'POST', '/v1/bundleIdCapabilities', {'data': {
            'type': 'bundleIdCapabilities',
            'attributes': {'capabilityType': typ},
            'relationships': {'bundleId': {'data': {'type': 'bundleIds', 'id': bundle_resource_id}}},
        }})
        print(f'Faehigkeit {typ} eingeschaltet.')
    except SystemExit as e:
        print(f'Faehigkeit {typ}: {e} — vermutlich schon vorhanden, weiter.')


def zertifikate(tok):
    # Beide Distribution-Sorten: "Apple Distribution" (neu) und
    # "iPhone Distribution" (alt) — das Profil nimmt alle, signiert wird mit
    # dem, das als Secret im Schluesselbund liegt.
    ids = []
    for typ in ('DISTRIBUTION', 'IOS_DISTRIBUTION'):
        res = call(tok, 'GET', f'/v1/certificates?filter[certificateType]={typ}&limit=20')
        ids += [d['id'] for d in res.get('data', [])]
    if not ids:
        raise SystemExit('Kein Distribution-Zertifikat im Konto.')
    return sorted(set(ids))


def main():
    p = argparse.ArgumentParser()
    p.add_argument('--bundle', required=True, help='Bundle-ID, z. B. at.gallab.mypeak')
    p.add_argument('--name', required=True, help='Profilname, z. B. "MyPeak AppStore"')
    p.add_argument('--out', required=True, help='Zieldatei (.mobileprovision)')
    p.add_argument('--bundle-anlegen', default=None,
                   help='Anzeigename: Bundle-ID bei Apple anlegen, falls sie fehlt')
    p.add_argument('--faehigkeit', action='append', default=[],
                   help='Capability-Typ an der Bundle-ID sicherstellen (z. B. HEALTHKIT, APP_GROUPS); mehrfach erlaubt')
    a = p.parse_args()

    tok = token()
    bid = bundle_id_resource(tok, a.bundle, a.bundle_anlegen)
    for typ in a.faehigkeit:
        faehigkeit_einschalten(tok, bid, typ)

    von_name = call(tok, 'GET', f'/v1/profiles?filter[name]={urllib.parse.quote(a.name)}&limit=5')
    for d in von_name.get('data', []):
        if d['attributes']['name'] != a.name:
            continue
        if d['attributes']['profileState'] == 'ACTIVE':
            print(f'Profil "{a.name}" ist ACTIVE — verwende es unveraendert.')
            inhalt = d['attributes']['profileContent']
            open(a.out, 'wb').write(base64.b64decode(inhalt))
            return
        print(f'Profil "{a.name}" ist {d["attributes"]["profileState"]} — loesche und ersetze es.')
        call(tok, 'DELETE', f'/v1/profiles/{d["id"]}')

    print(f'Lege Profil "{a.name}" fuer {a.bundle} neu an …')
    res = call(tok, 'POST', '/v1/profiles', {'data': {
        'type': 'profiles',
        'attributes': {'name': a.name, 'profileType': 'IOS_APP_STORE'},
        'relationships': {
            'bundleId': {'data': {'type': 'bundleIds', 'id': bid}},
            'certificates': {'data': [{'type': 'certificates', 'id': c} for c in zertifikate(tok)]},
        },
    }})
    inhalt = res['data']['attributes']['profileContent']
    open(a.out, 'wb').write(base64.b64decode(inhalt))
    print(f'Geschrieben: {a.out}')


if __name__ == '__main__':
    main()
