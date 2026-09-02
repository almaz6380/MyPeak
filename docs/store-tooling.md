# Store-Eintrag pflegen — Texte, Screenshots, Grafiken

Beides läuft über GitHub, nicht über einen Rechner: Die Zugänge liegen als
Repository-Secrets, die Skripte holen sie sich dort. Damit lässt sich der
Store-Eintrag auch vom Handy aus ändern.

**App:** `at.gallab.mypeak`

## Google Play

Workflow **„Play-Eintrag aktualisieren"** (Actions → Run workflow). Drei Modi,
Trockenlauf ist Vorgabe:

| Modus | ändert | erwartet die Dateien unter |
|---|---|---|
| `texte` | Titel, Kurz- und Volltext | `store-assets/play-listing.<lang>.json` |
| `screenshots` | Telefon-Bilder (ersetzt alle) | `store-assets/android/` |
| `grafiken` | App-Symbol + Vorstellungsgrafik | s. Workflow-Datei |

**Die Eingabe `lang` wählt die Datei.** Vorhanden sind `de-DE`, `es-ES`,
`fr-FR`, `pt-BR` und `ar` — jede Sprache braucht einen eigenen Lauf, Play kennt
keinen Sammelupload. Für Lateinamerika lässt sich `es-419` mit derselben Datei
bespielen (der spanische Text ist neutral gehalten).

⚠️ **Vorher `node scripts/pruefe-store-texte.mjs` laufen lassen.** Play weist zu
lange Felder ab, statt sie zu kürzen — und zwar am Ende eines Laufs, der bis
dahin Minuten gebraucht hat. Das Skript zählt Unicode-Zeichen (nicht Bytes,
sonst wäre jedes arabische Feld rechnerisch dreimal zu lang), prüft beide
Store-Quellen und warnt schon ab 95 % der Grenze.

⚠️ **Ein englischer Play-Eintrag fehlt als Datei.** Der englische Volltext steht
nur in `store-assets/store-texte.md`; wer ihn per API setzen will, braucht
zuerst ein `play-listing.en-US.json`.

Dahinter steckt `scripts/play-upload.py`; dasselbe Skript lädt auch das AAB
hoch. Direkt aufrufbar mit `--status`, `--listing`, `--screenshots`, `--icon`,
`--feature`, jeweils mit `--dry-run` und `--lang`.

⚠️ **`screenshots` löscht zuerst alle vorhandenen Bilder der Sprache** und lädt
dann den Ordnerinhalt in Dateinamen-Reihenfolge hoch. Ein unvollständiger Ordner
führt also zu einem unvollständigen Store-Eintrag.

## App Store Connect

Workflow **„App Store Connect"**, ebenfalls mit Trockenlauf als Vorgabe. Die
ASC-API braucht keinen Mac — der Lauf ist in Sekunden durch.

| Modus | tut |
|---|---|
| `status` | liest nur: Version, Build, Zustand |
| `warum` | liest nur: was blockiert die Einreichung? |
| `einreichungen` | liest nur: alle Einreichungen samt Zustand |
| `screenshots` | Bilder ersetzen (aus `store-assets/ios/`) |
| `build` | einen Build der offenen Version zuweisen |
| `aufraeumen` | festhängende Einreichungen zurückziehen |
| `exportfrage` | Exportbestimmungen am Build beantworten |
| `einreichen` | Version zur Prüfung schicken |

⚠️ **Apple sperrt die Metadaten, solange eine Prüfung läuft.** Änderungen gehen
nur, wenn die Version `PREPARE_FOR_SUBMISSION` oder `DEVELOPER_REJECTED` ist —
sonst antwortet die API mit 409. `status` sagt dir, woran du bist.

## Was bewusst gesperrt ist

`scripts/asc.py` stammt aus MyPeak und trägt dort fest verdrahtete Texte
(Store-Namen, Prüferhinweise, Abo-Bezeichnungen). (Store-Namen, Prueferhinweise, Abo-Bezeichnungen). Sie sind hier **aktiv** —
in den Kopien der anderen Apps dagegen gesperrt, damit dort nicht versehentlich
FullRep-Texte landen:

    --name  --pruefnotiz  --abo-screenshot  --abo-namen  --abo-notiz

## Screenshots erzeugen

Die Bilder selbst entstehen nicht hier, sondern aus der laufenden App. Dafuer gibt es hier `scripts/store-screenshots.mjs` (Playwright gegen `vite preview`,
seedet einen realistischen Zustand und fotografiert die Bildschirme in
Store-Auflösung). Dieses Skript ist die Vorlage fuer die anderen Apps; dort muessen Routen
und Beispieldaten einmal angepasst werden.
