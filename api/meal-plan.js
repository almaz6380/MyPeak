// Personalisierter KI-Ernährungsplan — Premium.
//
// Baut aus den Tageszielen des Nutzers (kcal + Makros), seiner Ernährungsform
// und seinen Ausschlüssen einen Tagesplan mit konkreten Lebensmitteln und
// Grammangaben. Zählt gegen dasselbe Tageskontingent wie der Coach.
//
// Die Summen rechnet der SERVER aus den Einzelposten, nicht das Modell:
// Modelle addieren unzuverlässig, und eine Summe, die nicht zu den Zeilen
// darüber passt, zerstört das Vertrauen in den ganzen Plan.

import { corsBehandeln } from './_cors.js';
import { apiSprache } from './_sprache.js';
import {
  premiumPruefen, kontingentLesen, kontingentHochzaehlen, geminiJson,
  SPRACHNAME, TRIAL_LIMIT, PREMIUM_LIMIT, zahl,
} from './_premium.js';

export const config = { maxDuration: 30 };

export const ERNAEHRUNGSFORMEN = ['omnivore', 'vegetarian', 'vegan', 'pescetarian'];
// Dieselben Namen wie die App und die CHECK-Regel in nutrition_entries.
const SLOTS = ['breakfast', 'lunch', 'dinner', 'snack'];

// Eingabe absichern. Exportiert für die Tests.
export function eingabePruefen(body) {
  const z = body?.goals || {};
  const calories = Math.round(zahl(z.calories, 8000));
  if (calories < 1000) return null; // unter 1000 kcal plant die App keinen Tag
  const r = (v, max) => Math.round(zahl(v, max));
  return {
    goals: { calories, protein: r(z.protein, 500), carbs: r(z.carbs, 1000), fat: r(z.fat, 400) },
    diet: ERNAEHRUNGSFORMEN.includes(body?.diet) ? body.diet : 'omnivore',
    meals: [3, 4, 5].includes(Number(body?.meals)) ? Number(body.meals) : 4,
    exclude: String(body?.exclude || '').replace(/[\r\n]+/g, ' ').slice(0, 200),
    lang: apiSprache(body?.lang),
  };
}

export function planPrompt(e) {
  return `Create a one-day meal plan for a gym-goer.
Daily targets: ${e.goals.calories} kcal, ${e.goals.protein} g protein, ${e.goals.carbs} g carbohydrates, ${e.goals.fat} g fat.
Diet: ${e.diet}. Number of meals: ${e.meals} (use the slots breakfast, lunch, dinner and, if more than 3 meals, snack; with 5 meals use two meals with slot "snack").
${e.exclude ? `Never use these foods (allergies/dislikes, treat as strict): ${e.exclude}.` : ''}
Use simple, common foods from a normal supermarket, with realistic gram amounts. Nutrition values must be realistic for the stated amount.
Write every "title", "name" and "tip" in ${SPRACHNAME[e.lang]}.
Stay within ±5 % of the calorie target and close to the macro targets.
Return ONLY JSON:
{"meals": [{"slot": "breakfast", "title": "", "items": [{"name": "", "grams": 0, "calories": 0, "protein": 0, "carbs": 0, "fat": 0}]}], "tip": ""}
"tip": one short practical sentence (meal prep, timing or swaps). No medical claims.`;
}

// Modellantwort → feste Form mit nachgerechneten Summen. Exportiert für die Tests.
export function planNormalisieren(roh) {
  if (!roh || !Array.isArray(roh.meals)) return null;
  const r1 = (v) => Math.round(v * 10) / 10;
  const meals = roh.meals
    .filter((m) => m && Array.isArray(m.items))
    .map((m) => {
      const items = m.items
        .filter((i) => i && String(i.name || '').trim())
        .slice(0, 12)
        .map((i) => ({
          name: String(i.name).trim().slice(0, 80),
          grams: Math.round(zahl(i.grams, 3000)),
          calories: Math.round(zahl(i.calories, 3000)),
          protein: r1(zahl(i.protein, 300)),
          carbs: r1(zahl(i.carbs, 500)),
          fat: r1(zahl(i.fat, 300)),
        }));
      const summe = (k) => items.reduce((s, i) => s + i[k], 0);
      return {
        slot: SLOTS.includes(m.slot) ? m.slot : 'snack',
        title: String(m.title || '').trim().slice(0, 80),
        items,
        totals: { calories: Math.round(summe('calories')), protein: r1(summe('protein')), carbs: r1(summe('carbs')), fat: r1(summe('fat')) },
      };
    })
    .filter((m) => m.items.length > 0)
    .slice(0, 6);
  if (meals.length === 0) return null;
  const gesamt = (k) => meals.reduce((s, m) => s + m.totals[k], 0);
  return {
    meals,
    totals: { calories: Math.round(gesamt('calories')), protein: r1(gesamt('protein')), carbs: r1(gesamt('carbs')), fat: r1(gesamt('fat')) },
    tip: String(roh.tip || '').trim().slice(0, 240),
  };
}

export default async function handler(req, res) {
  if (corsBehandeln(req, res)) return;
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(503).json({ error: 'Service unavailable' });

  const pruefung = await premiumPruefen(req);
  if (pruefung.fehler) return res.status(pruefung.fehler.status).json(pruefung.fehler.body);

  const limit = pruefung.plan === 'premium' ? PREMIUM_LIMIT : TRIAL_LIMIT;
  let verbraucht;
  try {
    verbraucht = await kontingentLesen(pruefung);
  } catch {
    return res.status(503).json({ error: 'Quota check failed' });
  }
  if (verbraucht >= limit) return res.status(429).json({ error: 'quota_exceeded', remaining: 0 });

  const eingabe = eingabePruefen(req.body);
  if (!eingabe) return res.status(400).json({ error: 'invalid_goals' });

  let plan;
  try {
    plan = planNormalisieren(await geminiJson(apiKey, { parts: [{ text: planPrompt(eingabe) }], maxTokens: 8192 }));
  } catch (err) {
    console.error('meal-plan Modellfehler:', err?.message);
    return res.status(503).json({ error: 'ai_unavailable' });
  }
  if (!plan) return res.status(503).json({ error: 'ai_unavailable' });

  await kontingentHochzaehlen(pruefung, verbraucht);
  return res.status(200).json({ ...plan, remaining: Math.max(0, limit - verbraucht - 1) });
}
