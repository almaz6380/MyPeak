# Trainingsbilder als Wasserzeichen

Acht KI-erzeugte Bilder, von Josef am **20.09.2026** geliefert, je 1408×768.
Sie liegen NICHT als Motiv auf der Karte, sondern als Wasserzeichen dahinter:
`scripts/post-bild.mjs --wz <datei>` legt sie entfärbt, im Kontrast angehoben
und auf 17 % Deckkraft hinter den Text.

⚠ **Nicht mit `store-assets/social/fotos/` verwechseln.** Der Ordner eine Ebene
höher ist für vollflächige Hintergrundfotos (`--hintergrund`) gedacht, mit
Schleier darüber. Die Prompts dafür sind andere, und die Bilder hier taugen
umgekehrt nicht als Motiv — sie sind auf Silhouette gebaut, nicht auf Detail.

## Warum eigene Bilder statt der Probebilder von fal.ai

Die vier Motive in `scripts/fal-bilder.mjs` sind für vollflächige Hintergründe
geschrieben: „deep shadows", „shallow depth of field", „dark upper third".
Genau das macht ein Wasserzeichen unsichtbar. Am 20.09. gemessen: Das
Kniebeugen-Probebild trug (heller Körper vor dunklem Raum), das Laufband-Bild
verschwand bei 17 % vollständig zu diffusem Grau.

**Der Helligkeitsabstand zwischen Körper und Umgebung ist das Einzige, was
die Abdunklung überlebt** — nicht die Schärfe, nicht das Motiv, nicht der
leere Hintergrund.

## Der geprüfte Beschnitt je Bild

Die Karte ist 1080×1350 hoch, die Bilder sind 1408×768 quer. `cover` zieht ein
solches Bild auf 2475 px Breite und schneidet **56 % horizontal weg**. Eine
stehende Figur übersteht das, eine liegende nicht.

Jedes Bild wurde einzeln auf einer BPC-157-Karte gerendert und angesehen:

| Datei | `--wz-fit` | Befund |
|---|---|---|
| `kreuzheben.jpg` | `cover` | stärkstes des Satzes |
| `kniebeuge.jpg` | `cover` | trägt |
| `kettlebell-swing.jpg` | `cover` | ganze Figur steht im Bild |
| `klimmzug.jpg` | `cover` | trägt, sehr klare Silhouette |
| `schulterdruecken.jpg` | `cover` | die waagrechte Langhantel über dem Kopf ist das Erste, was man erkennt |
| `ausfallschritt.jpg` | `cover` | hinteres Bein wird angeschnitten. `contain` wurde geprüft und war **schlechter**: Figur zu klein und zu dunkel |
| `bankdruecken.jpg` | `contain` | mit `cover` unbrauchbar — nur Hantel und ein Arm blieben übrig |
| `rudern.jpg` | `contain` | mit `cover` oben und unten abgeschnitten |

`contain` legt das ganze Querbild als Streifen in die Kartenmitte. Der Rand
bleibt schwarz — bei 17 % Deckkraft ist das ohnehin die Kartenfarbe, die Kante
sieht man nicht.

⚠ Wer die Bilder neu erzeugt: **832×1152 hochkant**. Dann braucht kein Motiv
mehr `contain`, die Figur füllt die Karte, und fal.ai rechnet 0,96 MP statt
1,46 — es kostet zugleich die Hälfte (Abrechnung je angefangenem Megapixel).

## Kennzeichnung

Diese Bilder zeigen **KI-erzeugte Menschen**. `--wz` schaltet deshalb das
AI-Plättchen automatisch mit — es hängt bewusst nicht an `--ki`, weil der
Tageslauf den Generator aus `wellapps-social/tools/social/motoren.mjs` aufruft
und dort niemand daran denkt. Begründung im Kopf von `scripts/social-daten.mjs`.
