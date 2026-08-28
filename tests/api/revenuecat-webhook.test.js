import { describe, it, expect } from 'vitest';
import handler from '../../api/revenuecat-webhook.js';
import {
  makeReq, makeRes, installFetch, setEnv, ENV_FULL, jsonResponse, restRoute, USER_ID,
} from '../helpers/apiHarness.js';

// Der Webhook ist die EINZIGE Stelle, die bezahltes Premium setzt. Er ist
// öffentlich erreichbar und nur durch ein gemeinsames Secret geschützt —
// deshalb liegt das Gewicht der Tests auf: wer darf schreiben, und was genau.
const IN_ZUKUNFT = Date.now() + 30 * 86400000;
const IN_VERGANGENHEIT = Date.now() - 86400000;

const subsRoute = (onWrite) =>
  restRoute('subscriptions', (url, init) => {
    onWrite?.(JSON.parse(init.body));
    return jsonResponse({}, 200);
  });

const post = (event, { auth = 'rc-secret' } = {}) =>
  makeReq({ headers: auth === null ? {} : { authorization: auth }, body: { event } });

const ereignis = (type, extra = {}) => ({
  type,
  app_user_id: USER_ID,
  expiration_at_ms: IN_ZUKUNFT,
  ...extra,
});

async function lauf(req, onWrite) {
  const fetchMock = installFetch([subsRoute(onWrite)]);
  const res = makeRes();
  await handler(req, res);
  return { res, writes: fetchMock.to('/rest/v1/subscriptions') };
}

