// Alle /api/*-Aufrufe auf Cloudflare Pages landen hier und gehen an den
// gleichnamigen Handler in api/. Die Liste ist bewusst ausgeschrieben:
// Der Bundler braucht statische Importe, und Dateien mit Unterstrich
// (_cors, _sprache, _coachKnowledge) duerfen — wie auf Vercel — keine
// Endpunkte sein.
//
// Kommt in api/ ein Endpunkt dazu, muss er HIER eingetragen werden.
// tests/functions/cloudflare.test.js bricht, wenn das vergessen wird.
import analyzeMeal from '../../api/analyze-meal.js';
import backup from '../../api/backup.js';
import coach from '../../api/coach.js';
import deleteAccount from '../../api/delete-account.js';
import geminiModelle from '../../api/gemini-modelle.js';
import health from '../../api/health.js';
import mealPlan from '../../api/meal-plan.js';
import revenuecatWebhook from '../../api/revenuecat-webhook.js';
import scanLabel from '../../api/scan-label.js';
import startTrial from '../../api/start-trial.js';
import { vercelHandlerAusfuehren } from '../_vercelAdapter.js';

export const ENDPUNKTE = {
  'analyze-meal': analyzeMeal,
  backup,
  coach,
  'delete-account': deleteAccount,
  'gemini-modelle': geminiModelle,
  health,
  'meal-plan': mealPlan,
  'revenuecat-webhook': revenuecatWebhook,
  'scan-label': scanLabel,
  'start-trial': startTrial,
};

export async function onRequest(context) {
  const pfad = context.params?.pfad;
  const name = (Array.isArray(pfad) ? pfad.join('/') : String(pfad || '')).replace(/\/+$/, '');
  const handler = Object.hasOwn(ENDPUNKTE, name) ? ENDPUNKTE[name] : null;
  if (!handler) {
    return Response.json({ error: 'Not found' }, { status: 404 });
  }
  return vercelHandlerAusfuehren(handler, context);
}
