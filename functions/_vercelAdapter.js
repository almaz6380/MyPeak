// Laesst die Handler aus api/ (Vercel-Form: handler(req, res)) unveraendert
// als Cloudflare Pages Function laufen.
//
// Warum ein Adapter statt umschreiben: Die acht Handler und ihre Tests
// (tests/api/) bleiben, wie sie sind. Auf Vercel liefen sie ab 03.10.2026 nicht
// mehr (Konto gesperrt, 402 DEPLOYMENT_DISABLED); umgeschrieben haetten wir
// mitten im Umzug auch noch jede Fachlogik neu pruefen muessen.
//
// Die Handler benutzen nur einen kleinen Teil der Vercel-Schnittstelle:
// req.method / headers / query / body und res.status / json / setHeader / end.
// Genau das bildet dieser Adapter nach — nicht mehr.

// Cloudflare reicht Umgebungsvariablen und Secrets je Anfrage als `env` herein,
// die Handler lesen process.env. Ohne nodejs_compat gibt es kein `process`,
// deshalb legen wir es bei Bedarf selbst an.
function umgebungSetzen(env) {
  const p = (globalThis.process ??= { env: {} });
  p.env ??= {};
  for (const [schluessel, wert] of Object.entries(env || {})) {
    if (typeof wert === 'string') p.env[schluessel] = wert;
  }
}

function antwortObjekt() {
  return {
    statusCode: 200,
    kopf: new Headers(),
    inhalt: null,
    status(code) { this.statusCode = code; return this; },
    setHeader(name, wert) { this.kopf.set(name, String(wert)); return this; },
    getHeader(name) { return this.kopf.get(name); },
    json(objekt) {
      if (!this.kopf.has('content-type')) {
        this.kopf.set('content-type', 'application/json; charset=utf-8');
      }
      this.inhalt = JSON.stringify(objekt);
      return this;
    },
    send(inhalt) {
      if (inhalt !== null && typeof inhalt === 'object') return this.json(inhalt);
      this.inhalt = inhalt ?? null;
      return this;
    },
    end(inhalt) {
      if (inhalt !== undefined) this.inhalt = inhalt;
      return this;
    },
  };
}

export async function vercelHandlerAusfuehren(handler, { request, env }) {
  umgebungSetzen(env);

  const url = new URL(request.url);
  const headers = {};
  request.headers.forEach((wert, name) => { headers[name.toLowerCase()] = wert; });

  // Vercel parst JSON-Bodies selbst; die Handler lesen req.body als Objekt.
  let body;
  if (!['GET', 'HEAD', 'OPTIONS'].includes(request.method)) {
    const text = await request.text();
    if (text) {
      if ((headers['content-type'] || '').includes('application/json')) {
        try {
          body = JSON.parse(text);
        } catch {
          return Response.json({ error: 'Invalid JSON' }, { status: 400 });
        }
      } else {
        body = text;
      }
    }
  }

  const req = {
    method: request.method,
    headers,
    query: Object.fromEntries(url.searchParams),
    body,
    url: url.pathname + url.search,
  };
  const res = antwortObjekt();

  try {
    await handler(req, res);
  } catch (err) {
    console.error('Handler-Fehler:', err?.message || err);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }

  // 204/304 duerfen keinen Body tragen, sonst wirft der Response-Konstruktor.
  const ohneInhalt = res.statusCode === 204 || res.statusCode === 304;
  return new Response(ohneInhalt ? null : res.inhalt, {
    status: res.statusCode,
    headers: res.kopf,
  });
}
