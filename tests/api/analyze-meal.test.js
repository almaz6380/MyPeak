import { describe, it, expect } from 'vitest';
import handler from '../../api/analyze-meal.js';
import {
  makeReq, makeRes, installFetch, setEnv, ENV_FULL, jsonResponse, textResponse,
  authRoute, useInstantTimers, expectNoModelCall,
} from '../helpers/apiHarness.js';

// /api/analyze-meal schickt ein Foto an Gemini. Jeder Aufruf kostet Kontingent,
// deshalb ist die Anmeldepflicht hier kein Komfort-, sondern ein Kostenthema:
// ein offener Endpunkt wäre ein Gemini-Schlüssel für das halbe Internet.
const geminiText = (text) => ({
  match: (url) => url.includes('generativelanguage.googleapis.com'),
  respond: () => jsonResponse({ candidates: [{ content: { parts: [{ text }] } }] }),
});

const geminiStatus = (status) => ({
  match: (url) => url.includes('generativelanguage.googleapis.com'),
  respond: () => textResponse('kaputt', status),
});

const ANTWORT = JSON.stringify({
  items: [{ name_de: 'Reis', name_en: 'Rice', portion_g: 200, calories: 260, protein: 5, carbs: 57, fat: 0.5, confidence: 'high' }],
  meal_description_de: 'Reis',
  meal_description_en: 'Rice',
});

const bild = 'data:image/jpeg;base64,AAAABBBBCCCC';
const angemeldet = (body = { image: bild }) => makeReq({ headers: { authorization: 'Bearer gut' }, body });

