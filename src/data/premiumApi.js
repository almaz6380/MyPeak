import { supabase } from '../lib/supabase';
import { API_BASIS } from './apiBasis';

// Client fuer die beiden Premium-Endpunkte (scan-label, meal-plan).
// Gibt nie eine Ausnahme nach oben: { error } oder die Daten. Die Seiten
// zeigen fuer jeden Fehler einen Satz statt eines Absturzes.
async function postMitToken(pfad, body, timeoutMs) {
  const { data: { session } } = await supabase.auth.getSession();
  const token = session?.access_token;
  if (!token) return { error: 'login_required' };
  try {
    const res = await fetch(`${API_BASIS}/api/${pfad}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(timeoutMs),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return { error: data.error || `http_${res.status}`, remaining: data.remaining };
    return data;
  } catch (err) {
    return { error: err?.name === 'TimeoutError' ? 'timeout' : 'network' };
  }
}

export function scanNutritionLabel(base64Image, language) {
  return postMitToken('scan-label', { image: base64Image, language }, 28000);
}

export function requestMealPlan({ goals, diet, meals, exclude, lang }) {
  return postMitToken('meal-plan', { goals, diet, meals, exclude, lang }, 35000);
}

// Etikett → Lebensmittel in der Form, die PortionPicker erwartet (je 100 g).
export function etikettAlsLebensmittel(etikett, fallbackName) {
  const name = etikett.name || fallbackName;
  return {
    nameDE: name,
    nameEN: name,
    brand: etikett.brand || null,
    calories: etikett.per100.calories,
    protein: etikett.per100.protein,
    carbs: etikett.per100.carbs,
    fat: etikett.per100.fat,
    fiber: etikett.per100.fiber ?? undefined,
    servingSize: etikett.serving_g && etikett.serving_g <= 1000 ? etikett.serving_g : 100,
    servingUnit: etikett.basis === '100ml' ? 'ml' : 'g',
    source: 'label_scan',
  };
}

// Letzter Plan pro Nutzer auf dem Geraet — wie der Coach-Verlauf bewusst
// nicht in Supabase.
const planKey = (userId) => `fullrep.mealplan.${userId}`;

export function ladeLetztenPlan(userId) {
  if (!userId) return null;
  try {
    const roh = JSON.parse(localStorage.getItem(planKey(userId)) || 'null');
    return roh && Array.isArray(roh.plan?.meals) ? roh : null;
  } catch {
    return null;
  }
}

export function speichereLetztenPlan(userId, eintrag) {
  if (!userId) return;
  try {
    localStorage.setItem(planKey(userId), JSON.stringify(eintrag));
  } catch {
    // voll oder gesperrt — dann eben ohne Speicher
  }
}
