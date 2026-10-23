// Sprachcode-Normalisierung für die Serverless-Funktionen.
//
// ⚠ Bewusst eine EIGENE Kopie der Liste, kein Import aus `src/lib/sprache.js`.
// Die Funktionen unter `api/` hängen sonst am Client-Bündel: Vercel baut sie
// getrennt, und `src/` zieht über andere Dateien React nach. Kein `api/`-Modul
// importiert deshalb aus `src/`.
//
// Der Preis dafür ist diese doppelte Liste. Wer eine Sprache ergänzt, muss
// BEIDE Stellen anfassen — `src/lib/sprache.js` und diese hier. Der Test
// `sprache-api.test.js` vergleicht sie und schlägt fehl, sobald sie
// auseinanderlaufen.
export const SPRACHEN = ['de', 'en', 'es', 'fr', 'pt', 'ar', 'nl'];

// Bildet `de-AT`, `pt-BR`, `ar-EG` … auf unsere Codes ab.
//
// ⚠ Der Rückfall ist ENGLISCH, nicht Deutsch. Vorher stand in `coach.js`
// `lang === 'en' ? 'en' : 'de'` — damit landete JEDE nicht-englische Sprache
// auf Deutsch, auch Spanisch, für das direkt darüber ein eigener Prompt stand.
// Ein spanischer Nutzer bekam deutsche Antworten, und der spanische Prompt war
// toter Code.
export function apiSprache(code) {
  return SPRACHEN.find((l) => String(code || '').startsWith(l)) || 'en';
}
