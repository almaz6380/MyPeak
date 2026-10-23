/**
 * Store-Screenshots fuer App Store und Play Console.
 *
 *   npm run build && npx vite preview --port 4173 &
 *   SPRACHEN=de,en node scripts/store-screenshots.mjs   # Standard: alle sechs
 *   node scripts/store-rahmen.mjs                       # Überschrift + Rahmen drum
 *
 * Seit 10/2026 schreibt dieses Skript ROHBILDER nach store-assets/roh/<lang>/
 * (gitignored). Was in den Store geht, baut store-rahmen.mjs daraus — nackte
 * App-Bildschirme ohne Aussage haben im Store nichts verkauft.
 *
 * Laeuft im Gastmodus: der schreibt und liest ausschliesslich localStorage und
 * macht keinen einzigen Netzaufruf. Deshalb braucht es weder Supabase-Zugang
 * noch den Review-Account. Die Demo-Daten werden per addInitScript gesetzt,
 * also bevor die App startet.
 *
 * Chromium liegt unter /opt/pw-browsers (PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1),
 * wird also nicht nachgeladen.
 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { peakPrograms } from '../src/data/peakPrograms.js';

const BASE = process.env.PREVIEW_URL || 'http://localhost:4173';
const ROOT = path.resolve(import.meta.dirname, '..');
const CHROME = process.env.CHROME_BIN
  || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

// Formate exakt wie die bereits von Apple akzeptierten Bestandsdateien.
const DEVICES = [
  { dir: 'ios',      width: 440, height: 956, scale: 3, label: 'iPhone 6,9"' },
  { dir: 'ios-ipad', width: 1024, height: 1366, scale: 2, label: 'iPad 12,9"' },
  { dir: 'android',  width: 360, height: 640, scale: 3, label: 'Android' },
];

// Lokales Datum, nicht UTC: abends liefe toISOString() sonst schon auf morgen.
const lokal = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const today = lokal(new Date());
const daysAgo = (n) => lokal(new Date(Date.now() - n * 864e5));

export const SPRACHEN = ['de', 'en', 'es', 'fr', 'pt', 'ar', 'nl', 'pl', 'it', 'tr', 'ja'];

// Was auf den Bildern als Eintrag steht, muss in der Sprache des Bildes stehen —
// ein englischer Store mit „Haferflocken mit Beeren“ wirkt wie eine Fremd-App.
const SPEISEN = {
  de: ['Haferflocken mit Beeren', 'Magerquark', 'Hähnchenbrust mit Reis', 'Gemischter Salat', 'Lachsfilet mit Kartoffeln', 'Proteinshake'],
  en: ['Oatmeal with berries', 'Low-fat quark', 'Chicken breast with rice', 'Mixed salad', 'Salmon with potatoes', 'Protein shake'],
  es: ['Avena con frutos rojos', 'Queso fresco batido', 'Pechuga de pollo con arroz', 'Ensalada mixta', 'Salmón con patatas', 'Batido de proteínas'],
  fr: ['Flocons d’avoine aux baies', 'Fromage blanc 0 %', 'Blanc de poulet et riz', 'Salade composée', 'Saumon et pommes de terre', 'Shake protéiné'],
  pt: ['Aveia com frutas vermelhas', 'Queijo quark magro', 'Peito de frango com arroz', 'Salada mista', 'Salmão com batatas', 'Shake de proteína'],
  ar: ['شوفان مع التوت', 'جبن قريش قليل الدسم', 'صدر دجاج مع أرز', 'سلطة مشكّلة', 'سلمون مع بطاطس', 'مخفوق بروتين'],
  nl: ['Havermout met bessen', 'Magere kwark', 'Kipfilet met rijst', 'Gemengde salade', 'Zalm met aardappelen', 'Eiwitshake'],
  pl: ['Owsianka z owocami jagodowymi', 'Chudy twaróg', 'Pierś z kurczaka z ryżem', 'Sałatka mieszana', 'Łosoś z ziemniakami', 'Shake proteinowy'],
  it: ['Fiocchi d’avena con frutti di bosco', 'Quark magro', 'Petto di pollo con riso', 'Insalata mista', 'Salmone con patate', 'Shake proteico'],
  tr: ['Orman meyveli yulaf ezmesi', 'Yağsız lor peyniri', 'Pilavlı tavuk göğsü', 'Karışık salata', 'Patatesli somon', 'Protein shake'],
  ja: ['ベリー入りオートミール', '低脂肪クワルク', '鶏むね肉とごはん', 'ミックスサラダ', 'サーモンとじゃがいも', 'プロテインシェイク'],
};
const PRAEPARATE = {
  de: ['Kreatin', 'Vitamin D3', 'Omega-3'],
  en: ['Creatine', 'Vitamin D3', 'Omega-3'],
  es: ['Creatina', 'Vitamina D3', 'Omega-3'],
  fr: ['Créatine', 'Vitamine D3', 'Oméga-3'],
  pt: ['Creatina', 'Vitamina D3', 'Ômega-3'],
  ar: ['كرياتين', 'فيتامين د3', 'أوميغا 3'],
  nl: ['Creatine', 'Vitamine D3', 'Omega-3'],
  pl: ['Kreatyna', 'Witamina D3', 'Omega-3'],
  it: ['Creatina', 'Vitamina D3', 'Omega-3'],
  tr: ['Kreatin', 'D3 vitamini', 'Omega-3'],
  ja: ['クレアチン', 'ビタミン D3', 'オメガ 3'],
};
// Eine volle Push/Pull/Legs-Woche bis heute, damit die Heatmap Farbe hat.
const PUSH = [['bench-press', 'exercises.benchPress', 80, 8], ['incline-dumbbell-press', 'exercises.inclineDumbbellPress', 30, 10], ['overhead-press', 'exercises.overheadPress', 45, 10]];
const PULL = [['deadlift', 'exercises.deadlift', 135, 5], ['barbell-row', 'exercises.barbellRow', 70, 10], ['pull-ups', 'exercises.pullUps', 0, 10], ['lat-pulldown', 'exercises.latPulldown', 60, 12]];
const LEGS = [['squat', 'exercises.squat', 110, 6], ['leg-press', 'exercises.legPress', 180, 12]];
const DEMO_WOCHE = [[0, 'Legs', LEGS], [1, 'Pull', PULL], [2, 'Push', PUSH], [3, 'Legs', LEGS], [4, 'Pull', PULL], [5, 'Push', PUSH]];
const TAGE = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

// Ein aktives Peak-Programm, damit die „Heute“-Karte eine Einheit zeigt statt
// „Kein Plan aktiv“. Form wie PeakPrograms.jsx beim Aktivieren (inkl. _meta).
async function aktivesProgramm(lang, date) {
  const p = peakPrograms.find((x) => x.id === 'ppl_6x');
  let name = lang === 'de' ? p.nameDE : p.nameEN; // sprachweiche-ok: Rückfall, Pakete unten
  if (!['de', 'en'].includes(lang)) {
    const paket = (await import(`../src/data/${lang}/programme.js`)).default;
    name = paket[p.id]?.name || name;
  }
  const days = { ...p.days };
  const heute = TAGE[new Date(date + 'T12:00:00').getDay()];
  if (!days[heute]) days[heute] = days.mon; // an einem Ruhetag zeigt die Karte sonst „Ruhetag“
  days._meta = { programId: p.id, startedAt: daysAgo(10), durationWeeks: p.duration_weeks };
  return [{ id: 'demo-schedule', user_id: 'guest', name, sessions_per_week: p.sessions_per_week,
    days, is_active: true, created_at: new Date().toISOString() }];
}

// Demo-Daten im Stil der bisherigen Screenshots (Alex, ~1970 kcal, 2,3 L Wasser).
export async function demoData(date, lang = 'de') {
  const essen = SPEISEN[lang] || SPEISEN.en;
  const mittel = PRAEPARATE[lang] || PRAEPARATE.en;
  const jedenTag = (slot) => Object.fromEntries(TAGE.map((t) => [t, [slot]]));
  const meal = (slot, name, kcal, p, c, f, fiber) => ({
    id: `demo-${slot}-${name}`, date, meal_slot: slot, food_name: name,
    serving_size: '1', calories: kcal, protein: p, carbs: c, fat: f, fiber, source: 'demo',
  });
  return {
    // Gastmodus ist noetig: ohne ihn validiert die App die Session gegen
    // Supabase, was hier fehlschlaegt -> Login-Seite. Er bringt zwei
    // Darstellungsartefakte mit (Hinweisbanner, Name "Gast"), die unten beim
    // Aufnehmen entfernt werden — beides existiert im echten, angemeldeten
    // Betrieb nicht. Mit einer echten .env laeuft das Skript ohne diesen Kniff.
    guestMode: 'true',

    splashSeen: 'true',
    themeChosen: 'true',
    darkMode: 'false',
    language: lang,
    weightUnit: 'kg',
    localDataOwner: 'demo-user',
    cachedUser: JSON.stringify({ id: 'demo-user', email: 'alex@example.com' }),
    cachedProfile: JSON.stringify({
      id: 'demo-user', name: 'Alex', gender: 'male', age: 29,
      weight_kg: 76, height_cm: 181, goal: 'muscle_gain',
      activity_level: 'moderate', experience: 'intermediate', onboarding_completed: true,
    }),
    nutrition_goals: JSON.stringify({
      calories: 2400, protein: 190, carbs: 240, fat: 70, fiber: 30, water_ml: 3000,
    }),
    [`nutrition_entries_${date}`]: JSON.stringify([
      meal('breakfast', essen[0], 420, 14, 62, 11, 8),
      meal('breakfast', essen[1], 180, 30, 8, 1, 0),
      meal('lunch', essen[2], 610, 52, 74, 12, 3),
      meal('lunch', essen[3], 120, 4, 12, 6, 4),
      meal('dinner', essen[4], 540, 45, 48, 18, 5),
      meal('snack', essen[5], 102, 25, 4, 2, 1),
    ]),
    // Form beachten: HomePage liest waterData.total, nicht die nackte Zahl.
    [`water_${date}`]: JSON.stringify({ total: 2300, entries: [
      { id: 'w1', amount_ml: 500 }, { id: 'w2', amount_ml: 500 },
      { id: 'w3', amount_ml: 800 }, { id: 'w4', amount_ml: 500 },
    ] }),
    weight_entries: JSON.stringify(
      Array.from({ length: 26 }, (_, i) => ({
        id: `w${i}`, date: daysAgo(90 - i * 3),
        weight_kg: +(78.4 - i * 0.09 + Math.sin(i * 1.7) * 0.35).toFixed(1),
      })),
    ),
    // Form wie ActiveWorkout.jsx speichert: exerciseId + nameKey + unit.
    // Mit `id`/`name` (alte Fassung) fand die Muskel-Heatmap nichts → leer.
    workouts: JSON.stringify(DEMO_WOCHE.map(([tageZurueck, name, uebungen], i) => ({
      id: `d${i}`, date: daysAgo(tageZurueck), type: 'strength', duration_minutes: 58 + i * 3, name,
      exercises: uebungen.map(([exerciseId, nameKey, kg, reps]) => ({
        exerciseId, nameKey, unit: 'kg',
        sets: [0, 1, 2].map((n) => ({ reps: reps - (n === 2 ? 1 : 0), weight: kg + n * 2.5 })),
      })),
    }))),
    user_xp: JSON.stringify({ total_xp: 2450, level: 5, streak_days: 5 }),
    // Form wie supplementStorage: schedule = { mon: ['morning'], … } je Wochentag.
    // Die alte Fassung ({days, times}) las die App nicht → „Supplements 0/0“.
    supplements_list: JSON.stringify([
      { id: 's1', name: mittel[0], brand: '', form: 'pulver', dosage: '5 g', schedule: jedenTag('morning'), deleted: false },
      { id: 's2', name: mittel[1], brand: '', form: 'tablette', dosage: '2000 IE', schedule: jedenTag('morning'), deleted: false },
      { id: 's3', name: mittel[2], brand: '', form: 'tablette', dosage: '2 g', schedule: jedenTag('evening'), deleted: false },
    ]),
    [`supplement_logs_${date}`]: JSON.stringify([
      { id: 'l1', supplement_id: 's1', date, time_slot: 'morning' },
      { id: 'l2', supplement_id: 's2', date, time_slot: 'morning' },
    ]),
    weekly_schedules: JSON.stringify(await aktivesProgramm(lang, date)),
  };
}

// Die sechs Motive. Kochbuch, Peak-Programme und Uebungen haben keine eigene
// Route — sie sind Unteransichten und muessen angeklickt werden. Selektoren
// ueber sichtbaren Text, nicht ueber CSS-Klassen (die brechen leicht).
const SHOTS = [
  { file: '01-dashboard',      route: '/' },
  { file: '02-ernaehrung',     route: '/nutrition' },
  { file: '03-kochbuch',       route: '/nutrition', selector: 'button:has(.lucide-book-open)' },
  { file: '04-training',       route: '/training' },
  { file: '05-peak-programme', route: '/training', key: 'ui.programs' },
  { file: '06-uebungen',       route: '/training', key: 'training.exercises' },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Gastmodus-Artefakte kaschieren: Das Hinweisbanner und der Platzhaltername
 * "Gast" sind Folgen der fehlenden Anmeldung, nicht des Produkts. Im echten
 * Betrieb steht dort der Name des Nutzers und kein Banner.
 *
 * ⚠ Seit 20.09.2026 eine exportierte Fabrik statt einer inneren Funktion —
 * social-schirme.mjs nimmt Bildschirme auf, die im Store NICHT vorkommen, und
 * braucht dieselbe Kaschierung. Eine zweite Kopie waere in dem Moment falsch,
 * in dem sich der Gastmodus-Banner aendert, und niemand haette es gemerkt:
 * Das Bild saehe nur einmal anders aus.
 */
