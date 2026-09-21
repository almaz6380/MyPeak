# Die Randfigur — der Fitnessmann

Freigestellte Figur, die auf jeder Bildkarte am rechten Rand steht und unten
vom Kartenrand angeschnitten wird. Josef am 21.09.2026: *„Ich will einen
Prompt für eine Figur für FullRep (Fitnessmann) … Diese sollen immer so am
Rand des Bildes sein."*

## Der Prompt

> Full-body photorealistic studio portrait of an athletic man in his early
> thirties, lean and clearly trained but not a bodybuilder, short dark hair,
> light stubble, calm focused expression, looking straight at the camera. He
> wears a plain black training t-shirt and dark grey shorts. He stands upright
> and relaxed, arms hanging naturally at his sides, feet shoulder-width apart.
> Warm amber rim light from the upper left against a dark scene, low fill, no
> harsh shadow across the face. Isolated on a plain uniform chroma green
> background (#00B140), no floor, no cast shadow, no equipment, no text, no
> logo. Vertical 3:4 composition, the whole figure from the top of the head to
> below the shoes inside the frame, sharp focus throughout.

⚠ **Das warme Streiflicht ist kein Schmuck.** Die Karte ist schwarz mit
Bernstein (`#fbbf24`). Eine gleichmäßig hell ausgeleuchtete Studiofigur steht
davor wie aufgeklebt; der Lichtrand bindet sie ein. Dieselbe Logik steht in
`store-assets/social/fotos/wasserzeichen/HERKUNFT.md` für die acht
Trainingsbilder — dort ist es der Helligkeitsabstand, der die Abdunklung
überlebt.

⚠ **Keine Geräte in der Hand.** Eine Hantel macht die Silhouette breit und
unregelmäßig; beim Freistellen bleiben Fragmente stehen, und auf der Karte
zeigt die Figur ein Detail, das mit dem Text nichts zu tun hat.

## Was die Datei erfüllen muss

| | |
|---|---|
| Name | `trainer.png` in diesem Ordner |
| Größe | 832 × 1152 hochkant (0,96 MP — halber Preis gegenüber quer, siehe HERKUNFT.md der Wasserzeichen) |
| Hintergrund | Alpha, wenn das Werkzeug es kann — sonst das Chroma-Grün aus dem Prompt |
| Inhalt | **Die ganze Figur**, Kopf und Schuhe vollständig im Bild |

⚠ **Angeschnitten wird auf der KARTE, nicht im Bild.** Sonst lässt sich der
Anschnitt später nicht mehr verschieben, ohne ein neues Bild zu erzeugen.

⚠ **Durch `freisteller.py` laufen lassen**, auch bei fertigem Alpha: Das
Werkzeug schneidet die durchsichtigen Ränder weg. Mit Rändern passt die Figur
nach Breite in ihren 300-px-Kasten und wird nur rund 400 px hoch — eine kleine
Gestalt in der Ecke statt einer Figur am Rand.

```
python3 ../wellapps-social/tools/social/freisteller.py roh.png trainer.png
```

## Kennzeichnung

⚠ **Es ist ein KI-erzeugter Mensch**, genau wie die acht Trainingsbilder.
`--figur` schaltet das AI-Plättchen automatisch mit; es hängt am Bild, nicht
an einem eigenen Schalter — der Tageslauf ruft den Generator aus
`wellapps-social/tools/social/motoren.mjs` auf, und dort denkt niemand daran.

## Scharfschalten

Erst wenn `trainer.png` hier liegt, in
`wellapps-social/tools/social/apps.json` beim Eintrag `fullrep` ergänzen:

```json
"figur": "trainer.png"
```

Vorher hängt `motoren.mjs` die Option gar nicht erst an — der Tageslauf läuft
also unverändert weiter, statt auf eine fehlende Datei zu zeigen.

⚠ Das **Wasserzeichen** (`--wz`, die acht Trainingsfotos hinter der Karte)
bleibt davon unberührt und läuft weiter mit. Die beiden sind verschiedene
Dinge: eine entfärbte Silhouette HINTER dem Text und eine scharfe Figur
DANEBEN. Ob beides zusammen zu viel ist, entscheidet ein Blick auf die
gerenderte Karte — nicht diese Datei.
