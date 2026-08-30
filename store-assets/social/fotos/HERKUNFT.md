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

## Tabelle

| Datei | Quelle | Modell / Prompt | Datum | Kosten | KI-Menschen? |
|---|---|---|---|---|---|
| — | — | — | — | — | — |
