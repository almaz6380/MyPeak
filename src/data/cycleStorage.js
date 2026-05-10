import { supabase } from '../lib/supabase';
import { isGuest } from '../context/AuthContext';

function guestSkip(userId) { return isGuest(userId); }

const SETTINGS_KEY = 'cycle_settings';
const LOG_PREFIX = 'cycle_log_';

// ── Cycle Settings ──────────────────────────────────────────────

export async function getCycleSettings(userId) {
  const cached = localStorage.getItem(SETTINGS_KEY);
  if (cached) return JSON.parse(cached);

  if (!guestSkip(userId)) {
    try {
      const { data, error } = await supabase
        .from('cycle_settings')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (!error && data) {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(data));
        return data;
      }
    } catch (err) {
      console.error('Failed to load cycle settings:', err);
    }
  }

  return null; // No settings = not set up yet
}

export async function saveCycleSettings(userId, settings) {
  const toCache = { ...settings, user_id: userId, updated_at: new Date().toISOString() };
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(toCache));

  if (!guestSkip(userId)) {
    try {
      await supabase
        .from('cycle_settings')
        .upsert({
          user_id: userId,
          cycle_length: settings.cycle_length,
          period_length: settings.period_length,
          last_period_start: settings.last_period_start,
          tracking_enabled: settings.tracking_enabled !== false,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'user_id' });
    } catch (err) {
      console.error('Failed to save cycle settings:', err);
    }
  }

  return { data: toCache, error: null };
}

// ── Cycle Logs (Symptom-Tagebuch) ───────────────────────────────

export async function getCycleLog(userId, date) {
  const cacheKey = LOG_PREFIX + date;
  const cached = localStorage.getItem(cacheKey);
  if (cached) return JSON.parse(cached);

  if (!guestSkip(userId)) {
    try {
      const { data, error } = await supabase
        .from('cycle_logs')
        .select('*')
        .eq('user_id', userId)
        .eq('date', date)
        .single();

      if (!error && data) {
        localStorage.setItem(cacheKey, JSON.stringify(data));
        return data;
      }
    } catch (err) {
      console.error('Failed to load cycle log:', err);
    }
  }

  return null;
}

export async function saveCycleLog(userId, date, log) {
  const cacheKey = LOG_PREFIX + date;
  const toCache = { ...log, user_id: userId, date };
  localStorage.setItem(cacheKey, JSON.stringify(toCache));

  if (!guestSkip(userId)) {
    try {
      await supabase
        .from('cycle_logs')
        .upsert({
          user_id: userId,
          date,
          mood: log.mood || null,
          energy: log.energy || null,
          pain: log.pain || null,
          sleep: log.sleep || null,
          bloating: log.bloating || false,
          headache: log.headache || false,
          cravings: log.cravings || false,
          notes: log.notes || '',
        }, { onConflict: 'user_id,date' });
    } catch (err) {
      console.error('Failed to save cycle log:', err);
    }
  }
}

// ── Phase Calculation ───────────────────────────────────────────

const PHASES = {
  menstruation: { color: '#ef4444', colorDark: '#dc2626', bgClass: 'bg-red-500', textClass: 'text-red-500' },
  follicular: { color: '#22c55e', colorDark: '#16a34a', bgClass: 'bg-green-500', textClass: 'text-green-500' },
  ovulation: { color: '#f59e0b', colorDark: '#d97706', bgClass: 'bg-primary-500', textClass: 'text-primary-500' },
  luteal: { color: '#3b82f6', colorDark: '#2563eb', bgClass: 'bg-blue-500', textClass: 'text-blue-500' },
};

export function getCyclePhase(settings, dateStr) {
  if (!settings || !settings.last_period_start) return null;

  const start = new Date(settings.last_period_start + 'T12:00:00');
  const date = new Date(dateStr + 'T12:00:00');
  const diffDays = Math.floor((date - start) / 86400000);
  const cycleLength = settings.cycle_length || 28;
  const periodLength = settings.period_length || 5;

  let dayInCycle = (diffDays % cycleLength) + 1;
  if (dayInCycle <= 0) dayInCycle += cycleLength;

  const ovStart = Math.floor(cycleLength / 2);
  const ovEnd = ovStart + 2;

  let phase;
  if (dayInCycle <= periodLength) {
    phase = 'menstruation';
  } else if (dayInCycle < ovStart) {
    phase = 'follicular';
  } else if (dayInCycle <= ovEnd) {
    phase = 'ovulation';
  } else {
    phase = 'luteal';
  }

  const phaseInfo = PHASES[phase];
  let phaseDayStart, phaseLength;

  switch (phase) {
    case 'menstruation':
      phaseDayStart = 1;
      phaseLength = periodLength;
      break;
    case 'follicular':
      phaseDayStart = periodLength + 1;
      phaseLength = ovStart - periodLength - 1;
      break;
    case 'ovulation':
      phaseDayStart = ovStart;
      phaseLength = 3;
      break;
    case 'luteal':
      phaseDayStart = ovEnd + 1;
      phaseLength = cycleLength - ovEnd;
      break;
  }

  const dayInPhase = dayInCycle - phaseDayStart + 1;

  return {
    phase,
    dayInCycle,
    dayInPhase,
    phaseLength,
    cycleLength,
    ...phaseInfo,
  };
}

export function getPhaseRecommendations(phase, lang) {
  const recs = {
    menstruation: {
      training: {
        de: 'Leichtes Training empfohlen: Yoga, Mobility, Spaziergänge. Höre auf deinen Körper.',
        en: 'Light training recommended: Yoga, mobility, walks. Listen to your body.',
      },
      nutrition: {
        de: 'Eisenreiche Lebensmittel (Spinat, rotes Fleisch), Magnesium. Kein Kaloriendefizit.',
        en: 'Iron-rich foods (spinach, red meat), magnesium. No calorie deficit.',
      },
    },
    follicular: {
      training: {
        de: 'Beste Phase für intensives Training! Krafttraining, Volumen hochfahren, PRs versuchen.',
        en: 'Best phase for intense training! Strength training, increase volume, go for PRs.',
      },
      nutrition: {
        de: 'Mehr Kohlenhydrate für maximale Performance. Protein wie gewohnt.',
        en: 'More carbs for peak performance. Protein as usual.',
      },
    },
    ovulation: {
      training: {
        de: 'Peak-Energie! HIIT, Maximalbelastung möglich. Achtung: leicht erhöhtes Verletzungsrisiko.',
        en: 'Peak energy! HIIT, max effort possible. Note: slightly higher injury risk.',
      },
      nutrition: {
        de: 'Ausgewogene Ernährung, Protein hoch halten. Viel Wasser trinken.',
        en: 'Balanced nutrition, keep protein high. Stay hydrated.',
      },
    },
    luteal: {
      training: {
        de: 'Moderate Intensität. Leichtere Gewichte, mehr Pausen. Ausdauer statt Maximalkraft.',
        en: 'Moderate intensity. Lighter weights, more rest. Endurance over max strength.',
      },
      nutrition: {
        de: 'Kalorienbedarf steigt (+100-300 kcal). Heißhunger ist normal — gesunde Snacks einplanen.',
        en: 'Calorie needs increase (+100-300 kcal). Cravings are normal — plan healthy snacks.',
      },
    },
  };

  return recs[phase] ? {
    training: recs[phase].training[lang] || recs[phase].training.en,
    nutrition: recs[phase].nutrition[lang] || recs[phase].nutrition.en,
  } : null;
}

export { PHASES };
