// Kalenderdaten IMMER in lokaler Zeitzone berechnen.
// new Date().toISOString() liefert UTC — zwischen 00:00 und ~02:00 Ortszeit
// (Sommerzeit) wäre das der VORTAG und Einträge landen am falschen Tag.

export function toLocalDateString(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function todayLocal() {
  return toLocalDateString(new Date());
}

// 'YYYY-MM-DD' → Date um 12:00 lokal (verhindert UTC-Verschiebung bei getDay() etc.)
export function parseLocalDate(dateStr) {
  return new Date(dateStr + 'T12:00:00');
}
