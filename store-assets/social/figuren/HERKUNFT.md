# Herkunft: `trainer.png`

**Geliefert von Josef am 22.09.2026**, erzeugt nach dem Prompt in `PROMPT.md`.
Das Rohbild liegt als `roh-trainer.jpg` daneben — 896 × 1200, Figur vor
Chroma-Grün. Es bleibt im Repo, damit sich das Freistellen wiederholen lässt.

## Freigestellt mit

```
python3 ../../../../wellapps-social/tools/social/freisteller.py \
  roh-trainer.jpg trainer.png
```

| | |
|---|---|
| Schlüsselfarbe | `#0d9f48` (**nicht** `#00B140` wie im Prompt) |
| Streuung des Randes | bis 19 |
| Figur beginnt bei | Abstand 160 |
| Toleranz / weiche Kante | 48 / 96 |
| Ergebnis | 330 × 1061, 80 % des Originals durchsichtig |

## ⚠ Dieses Bild hat den Freisteller gelehrt, wo Grün stehen bleibt

In der **engen Lücke zwischen Arm und Rumpf** liegt der Hintergrund im Schatten
und damit weiter vom Schlüssel entfernt als die freie Fläche. Gemessen: Abstand
55, bei einer weichen Kante, die damals bei 60 endete. Übrig blieb eine
**leuchtend grüne Linie mitten in der Figur** — auf der schwarzen FullRep-Karte
nicht zu übersehen, auf Weiß gar nicht.

Daraus sind zwei Regeln im Werkzeug entstanden, beide gemessen:

1. Toleranz und Kante richten sich nach der **Lücke im Abstands-Histogramm**
   (Hintergrund unten, Figur oben), nicht nach einem festen Wert.
2. Was **kräftig grün** ist (Grün über 40 über Rot UND Blau), wird überall
   neutralisiert, nicht nur am Saum.

## Kennzeichnung

⚠ **Ein KI-erzeugter Mensch**, wie die acht Trainingsbilder unter
`../fotos/wasserzeichen/`. `--figur` schaltet das AI-Plättchen automatisch mit.
