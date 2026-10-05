import { describe, it, expect } from 'vitest';
import analyzeMeal from '../../api/analyze-meal.js';
import scanLabel from '../../api/scan-label.js';
import mealPlan from '../../api/meal-plan.js';
import { jsonAuspacken } from '../../api/_ki.js';
import {
  makeReq, makeRes, installFetch, setEnv, ENV_FULL, jsonResponse, authRoute, restRoute,
} from '../helpers/apiHarness.js';

// Seit 05.10.2026: Ist ANTHROPIC_API_KEY gesetzt, laufen alle KI-Funktionen
// über Claude, ohne Ausweichen auf Gemini (api/_ki.js). Geprüft wird je
// Endpunkt: Claude wird gefragt, Gemini nie, und die Antwort kommt an.
const MIT_CLAUDE = { ...ENV_FULL, ANTHROPIC_API_KEY: 'sk-test' };
const NUR_CLAUDE = { ...MIT_CLAUDE, GEMINI_API_KEY: undefined };

const IN_ZUKUNFT = new Date(Date.now() + 86400000).toISOString();
const abo = () => restRoute('subscriptions', () => jsonResponse([{ premium_until: IN_ZUKUNFT }]));
const nutzung = (schreib = []) => restRoute('coach_usage', (url, init) => {
  if (init.method === 'POST') { schreib.push(JSON.parse(init.body)); return jsonResponse({}); }
  return jsonResponse([{ count: 0 }]);
});
const claude = (text, stop_reason = 'end_turn') => ({
  match: (u) => u.includes('api.anthropic.com'),
  respond: () => jsonResponse({ content: [{ type: 'text', text }], stop_reason }),
});
const claudeStatus = (status) => ({
  match: (u) => u.includes('api.anthropic.com'),
  respond: () => jsonResponse({ type: 'error', error: { type: 'x', message: 'x' } }, status),
});
const gemini = {
  match: (u) => u.includes('generativelanguage.googleapis.com'),
  respond: () => jsonResponse({ candidates: [{ content: { parts: [{ text: '{}' }] } }] }),
};
const angemeldet = (body) => makeReq({ headers: { authorization: 'Bearer gut' }, body });

describe('jsonAuspacken', () => {
  it('liest reines JSON, eingezäuntes JSON und JSON mit Vorrede', () => {
    expect(jsonAuspacken('{"a":1}')).toEqual({ a: 1 });
    expect(jsonAuspacken('```json\n{"a":2}\n```')).toEqual({ a: 2 });
    expect(jsonAuspacken('Hier ist das Ergebnis:\n{"a":3}')).toEqual({ a: 3 });
  });

  it('meldet abgeschnittene Antworten als max_tokens statt als Parserfehler', () => {
    expect(() => jsonAuspacken('{"a": [1, 2', 'max_tokens')).toThrow('claude_max_tokens');
    expect(() => jsonAuspacken('kein JSON')).toThrow('claude_no_json');
  });
});

describe('/api/analyze-meal mit Claude', () => {
  const ANTWORT = { items: [{ name_de: 'Reis', calories: 260 }], meal_description_de: 'Reis' };

  it('schickt das Foto als Bild-Block an Claude und fragt Gemini nie', async () => {
    setEnv(NUR_CLAUDE);
    const f = installFetch([authRoute(), claude(JSON.stringify(ANTWORT)), gemini]);
    const res = makeRes();
    await analyzeMeal(angemeldet({ image: 'data:image/jpeg;base64,AAAA', language: 'fr' }), res);
    expect(res.statusCode).toBe(200);
    expect(res.body.items[0].name_de).toBe('Reis');
    expect(f.to('generativelanguage')).toHaveLength(0);
    const inhalt = f.to('api.anthropic.com')[0].body.messages[0].content;
    expect(inhalt[0]).toEqual({ type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data: 'AAAA' } });
    expect(inhalt[1].type).toBe('text');
  });

  it('meldet ein Rate-Limit als 429, einen Ausfall als 503 — ohne Wiederholung', async () => {
    setEnv(MIT_CLAUDE);
    const a = installFetch([authRoute(), claudeStatus(429), gemini]);
    const r1 = makeRes();
    await analyzeMeal(angemeldet({ image: 'AAAA' }), r1);
    expect(r1.statusCode).toBe(429);
    expect(a.to('api.anthropic.com')).toHaveLength(1);
    expect(a.to('generativelanguage')).toHaveLength(0);

    installFetch([authRoute(), claudeStatus(529)]);
    const r2 = makeRes();
    await analyzeMeal(angemeldet({ image: 'AAAA' }), r2);
    expect(r2.statusCode).toBe(503);
  });

  it('meldet 422, wenn Claude kein JSON liefert', async () => {
    setEnv(MIT_CLAUDE);
    installFetch([authRoute(), claude('Das kann ich nicht erkennen.')]);
    const res = makeRes();
    await analyzeMeal(angemeldet({ image: 'AAAA' }), res);
    expect(res.statusCode).toBe(422);
  });
});

describe('/api/scan-label mit Claude', () => {
  it('liest die Tabelle über Claude und normalisiert wie bisher', async () => {
    setEnv(NUR_CLAUDE);
    const roh = { found: true, name: 'Hafer', brand: '', basis: '100g', per100: { calories: 372, protein: 13.5, carbs: 58.7, fat: 7 }, serving_g: null };
    const f = installFetch([authRoute(), abo(), claude('```json\n' + JSON.stringify(roh) + '\n```'), gemini]);
    const res = makeRes();
    await scanLabel(angemeldet({ image: 'data:image/png;base64,BBBB', language: 'de' }), res);
    expect(res.statusCode).toBe(200);
    expect(res.body.per100.calories).toBe(372);
    expect(f.to('generativelanguage')).toHaveLength(0);
    expect(f.to('api.anthropic.com')[0].body.messages[0].content[0].source.data).toBe('BBBB');
  });
});

describe('/api/meal-plan mit Claude', () => {
  it('baut den Plan über Claude, zählt das Kontingent und fragt Gemini nie', async () => {
    setEnv(NUR_CLAUDE);
    const plan = { meals: [{ slot: 'lunch', title: 'Reis', items: [{ name: 'Reis', grams: 200, calories: 260, protein: 5, carbs: 57, fat: 0.5 }] }], tip: 'Vorkochen.' };
    const schreib = [];
    const f = installFetch([authRoute(), abo(), nutzung(schreib), claude(JSON.stringify(plan)), gemini]);
    const res = makeRes();
    await mealPlan(angemeldet({ goals: { calories: 2400, protein: 160, carbs: 260, fat: 75 }, lang: 'es' }), res);
    expect(res.statusCode).toBe(200);
    expect(res.body.totals.calories).toBe(260);
    expect(schreib).toHaveLength(1);
    expect(f.to('generativelanguage')).toHaveLength(0);
    const inhalt = f.to('api.anthropic.com')[0].body.messages[0].content;
    expect(inhalt.every((b) => b.type === 'text')).toBe(true);
  });

  it('zählt bei einer Ablehnung nichts hoch', async () => {
    setEnv(MIT_CLAUDE);
    const schreib = [];
    installFetch([authRoute(), abo(), nutzung(schreib), {
      match: (u) => u.includes('api.anthropic.com'),
      respond: () => jsonResponse({ content: [], stop_reason: 'refusal' }),
    }]);
    const res = makeRes();
    await mealPlan(angemeldet({ goals: { calories: 2400, protein: 160, carbs: 260, fat: 75 } }), res);
    expect(res.statusCode).toBe(503);
    expect(schreib).toHaveLength(0);
  });
});