export function tidyMacher(page, DEMO_NAME = 'Alex') {
  return async function tidy() {
    // Der Banner (App.jsx) ist das einzige bg-amber-50 mit border-b ganz oben —
    // über die Klasse statt über den Text, sonst bliebe er auf Englisch stehen.
    await page.addStyleTag({ content: 'div.bg-amber-50.border-b{display:none!important}' }).catch(() => {});
    await page.evaluate((name) => {
      document.querySelectorAll('*').forEach((el) => {
        if (el.children.length === 0 && /Gastmodus/.test(el.textContent || '')) {
          const banner = el.closest('div');
          if (banner) banner.style.display = 'none';
        }
      });
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let n;
      while ((n = walker.nextNode())) {
        if (n.nodeValue && n.nodeValue.includes('Gast') && !n.nodeValue.includes('Gastmodus')) {
          n.nodeValue = n.nodeValue.replace(/\bGast\b/g, name);
        }
      }
    }, DEMO_NAME).catch(() => {});
  };
}

// Text eines i18n-Schlüssels in der Sprache des Bildes — damit die Klickziele
// („Übungen“, „Programme“) in jeder Sprache gefunden werden.
function uebersetzung(lang, key) {
  const d = JSON.parse(fs.readFileSync(path.join(ROOT, `src/i18n/locales/${lang}.json`), 'utf8'));
  return key.split('.').reduce((o, k) => o?.[k], d);
}

