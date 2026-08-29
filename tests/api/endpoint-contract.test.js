import { describe, it, expect } from 'vitest';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { makeReq, makeRes, installFetch, setEnv, ENV_FULL, expectNoModelCall } from '../helpers/apiHarness.js';

// Übergreifender Vertrag für ALLE Dateien in api/.
//
// Die Tests je Endpunkt prüfen die sieben, die es heute gibt. Dieser hier
// findet seine Prüflinge selbst im Verzeichnis — ein künftiger Endpunkt, der
// ohne Anmeldung Daten herausgibt, fällt damit auf, ohne dass jemand daran
// denken muss, einen Test dafür anzulegen.
const API_DIR = join(process.cwd(), 'api');

const dateien = readdirSync(API_DIR)
  .filter((f) => f.endsWith('.js') && !f.startsWith('_'))
  .sort();

// Bewusst ohne Anmeldung erreichbar. Wer hier etwas einträgt, muss begründen,
// warum ein anonymer Aufruf aus dem Netz unbedenklich ist.
const OEFFENTLICH = {
  // Keep-Alive für den Vercel-Cron. Liest eine einzige id aus einer ohnehin
  // öffentlichen Tabelle, mit dem anon-Key, und gibt nur {ok, db} zurück.
  'health.js': 'Keep-Alive-Endpunkt ohne Nutzerdaten',
};

describe('Vertrag aller api/-Endpunkte', () => {
  it('findet die erwarteten Endpunkte', () => {
    // Bricht absichtlich, sobald ein Endpunkt dazukommt oder verschwindet:
    // ein Anstoß, ihn auch in die Tests aufzunehmen.
    expect(dateien).toEqual([
      'analyze-meal.js', 'backup.js', 'coach.js', 'delete-account.js',
      'health.js', 'revenuecat-webhook.js', 'start-trial.js',
    ]);
  });

  for (const datei of dateien) {
    const oeffentlich = datei in OEFFENTLICH;

    describe(datei, () => {
      it(oeffentlich
        ? `ist absichtlich öffentlich (${OEFFENTLICH[datei]})`
        : 'gibt ohne Anmeldung nichts heraus', async () => {
        setEnv(ENV_FULL);
        const fetchMock = installFetch([{ match: () => true, respond: () => ({ ok: true, status: 200, json: async () => ({}), text: async () => '{}' }) }]);
        const { default: handler } = await import(join(API_DIR, datei));

        const res = makeRes();
        await handler(makeReq({ method: 'POST', body: {} }), res);

        if (!oeffentlich) {
          expect(res.statusCode, `${datei} antwortete ${res.statusCode} auf einen Aufruf ohne Anmeldung`)
            .toBeGreaterThanOrEqual(400);
        }
        // Gilt für alle: ohne Anmeldung wird kein kostenpflichtiges Modell gerufen.
        expectNoModelCall(fetchMock);
      });

      it('antwortet auch ohne Netz mit einem Statuscode, statt zu werfen', async () => {
        // Ein Wurf aus dem Handler heraus wird bei Vercel zu einem
        // undurchsichtigen Plattform-Fehler; der Client kann ihn nicht
        // unterscheiden und zeigt dem Nutzer nichts Brauchbares.
        setEnv(ENV_FULL);
        installFetch([{ match: () => true, respond: () => { throw new Error('ECONNRESET'); } }]);
        const { default: handler } = await import(join(API_DIR, datei));

        const res = makeRes();
        const req = makeReq({
          method: 'POST',
          headers: { authorization: 'Bearer cron-secret' },
          body: { event: { type: 'TEST' }, messages: [{ role: 'user', content: 'hi' }], image: 'x' },
        });
        await expect(handler(req, res)).resolves.not.toThrow();
        expect(res.statusCode).toBeGreaterThanOrEqual(200);
      });
    });
  }
});
