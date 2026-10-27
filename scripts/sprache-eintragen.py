#!/usr/bin/env python3
"""Eine fertig übersetzte Sprache überall eintragen.

    python3 scripts/sprache-eintragen.py it <schnipsel-ordner> [--tabellen datei.json]

Vorher müssen die eigenen Dateien der Sprache liegen:
src/i18n/locales/<c>.json, src/data/<c>/*.js (9 Pakete),
src/pages/legal/uebersetzungen/<c>.js und store-assets/play-listing.<locale>.json.

Das Skript fasst die GEMEINSAMEN Dateien an, je an genau einer Stelle:
Sprachlisten (App, API, Prüf- und Store-Skripte), Paket-Lader, Prompt-
Tabellen, Store-Texte und Tests. Die Schnipsel-Dateien kommen von den
Übersetzern (coach.txt, mahlzeit.txt, rahmen.txt, grafik.txt,
screenshots.txt, asc_*.txt, store_texte.md). Der Code steht schon fertig
eingerückt darin; hier wird nur eingefügt.

Bricht ab, statt zu raten: Findet es eine Ankerstelle nicht oder ist die
Sprache dort schon eingetragen, sagt es das und lässt die Datei in Ruhe.
Danach immer: npm test, node scripts/pruefe-sprachen.mjs, pruefe-inhalte.mjs.
"""
import json
import re
import subprocess
import sys
from pathlib import Path

WURZEL = Path(__file__).resolve().parent.parent

# code: (Eigenname, Play-Locale, BCP47 für Datum/Browser, Antwortsatz im Coach-Prompt)
SPRACHEN = {
    'it': ('Italiano', 'it-IT', 'it-IT', 'Rispondi in italiano'),
    'nl': ('Nederlands', 'nl-NL', 'nl-NL', 'Antwoord in het Nederlands'),
    'pl': ('Polski', 'pl-PL', 'pl-PL', 'Odpowiadaj po polsku'),
    'tr': ('Türkçe', 'tr-TR', 'tr-TR', 'Türkçe yanıt ver'),
    'ja': ('日本語', 'ja-JP', 'ja-JP', '日本語で回答'),
    'ko': ('한국어', 'ko-KR', 'ko-KR', '한국어로 답변'),
    'zh': ('中文', 'zh-CN', 'zh-CN', '用中文回答'),
}

BEREICHE = [('peptides', 'peptide'), ('diets', 'diaeten'), ('training', 'training'),
            ('nutrition', 'ernaehrung'), ('supplements', 'supplemente'),
            ('bloodwork', 'blutwerte'), ('recipes', 'rezepte'), ('programs', 'programme'),
            ('foods', 'lebensmittel')]

geaendert = []


def datei(rel):
    return WURZEL / rel


def schreiben(rel, alt, neu):
    if alt == neu:
        return
    datei(rel).write_text(neu)
    geaendert.append(rel)


def vor_ende(rel, anker, block, schon):
    """Block vor die schließende Klammer des Objekts nach `anker` setzen."""
    text = datei(rel).read_text()
    zeilen = text.split('\n')
    try:
        start = next(i for i, z in enumerate(zeilen) if z.startswith(anker))
    except StopIteration:
        sys.exit(f'{rel}: Anker {anker!r} nicht gefunden')
    ende = next(i for i in range(start + 1, len(zeilen)) if re.match(r'^[}\]]', zeilen[i]))
    if re.search(schon, '\n'.join(zeilen[start:ende]), re.M):
        print(f'  {rel} [{anker}]: schon eingetragen')
        return
    zeilen[ende:ende] = block.rstrip('\n').split('\n')
    schreiben(rel, text, '\n'.join(zeilen))


def ersetzen(rel, muster, ersatz, schon=None):
    text = datei(rel).read_text()
    if schon and re.search(schon, text, re.M):
        print(f'  {rel}: schon eingetragen')
        return
    neu, n = re.subn(muster, ersatz, text, count=1, flags=re.M)
    if n != 1:
        sys.exit(f'{rel}: Muster nicht gefunden: {muster}')
    schreiben(rel, text, neu)


def schnipsel(ordner, name):
    p = Path(ordner) / name
    if not p.exists():
        sys.exit(f'Schnipsel fehlt: {p}')
    return p.read_text()


