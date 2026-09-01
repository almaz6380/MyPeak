# Beleg: Gratis-Animationspaket von Vital Animations

**Gesichert am 01.09.2026** auf Josefs Wunsch. Es liegen ZWEI Belege vor, die
sich gegenseitig stuetzen: das Bildschirmfoto und die Quelle, die es zeigt.

## Was gesichert ist

### `screenshot-github-2026-09-01.png`

Josefs Bildschirmfoto der GitHub-Seite, 1913x1043, PNG.
SHA-256 `3e87b68cb58534546eef4f1720f21f0b41a471f1acd4ce10166b8aff59d98260`.

⚠ **Woher die Datei kommt, gehoert dazu:** Das Bild kam als eingebettetes Bild
in den Chat und lag nicht im Upload-Ordner. Es wurde aus dem Sitzungsprotokoll
(`~/.claude/projects/.../<sitzung>.jsonl`) wiederhergestellt — dort liegen
eingefuegte Bilder als Base64. Ein erster Versuch, nur im Upload-Ordner zu
suchen, ging deshalb ins Leere. **Fuer kuenftige Faelle: eingefuegte Bilder
sind im Sitzungsprotokoll, nicht unter `uploads/`.**

Im Bild lesbar: Adresszeile `github.com/exercisedb-pro/exercisedb-dataset`,
Commit `3652538 · 3 weeks ago`, 71 Commits, 49 Sterne, und der Abschnitt
„🎁 Free Exercise Animations for Developers" mit beiden Kernsaetzen.
Datum und Uhrzeit der Aufnahme unten rechts: 01.09.2026, 13:54.

### `README-github-2026-09-01.md`

`README-github-2026-09-01.md` — wortgleiche Kopie des README aus

    https://github.com/exercisedb-pro/exercisedb-dataset

| | |
|---|---|
| Commit | `36525388e100765cf4a1341fb2ea2ec057c1299b` |
| Kurzform | `3652538` — **stimmt mit dem Bildschirmfoto ueberein** |
| Groesse | 12.126 Bytes |
| SHA-256 | `d63272fe7acc99c22799599f92aa6a07b915dc2ec03772cce4c9265e2349591f` |
| Abgerufen | 01.09.2026, 11:55 UTC, ueber raw.githubusercontent.com |

## Die entscheidenden Saetze (Abschnitt „🎁 Free Exercise Animations for Developers")

> **Free HD workout animations** for developers building fitness apps — no
> trial, no signup, no strings attached.

> A starter set of **HD 1080p exercise animations + structured JSON metadata**,
> using the same schema as the full Vital Animations dataset. **Free to use in
> your own projects under the same commercial license terms as the paid
> packages.**

Enthalten laut README: HD-MP4-Animationen, JSON-Daten (`exerciseId`, Muskeln,
Geraet, Schwierigkeit, Anleitung), Sofort-Download als ZIP.
Bezugsstelle: https://vitalanimations.com/free-pack

## Warum das zaehlt

