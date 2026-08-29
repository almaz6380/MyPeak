# Schriften für Social-Media-Bilder

## `anton.woff2`

**Anton**, SIL Open Font License 1.1 — Copyright 2020 The Anton Project Authors
(https://github.com/googlefonts/AntonFont). Kommerzielle Nutzung und Einbettung
ausdrücklich erlaubt.

Bezogen einmalig aus `@fontsource/anton`, dann hierher kopiert.

### Warum die Datei im Repo liegt und nicht in `package.json`

Zwei Gründe, beide praktisch:

1. **Die Seite hat keinen Origin.** Die Generatoren laden ihr HTML per
   `page.setContent()`. Dort lädt `file://` nicht, und ein Schriftpfad hilft
   nicht weiter — die Schrift **muss** als `data:`-URI eingebettet werden. Ob
   sie aus `node_modules` oder von hier kommt, macht für den Einbau keinen
   Unterschied.
2. **Der Tageslauf soll nichts nachinstallieren.** Jede zusätzliche
   Abhängigkeit kostet bei jedem Lauf Zeit, und ein fehlgeschlagenes `npm i`
   würde die Bildposts lahmlegen. 19 KB im Repo sind billiger.

Dasselbe macht Anigosha mit `tools/reels/assets/outfit.woff2` — es ist der
etablierte Weg in diesem Portfolio.

### Warum überhaupt eine zweite Schrift

Die App nutzt **Inter** (selbst gehostet über `@fontsource/inter`, aus
DSGVO-Gründen ohne Google-Aufruf). Inter ist eine gute Oberflächenschrift und
eine unauffällige Plakatschrift — im Feed geht sie unter.

Anton ist das Gegenteil: sehr schwer, sehr schmal, nur Versalien sinnvoll. Sie
trägt die Schlagzeile im Stil `poster` und wird sonst **nicht** eingesetzt.
Fließtext, Beschriftungen und Zahlen bleiben Inter — zwei laute Schriften
nebeneinander ergeben Lärm, keine Wirkung.
