/**
 * Löst Wochen-Progression für aktivierte Peak-Programme zur Lesezeit auf.
 *
 * Aktivierte Programme speichern in weekly_schedules.days einen `_meta`-Key
 * ({ programId, startedAt, durationWeeks }). Die gespeicherte Basiswoche
 * bleibt der garantierte Fallback — alte Schedules und Custom-Pläne (ohne
 * _meta) laufen unverändert durch (Passthrough).
 *
 * peakPrograms wird dynamisch importiert, damit die (großen) Programmdaten
 * nicht im Hauptbundle landen.
 */

export function getScheduleMeta(schedule) {
  return schedule?.days?._meta || null;
}

// Aktuelle Programm-Woche (1-basiert), geklemmt auf [1, durationWeeks].
// null, wenn der Schedule kein Programm-Schedule ist.
export function getCurrentWeek(schedule, date = new Date()) {
  const meta = getScheduleMeta(schedule);
  if (!meta?.startedAt || !meta?.durationWeeks) return null;
  const start = new Date(meta.startedAt + 'T00:00:00');
  if (Number.isNaN(start.getTime())) return null;
  const diffDays = Math.floor((date - start) / 86400000);
  const week = Math.floor(diffDays / 7) + 1;
  return Math.min(Math.max(week, 1), meta.durationWeeks);
}

/**
 * Liefert den effektiven Tag für dayKey: gespeicherter Tag, überlagert mit
 * dem Wochen-Override des Programms (falls vorhanden). Ergänzt `week` +
 * `durationWeeks` zur Anzeige („Woche 3/8").
 */
export async function resolveScheduledDay(schedule, dayKey, date = new Date()) {
  const day = schedule?.days?.[dayKey];
  if (!day) return null;

  const meta = getScheduleMeta(schedule);
  if (!meta?.programId) return day; // Custom-Plan / alter Schedule: unverändert

  const week = getCurrentWeek(schedule, date) || 1;
  const base = { ...day, week, durationWeeks: meta.durationWeeks };

  try {
    const { peakPrograms } = await import('./peakPrograms');
    const program = peakPrograms.find((p) => p.id === meta.programId);
    const override = day.sessionId ? program?.weeks?.[week - 1]?.[day.sessionId] : null;
    return override ? { ...base, ...override } : base;
  } catch (e) {
    // Programm nicht ladbar → gespeicherte Kopie reicht
    return base;
  }
}
