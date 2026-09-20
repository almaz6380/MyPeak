/**
 * Store-Screenshots fuer App Store und Play Console.
 *
 *   npm run build && npx vite preview --port 4173 &
 *   node scripts/store-screenshots.mjs
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

const today = new Date().toISOString().slice(0, 10);
const daysAgo = (n) => new Date(Date.now() - n * 864e5).toISOString().slice(0, 10);

// Demo-Daten im Stil der bisherigen Screenshots (Alex, ~1970 kcal, 2,3 L Wasser).
export function demoData(date) {
  const meal = (slot, name, kcal, p, c, f) => ({
    id: `demo-${slot}-${name}`, date, meal_slot: slot, food_name: name,
    serving_size: '1 Portion', calories: kcal, protein: p, carbs: c, fat: f, source: 'demo',
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
    language: 'de',
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
      meal('breakfast', 'Haferflocken mit Beeren', 420, 14, 62, 11),
      meal('breakfast', 'Magerquark', 180, 30, 8, 1),
      meal('lunch', 'Hähnchenbrust mit Reis', 610, 52, 74, 12),
      meal('lunch', 'Gemischter Salat', 120, 4, 12, 6),
      meal('dinner', 'Lachsfilet mit Kartoffeln', 540, 45, 48, 18),
      meal('snack', 'Proteinshake', 102, 25, 4, 2),
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
    workouts: JSON.stringify([
      { id: 'd0', date, type: 'strength', duration_minutes: 68, name: 'Push',
        exercises: [
          { id: 'bench-press', name: 'Bankdrücken', sets: [
            { reps: 8, weight: 82.5, unit: 'kg', completed: true },
            { reps: 8, weight: 85, unit: 'kg', completed: true },
            { reps: 6, weight: 87.5, unit: 'kg', completed: true }] },
          { id: 'incline-dumbbell-press', name: 'Schrägbankdrücken', sets: [
            { reps: 10, weight: 30, unit: 'kg', completed: true },
            { reps: 10, weight: 30, unit: 'kg', completed: true }] },
        ] },
      { id: 'd1', date: daysAgo(1), type: 'strength', duration_minutes: 64, name: 'Push',
        exercises: [
          { id: 'bench-press', name: 'Bankdrücken', sets: [
            { reps: 8, weight: 82.5, unit: 'kg', completed: true },
            { reps: 8, weight: 82.5, unit: 'kg', completed: true },
            { reps: 7, weight: 85, unit: 'kg', completed: true }] },
          { id: 'overhead-press', name: 'Schulterdrücken', sets: [
            { reps: 10, weight: 45, unit: 'kg', completed: true },
            { reps: 9, weight: 45, unit: 'kg', completed: true }] },
        ] },
      { id: 'd2', date: daysAgo(3), type: 'strength', duration_minutes: 71, name: 'Pull',
        exercises: [
          { id: 'deadlift', name: 'Kreuzheben', sets: [
            { reps: 5, weight: 140, unit: 'kg', completed: true },
            { reps: 5, weight: 140, unit: 'kg', completed: true }] },
        ] },
      { id: 'd3', date: daysAgo(5), type: 'strength', duration_minutes: 58, name: 'Beine',
        exercises: [
          { id: 'squat', name: 'Kniebeuge', sets: [
            { reps: 6, weight: 115, unit: 'kg', completed: true },
            { reps: 6, weight: 115, unit: 'kg', completed: true }] },
        ] },
    ]),
    user_xp: JSON.stringify({ total_xp: 2450, level: 5, streak_days: 5 }),
    supplements_list: JSON.stringify([
      { id: 's1', name: 'Kreatin', brand: 'Monohydrat', form: 'pulver', dosage: '5 g',
        schedule: { days: [0,1,2,3,4,5,6], times: ['morning'] }, deleted: false },
      { id: 's2', name: 'Vitamin D3', brand: '', form: 'tablette', dosage: '2000 IE',
        schedule: { days: [0,1,2,3,4,5,6], times: ['morning'] }, deleted: false },
      { id: 's3', name: 'Omega-3', brand: '', form: 'tablette', dosage: '2 g',
        schedule: { days: [0,1,2,3,4,5,6], times: ['evening'] }, deleted: false },
    ]),
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
  { file: '05-peak-programme', route: '/training', text: 'Peak-Programme' },
  { file: '06-uebungen',       route: '/training', text: 'Übungen' },
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
    await page.addStyleTag({ content: '[class*="amber-50"]:has-text("Gastmodus"){display:none}' }).catch(() => {});
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

async function shoot(browser, device) {
  const outDir = path.join(ROOT, 'store-assets', device.dir);
  fs.mkdirSync(outDir, { recursive: true });

  const ctx = await browser.newContext({
    viewport: { width: device.width, height: device.height },
    deviceScaleFactor: device.scale,
    locale: 'de-DE',
    colorScheme: 'light',
    isMobile: device.dir !== 'ios-ipad',
    hasTouch: true,
  });

  const data = demoData(today);
  await ctx.addInitScript((seed) => {
    for (const [k, v] of Object.entries(seed)) localStorage.setItem(k, v);
  }, data);

  const page = await ctx.newPage();
  const results = [];

  const tidy = tidyMacher(page);

  for (const shot of SHOTS) {
    await page.goto(BASE + shot.route, { waitUntil: 'networkidle' }).catch(() => {});
    await sleep(900);

    const target = shot.selector
      ? page.locator(shot.selector).first()
      : shot.text ? page.getByText(shot.text, { exact: true }).first() : null;
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

  await ctx.close();
  return results;
}

// ⚠ Nur bei DIREKTEM Aufruf laufen. social-schirme.mjs importiert demoData
// und tidyMacher aus dieser Datei; ohne diese Pruefung wuerde jeder Import
// alle achtzehn Store-Bilder neu erzeugen — und ein Renderunterschied waere
// still in den Store gewandert, ohne dass jemand danach gefragt hat.
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const browser = await chromium.launch({ executablePath: CHROME, args: ['--no-sandbox'] });
  for (const device of DEVICES) {
    console.log(`\n■ ${device.label} → store-assets/${device.dir}`);
    for (const line of await shoot(browser, device)) console.log(line);
  }
  await browser.close();
  console.log('\nFertig.');
}
