# Herkunft der Bilder in diesem Ordner

**Der Ordner ist absichtlich leer.** Hier liegt nur diese Datei.

## Warum er existiert

Die Social-Posts von FullRep zogen bis zum 30.08.2026 ihre Fotos aus
`public/exercise-demos/` — dem Bestand der App. Bei der Frage „darf ich die
Bilder verwenden?" kam heraus, dass niemand die Rechtekette belegen kann:

| Geprueft | Ergebnis |
|---|---|
| `yuhonas/free-exercise-db` | `LICENSE.md` = Unlicense. Kein Wort zur Herkunft der **Fotos** |
| `wrkout/exercises.json` (die Quelle davor) | ebenfalls Unlicense, ebenfalls kein Fotograf, keine Quelle |
| Die Dateien selbst | 480×320, progressives JPEG, **EXIF ohne Copyright-Feld** — der Fussabdruck eines Web-Scrapes |
| Issue #2 „License of Images?" | genau diese Frage — seit Jahren unbeantwortet |
| Issue #12 „Enquiry regarding the license status of the images" | dieselbe Frage, Jahre spaeter — ebenfalls unbeantwortet |

Die Unlicense ist die Erklaerung eines **Weiterverteilers**, keine dokumentierte
Rechtekette. Sie uebertraegt keine Rechte, die der Erklaerende nie hatte.

**Trennung nach Nutzungsart:**

- **In der App bleiben die Fotos.** Sie sind seit dem Launch drin, 162 Ordner;
  sie auszutauschen ist ein eigenes Projekt. Das Risiko dort ist ein
  bestehendes, kein neues.
- **In Werbung nicht.** Social Media ist kommerzielle Bewerbung auf Meta- und
  TikTok-Reichweite, mit automatischer Bilderkennung auf der Gegenseite. Genau
  dort waere eine Beschwerde am teuersten — und der einzige Beleg waere die
  Erklaerung eines Dritten, der die Frage selbst nicht beantwortet.

Das ist ein Befund, keine Rechtsberatung.

## Was heute passiert

`FOTO_BEREICHE` in `scripts/social-daten.mjs` ist leer. Alle Karten und Reels
laufen rein typografisch (Stile `mix`, `poster`, `zahl`) — genau wie bei
Anigosha. **Es faellt dadurch kein Post aus, es fehlt nur das Foto.**

## Wenn dieser Ordner gefuellt wird

`trainingsFoto()` liest jede `.jpg`, `.jpeg`, `.png` oder `.webp` hier drin.
Damit die Sache nicht in zwei Jahren wieder ungeklaert dasteht, gilt:

1. **Je Datei ein Eintrag in der Tabelle unten.** Ohne Eintrag gilt ein Bild
   als ungeklaert und gehoert geloescht — nicht gepostet.
2. **`FOTO_BEREICHE` in `scripts/social-daten.mjs` wieder auf
   `['training','supplements']` setzen.** Ohne das bleiben die Posts
   typografisch, auch wenn hier Bilder liegen.
3. **Zeigt ein Bild KI-erzeugte MENSCHEN, muss der Generator mit `--ki`
   laufen.** Die Leitplanke `ki-wasserzeichen` in
   `anigosha/tools/social/vorflug.mjs` verwirft den Post sonst. Das ist Josefs
   Regel vom 29.08.2026 und deckt sich mit dem, was Meta und TikTok fuer
   realistische KI-Inhalte verlangen sowie mit Art. 50 des EU AI Act.
   ⚠ Ein **echtes** Foto zu kennzeichnen waere genauso falsch wie ein KI-Bild
   nicht zu kennzeichnen.

## ⚠ Jedes Bild muss von Auge auf erfundene Marken geprueft werden

Der Prompt sagt ausdruecklich `no text, no logos, no watermarks`. **Das Modell
haelt sich nicht daran.** Im Testlauf vom 30.08.2026:

- `probe/probe-langhantel-kniebeuge-dev.jpg` — deutliche **Nike-Swooshes** auf
  beiden Schuhen.
- `probe/probe-cardio-lauf-dev.jpg` — ein erfundenes Logo auf dem Trikot und
  eine Krakelschrift auf dem Laufband.

Ein fremdes Markenzeichen in einem Werbebild ist ein Markenrechtsproblem —
genau die Sorte Aerger, wegen der die Uebungsfotos ueberhaupt erst aussortiert
wurden. Es waere absurd, sie durch selbsterzeugte Bilder mit fremden Logos zu
ersetzen.

**Regel: Vor der Aufnahme in den Bestand jedes Bild in voller Groesse ansehen.**
Schuhe, Trikots, Geraetefronten und Waende sind die Stellen, an denen Logos und
Pseudo-Schrift auftauchen. Ein Bild mit fremdem Zeichen wird verworfen, nicht
retuschiert — ein neuer Seed kostet 2,5 Cent.

## Was der Testlauf sonst ergeben hat

| | `flux/dev` | `flux/schnell` |
|---|---|---|
| Koerper und Anatomie | durchweg brauchbar | patzt sichtbar (verschmolzene Hantel am Kopf, verschmierte Nebenfigur) |
| Licht | trifft das Marken-Amber | harte Fremdfarben (roter Balken quer im Bild) |
| Preis je Bild | $0,025 | $0,003 |

Der Aufpreis von 2,2 Cent je Bild ist die einzige Zahl, die hier zaehlt — bei
24 Bildern sind das 53 Cent Unterschied. `dev` ist die Wahl.

## Tabelle

| Datei | Quelle | Modell / Prompt | Datum | Kosten | KI-Menschen? |
|---|---|---|---|---|---|
| `probe/probe-hantel-schulterdruecken-dev.jpg` | fal.ai | `fal-ai/flux/dev`, Seed 4200 | 2026-08-30 | $0.025 | **ja** |
| `probe/probe-hantel-schulterdruecken-schnell.jpg` | fal.ai | `fal-ai/flux/schnell`, Seed 4200 | 2026-08-30 | $0.003 | **ja** |
| `probe/probe-langhantel-kniebeuge-dev.jpg` | fal.ai | `fal-ai/flux/dev`, Seed 4201 | 2026-08-30 | $0.025 | **ja** |
| `probe/probe-langhantel-kniebeuge-schnell.jpg` | fal.ai | `fal-ai/flux/schnell`, Seed 4201 | 2026-08-30 | $0.003 | **ja** |
| `probe/probe-cardio-lauf-dev.jpg` | fal.ai | `fal-ai/flux/dev`, Seed 4202 | 2026-08-30 | $0.025 | **ja** |
| `probe/probe-cardio-lauf-schnell.jpg` | fal.ai | `fal-ai/flux/schnell`, Seed 4202 | 2026-08-30 | $0.003 | **ja** |
| `probe/probe-protein-mahlzeit-dev.jpg` | fal.ai | `fal-ai/flux/dev`, Seed 4203 | 2026-08-30 | $0.025 | nein (Essen) |
| `probe/probe-protein-mahlzeit-schnell.jpg` | fal.ai | `fal-ai/flux/schnell`, Seed 4203 | 2026-08-30 | $0.003 | nein (Essen) |
