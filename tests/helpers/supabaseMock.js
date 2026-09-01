// Doppel für den Supabase-Client.
//
// Es geht nicht darum, PostgREST nachzubauen, sondern um eine einzige Frage:
// WIRD Supabase überhaupt angesprochen? Im Gastmodus lautet die richtige
// Antwort immer „nein" — Gastdaten sollen das Gerät nicht verlassen. Deshalb
// schreibt das Doppel jeden `from(...)`-Aufruf samt Kette mit.
//
// Der Query-Builder ist „thenable": `await supabase.from(x).select()` und
// `supabase.from(x).select().then(cb)` funktionieren beide, so wie im echten
// Client — die Storage-Schicht nutzt je nach Pfad das eine oder das andere.
const KETTE = [
  'select', 'insert', 'update', 'upsert', 'delete',
  'eq', 'neq', 'is', 'not', 'in', 'gte', 'lte', 'gt', 'lt', 'like', 'ilike',
  'order', 'limit', 'range', 'single', 'maybeSingle', 'filter', 'match',
];

export function makeSupabaseMock() {
  let antwort = () => ({ data: null, error: null });
  const calls = [];

  const client = {
    from(table) {
      const record = { table, ops: [] };
      calls.push(record);

      const q = {};
      for (const name of KETTE) {
        q[name] = (...args) => { record.ops.push({ op: name, args }); return q; };
      }
      q.then = (onOk, onErr) =>
        Promise.resolve().then(() => antwort(record)).then(onOk, onErr);
      q.catch = (onErr) => q.then(undefined, onErr);
      return q;
    },
  };

  // ── Steuerung und Auswertung für die Tests ──
  client.__reset = () => { calls.length = 0; antwort = () => ({ data: null, error: null }); };
  // `respond` bekommt den mitgeschriebenen Aufruf und liefert { data, error }.
  client.__respond = (fn) => { antwort = typeof fn === 'function' ? fn : () => fn; };
  client.__calls = calls;
  client.__tables = () => calls.map((c) => c.table);
  client.__for = (table) => calls.filter((c) => c.table === table);
  // Welche Schreiboperationen gab es? (insert/update/upsert/delete)
  client.__writes = () =>
    calls.filter((c) => c.ops.some((o) => ['insert', 'update', 'upsert', 'delete'].includes(o.op)));
  // Argumente der ersten Operation eines Typs auf einer Tabelle.
  client.__argsOf = (table, op) => {
    for (const c of client.__for(table)) {
      const treffer = c.ops.find((o) => o.op === op);
      if (treffer) return treffer.args;
    }
    return undefined;
  };
  return client;
}
