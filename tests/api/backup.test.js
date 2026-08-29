import { describe, it, expect } from 'vitest';
import handler from '../../api/backup.js';
import { makeReq, makeRes, installFetch, setEnv, ENV_FULL, jsonResponse, textResponse } from '../helpers/apiHarness.js';

// /api/backup zieht täglich alle Tabellen in den Storage. Es läuft mit der
// Service-Role und liest damit die Daten ALLER Nutzer — geschützt allein durch
// CRON_SECRET. Entsprechend streng sind die Tests am Tor.
const heute = new Date().toISOString().slice(0, 10);

const tabellen = (antwort = () => jsonResponse([])) => ({
  match: (url) => url.includes('/rest/v1/'),
  respond: antwort,
});

const upload = (status = 200, onUpload) => ({
  match: (url) => url.includes('/storage/v1/object/backups/backup-'),
  respond: (url, init) => {
    onUpload?.(JSON.parse(init.body), url);
    return jsonResponse({ Key: 'backups/x' }, status);
  },
});

const liste = (objects = []) => ({
  match: (url) => url.includes('/storage/v1/object/list/backups'),
  respond: () => jsonResponse(objects),
});

const loeschen = (onDelete) => ({
  match: (url, init) => url.includes('/storage/v1/object/backups') && init.method === 'DELETE',
  respond: (url, init) => { onDelete?.(JSON.parse(init.body).prefixes); return jsonResponse({}); },
});

const cron = (secret = 'cron-secret') =>
  makeReq({ method: 'POST', headers: secret === null ? {} : { authorization: `Bearer ${secret}` } });

