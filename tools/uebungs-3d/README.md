# Uebungs-Animationen selbst rendern (3D, kostenlos)

Erzeugt fuer alle 162 Uebungen eine loopbare 3D-Animation: Anatomiefigur,
Gewichte und Geraete, der arbeitende Muskel leuchtet rot, die Kamera pendelt
sanft. Ergebnis liegt in `public/exercise-demos-3d/<Ordner>/demo.mp4` plus
`poster.jpg`.

```bash
npm i --no-save three ffmpeg-static playwright      # einmalig je Rechner
node tools/uebungs-3d/render.mjs --probe            # Querschnitt, 12 Stueck
node tools/uebungs-3d/render.mjs --alle             # alle 162 (~50 min)
node tools/uebungs-3d/render.mjs --muster kniebeuge --muskel legs --name Test
```

`--neu` rendert auch schon vorhandene neu; ohne den Schalter setzt ein
abgebrochener Lauf dort fort, wo er stehen geblieben ist.

## Warum ueberhaupt selbst rendern

Zwei Probleme auf einmal:

1. **Die alten Fotos haben keine belegbare Rechtekette**
   (`store-assets/social/fotos/HERKUNFT.md`). Selbst erzeugt = geklaert.
2. **Fertige 3D-Bibliotheken kosten Geld** (MoveKit 220 Uebungen $199,
   Gym Animations ab $199 — beide mit App-Lizenz, beide geprueft am
   01.09.2026). Josefs Entscheidung: selbst bauen.

Ein KI-Bild-Versuch davor (fal.ai flux) ist gescheitert und wurde verworfen:
Text-zu-Bild kann weder eine Bewegung noch zwei zusammengehoerige Posen
derselben Person. Der Befund steht in `public/exercise-demos-neu/HERKUNFT.md`.

## Aufbau

| Datei | Aufgabe |
|---|---|
| `szene.js` | Browser-Seite: Figur, Geraete, Muskelflecken, Licht, Kamera |
| `bewegungen.mjs` | ~50 Bewegungsmuster als Start-/End-Pose je Gelenk |
| `zuordnung.mjs` | Uebungsordner → Muster (Handtabelle, siehe unten) |
| `render.mjs` | Treiber: Playwright → Frames → ffmpeg → MP4 |

**Muster statt Einzelanimationen:** Die Uebungen fallen in Bewegungsfamilien.
Eine Verbesserung am Muster `curl` verbessert sofort alle 16 Curl-Varianten.

**Der Zielmuskel kommt aus `src/data/exercises.js`** (`muscleGroup`), nicht aus
einer zweiten Liste — sonst gaebe es zwei Wahrheiten.

## Fallen, die hier schon zugeschnappt sind

- **Die Zuordnung ist eine HANDTABELLE, keine Stichwort-Automatik.**
  Ordnernamen stammen aus einer fremden Datenbank und luegen: `Air_Bike` ist
  der Bicycle Crunch, kein Fahrrad. Genau daran ist der KI-Versuch gescheitert.
- **Kapsellaenge = Gelenkabstand.** Zu kurz gewaehlt klaffen Luecken; im ersten
  Durchgang fehlten die Schienbeine zwischen Knie und Fuss.
- **Fuesse am Boden rechnet `bodenHaftung()` selbst.** Beim Beugen wandert der
  Fuss 43 cm nach oben und 38 cm nach vorne — das je Muster von Hand
  auszugleichen waere zwei Dutzend Mal dieselbe Trigonometrie.
  `bodenHaftung: false` fuer Liegendes, Haengendes, Sitzendes, Springendes.
- **`wurzelRot.x` NEGATIV = auf dem Ruecken, POSITIV = auf dem Bauch.**
  Verwechselt lag die Figur beim Liegestuetz auf dem Ruecken und ruderte.
- **Muskelflecken muessen AUSSEN auf der Haut liegen.** Der Rumpf ist in z auf
  0.66 gestaucht — die Oberflaeche liegt bei ~0.12, nicht bei 0.18.
- **`fleck()` darf `visible` nicht selbst setzen.** Three vererbt Sichtbarkeit
  nicht rueckwaerts: ein unsichtbares Kind bleibt in einer sichtbaren Gruppe
  unsichtbar. Deshalb blieb der Ruecken beim Rudern dunkel.
- **Kamera auf die Seite des arbeitenden Muskels** (`HINTEN` in `szene.js`),
  sonst leuchtet der Ruecken hinter der Figur.
- **Geraete stehen links, Rueckansicht schaut von rechts hinten.** Sonst stand
  der Kabelturm zwischen Kamera und Figur.