describe('/api/revenuecat-webhook', () => {
  it('lehnt GET ab', async () => {
    setEnv(ENV_FULL);
    const res = makeRes();
    await handler(makeReq({ method: 'GET' }), res);
    expect(res.statusCode).toBe(405);
  });

  describe('Zugang', () => {
    it('meldet 503, wenn das Secret nicht konfiguriert ist', async () => {
      // Ohne gesetztes Secret dürfte KEIN Aufruf durchgehen. Würde der
      // Vergleich bei fehlender Konfiguration übersprungen, könnte jeder
      // im Netz sich Premium schicken.
      setEnv({ ...ENV_FULL, REVENUECAT_WEBHOOK_SECRET: undefined });
      const { res, writes } = await lauf(post(ereignis('INITIAL_PURCHASE')));
      expect(res.statusCode).toBe(503);
      expect(writes).toHaveLength(0);
    });

    it('weist ein falsches Secret ab', async () => {
      setEnv(ENV_FULL);
      const { res, writes } = await lauf(post(ereignis('INITIAL_PURCHASE'), { auth: 'geraten' }));
      expect(res.statusCode).toBe(401);
      expect(writes).toHaveLength(0);
    });

    it('weist einen fehlenden Header ab', async () => {
      setEnv(ENV_FULL);
      const { res, writes } = await lauf(post(ereignis('INITIAL_PURCHASE'), { auth: null }));
      expect(res.statusCode).toBe(401);
      expect(writes).toHaveLength(0);
    });

    it('akzeptiert das Secret auch mit Bearer-Präfix', async () => {
      setEnv(ENV_FULL);
      const { res } = await lauf(post(ereignis('INITIAL_PURCHASE'), { auth: 'Bearer rc-secret' }));
      expect(res.statusCode).toBe(200);
    });
  });

  describe('Zuordnung zum Konto', () => {
    it('meldet 400 ohne Event', async () => {
      setEnv(ENV_FULL);
      const { res } = await lauf(makeReq({ headers: { authorization: 'rc-secret' }, body: {} }));
      expect(res.statusCode).toBe(400);
    });

    it('bestätigt anonyme RevenueCat-IDs, ohne zu schreiben', async () => {
      // Bewusst 200 statt Fehler: RevenueCat würde sonst endlos wiederholen.
      setEnv(ENV_FULL);
      const { res, writes } = await lauf(
        post(ereignis('INITIAL_PURCHASE', { app_user_id: '$RCAnonymousID:abc123' })));
      expect(res.statusCode).toBe(200);
      expect(res.body.ignored).toBeTruthy();
      expect(writes).toHaveLength(0);
    });

    it('lehnt eine app_user_id ab, die keine UUID ist', async () => {
      setEnv(ENV_FULL);
      const { res, writes } = await lauf(
        post(ereignis('INITIAL_PURCHASE', { app_user_id: 'admin@example.com' })));
      expect(res.statusCode).toBe(200);
      expect(writes).toHaveLength(0);
    });

    it('schreibt genau auf die user_id aus dem Event', async () => {
      setEnv(ENV_FULL);
      let geschrieben;
      await lauf(post(ereignis('INITIAL_PURCHASE')), (b) => { geschrieben = b; });
      expect(geschrieben.user_id).toBe(USER_ID);
    });
  });

  describe('Zielzustand je Ereignis', () => {
    const faelle = [
      ['INITIAL_PURCHASE', IN_ZUKUNFT, 'premium'],
      ['RENEWAL', IN_ZUKUNFT, 'premium'],
      ['PRODUCT_CHANGE', IN_ZUKUNFT, 'premium'],
      ['UNCANCELLATION', IN_ZUKUNFT, 'premium'],
      ['NON_RENEWING_PURCHASE', IN_ZUKUNFT, 'premium'],
      ['SUBSCRIPTION_EXTENDED', IN_ZUKUNFT, 'premium'],
      // Gekündigt heißt: keine Verlängerung mehr, aber Zugang bis zum Ablauf.
      ['CANCELLATION', IN_ZUKUNFT, 'premium'],
      ['EXPIRATION', IN_ZUKUNFT, 'free'],
      ['REFUND', IN_ZUKUNFT, 'free'],
      ['SUBSCRIPTION_PAUSED', IN_ZUKUNFT, 'free'],
      // Abgelaufenes Ablaufdatum schlägt den Ereignistyp.
      ['RENEWAL', IN_VERGANGENHEIT, 'free'],
      ['INITIAL_PURCHASE', IN_VERGANGENHEIT, 'free'],
    ];

    for (const [typ, ablauf, erwartet] of faelle) {
      const label = ablauf === IN_ZUKUNFT ? 'gültig' : 'abgelaufen';
      it(`${typ} (${label}) → ${erwartet}`, async () => {
        setEnv(ENV_FULL);
        let geschrieben;
        const { res } = await lauf(
          post(ereignis(typ, { expiration_at_ms: ablauf })), (b) => { geschrieben = b; });
        expect(res.statusCode).toBe(200);
        expect(geschrieben.status).toBe(erwartet);
        if (erwartet === 'premium') {
          expect(new Date(geschrieben.premium_until).getTime()).toBe(ablauf);
        } else {
          expect(geschrieben.premium_until).toBeNull();
        }
      });
    }

    it('ignoriert unbekannte Ereignistypen, ohne zu schreiben', async () => {
      setEnv(ENV_FULL);
      for (const typ of ['TEST', 'TRANSFER', 'BILLING_ISSUE']) {
        const { res, writes } = await lauf(post(ereignis(typ)));
        expect(res.statusCode, typ).toBe(200);
        expect(res.body.ignored, typ).toBe(typ);
        expect(writes, typ).toHaveLength(0);
      }
    });

    it('behandelt ein fehlendes Ablaufdatum als abgelaufen', async () => {
      setEnv(ENV_FULL);
      let geschrieben;
      await lauf(post(ereignis('INITIAL_PURCHASE', { expiration_at_ms: undefined })),
        (b) => { geschrieben = b; });
      expect(geschrieben.status).toBe('free');
      expect(geschrieben.premium_until).toBeNull();
    });
  });

  describe('Schonung fremder Felder', () => {
    it('fasst die Trial-Felder nicht an', async () => {
      // Der Upsert nennt trial_started_at/trial_ends_at nicht. Stünden sie im
      // Body, würde ein Kauf die Testphase des Nutzers überschreiben und
      // `alreadyUsed` in start-trial wäre wirkungslos.
      setEnv(ENV_FULL);
      let geschrieben;
      await lauf(post(ereignis('INITIAL_PURCHASE')), (b) => { geschrieben = b; });
      expect(geschrieben).not.toHaveProperty('trial_started_at');
      expect(geschrieben).not.toHaveProperty('trial_ends_at');
      expect(geschrieben.provider).toBe('revenuecat');
    });
  });

  describe('Fehlerverhalten', () => {
    it('meldet 500, wenn das Schreiben scheitert (RevenueCat wiederholt dann)', async () => {
      setEnv(ENV_FULL);
      installFetch([restRoute('subscriptions', () => jsonResponse({ message: 'db weg' }, 500))]);
      const res = makeRes();
      await handler(post(ereignis('INITIAL_PURCHASE')), res);
      expect(res.statusCode).toBe(500);
    });

    it('meldet 500 statt zu werfen, wenn das Netz ausfällt', async () => {
      setEnv(ENV_FULL);
      installFetch([restRoute('subscriptions', () => { throw new Error('ECONNRESET'); })]);
      const res = makeRes();
      await handler(post(ereignis('INITIAL_PURCHASE')), res);
      expect(res.statusCode).toBe(500);
    });
  });
});
