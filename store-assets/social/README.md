# FullRep — Kanal-Ausstattung

Profilbilder, Titelbilder und Profiltexte fuer TikTok, Facebook und Instagram.
Alles hier wird erzeugt, nichts von Hand gebaut:

```bash
CHROMIUM_PFAD=/opt/pw-browsers/chromium node scripts/kanal-assets.mjs --was alle --sprache de
CHROMIUM_PFAD=/opt/pw-browsers/chromium node scripts/kanal-assets.mjs --was alle --sprache en
node scripts/pruefe-kanal-assets.mjs                # Belege nach nachweis/de/
node scripts/pruefe-kanal-assets.mjs --sprache en   # Belege nach nachweis/en/
```

`--was` nimmt auch `avatar`, `fb`, `ig` oder `tiktok` einzeln.
`--raster` zeichnet die Beschnittrahmen ein — die Dateien heissen dann
`…-raster.png` und duerfen **nie** hochgeladen werden.

## Was wohin gehoert

| Datei | Mass | Wohin |
|---|---|---|
| `avatar-1080.png` | 1080×1080 | Profilbild bei **allen drei** Kanaelen |
| `fb-titelbild-<lang>.png` | 1640×856 | Facebook-Titelbild |
| `ig-grid-1..3-<lang>.png` | je 1080×1350 | Instagram, drei Beitraege, die im Raster eine Kopfzeile ergeben |
| `tiktok-cover-<lang>.png` | 1080×1920 | Cover fuer den angepinnten TikTok-Trailer |
| `bios-<lang>.md` | — | die Profiltexte zum Kopieren |

## Drei Dinge, die man wissen muss

**1 · „Titelbild" gibt es nur bei Facebook.** TikTok- und Instagram-Profile
haben ausschliesslich ein rundes Avatar; ein Banner existiert dort nicht.
Deshalb liegen hier statt Platzhaltern die echten Entsprechungen: bei Instagram
drei Rasterkacheln, bei TikTok das Trailer-Cover.

**2 · Instagram: die drei Kacheln RUECKWAERTS hochladen — 3, dann 2, dann 1.**
Das Raster sortiert neuestes-zuerst von links. Wer 1, 2, 3 postet, sieht im
Profil 3, 2, 1.

**3 · Facebook beschneidet das Titelbild zweimal verschieden** — am Rechner auf
820×312, am Handy auf 640×360. Alles Wesentliche liegt deshalb in einer
mittigen Zone von 1440×560. `nachweis/<lang>/fb-desktop.png` und
`fb-mobil.png` zeigen beide Beschnitte; wer das Titelbild aendert, sieht dort
sofort, ob etwas abgeschnitten wird.

## Der Ordner `nachweis/`

Er stellt nach, wie die Plattformen die Bilder wirklich zeigen — verkleinert,
rund beschnitten, ueberdeckt. Ein Avatar, das bei 1080 px prima liest, kann bei
110 px ein grauer Fleck sein; das sieht man erst, wenn man es nachstellt. Die
Dateien sind Belege und gehoeren mit ins Repo.

## `fotos/`

Leer, mit Absicht. Die Begruendung steht in `fotos/HERKUNFT.md` — kurz: Die
Uebungsfotos der App haben keine belegte Rechtekette und gehen deshalb nicht in
Werbung. Die Posts laufen so lange typografisch.