describe('/api/backup', () => {
  describe('Zugang', () => {
    it('weist ohne Header ab, ohne die Datenbank anzufassen', async () => {
      setEnv(ENV_FULL);
      const fetchMock = installFetch([]);
      const res = makeRes();
      await handler(cron(null), res);
      expect(res.statusCode).toBe(401);
      expect(fetchMock.calls).toHaveLength(0);
    });

    it('weist ein falsches Secret ab', async () => {
      setEnv(ENV_FULL);
      const fetchMock = installFetch([]);
      const res = makeRes();
      await handler(cron('geraten'), res);
      expect(res.statusCode).toBe(401);
      expect(fetchMock.calls).toHaveLength(0);
    });

    it('weist ab, wenn CRON_SECRET gar nicht gesetzt ist', async () => {
      // Fail-closed: ein nicht konfiguriertes Secret darf nicht heißen
      // „Prüfung entfällt" — sonst wäre der Volldump offen erreichbar.
      setEnv({ ...ENV_FULL, CRON_SECRET: undefined });
      const fetchMock = installFetch([]);
      const res = makeRes();
      await handler(cron('egal'), res);
      expect(res.statusCode).toBe(401);
      expect(fetchMock.calls).toHaveLength(0);
    });

    it('meldet 500, wenn die Service-Role fehlt', async () => {
      setEnv({ ...ENV_FULL, SUPABASE_SERVICE_ROLE_KEY: undefined });
      const res = makeRes();
      await handler(cron(), res);
      expect(res.statusCode).toBe(500);
    });
  });

  describe('Sicherung', () => {
    it('sichert alle Tabellen und lädt sie unter dem Tagesdatum hoch', async () => {
      setEnv(ENV_FULL);
      let dump;
      const fetchMock = installFetch([
        tabellen(() => jsonResponse([{ id: 1 }, { id: 2 }])),
        upload(200, (body) => { dump = body; }),
        liste(), loeschen(),
      ]);
      const res = makeRes();
      await handler(cron(), res);

      expect(res.statusCode).toBe(200);
      expect(res.body.file).toBe(`backup-${heute}.json`);
      // 23 Tabellen à 2 Zeilen
      expect(Object.keys(dump.tables)).toHaveLength(23);
      expect(res.body.rows).toBe(46);
      expect(dump.tables.profiles).toEqual([{ id: 1 }, { id: 2 }]);
      expect(fetchMock.to('/storage/v1/object/backups/backup-')[0].init.headers['x-upsert']).toBe('true');
    });

    it('überspringt eine fehlende Tabelle, statt den ganzen Lauf abzubrechen', async () => {
      setEnv(ENV_FULL);
      let dump;
      installFetch([
        tabellen((url) => (url.includes('/rest/v1/challenges')
          ? textResponse('missing', 404)
          : jsonResponse([{ id: 1 }]))),
        upload(200, (body) => { dump = body; }),
        liste(), loeschen(),
      ]);
      const res = makeRes();
      await handler(cron(), res);

      expect(res.statusCode).toBe(200);
      expect(dump.tables.challenges).toEqual({ error: 'HTTP 404' });
      expect(dump.tables.workouts).toEqual([{ id: 1 }]);
      expect(res.body.rows).toBe(22); // 22 heile Tabellen à 1 Zeile
    });

    it('holt große Tabellen seitenweise', async () => {
      setEnv(ENV_FULL);
      let dump;
      let seite = 0;
      installFetch([
        tabellen((url) => {
          if (!url.includes('/rest/v1/workouts')) return jsonResponse([]);
          seite += 1;
          return jsonResponse(seite === 1
            ? Array.from({ length: 1000 }, (_, i) => ({ id: i }))
            : [{ id: 1000 }]);
        }),
        upload(200, (body) => { dump = body; }),
        liste(), loeschen(),
      ]);
      const res = makeRes();
      await handler(cron(), res);

      expect(seite).toBe(2);
      expect(dump.tables.workouts).toHaveLength(1001);
      expect(res.body.rows).toBe(1001);
    });

    it('meldet 502, wenn der Upload scheitert', async () => {
      setEnv(ENV_FULL);
      installFetch([tabellen(), upload(500), liste(), loeschen()]);
      const res = makeRes();
      await handler(cron(), res);
      expect(res.statusCode).toBe(502);
      expect(res.body).toEqual({ error: 'Upload failed' });
    });

    it('meldet 500 statt zu werfen, wenn das Netz ausfällt', async () => {
      setEnv(ENV_FULL);
      installFetch([{ match: () => true, respond: () => { throw new Error('ECONNRESET'); } }]);
      const res = makeRes();
      await handler(cron(), res);
      expect(res.statusCode).toBe(500);
    });
  });

  describe('Aufräumen', () => {
    const tage = (n) => new Date(Date.now() - n * 86400000).toISOString().slice(0, 10);

    it('löscht nur Backups, die älter als 14 Tage sind', async () => {
      setEnv(ENV_FULL);
      let geloescht;
      installFetch([
        tabellen(), upload(),
        liste([
          { name: `backup-${tage(30)}.json` },
          { name: `backup-${tage(20)}.json` },
          { name: `backup-${tage(3)}.json` },
          { name: `backup-${tage(0)}.json` },
        ]),
        loeschen((p) => { geloescht = p; }),
      ]);
      const res = makeRes();
      await handler(cron(), res);

      expect(res.body.pruned).toBe(2);
      expect(geloescht).toEqual([`backup-${tage(30)}.json`, `backup-${tage(20)}.json`]);
    });

    it('lässt fremde Dateien im Bucket unangetastet', async () => {
      setEnv(ENV_FULL);
      let geloescht = null;
      installFetch([
        tabellen(), upload(),
        liste([{ name: 'wichtig.json' }, { name: '.emptyFolderPlaceholder' }]),
        loeschen((p) => { geloescht = p; }),
      ]);
      const res = makeRes();
      await handler(cron(), res);

      expect(res.body.pruned).toBe(0);
      expect(geloescht).toBeNull();
    });

    it('lässt den Lauf gelingen, auch wenn das Auflisten scheitert', async () => {
      // Das Backup selbst liegt dann schon oben — ein Fehler beim Aufräumen
      // darf den Lauf nicht als gescheitert melden.
      setEnv(ENV_FULL);
      installFetch([
        tabellen(), upload(),
        { match: (url) => url.includes('/storage/v1/object/list/backups'), respond: () => jsonResponse({}, 500) },
      ]);
      const res = makeRes();
      await handler(cron(), res);
      expect(res.statusCode).toBe(200);
      expect(res.body.pruned).toBe(0);
    });
  });
});
