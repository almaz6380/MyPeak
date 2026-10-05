// Nährwerttabelle per Foto auslesen — Premium.
//
// Nimmt ein Foto der Nährwerttabelle einer Verpackung und gibt die Werte
// JE 100 g (bzw. 100 ml) zurück, damit der Client sie wie ein Lebensmittel aus
// der Suche in den Portionswähler legen kann.
//
// Anders als analyze-meal SCHÄTZT das Modell hier nichts: Es liest ab. Steht
// ein Wert nicht auf dem Foto, kommt er als fehlend zurück und wird nicht
// erfunden. Nur die Kalorien rechnen wir nach, wenn sie fehlen, die Makros
// aber lesbar sind (4/4/9) — das ist Arithmetik, keine Schätzung.

import { corsBehandeln } from './_cors.js';
import { apiSprache } from './_sprache.js';
import { premiumPruefen, SPRACHNAME, zahl } from './_premium.js';
import { kiJson, kiVerfuegbar, istRateLimit } from './_ki.js';

export const config = { maxDuration: 30 };

export function etikettPrompt(sprache) {
  const lang = apiSprache(sprache);
  return `You read the nutrition facts table on a food package photo.
Return ONLY JSON in this exact shape:
{"found": true, "name": "", "brand": "", "basis": "100g", "per100": {"calories": 0, "protein": 0, "carbs": 0, "sugar": 0, "fat": 0, "saturated_fat": 0, "fiber": 0, "salt": 0}, "serving_g": 0}

Rules:
- Read the values PER 100 g (or per 100 ml for drinks; then "basis": "100ml"). Use the per-100 column, not the per-serving column.
- If the label only shows values per serving AND states the serving weight, convert to per 100 and say so with "basis": "converted".
- calories in kcal. If only kJ is printed, divide by 4.184.
- Use null for any value that is not readable on the photo. Never guess or invent a value.
- "serving_g": the serving or package size in grams if printed, else null.
- "name" and "brand": as printed on the package if visible, else "". Do not translate brand names. If you write a generic name because none is printed, write it in ${SPRACHNAME[lang]}.
- If there is no nutrition table in the photo, return {"found": false}.`;
}

// Bringt die Modellantwort in eine feste Form. Exportiert für die Tests.
export function etikettNormalisieren(roh) {
  if (!roh || roh.found === false || typeof roh.per100 !== 'object' || roh.per100 === null) {
    return null;
  }
  const p = roh.per100;
  const lesbar = (v) => v !== null && v !== undefined && v !== '' && Number.isFinite(Number(v));
  const wert = (v, max) => (lesbar(v) ? Math.round(zahl(v, max) * 10) / 10 : null);

  const protein = wert(p.protein, 100);
  const carbs = wert(p.carbs, 100);
  const fat = wert(p.fat, 100);
  let calories = lesbar(p.calories) ? Math.round(zahl(p.calories, 1000)) : null;
  const kcalAbgelesen = calories !== null;
  if (calories === null && protein !== null && carbs !== null && fat !== null) {
    calories = Math.round(protein * 4 + carbs * 4 + fat * 9);
  }
  // Ohne Kalorien und ohne ein einziges Makro ist nichts abgelesen.
  if (calories === null && protein === null && carbs === null && fat === null) return null;

  const serving = lesbar(roh.serving_g) && Number(roh.serving_g) > 0 ? Math.round(zahl(roh.serving_g, 5000)) : null;
  return {
    name: String(roh.name || '').trim().slice(0, 120),
    brand: String(roh.brand || '').trim().slice(0, 80),
    basis: roh.basis === '100ml' ? '100ml' : (roh.basis === 'converted' ? 'converted' : '100g'),
    per100: {
      calories: calories ?? 0,
      protein: protein ?? 0,
      carbs: carbs ?? 0,
      fat: fat ?? 0,
      sugar: wert(p.sugar, 100),
      saturated_fat: wert(p.saturated_fat, 100),
      fiber: wert(p.fiber, 100),
      salt: wert(p.salt, 100),
    },
    // Welche Kernwerte wirklich auf dem Foto standen — der Client zeigt an,
    // was fehlte, statt eine 0 als abgelesen auszugeben.
    fehlend: [['calories', kcalAbgelesen ? calories : null], ['protein', protein], ['carbs', carbs], ['fat', fat]]
      .filter(([, v]) => v === null).map(([k]) => k),
    serving_g: serving,
  };
}

export default async function handler(req, res) {
  if (corsBehandeln(req, res)) return;
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  if (!kiVerfuegbar()) return res.status(503).json({ error: 'Service unavailable' });

  const pruefung = await premiumPruefen(req);
  if (pruefung.fehler) return res.status(pruefung.fehler.status).json(pruefung.fehler.body);

  const { image, language } = req.body || {};
  if (!image || typeof image !== 'string') return res.status(400).json({ error: 'No image provided' });
  const base64 = image.replace(/^data:image\/\w+;base64,/, '');
  if (base64.length > 4_000_000) return res.status(413).json({ error: 'image_too_large' });

  let roh;
  try {
    roh = await kiJson({ text: etikettPrompt(language), bildBase64: base64, maxTokens: 2048, timeoutMs: 25000 });
  } catch (err) {
    console.error('scan-label Modellfehler:', err?.message);
    if (String(err?.message) === 'gemini_429' || istRateLimit(err)) return res.status(429).json({ error: 'rate_limit' });
    return res.status(503).json({ error: 'ai_unavailable' });
  }

  const ergebnis = etikettNormalisieren(roh);
  if (!ergebnis) return res.status(422).json({ error: 'no_label_detected' });
  return res.status(200).json(ergebnis);
}