- **Bildausschnitt wird EINMAL ueber die ganze Bewegung gemessen.** Je Frame
  gemessen pumpt die Kamera sichtbar, sobald die Arme hochgehen.
- **Kein sichtbarer Boden, nur ein Schattenfaenger.** Drei Anlaeufe mit einer
  sichtbaren Flaeche endeten im selben dunklen Band quer durchs Bild: Der
  eingenebelte Boden und der Himmelsverlauf treffen an der Horizontlinie nie
  exakt dieselbe Farbe.
- **Kein CSS-`animation`, kein `setTimeout`.** Alles haengt an
  `window.setFrame(n)` und muss reine Funktion des Frame-Index sein — sonst
  verrutschen Frames und nichts ist reproduzierbar. (Gleiche Regel wie beim
  Reel-Generator in Anigosha.)
- **three.js kommt als `three.cjs`**, eingebettet in die Seite. `three.module.js`
  importiert aus `three.core.js` und laesst sich nicht einfach einbetten;
  `page.setContent()`-Seiten haben keinen Origin, `<script src="file://">`
  laedt dort nicht.
- **Playwrights npm-Paket erwartet eine bestimmte Chromium-Bauversion.** In der
  Cloud-Sitzung liegt eine andere unter `/opt/pw-browsers` — sonst bricht
  `launch()` ab und will 150 MB nachladen. `CHROMIUM_PFAD` ueberschreibt.
- **WebGL braucht SwiftShader-Schalter** (`--use-angle=swiftshader`), sonst
  bleibt das Bild schwarz.

## In der App

`src/components/ExerciseDemoImage.jsx` zeigt zuerst das MP4 und faellt auf die
alten Fotos zurueck, wenn es nicht laedt. **Die Fotos bleiben deshalb im Repo,
bis jede Animation von Auge geprueft ist.** `muted` + `playsInline` sind
Pflicht, sonst verweigert iOS die automatische Wiedergabe.

---

## ⚠ VERWORFEN am 01.09.2026 — und was schon geprueft ist

Zwei Anlaeufe, beide von Josef abgelehnt („Katastrophe"). Der Renderer bleibt
im Repo, damit niemand dieselben Wege noch einmal geht. **Die 162 erzeugten
Videos wurden geloescht** — 15 MB, die sonst in jedem App-Bundle mitgefahren
waeren.

**Anlauf 1** — Figur aus Kapseln, Bewegung aus geratenen Gelenkwinkeln.
Ergebnis: Wurstkette mit falschen Bewegungen.

**Anlauf 2** (im Code) — durchgehende Haut ueber einem Skelett, Bewegung ueber
Hand-/Fussziele mit Zwei-Knochen-IK. Die BEWEGUNG war damit geloest
(Bankdruecken sass), die FIGUR blieb ein glatter Mannequin ohne Anatomie.
Gerechnete Schlaeuche werden kein modellierter Mensch — dafuer braucht es
Modellierarbeit, keine Parameter.

### Freie Quellen, konkret geprueft — alle unbrauchbar

| Quelle | Warum nicht |
|---|---|
| **wger** (offene Fitness-Datenbank, API abgefragt) | nur **78 Videos fuer 46 Uebungen** — wir haben 162. Echte Personen statt einheitlichem Stil, im Schnitt **46 MB** je Datei, Lizenz **CC-BY-SA 4.0**: Namensnennung je Video, und Umkodieren waere ein Bearbeitungswerk mit Share-Alike-Pflicht |
| **exercises-dataset** (GitHub, 1.324 Uebungen mit GIFs) | Medien sind **© Gym visual, „mit Erlaubnis weiterverteilt"** — die Erlaubnis gilt deren Projekt, nicht unserem. Exakt dieselbe Rechtefalle wie bei den heutigen Fotos |
| **LottieFiles „free exercise animations"** | Symbolgrafiken, keine Uebungsdarstellungen |
| **KI-Videoerzeugung** (fal.ai Kling/Wan) | nicht kostenlos (~80 $ fuer 162 Clips) und bei Bewegungsablaeufen unzuverlaessig |
| **Mixamo** | Adobe-Konto noetig, und die Bibliothek enthaelt Alltagsbewegungen, keine Kraftuebungen |

### Was es kostet, wenn es doch sein soll

Fertige 3D-Bibliotheken mit ausdruecklicher App-Lizenz (geprueft 01.09.2026):
**MoveKit** 220 Uebungen 199 $ / 412 fuer 299 $ (anatomische Puppe, roter
Muskel — der Stil aus Josefs Referenzvideo) und **Gym Animations** ab 199 $.
