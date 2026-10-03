#!/usr/bin/env python3
"""Store-Grafiken fuer den Play-Eintrag erzeugen.

Zwei Bilder, die NICHT in der App stecken und deshalb beim App-Update nicht
mitwandern — sie liegen als eigene Uploads im Store-Eintrag:

  store-assets/android/icon-512.png        512x512, quadratisch, ohne Alpha
  store-assets/android/feature-graphic.png 1024x500   (de)
  store-assets/<lang>/android/feature-graphic.png   (en, es, fr, pt, ar)

Quelle ist dasselbe public/favicon.svg wie fuer alle App-Icons, gerendert mit
headless Chromium; die Schrift ist das im Projekt liegende Inter. Damit sehen
Store und App gleich aus, statt auseinanderzulaufen.

    python3 scripts/render-store-graphics.py

Die Vorstellungsgrafik gibt es seit 10/2026 je Sprache. Vorher stand auf der
englischen, spanischen usw. Store-Seite „Training & Ernährung in einer App" —
Play nimmt die Grafik der Standardsprache, wenn eine Sprache keine eigene hat.
"""
import base64
import glob
import os
import subprocess
import sys
import tempfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "store-assets", "android")
GOLD = "#fbbf24"
BG = "#0a0a0a"


def find_chrome():
    for p in ["/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
              "/usr/bin/chromium", "/usr/bin/chromium-browser",
              "/usr/bin/google-chrome"]:
        if os.path.exists(p):
            return p
    hits = glob.glob("/opt/pw-browsers/chromium*/chrome-linux/chrome")
    if hits:
        return sorted(hits)[-1]
    sys.exit("Kein Chromium gefunden.")


def data_uri(path, mime):
    with open(path, "rb") as fh:
        return f"data:{mime};base64," + base64.b64encode(fh.read()).decode()


def inter(weight):
    """Inter als data:-URI. Ohne Einbetten faellt Chromium auf DejaVu zurueck,
    und die Grafik saehe nicht nach der App aus."""
    p = os.path.join(ROOT, "node_modules", "@fontsource", "inter", "files",
                     f"inter-latin-{weight}-normal.woff2")
    if not os.path.exists(p):
        sys.exit(f"Inter fehlt: {p} — vorher npm ci laufen lassen.")
    return data_uri(p, "font/woff2")


def mark_svg():
    """favicon.svg ohne die schwarze Platte — nur Kreis und Symbole.

    Auf der Vorstellungsgrafik wuerde die Platte als hellerer Kasten vor dem
    Verlauf stehen; das Zeichen soll frei schweben.
    """
    with open(os.path.join(ROOT, "public", "favicon.svg"), encoding="utf-8") as fh:
        svg = fh.read()
    ohne = svg.replace(
        '<rect x="0" y="0" width="512" height="512" rx="100" fill="#0a0a0a"/>', "")
    if ohne == svg:
        sys.exit("Hintergrund-Rechteck in favicon.svg nicht gefunden — "
                 "die Datei hat sich geaendert, bitte hier nachziehen.")
    return "data:image/svg+xml;base64," + base64.b64encode(ohne.encode()).decode()


def shoot(html, width, height, ziel, chrome):
    """Groesser rendern, dann zuschneiden.

    --window-size ist nicht der Viewport: dieser Chromium liefert rund 95 px
    weniger Hoehe, unten bliebe sonst ein leerer Streifen. Deshalb mit Reserve
    rendern und exakt auf das Zielmass beschneiden — dasselbe Verfahren wie in
    render-icons.py.
    """
    from PIL import Image
    with tempfile.TemporaryDirectory() as tmp:
        page = os.path.join(tmp, "page.html")
        with open(page, "w", encoding="utf-8") as fh:
            fh.write(html)
        roh = os.path.join(tmp, "roh.png")
        subprocess.run([
            chrome, "--headless", "--disable-gpu", "--no-sandbox",
            "--force-device-scale-factor=1", "--hide-scrollbars",
            f"--window-size={width + 200},{height + 250}",
            f"--screenshot={roh}", f"file://{page}",
        ], check=True, capture_output=True)
        im = Image.open(roh)
        if im.width < width or im.height < height:
            sys.exit(f"Render zu klein: {im.size}, gebraucht {width}x{height}")
        im.crop((0, 0, width, height)).convert("RGB").save(ziel)
    print(f"  {os.path.relpath(ziel, ROOT)}  {width}x{height}")


def kopf(weights):
    faces = "".join(
        f"@font-face{{font-family:Inter;font-weight:{w};font-style:normal;"
        f"src:url({inter(w)}) format('woff2')}}" for w in weights)
    return faces