describe('/api/analyze-meal', () => {
  it('lehnt GET ab', async () => {
    setEnv(ENV_FULL);
    const res = makeRes();
    await handler(makeReq({ method: 'GET' }), res);
    expect(res.statusCode).toBe(405);
  });

  describe('fail-closed bei fehlender Konfiguration', () => {
    it('meldet 500 ohne Gemini-Schlüssel', async () => {
      setEnv({ ...ENV_FULL, GEMINI_API_KEY: undefined });
      const res = makeRes();
      await handler(angemeldet(), res);
      expect(res.statusCode).toBe(500);
    });

    it('verweigert die Analyse, wenn die Auth-Konfiguration fehlt', async () => {
      // Der historische Bug: früher wurde bei fehlender Supabase-Konfiguration
      // durchgewunken. Ein fehlkonfigurierter Deploy hätte den Gemini-Schlüssel
      // für jeden im Netz geöffnet.
      setEnv({ ...ENV_FULL, SUPABASE_URL: undefined, VITE_SUPABASE_URL: undefined });
      const fetchMock = installFetch([geminiText(ANTWORT)]);
      const res = makeRes();
      await handler(angemeldet(), res);
      expect(res.statusCode).toBe(503);
      expectNoModelCall(fetchMock);
    });
  });

  describe('Gastmodus (kein Token)', () => {
    it('weist ab und ruft Gemini nicht auf', async () => {
      setEnv(ENV_FULL);
      const fetchMock = installFetch([geminiText(ANTWORT)]);
      const res = makeRes();
      await handler(makeReq({ body: { image: bild } }), res);
      expect(res.statusCode).toBe(401);
      expect(res.body).toEqual({ error: 'Login required' });
      expectNoModelCall(fetchMock);
    });
  });

  describe('eingeloggt', () => {
    it('ruft Gemini bei ungültigem Token nicht auf', async () => {
      setEnv(ENV_FULL);
      const fetchMock = installFetch([authRoute({ ok: false }), geminiText(ANTWORT)]);
      const res = makeRes();
      await handler(angemeldet(), res);
      expect(res.statusCode).toBe(401);
      expectNoModelCall(fetchMock);
    });

    it('meldet 503, wenn die Token-Prüfung am Netz scheitert', async () => {
      setEnv(ENV_FULL);
      const fetchMock = installFetch([authRoute({ throws: true }), geminiText(ANTWORT)]);
      const res = makeRes();
      await handler(angemeldet(), res);
      expect(res.statusCode).toBe(503);
      expectNoModelCall(fetchMock);
    });

    it('meldet 400 ohne Bild — vor dem Modellaufruf', async () => {
      setEnv(ENV_FULL);
      const fetchMock = installFetch([authRoute(), geminiText(ANTWORT)]);
      const res = makeRes();
      await handler(angemeldet({}), res);
      expect(res.statusCode).toBe(400);
      expectNoModelCall(fetchMock);
    });

    it('meldet 413 bei einem zu großen Bild — vor dem Modellaufruf', async () => {
      setEnv(ENV_FULL);
      const fetchMock = installFetch([authRoute(), geminiText(ANTWORT)]);
      const res = makeRes();
      await handler(angemeldet({ image: 'A'.repeat(4_000_001) }), res);
      expect(res.statusCode).toBe(413);
      expectNoModelCall(fetchMock);
    });

    it('liefert die erkannten Lebensmittel zurück', async () => {
      setEnv(ENV_FULL);
      installFetch([authRoute(), geminiText(ANTWORT)]);
      const res = makeRes();
      await handler(angemeldet(), res);
      expect(res.statusCode).toBe(200);
      expect(res.body.items[0].name_de).toBe('Reis');
    });

    it('entfernt den data-URL-Vorsatz vor dem Versand', async () => {
      // Bliebe „data:image/jpeg;base64," im Feld stehen, wäre das Bild für
      // Gemini unlesbar — und der Fehler käme als unverständliches Ergebnis zurück.
      setEnv(ENV_FULL);
      const fetchMock = installFetch([authRoute(), geminiText(ANTWORT)]);
      await handler(angemeldet(), makeRes());
      const gesendet = fetchMock.to('generativelanguage')[0].body;
      expect(gesendet.contents[0].parts[0].inline_data.data).toBe('AAAABBBBCCCC');
    });

    it('versteht eine in Markdown eingerahmte JSON-Antwort', async () => {
      setEnv(ENV_FULL);
      installFetch([authRoute(), geminiText('```json\n' + ANTWORT + '\n```')]);
      const res = makeRes();
      await handler(angemeldet(), res);
      expect(res.statusCode).toBe(200);
      expect(res.body.items).toHaveLength(1);
    });

    it('wählt den Prompt nach Sprache', async () => {
      setEnv(ENV_FULL);
      const fetchMock = installFetch([authRoute(), geminiText(ANTWORT)]);
      await handler(angemeldet({ image: bild, language: 'en' }), makeRes());
      expect(fetchMock.to('generativelanguage')[0].body.contents[0].parts[1].text)
        .toContain('You are a nutrition analysis assistant');
    });
  });

  describe('Fehler des KI-Dienstes', () => {
    it('meldet 502 bei einem Serverfehler von Gemini', async () => {
      setEnv(ENV_FULL);
      useInstantTimers();
      installFetch([authRoute(), geminiStatus(500)]);
      const res = makeRes();
      await handler(angemeldet(), res);
      expect(res.statusCode).toBe(502);
    });

    it('meldet 422, wenn die Antwort kein JSON ist', async () => {
      setEnv(ENV_FULL);
      installFetch([authRoute(), geminiText('Tut mir leid, das kann ich nicht.')]);
      const res = makeRes();
      await handler(angemeldet(), res);
      expect(res.statusCode).toBe(422);
    });

    it('meldet 502 bei leerer Antwort', async () => {
      setEnv(ENV_FULL);
      installFetch([authRoute(), { match: (u) => u.includes('generativelanguage'), respond: () => jsonResponse({ candidates: [] }) }]);
      const res = makeRes();
      await handler(angemeldet(), res);
      expect(res.statusCode).toBe(502);
    });

    it('meldet 429 erst, wenn alle Versuche am Rate-Limit scheitern', async () => {
      setEnv(ENV_FULL);
      useInstantTimers();
      const fetchMock = installFetch([authRoute(), geminiStatus(429)]);
      const res = makeRes();
      await handler(angemeldet(), res);
      expect(res.statusCode).toBe(429);
      expect(res.body.error).toBe('rate_limit');
      expect(fetchMock.to('generativelanguage')).toHaveLength(3);
    });

    it('gibt nach einem 429 beim zweiten Versuch doch noch das Ergebnis zurück', async () => {
      setEnv(ENV_FULL);
      useInstantTimers();
      let n = 0;
      installFetch([
        authRoute(),
        {
          match: (u) => u.includes('generativelanguage'),
          respond: () => (++n === 1
            ? textResponse('busy', 429)
            : jsonResponse({ candidates: [{ content: { parts: [{ text: ANTWORT }] } }] })),
        },
      ]);
      const res = makeRes();
      await handler(angemeldet(), res);
      expect(res.statusCode).toBe(200);
      expect(n).toBe(2);
    });

    it('meldet einen Netzwerkausfall als 503, NICHT als Rate-Limit', async () => {
      // Der Unterschied ist für den Nutzer entscheidend: bei „429 Rate-Limit"
      // wartet er vergeblich auf ein Kontingent, das nie das Problem war.
      setEnv(ENV_FULL);
      useInstantTimers();
      installFetch([
        authRoute(),
        { match: (u) => u.includes('generativelanguage'), respond: () => { throw new Error('ETIMEDOUT'); } },
      ]);
      const res = makeRes();
      await handler(angemeldet(), res);
      expect(res.statusCode).toBe(503);
      expect(res.body.error).toBe('ai_unavailable');
    });

    it('meldet 503, wenn nach einem 429 das Netz ausfällt', async () => {
      // Kante: last429 muss zurückgesetzt werden, sonst käme fälschlich 429.
      setEnv(ENV_FULL);
      useInstantTimers();
      let n = 0;
      installFetch([
        authRoute(),
        {
          match: (u) => u.includes('generativelanguage'),
          respond: () => { if (++n === 1) return textResponse('busy', 429); throw new Error('ETIMEDOUT'); },
        },
      ]);
      const res = makeRes();
      await handler(angemeldet(), res);
      expect(res.statusCode).toBe(503);
      expect(res.body.error).toBe('ai_unavailable');
    });
  });
});
