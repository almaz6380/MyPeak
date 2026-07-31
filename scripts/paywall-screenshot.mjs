/**
 * Review-Screenshot der Paywall fuer App Store Connect.
 *
 * Apple verlangt zu jedem Abo einen Screenshot, der es in der App zeigt
 * ("Missing Metadata", solange er fehlt). Er wird nur der Pruefung gezeigt,
 * nicht im Store.
 *
 *   npm run build && npx vite preview --port 4173 &
 *   node scripts/paywall-screenshot.mjs
 *
 * Gastmodus wie in store-screenshots.mjs: kein Netzaufruf, keine Zugangsdaten.
 * Die Paywall hat keine eigene Route — sie oeffnet ueber die Premium-Karte im
 * Profil (ProfilePage.jsx:220 ruft openPaywall()).
 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const BASE = process.env.PREVIEW_URL || 'http://localhost:4173';
const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, 'store-assets', 'ios');
const CHROME = process.env.CHROME_BIN
  || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

const seed = {
  guestMode: 'true', splashSeen: 'true', themeChosen: 'true', darkMode: 'false',
  language: 'de', weightUnit: 'kg', localDataOwner: 'demo',
  cachedUser: JSON.stringify({ id: 'demo', email: 'alex@example.com' }),
  cachedProfile: JSON.stringify({
    id: 'demo', name: 'Alex', gender: 'male', age: 29, weight_kg: 76,
    height_cm: 181, goal: 'muscle_gain', activity_level: 'moderate',
    experience: 'intermediate', onboarding_completed: true,
  }),
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ executablePath: CHROME, args: ['--no-sandbox'] });
const ctx = await browser.newContext({
  viewport: { width: 440, height: 956 }, deviceScaleFactor: 3,
  locale: 'de-DE', colorScheme: 'light', isMobile: true, hasTouch: true,
});
await ctx.addInitScript((s) => {
  for (const [k, v] of Object.entries(s)) localStorage.setItem(k, v);
}, seed);

const page = await ctx.newPage();
await page.goto(`${BASE}/profile`, { waitUntil: 'networkidle' });
await sleep(900);

// Premium-Karte antippen — sie oeffnet die Paywall als Overlay.
const karte = page.getByText('FullRep Premium', { exact: true }).first();
if (!(await karte.count())) {
  console.error('Premium-Karte nicht gefunden — Profilseite geaendert?');
  process.exit(1);
}
await karte.click({ timeout: 5000 });
await sleep(1400);

// Gastmodus-Banner wegraeumen, im angemeldeten Betrieb steht es dort nicht.
await page.evaluate(() => {
  document.querySelectorAll('*').forEach((el) => {
    if (el.children.length === 0 && /Gastmodus/.test(el.textContent || '')) {
      const b = el.closest('div');
      if (b) b.style.display = 'none';
    }
  });
}).catch(() => {});

const text = await page.evaluate(() => document.body.innerText);
if (!/Premium|Abo|Monat/i.test(text)) {
  console.error('Paywall scheint nicht offen zu sein. Sichtbarer Text:\n' + text.slice(0, 300));
  process.exit(1);
}

const ziel = path.join(OUT, 'paywall-review.png');
await page.screenshot({ path: ziel });
console.log(`${path.relative(ROOT, ziel)} geschrieben`);
await browser.close();