# Vorstellungsgrafik je Sprache: (Unterzeile, Zeile 1, hervorgehoben, Zeile 2).
# "FullRep" bleibt in jeder Sprache stehen — Eigenname.
FEATURE_TEXTE = {
    "de": ("Training &amp; Ernährung in einer App",
           "Training · Kalorien &amp; Makros · ", "Barcode-Scanner",
           "21 Trainingsprogramme · Fortschritt im Blick"),
    "en": ("Training &amp; nutrition in one app",
           "Workouts · Calories &amp; macros · ", "Barcode scanner",
           "21 training programs · Progress at a glance"),
    "es": ("Entreno y nutrición en una sola app",
           "Entreno · Calorías y macros · ", "Escáner de códigos",
           "21 programas · Tu progreso de un vistazo"),
    "fr": ("Sport et nutrition dans une seule app",
           "Séances · Calories &amp; macros · ", "Scanner code-barres",
           "21 programmes · Tes progrès en un coup d’œil"),
    "pt": ("Treino e nutrição em um só app",
           "Treino · Calorias e macros · ", "Leitor de código",
           "21 programas de treino · Seu progresso à vista"),
    "ar": ("التدريب والتغذية في تطبيق واحد",
           "تدريب · سعرات وماكروز · ", "قارئ الباركود",
           "21 برنامجًا تدريبيًا · تقدّمك أمام عينيك"),
}


def feature_html(lang, mark):
    unter, z1, hervor, z2 = FEATURE_TEXTE[lang]
    rtl = lang == "ar"
    # Arabisch liest von rechts: Text rechts, Zeichen links, Verlauf gespiegelt.
    # Inter hat keine arabischen Glyphen — dort uebernimmt die Systemschrift.
    seite_text, seite_mark = ("right", "left") if rtl else ("left", "right")
    verlauf = "22% 45%" if rtl else "78% 45%"
    return f"""<style>
      {kopf([400, 600, 800])}
      html,body{{margin:0;padding:0;overflow:hidden;width:1024px;height:500px;
        background:{BG};font-family:Inter,'DejaVu Sans',sans-serif;
        -webkit-font-smoothing:antialiased}}
      .wrap{{position:relative;width:1024px;height:500px;overflow:hidden;
        background:radial-gradient(120% 130% at {verlauf}, #2a2113 0%, {BG} 62%)}}
      .text{{position:absolute;{seite_text}:76px;top:50%;transform:translateY(-50%);
        width:570px;direction:{'rtl' if rtl else 'ltr'};text-align:{seite_text}}}
      h1{{margin:0;font-weight:800;font-size:76px;letter-spacing:-2px;
        color:#fef3c7;line-height:1;direction:ltr;unicode-bidi:isolate}}
      h1 span{{color:{GOLD}}}
      h2{{margin:18px 0 0;font-weight:800;font-size:29px;color:#ffffff;
        line-height:1.25}}
      p{{margin:22px 0 0;font-weight:400;font-size:21px;color:#9a9186;
        line-height:1.6}}
      p b{{font-weight:600;color:{GOLD}}}
      .mark{{position:absolute;{seite_mark}:74px;top:50%;transform:translateY(-50%);
        width:338px;height:338px}}
    </style>
    <div class="wrap">
      <div class="text">
        <h1>Full<span>Rep</span></h1>
        <h2>{unter}</h2>
        <p>{z1}<b>{hervor}</b><br>{z2}</p>
      </div>
      <img class="mark" src="{mark}">
    </div>"""


def main():
    chrome = find_chrome()
    os.makedirs(OUT, exist_ok=True)
    logo = data_uri(os.path.join(ROOT, "public", "icon-512.png"), "image/png")
    mark = mark_svg()

    # ── App-Symbol 512x512 ────────────────────────────────────────────────
    # Play erwartet ein volles Quadrat und rundet selbst ab. icon-512.png ist
    # bereits abgerundet und hat durchsichtige Ecken — die werden hier schwarz
    # hinterlegt, sonst rundet Play ein zweites Mal.
    print("Store-Grafiken:")
    shoot(
        f"<style>html,body{{margin:0;padding:0;overflow:hidden;width:512px;height:512px;background:{BG}}}"
        f"img{{width:512px;height:512px;display:block}}</style>"
        f"<img src='{logo}'>",
        512, 512, os.path.join(OUT, "icon-512.png"), chrome)

    # ── Vorstellungsgrafik 1024x500, je Sprache ───────────────────────────
    # Aufbau wie die alte MyPeak-Grafik: Text links, Zeichen rechts. Der
    # Farbverlauf nimmt das Gold auf, ohne dem Logo Kontrast zu nehmen.
    # de liegt im alten Pfad (play-listing.yml, Modus grafiken, lang de-DE).
    for lang in FEATURE_TEXTE:
        ziel = OUT if lang == "de" else os.path.join(ROOT, "store-assets", lang, "android")
        os.makedirs(ziel, exist_ok=True)
        shoot(feature_html(lang, mark), 1024, 500,
              os.path.join(ziel, "feature-graphic.png"), chrome)


if __name__ == "__main__":
    main()
