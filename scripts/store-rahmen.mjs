/**
 * Store-Screenshots mit Überschrift und Rahmen.
 *
 *   SPRACHEN=de,en node scripts/store-screenshots.mjs   # Rohbilder
 *   node scripts/store-rahmen.mjs                       # daraus die Store-Bilder
 *
 * Warum: Bis 10/2026 gingen nackte App-Bildschirme in die Stores — ohne einen
 * Satz, was die App kann. Im Store entscheiden die ersten zwei, drei Bilder,
 * und die meisten Nutzer lesen nur die Überschrift. Hier bekommt jedes Bild
 * eine Aussage in der Sprache des Stores.
 *
 * Ausgabe (Formate exakt wie die von Apple/Google akzeptierten Bestandsdateien):
 *   de  → store-assets/{ios,ios-ipad,android}/      (bisherige Pfade, asc.py + Play)
 *   xx  → store-assets/<xx>/{ios,ios-ipad,android}/
 *
 * Gerendert wird HTML im selben Chromium wie die Rohbilder — dadurch gelten
 * dieselbe Schrift (Inter, selbst gehostet) und dieselbe Textsatzung inkl. RTL.
 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const CHROME = process.env.CHROME_BIN || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

const GERAETE = [
  { dir: 'ios', w: 1320, h: 2868 },
  { dir: 'ios-ipad', w: 2048, h: 2732 },
  { dir: 'android', w: 1080, h: 1920 },
];

// [Überschrift, Unterzeile] je Motiv. Kurz halten: im Store-Raster ist ein
// Bild etwa daumenbreit, mehr als fünf Wörter liest dort niemand.
const TEXTE = {
  de: {
    '01-dashboard': ['Training & Ernährung', 'in einer App'],
    '02-ernaehrung': ['Kalorien & Makros', 'per Foto, Barcode oder Suche'],
    '03-kochbuch': ['25 Protein-Rezepte', 'mit Nährwerten & Portionsrechner'],
    '04-training': ['Sieh, was du trainierst', 'Muskel-Heatmap & Wochenplan'],
    '05-peak-programme': ['21 Trainingsprogramme', 'Kraft, Cardio, HIIT & Kampfsport'],
    '06-uebungen': ['Über 240 Übungen', 'mit Anleitung & Animation'],
  },
  en: {
    '01-dashboard': ['Training & nutrition', 'in one app'],
    '02-ernaehrung': ['Calories & macros', 'by photo, barcode or search'],
    '03-kochbuch': ['25 high-protein recipes', 'with macros & portion scaling'],
    '04-training': ['See what you train', 'muscle heatmap & weekly plan'],
    '05-peak-programme': ['21 training programs', 'strength, cardio, HIIT & martial arts'],
    '06-uebungen': ['240+ exercises', 'with how-to & animation'],
  },
  es: {
    '01-dashboard': ['Entreno y nutrición', 'en una sola app'],
    '02-ernaehrung': ['Calorías y macros', 'por foto, código de barras o búsqueda'],
    '03-kochbuch': ['25 recetas proteicas', 'con macros y calculadora de raciones'],
    '04-training': ['Mira lo que entrenas', 'mapa muscular y plan semanal'],
    '05-peak-programme': ['21 programas', 'fuerza, cardio, HIIT y artes marciales'],
    '06-uebungen': ['Más de 240 ejercicios', 'con guía y animación'],
  },
  fr: {
    '01-dashboard': ['Sport & nutrition', 'dans une seule app'],
    '02-ernaehrung': ['Calories & macros', 'par photo, code-barres ou recherche'],
    '03-kochbuch': ['25 recettes protéinées', 'avec macros & calcul des portions'],
    '04-training': ['Vois ce que tu travailles', 'carte musculaire & plan hebdo'],
    '05-peak-programme': ['21 programmes', 'muscu, cardio, HIIT & sports de combat'],
    '06-uebungen': ['Plus de 240 exercices', 'avec guide & animation'],
  },
  pt: {
    '01-dashboard': ['Treino e nutrição', 'em um só app'],
    '02-ernaehrung': ['Calorias e macros', 'por foto, código de barras ou busca'],
    '03-kochbuch': ['25 receitas proteicas', 'com macros e ajuste de porções'],
    '04-training': ['Veja o que você treina', 'mapa muscular e plano semanal'],
    '05-peak-programme': ['21 programas de treino', 'força, cardio, HIIT e lutas'],
    '06-uebungen': ['Mais de 240 exercícios', 'com instruções e animação'],
  },
  ar: {
    '01-dashboard': ['التدريب والتغذية', 'في تطبيق واحد'],
    '02-ernaehrung': ['السعرات والماكروز', 'بالصورة أو الباركود أو البحث'],
    '03-kochbuch': ['25 وصفة غنية بالبروتين', 'مع القيم الغذائية وحاسبة الحصص'],
    '04-training': ['شاهد ما تدرّبه', 'خريطة العضلات والخطة الأسبوعية'],
    '05-peak-programme': ['21 برنامجًا تدريبيًا', 'قوة وكارديو وHIIT وفنون قتالية'],
    '06-uebungen': ['أكثر من 240 تمرينًا', 'مع شرح ورسوم متحركة'],
  },
  nl: {
    '01-dashboard': ['Training & voeding', 'in één app'],
    '02-ernaehrung': ['Calorieën & macro’s', 'via foto, barcode of zoeken'],
    '03-kochbuch': ['25 eiwitrijke recepten', 'met macro’s & portiecalculator'],
    '04-training': ['Zie wat je traint', 'spierheatmap & weekschema'],
    '05-peak-programme': ['21 trainingsprogramma’s', 'kracht, cardio, HIIT & vechtsport'],
    '06-uebungen': ['Meer dan 240 oefeningen', 'met uitleg & animatie'],
  },
  pl: {
    '01-dashboard': ['Trening i odżywianie', 'w jednej aplikacji'],
    '02-ernaehrung': ['Kalorie i makro', 'ze zdjęcia, kodu lub wyszukiwarki'],
    '03-kochbuch': ['25 białkowych przepisów', 'z makro i kalkulatorem porcji'],
    '04-training': ['Zobacz, co trenujesz', 'mapa mięśni i plan tygodnia'],
    '05-peak-programme': ['21 programów treningowych', 'siła, cardio, HIIT i sporty walki'],
    '06-uebungen': ['Ponad 240 ćwiczeń', 'z instrukcją i animacją'],
  },
  it: {
    '01-dashboard': ['Allenamento e nutrizione', 'in un’unica app'],
    '02-ernaehrung': ['Calorie e macro', 'con foto, barcode o ricerca'],
    '03-kochbuch': ['25 ricette proteiche', 'con macro e calcolo delle porzioni'],
    '04-training': ['Guarda cosa alleni', 'mappa muscolare e piano settimanale'],
    '05-peak-programme': ['21 programmi', 'forza, cardio, HIIT e arti marziali'],
    '06-uebungen': ['Oltre 240 esercizi', 'con guida e animazione'],
  },
  tr: {
    '01-dashboard': ['Antrenman ve beslenme', 'tek bir uygulamada'],
    '02-ernaehrung': ['Kalori ve makrolar', 'fotoğraf, barkod veya aramayla'],
    '03-kochbuch': ['25 proteinli tarif', 'makrolar ve porsiyon hesabıyla'],
    '04-training': ['Neyi çalıştırdığını gör', 'kas haritası ve haftalık plan'],
    '05-peak-programme': ['21 program', 'güç, kardiyo, HIIT ve dövüş sporları'],
    '06-uebungen': ['240’tan fazla egzersiz', 'açıklama ve animasyonla'],
  },
  ja: {
    '01-dashboard': ['トレーニングと食事を', '1 つのアプリで'],
    '02-ernaehrung': ['カロリーとマクロ', '写真・バーコード・検索で記録'],
    '03-kochbuch': ['高たんぱくレシピ 25 品', 'マクロ表示と分量計算つき'],
    '04-training': ['鍛えた部位がひと目で', '筋肉マップと週間プラン'],
    '05-peak-programme': ['21 のプログラム', '筋トレ・有酸素・HIIT・格闘技'],
    '06-uebungen': ['240 種類以上のエクササイズ', '解説とアニメーションつき'],
  },
  ko: {
    '01-dashboard': ['운동과 식단을', '하나의 앱으로'],
    '02-ernaehrung': ['칼로리와 매크로', '사진·바코드·검색으로 기록'],
    '03-kochbuch': ['고단백 레시피 25가지', '매크로와 분량 계산 포함'],
    '04-training': ['단련한 부위를 한눈에', '근육 맵과 주간 플랜'],
    '05-peak-programme': ['21가지 프로그램', '근력·유산소·HIIT·격투기'],
    '06-uebungen': ['240가지 이상의 운동', '설명과 애니메이션 포함'],
  },
  zh: {
    '01-dashboard': ['训练与饮食', '尽在一个应用'],
    '02-ernaehrung': ['热量与宏量营养素', '拍照、扫码或搜索记录'],
    '03-kochbuch': ['25 道高蛋白食谱', '含宏量营养素和份量计算'],
    '04-training': ['练了哪里，一目了然', '肌肉热图与每周计划'],
    '05-peak-programme': ['21 套训练计划', '力量、有氧、HIIT、格斗'],
    '06-uebungen': ['240 多种训练动作', '附说明和动画'],
  },
};

const schrift = (g) => fs.readFileSync(
  path.join(ROOT, `node_modules/@fontsource/inter/files/inter-latin-${g}-normal.woff2`)).toString('base64');
const FONTS = `
  @font-face{font-family:Inter;font-weight:500;src:url(data:font/woff2;base64,${schrift(500)})}
  @font-face{font-family:Inter;font-weight:800;src:url(data:font/woff2;base64,${schrift(800)})}`;

function html({ w, h }, bild, [titel, unter], rtl) {
  const quer = w / h > 0.7;                // iPad: Gerät schmaler, Text größer
  const rand = Math.round(w * 0.055);
  const kopf = Math.round(h * (quer ? 0.2 : 0.205));
  // iPad: Die App ist dort eine Spalte von max-w-lg (512 CSS-px = mittlere Hälfte
  // des Rohbilds), daneben nur Hintergrund. Ganz gezeigt wirkte das Bild leer
  // und winzig — gezeigt wird deshalb nur die Spalte, dafür groß.
  const gw = Math.round(w * (quer ? 0.44 : 0.8)); // Gerätebreite
  const radius = Math.round(gw * 0.09);
  const fs1 = Math.round(w * (quer ? 0.058 : 0.083));
  return `<!doctype html><html dir="${rtl ? 'rtl' : 'ltr'}"><head><meta charset="utf-8"><style>${FONTS}
    *{margin:0;box-sizing:border-box}
    body{width:${w}px;height:${h}px;overflow:hidden;font-family:Inter,'DejaVu Sans',sans-serif;
      background:radial-gradient(ellipse 90% 55% at 50% 100%,#3a2a08 0%,#0b0b0b 70%),#0b0b0b}
    .kopf{height:${kopf}px;padding:0 ${rand}px;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;gap:${Math.round(fs1 * 0.3)}px}
    h1{font-weight:800;font-size:${fs1}px;line-height:1.08;color:#fef3c7;letter-spacing:-0.02em}
    p{font-weight:500;font-size:${Math.round(fs1 * 0.5)}px;color:#fbbf24}
    .geraet{direction:ltr;position:absolute;left:50%;transform:translateX(-50%);top:${kopf}px;width:${gw}px;
      border-radius:${radius}px;border:${Math.round(gw * 0.018)}px solid #222;overflow:hidden;
      box-shadow:0 0 0 ${Math.round(gw * 0.004)}px #fbbf2455,0 ${Math.round(h * 0.02)}px ${Math.round(h * 0.06)}px #000c}
    .geraet img{display:block;width:${quer ? '200%' : '100%'};margin-left:${quer ? '-50%' : '0'}}
  </style></head><body>
    <div class="kopf"><h1>${titel}</h1><p>${unter}</p></div>
    <div class="geraet"><img src="data:image/png;base64,${bild}"></div>
  </body></html>`;
}

const sprachen = (process.env.SPRACHEN || Object.keys(TEXTE).join(',')).split(',').map((s) => s.trim());
const browser = await chromium.launch({ executablePath: CHROME, args: ['--no-sandbox'] });
let fehlt = 0;
for (const lang of sprachen) {
  for (const g of GERAETE) {
    const roh = path.join(ROOT, 'store-assets/roh', lang, g.dir);
    if (!fs.existsSync(roh)) { console.log(`⚠ ${lang}/${g.dir}: keine Rohbilder — erst store-screenshots.mjs`); fehlt++; continue; }
    const ziel = path.join(ROOT, 'store-assets', lang === 'de' ? '' : lang, g.dir);
    fs.mkdirSync(ziel, { recursive: true });
    const page = await browser.newPage({ viewport: { width: g.w, height: g.h }, deviceScaleFactor: 1 });
    for (const [motiv, text] of Object.entries(TEXTE[lang])) {
      const datei = path.join(roh, `${motiv}.png`);
      if (!fs.existsSync(datei)) { console.log(`⚠ fehlt: ${datei}`); fehlt++; continue; }
      await page.setContent(html(g, fs.readFileSync(datei).toString('base64'), text, lang === 'ar'));
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({ path: path.join(ziel, `${motiv}.png`) });
    }
    await page.close();
    console.log(`✓ ${lang} · ${g.dir} → ${path.relative(ROOT, ziel)}`);
  }
}
await browser.close();
if (fehlt) process.exit(1);
