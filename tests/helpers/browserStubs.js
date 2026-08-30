// Die Storage-Schicht in src/data/ ist „localStorage-first": jede Funktion
// schreibt zuerst lokal und spricht Supabase nur, wenn ein echtes Konto
// angemeldet ist. Für Tests in der Node-Umgebung fehlen die Browser-Globals —
// hier stehen sie als schlanke Attrappen bereit. Kein jsdom nötig: die
// getesteten Funktionen brauchen nur Speicher und Ereignisse, kein DOM.
import { vi } from 'vitest';

export function createLocalStorage(initial = {}) {
  const store = new Map(Object.entries(initial));
  return {
    get length() { return store.size; },
    key: (i) => [...store.keys()][i] ?? null,
    getItem: (k) => (store.has(String(k)) ? store.get(String(k)) : null),
    setItem: (k, v) => { store.set(String(k), String(v)); },
    removeItem: (k) => { store.delete(String(k)); },
    clear: () => store.clear(),
    // Object.keys(localStorage) wird in AuthContext benutzt — die Map allein
    // liefert das nicht, deshalb ein Hilfsdurchgriff für Tests.
    _dump: () => Object.fromEntries(store),
  };
}

export function installBrowserStubs(initial = {}) {
  const localStorage = createLocalStorage(initial);
  const events = [];
  const win = {
    dispatchEvent: (e) => { events.push(e); return true; },
    addEventListener: () => {},
    removeEventListener: () => {},
    localStorage,
  };
  vi.stubGlobal('localStorage', localStorage);
  vi.stubGlobal('window', win);
  vi.stubGlobal('CustomEvent', class CustomEvent {
    constructor(type, init = {}) { this.type = type; this.detail = init.detail; }
  });
  return { localStorage, events };
}

// Bequemer Zugriff auf JSON-Werte im lokalen Speicher.
export function readLocal(key, fallback = null) {
  const raw = localStorage.getItem(key);
  if (raw === null) return fallback;
  try { return JSON.parse(raw); } catch { return fallback; }
}

export function writeLocal(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