const BROWSER_LOCALE = { de: 'de-DE', en: 'en-US', es: 'es-ES', fr: 'fr-FR', pt: 'pt-BR', ar: 'ar', nl: 'nl-NL', pl: 'pl-PL', it: 'it-IT', tr: 'tr-TR', ja: 'ja-JP' };

async function shoot(browser, device, lang) {
  const outDir = path.join(ROOT, 'store-assets', 'roh', lang, device.dir);
  fs.mkdirSync(outDir, { recursive: true });

  const ctx = await browser.newContext({
    viewport: { width: device.width, height: device.height },
    deviceScaleFactor: device.scale,
    locale: BROWSER_LOCALE[lang],
    colorScheme: 'light',
    isMobile: device.dir !== 'ios-ipad',
    hasTouch: true,
  });

  const data = await demoData(today, lang);
  await ctx.addInitScript((seed) => {
    for (const [k, v] of Object.entries(seed)) localStorage.setItem(k, v);
  }, data);

  const page = await ctx.newPage();
  const fehler = [];
  page.on('pageerror', (e) => fehler.push(e.message));
  const results = [];

  const tidy = tidyMacher(page);

  for (const shot of SHOTS) {
    await page.goto(BASE + shot.route, { waitUntil: 'networkidle' }).catch(() => {});
    await sleep(900);

    const text = shot.key ? uebersetzung(lang, shot.key) : shot.text;
    const target = shot.selector
      ? page.locator(shot.selector).first()
      : text ? page.getByText(text, { exact: true }).first() : null;
    if (target) {
      if (await target.count().catch(() => 0)) {
        await target.click({ timeout: 5000 }).catch(() => {});
        await sleep(1100);
      } else {
        results.push(`   ⚠ Einstieg für ${shot.file} nicht gefunden — zeigt die Übersicht`);
      }
    }

    await tidy();
    const file = path.join(outDir, `${shot.file}.png`);
    await page.screenshot({ path: file });
    results.push(`   ${shot.file}.png`);
  }
  if (fehler.length) results.push(`   ✗ Seitenfehler: ${fehler.join(' | ')}`);

  await ctx.close();
  return results;
}

// ⚠ Nur bei DIREKTEM Aufruf laufen. social-schirme.mjs importiert demoData
// und tidyMacher aus dieser Datei; ohne diese Pruefung wuerde jeder Import
// alle achtzehn Store-Bilder neu erzeugen — und ein Renderunterschied waere
// still in den Store gewandert, ohne dass jemand danach gefragt hat.
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const browser = await chromium.launch({ executablePath: CHROME, args: ['--no-sandbox'] });
  const sprachen = (process.env.SPRACHEN || SPRACHEN.join(',')).split(',').map((s) => s.trim());
  for (const lang of sprachen) {
    for (const device of DEVICES) {
      console.log(`\n■ ${lang} · ${device.label} → store-assets/roh/${lang}/${device.dir}`);
      for (const line of await shoot(browser, device, lang)) console.log(line);
    }
  }
  await browser.close();
  console.log('\nFertig.');
}
