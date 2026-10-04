// Smoke-Test gegen die LIVE Web-App (fullrep.pages.dev) mit dem Review-Konto.
//
// Prueft, was Unit-Tests nicht sehen: Rendert jede Hauptseite ohne
// Seitenfehler, welche Requests scheitern, bleibt die Navigation benutzbar.
// Bewusst gegen live statt gegen einen lokalen Build — Josef nutzt live.
//
// Aufruf: node scripts/smoke-live.mjs   (Zugang: Review-Konto, s. CLAUDE.md)
import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

// ⚠ Live geht aus dieser Umgebung NICHT: Chromium kommt weder direkt noch
// ueber den Agent-Proxy zu externen Hosts (ERR_CONNECTION_RESET; curl schon).
// Deshalb laeuft der Test standardmaessig gegen den LOKALEN Build im
// GASTMODUS — identischer Code wie deployed, komplett ohne Netz. Fuer einen
// echten Live-Lauf (z. B. am Mac): BASIS=https://fullrep.pages.dev setzen.
const BASIS = process.env.BASIS ?? 'http://127.0.0.1:5180'; // vite preview (SPA-Fallback!)
const GAST = BASIS.includes('127.0.0.1') || BASIS.includes('localhost');
const OUT = process.env.SHOTS ?? new URL('../out/smoke/', import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });

// ⚠ In der Claude-Cloud-Sitzung geht ausgehendes HTTPS nur ueber den
// Agent-Proxy (HTTPS_PROXY). curl nutzt ihn automatisch, Chromium nicht —
// ohne diese Zeilen endet jeder goto auf eine echte Domain mit
// ERR_CONNECTION_RESET. ignoreHTTPSErrors, weil der Proxy die Verbindung mit
// eigener CA aufbricht (Buendel: /root/.ccr/ca-bundle.crt).
// Nur fuer EXTERNE Ziele — fuer localhost MUSS der Proxy aus bleiben, sonst
// beantwortet seine Fehlerseite jede Anfrage und der Test prueft gar nichts
// (der erste Lauf lieferte genau so acht "fehlerfreie" Proxy-Fehlerseiten).
const extern = !BASIS.includes('127.0.0.1') && !BASIS.includes('localhost');
const proxy = extern && process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined;
const b = await chromium.launch({ executablePath: process.env.CHROMIUM_PFAD ?? '/opt/pw-browsers/chromium', proxy });
const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, locale: 'de-AT',
  ignoreHTTPSErrors: !!proxy });
const p = await ctx.newPage();

const fehler = [];   // Seitenfehler (unbehandelte Ausnahmen)
const kaputt = [];   // HTTP >= 400
const konsole = [];  // console.error
p.on('pageerror', (e) => fehler.push(e.message));
p.on('console', (m) => { if (m.type() === 'error') konsole.push(m.text().slice(0, 200)); });
p.on('response', (r) => {
  if (r.status() >= 400 && !r.url().includes('favicon')) kaputt.push(`${r.status()} ${r.request().method()} ${r.url()}`);
});

let n = 0;
const halt = async (name) => {
  await p.waitForTimeout(1200);
  await p.screenshot({ path: `${OUT}${String(++n).padStart(2, '0')}-${name}.png` });
  console.log(`  ${String(n).padStart(2, '0')} ${name}  (Fehler bisher: ${fehler.length}, kaputte Requests: ${kaputt.length})`);
};

if (GAST) await ctx.addInitScript(() => localStorage.setItem('guestMode', 'true'));
console.log(GAST ? 'Gastmodus (lokal) …' : 'Anmelden …');
await p.goto(`${BASIS}/`, { waitUntil: 'networkidle' });
await halt('start');

// Login-Formular (AuthPage): E-Mail + Passwort.
const mail = p.locator('input[type=email]').first();
if (!GAST && await mail.count()) {
  await mail.fill('appreview@wellbooked.at');
  await p.locator('input[type=password]').first().fill('MyPeak-Review#2026');
  await p.locator('button[type=submit], button:has-text("Anmelden"), button:has-text("Login"), button:has-text("Log in")').first().click();
  await p.waitForTimeout(3500);
  await halt('nach-login');
} else {
  console.log('  – kein Login-Formular (schon eingeloggt?)');
}

for (const pfad of ['/', '/training', '/nutrition', '/library', '/progress', '/profile', '/coach']) {
  await p.goto(`${BASIS}${pfad}`, { waitUntil: 'networkidle' }).catch((e) => fehler.push(`goto ${pfad}: ${e.message.split('\n')[0]}`));
  await halt(pfad === '/' ? 'home' : pfad.slice(1));
}

console.log('\n— Seitenfehler:', fehler.length ? '' : 'keine');
for (const f of [...new Set(fehler)]) console.log('  ✗', f);
console.log('— Kaputte Requests:', kaputt.length ? '' : 'keine');
for (const k of [...new Set(kaputt)]) console.log('  ✗', k);
console.log('— console.error:', konsole.length ? '' : 'keine');
for (const k of [...new Set(konsole)].slice(0, 10)) console.log('  ·', k);

await b.close();