Der Satz verknuepft das Gratis-Paket ausdruecklich mit **denselben
kommerziellen Lizenzbedingungen wie die Kaufpakete**. Die EULA (Fassung
2026.1) erlaubt darunter in § 4 unter anderem: Nutzung in mobilen
Anwendungen, Ablegen der Dateien IN der App („store the Assets offline inside
your application"), Selbst-Hosten, Umkodieren und Verkleinern, Herausziehen
von Einzelbildern — und ausdruecklich auch Marketing- und Social-Media-Nutzung.

⚠ Die EULA selbst knuepft den Lizenzgewaehr-Satz in § 3 an „successful
payment". Der Widerspruch dazu wird durch dieses README aufgeloest, das der
Anbieter selbst veroeffentlicht. **Deshalb ist genau dieser Beleg wichtig** —
und deshalb liegt er hier statt nur im Chatverlauf.

## Auflagen, die auch fuer das Gratis-Paket gelten (EULA § 5)

- Assets duerfen **nicht absichtlich als einzelne Dateien zum Download**
  angeboten werden → kein Download-Knopf, keine Verzeichnisauflistung, nirgends
  direkt verlinken. Auslieferung durch die App selbst ist erlaubt.
- Kein Weiterverkauf, keine Weitergabe der Rohdateien, kein Hochladen auf
  Asset-Marktplaetze.
- Mitgelieferte Copyright- oder Lizenzhinweise muessen erhalten bleiben.
- Kein Eigentumsanspruch.

## Offen

Wie viele Uebungen im Gratis-Paket stecken, steht nirgends — das README sagt
nur „a starter set". Die Zahl klaert sich erst mit der ZIP.

---

## Das Gratis-Paket, gemessen (01.09.2026)

Josef hat die JSON aus dem Gratis-ZIP geliefert:
`free-pack-50gymworkouts.json`, 50 Uebungen.

⚠ **Die JSON enthaelt KEINE Animationen** — nur Metadaten (`bodyPart`,
`equipment`, `id`, `name`, `target`, `secondaryMuscles`, `instructions`,
`description`, `difficulty`, `category`). Kein einziges Feld verweist auf eine
Mediendatei. Die MP4s liegen als eigene Dateien im ZIP, vermutlich nach `id`
benannt (`0051.mp4` …).

### Verteilung der 50 gegenueber unseren 162

| Gruppe | Gratis-Paket | FullRep |
|---|---|---|
| Beine | 23 | 23 |
| Schultern | 15 | 21 |
| Ausdauer | 9 | 13 |
| Brust | **2** | 22 |
| Arme (Trizeps) | **1** | 18 |
| Ruecken | **0** | 21 |
| Bizeps | **0** | 18 |
| Bauch | **0** | 10 |
| Gesaess | **0** | 6 |
| Unterarme | **0** | 5 |
| Waden | **0** | 5 |

**Sechs von elf Muskelgruppen kommen gar nicht vor.** Realistisch deckt das
Paket rund ein Viertel unserer Uebungen ab — und ausgerechnet Ruecken, Bizeps
und Bauch fehlen vollstaendig.

### Was das bedeutet

Der Rechteweg ist damit belegt und erprobt: Die Metadaten passen zu unserem
Schema, die Lizenz erlaubt die Einbindung. Fuer eine EINHEITLICHE Darstellung
reicht das Gratis-Paket aber nicht — ein Viertel animiert und drei Viertel
Fotos sieht aus wie ein halbfertiger Umbau. Die vollen 400 Uebungen kosten
einmalig 49 $.

---

## Eingebaut (01.09.2026)

36 der 50 Animationen sind uebernommen und in der App aktiv:

- Quelle: die 50 MP4s aus dem Gratis-ZIP (1080x1080, H.264, bis 6,7 MB je Datei)
- Verkleinert auf 480x480 / 24 fps / CRF 30 → zusammen **3,5 MB statt rund
  150 MB**. Die Lizenz erlaubt das ausdruecklich („crop, resize, compress,
  transcode … for technical compatibility or presentation purposes").
- Ziel: `public/exercise-demos-anim/<Ordner>/demo.mp4` + `poster.jpg`
- Zuordnung von Hand in `tools/anim-import/zuordnung.mjs`, Stichprobe von
  zwoelf Stueck von Auge geprueft — alle richtig.
- 14 der 50 blieben liegen, weil wir die Uebung nicht haben (Air Bike,
  Stepmill, Kettlebell March …). Begruendung je Datei steht in der Zuordnung.
- Alles ohne Animation zeigt weiter die Fotos. Die Weiche sitzt in
  `ExerciseDemoImage` und liest `src/data/exerciseAnimations.js` (erzeugt).

### Auflagen, im Code umgesetzt

- Kein Download-Angebot: `controlsList="nodownload"`,
  `disablePictureInPicture`, Rechtsklick unterbunden, nirgends verlinkt.
- Kein Weiterverkauf, keine Verzeichnisauflistung.

### ⚠ Noch offen

Lag dem ZIP eine Lizenz- oder Copyright-Datei bei, gehoert sie nach § 5
mitgefuehrt und in diesen Ordner. Josef hat nur die JSON und die MP4s
geschickt — falls im ZIP noch eine `LICENSE`/`README` steckt, bitte
nachreichen.

## Nachtrag: sechs weitere Uebungen (01.09.2026)

Von den 14 zunaechst ungenutzten Dateien liessen sich sechs verwerten:

**Zwei Uebungen gab es bei uns laengst — sie zeigten nur nichts an:**
`cycling` (Ergometer) und `machine-lateral-raise` (Seitheben an der Maschine).
Reiner Gewinn, kein neuer Eintrag noetig.

**Vier neu angelegt**, mit Namen und Beschreibung in DE, EN und ES:
Air Bike, Stepper, Gehen am Laufband, Hueftscharnier. Letzteres ist die
Lehruebung fuers Kreuzheben und fehlte bisher ganz.

⚠ **Die Weiche laeuft seither ueber die UEBUNGS-ID, nicht ueber den
Fotoordner.** Diese sechs haben gar kein Foto und waeren sonst leer geblieben.

⚠ **`ausnahmen` in der Zuordnung ist kein Beiwerk.** Mehrere Uebungs-IDs
zeigen auf denselben Fotoordner; ohne die Liste haette „einbeinige
Beinpresse" die beidbeinige Animation bekommen, „Maschinen-Hip-Thrust" die
Langhantel-Fassung. Vier Uebungen sind deshalb ausgenommen. Bei blossem
Unterschied in der Last (Step-Ups mit/ohne Gewicht) bleibt die Animation.

**Stand: 46 Uebungen mit Animation, 3,2 MB.**

**Acht Dateien bleiben ungenutzt** — Uebungen, die wir nicht haben (Barbell
March, Kettlebell March/Lift) oder reine Geraetevarianten schon vorhandener
Uebungen (Kurzhantel-Rudern aufrecht, Kettlebell-Ueberkopfdruecken,
Schulterdruecken sitzend, Bulgarian Split mit Langhantel, zweite
Stepmill-Ansicht). Die Liste aufzublaehen macht die Uebungswahl schlechter.
