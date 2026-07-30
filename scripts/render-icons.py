#!/usr/bin/env python3
"""Erzeugt alle App-Icons und Splash-Screens aus einer einzigen Quelle.

Quelle:  public/favicon.svg
Ziele:   2 Web-Icons, 18 Android-Icons, 1 iOS-Icon, 26 Splash-Screens

Logo wechseln = favicon.svg austauschen und dieses Skript laufen lassen.

    python3 scripts/render-icons.py

Voraussetzungen: Pillow (pip install Pillow) und ein Chromium-Binary.
Der Pfad wird automatisch gesucht; notfalls per CHROME_BIN vorgeben.
"""
import glob
import os
import subprocess
import sys
import tempfile

from PIL import Image, ImageDraw

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SOURCE = os.path.join(ROOT, "public", "favicon.svg")
RES = os.path.join(ROOT, "android", "app", "src", "main", "res")
IOS_ICON = os.path.join(ROOT, "ios", "App", "App", "Assets.xcassets",
                        "AppIcon.appiconset", "AppIcon-512@2x.png")

MASTER = 1024                 # Kantenlaenge des Zwischenbilds
BG = (10, 10, 10)             # #0a0a0a — Splash-Hintergrund
SPLASH_ICON_RATIO = 0.1975    # Icon-Breite relativ zur Splash-Breite

# Android-Dichten: Launcher/Round bzw. Adaptive-Foreground
LAUNCHER = {"ldpi": 36, "mdpi": 48, "hdpi": 72, "xhdpi": 96, "xxhdpi": 144, "xxxhdpi": 192}
FOREGROUND = {"ldpi": 81, "mdpi": 108, "hdpi": 162, "xhdpi": 216, "xxhdpi": 324, "xxxhdpi": 432}

CHROME_CANDIDATES = [
    os.environ.get("CHROME_BIN"),
    "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/usr/bin/google-chrome",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
]


def find_chrome():
    for c in CHROME_CANDIDATES:
        if c and os.path.exists(c):
            return c
    hit = glob.glob("/opt/pw-browsers/chromium-*/chrome-linux/chrome")
    if hit:
        return sorted(hit)[-1]
    sys.exit("Kein Chromium gefunden. Pfad per CHROME_BIN setzen.")


def render_master(tmp):
    """SVG per Headless-Chromium rendern und auf MASTER x MASTER zuschneiden.

    Gerendert wird auf eine groessere Flaeche als noetig und anschliessend
    zugeschnitten — direktes Rendern auf exakte Fenstergroesse skaliert den
    Inhalt und schneidet ihn unten ab.
    """
    page = os.path.join(tmp, "icon.html")
    shot = os.path.join(tmp, "master.png")
    with open(SOURCE) as f:
        svg = f.read()
    with open(page, "w") as f:
        f.write("<style>html,body{margin:0;padding:0;background:transparent}"
                f"svg{{display:block;position:absolute;top:0;left:0;width:{MASTER}px;height:{MASTER}px}}"
                "</style>\n" + svg)
    subprocess.run([find_chrome(), "--headless", "--disable-gpu", "--no-sandbox",
                    "--default-background-color=00000000", "--hide-scrollbars",
                    "--force-device-scale-factor=1", f"--screenshot={shot}",
                    f"--window-size={MASTER + 176},{MASTER + 176}", f"file://{page}"],
                   check=True, capture_output=True)
    master = Image.open(shot).convert("RGBA").crop((0, 0, MASTER, MASTER))
    if master.getbbox() != (0, 0, MASTER, MASTER):
        print(f"  Hinweis: Inhalt fuellt die Flaeche nicht ganz — bbox {master.getbbox()}")
    return master


def circle_mask(img):
    """Runde Variante fuer ic_launcher_round — 4x maskieren, dann verkleinern (glatte Kante)."""
    s = img.size[0]
    m = Image.new("L", (s * 4, s * 4), 0)
    ImageDraw.Draw(m).ellipse((0, 0, s * 4 - 1, s * 4 - 1), fill=255)
    out = img.copy()
    out.putalpha(m.resize((s, s), Image.LANCZOS))
    return out


def main():
    if not os.path.exists(SOURCE):
        sys.exit(f"Quelle fehlt: {SOURCE}")
    with tempfile.TemporaryDirectory() as tmp:
        master = render_master(tmp)

    n = 0
    for size in (192, 512):
        master.resize((size, size), Image.LANCZOS).save(
            os.path.join(ROOT, "public", f"icon-{size}.png"))
        n += 1

    for density, size in LAUNCHER.items():
        d = os.path.join(RES, f"mipmap-{density}")
        icon = master.resize((size, size), Image.LANCZOS)
        icon.save(os.path.join(d, "ic_launcher.png"))
        circle_mask(icon).save(os.path.join(d, "ic_launcher_round.png"))
        n += 2
    for density, size in FOREGROUND.items():
        master.resize((size, size), Image.LANCZOS).save(
            os.path.join(RES, f"mipmap-{density}", "ic_launcher_foreground.png"))
        n += 1
    # ic_launcher_background.png bleibt unberuehrt (einfarbig, ohne Motiv)

    # iOS verlangt ein Icon OHNE Alphakanal — sonst lehnt App Store Connect den Upload ab.
    ios = Image.new("RGB", (1024, 1024), BG)
    ios.paste(master, (0, 0), master)
    ios.save(IOS_ICON)
    n += 1

    for path in sorted(glob.glob(os.path.join(RES, "drawable*", "splash.png"))):
        w, h = Image.open(path).size
        s = max(8, round(w * SPLASH_ICON_RATIO))
        out = Image.new("RGB", (w, h), BG)
        icon = master.resize((s, s), Image.LANCZOS)
        out.paste(icon, ((w - s) // 2, (h - s) // 2), icon)  # Alpha -> runde Ecken verschmelzen
        out.save(path)
        n += 1

    print(f"{n} Dateien aus public/favicon.svg erzeugt.")
    print(f"iOS-Icon Modus: {Image.open(IOS_ICON).mode} (muss RGB sein)")


if __name__ == "__main__":
    main()