def main():
    if len(sys.argv) < 3 or sys.argv[1] not in SPRACHEN:
        sys.exit(__doc__)
    c, ordner = sys.argv[1], sys.argv[2]
    tabellen = sys.argv[sys.argv.index('--tabellen') + 1] if '--tabellen' in sys.argv else None
    eigen, play, bcp, satz = SPRACHEN[c]

    # Vorbedingung: die eigenen Dateien der Sprache
    noetig = [f'src/i18n/locales/{c}.json', f'src/pages/legal/uebersetzungen/{c}.js',
              f'store-assets/play-listing.{play}.json'] + [f'src/data/{c}/{d}.js' for _, d in BEREICHE]
    fehlt = [n for n in noetig if not datei(n).exists()]
    if fehlt:
        sys.exit('Es fehlen noch: ' + ', '.join(fehlt))

    q = f"'{c}'"
    # ── Sprachlisten ──
    for rel in ('src/lib/sprache.js', 'api/_sprache.js'):
        ersetzen(rel, r"^(export const SPRACHEN = \[[^\]]*)\];", rf"\1, {q}];",
                 schon=rf"^export const SPRACHEN = \[[^\]]*{q}")
    vor_ende('src/lib/sprache.js', 'export const SPRACHNAMEN = {', f"  {c}: '{eigen}',", rf"^\s*{c}:")

    # ── Paket-Lader ──
    lader = '\n'.join([f'  {c}: {{'] + [f"    {b}: () => import('./{c}/{d}.js')," for b, d in BEREICHE] + ['  },'])
    vor_ende('src/data/uebersetzungen.js', 'const PAKETE = {', lader, rf"^\s*{c}: \{{")
    vor_ende('src/pages/legal/uebersetzungen/index.js', 'const PAKETE = {',
             f"  {c}: () => import('./{c}.js'),", rf"^\s*{c}:")

    # ── Prompts ──
    vor_ende('api/coach.js', 'const PROMPTS = {', schnipsel(ordner, 'coach.txt'), rf"^\s*{c}: \{{")
    vor_ende('api/analyze-meal.js', 'const MAHLZEIT = {', schnipsel(ordner, 'mahlzeit.txt'), rf"^\s*{c}: \{{")

    # ── Store-Skripte ──
    vor_ende('scripts/store-rahmen.mjs', 'const TEXTE = {', schnipsel(ordner, 'rahmen.txt'), rf"^\s*{c}: \{{")
    vor_ende('scripts/render-store-graphics.py', 'FEATURE_TEXTE = {', schnipsel(ordner, 'grafik.txt'), rf'^\s*"{c}":')
    shots = schnipsel(ordner, 'screenshots.txt')
    teile = re.split(r'^// *(SPEISEN|PRAEPARATE):?\s*$', shots, flags=re.M)
    bloecke = dict(zip(teile[1::2], teile[2::2]))
    for name in ('SPEISEN', 'PRAEPARATE'):
        if name not in bloecke:
            sys.exit(f'screenshots.txt: Block {name} fehlt')
        vor_ende('scripts/store-screenshots.mjs', f'const {name} = {{', bloecke[name].strip('\n'), rf"^\s*{c}:")
    ersetzen('scripts/store-screenshots.mjs', r"^((?:export )?const SPRACHEN = \[[^\]]*)\];", rf"\1, {q}];",
             schon=rf"^(?:export )?const SPRACHEN = \[[^\]]*{q}")
    ersetzen('scripts/store-screenshots.mjs', r"^(const BROWSER_LOCALE = \{[^}]*) \};",
             rf"\1, {c}: '{bcp}' }};", schon=rf"^const BROWSER_LOCALE = \{{[^}}]*\b{c}:")

    # ── App Store ──
    vor_ende('scripts/asc.py', 'SPRACHEN = {', schnipsel(ordner, 'asc_sprachen.txt'), rf"'{play}'|'{c}':")
    vor_ende('scripts/asc.py', 'ABO_BLOECKE = {', schnipsel(ordner, 'asc_abo.txt'), rf"^\s*'{c}':")
    vor_ende('scripts/asc.py', 'WHATS_NEW_SPRACHEN = {', schnipsel(ordner, 'asc_whatsnew.txt'), rf"^\s*'{c}':")
    md = 'store-assets/store-texte.md'
    text = datei(md).read_text()
    abschnitt = schnipsel(ordner, 'store_texte.md').strip('\n')
    kopf = abschnitt.split('\n', 1)[0]
    if kopf in text:
        print(f'  {md}: schon eingetragen')
    else:
        i = text.index('\n## 3. ')
        schreiben(md, text, text[:i].rstrip('\n') + '\n\n' + abschnitt + '\n\n---\n' + text[i:])

    # ── Tests ──
    t = 'tests/api/sprache.test.js'
    ersetzen(t, r"(for \(const code of \['de', 'en', [^\]]*?)('de-AT')", rf"\1{q}, \2", schon=rf"for \(const code of \[[^\]]*{q}")
    ersetzen(t, r"it\.each\(\[('es'[^\]]*)\]\)\('verlangt", rf"it.each([\1, {q}])('verlangt",
             schon=rf"it\.each\(\[[^\]]*{q}\]\)\('verlangt")
    t = 'tests/api/coach.test.js'
    ersetzen(t, r"(\['ar', 'أجب بالعربية'\],\n(?:      \[[^\n]*\],\n)*)", rf"\1      [{q}, '{satz}'],\n",
             schon=rf"\[{q}, '")
    ersetzen(t, r"it\.each\(\[('es'[^\]]*)\]\)\('hängt", rf"it.each([\1, {q}])('hängt",
             schon=rf"it\.each\(\[[^\]]*{q}\]\)\('hängt")

    # ── Beschriftungstabellen ──
    if tabellen:
        subprocess.run(['node', str(WURZEL / 'scripts/sprachtabellen.mjs'), 'import', c, tabellen], check=True)

    print(f'\n{c} eingetragen in:')
    for g in dict.fromkeys(geaendert):
        print('  ', g)


if __name__ == '__main__':
    main()
