import { supabase } from '../lib/supabase';
import { isGuest } from '../context/AuthContext';
import { beschriftung } from '../lib/sprache';

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
        es: 'Se recomienda entrenamiento suave: yoga, movilidad, paseos. Escucha a tu cuerpo.',
        fr: 'Entraînement léger recommandé : yoga, mobilité, marche. Écoute ton corps.',
        pt: 'Treino leve recomendado: ioga, mobilidade, caminhadas. Escute o seu corpo.',
        ar: 'يُنصح بتدريب خفيف: يوغا، وتمارين مرونة، ومشي. أنصت إلى جسدك.',
        nl: 'Lichte training aanbevolen: yoga, mobility, wandelen. Luister naar je lichaam.',
        pl: 'Zalecany lekki trening: joga, mobility, spacery. Słuchaj swojego ciała.',
        it: 'Allenamento leggero consigliato: yoga, mobilità, passeggiate. Ascolta il tuo corpo.',
      },
      nutrition: {
        de: 'Eisenreiche Lebensmittel (Spinat, rotes Fleisch), Magnesium. Kein Kaloriendefizit.',
        en: 'Iron-rich foods (spinach, red meat), magnesium. No calorie deficit.',
        es: 'Alimentos ricos en hierro (espinacas, carne roja), magnesio. Sin déficit calórico.',
        fr: 'Aliments riches en fer (épinards, viande rouge), magnésium. Pas de déficit calorique.',
        pt: 'Alimentos ricos em ferro (espinafre, carne vermelha), magnésio. Sem déficit calórico.',
        ar: 'أطعمة غنية بالحديد (سبانخ، لحم أحمر) ومغنيسيوم. بلا عجز سعري.',
        nl: 'IJzerrijke voeding (spinazie, rood vlees), magnesium. Geen calorietekort.',
        pl: 'Produkty bogate w żelazo (szpinak, czerwone mięso), magnez. Bez deficytu kalorycznego.',
        it: 'Alimenti ricchi di ferro (spinaci, carne rossa), magnesio. Niente deficit calorico.',
      },
    },
    follicular: {
      training: {
        de: 'Beste Phase für intensives Training! Krafttraining, Volumen hochfahren, PRs versuchen.',
        en: 'Best phase for intense training! Strength training, increase volume, go for PRs.',
        es: '¡La mejor fase para entrenar fuerte! Fuerza, sube el volumen, busca récords.',
        fr: 'Meilleure phase pour s’entraîner dur ! Musculation, monte le volume, vise des records.',
        pt: 'A melhor fase para treinar pesado! Força, aumente o volume, busque recordes.',
        ar: 'أفضل مرحلة للتدريب المكثّف! تدريب قوة، وارفع الحجم، وحاول تسجيل أرقام جديدة.',
        nl: 'Beste fase voor intensieve training! Krachttraining, volume opvoeren, PR’s proberen.',
        pl: 'Najlepsza faza na intensywny trening! Trening siłowy, więcej objętości, próby PR.',
        it: 'Fase migliore per l’allenamento intenso! Allenamento di forza, aumenta il volume, punta ai PR.',
      },
      nutrition: {
        de: 'Mehr Kohlenhydrate für maximale Performance. Protein wie gewohnt.',
        en: 'More carbs for peak performance. Protein as usual.',
        es: 'Más carbohidratos para rendir al máximo. Proteína como siempre.',
        fr: 'Plus de glucides pour la performance. Protéines comme d’habitude.',
        pt: 'Mais carboidratos para o desempenho máximo. Proteína como sempre.',
        ar: 'كربوهيدرات أكثر لأقصى أداء. والبروتين كالمعتاد.',
        nl: 'Meer koolhydraten voor maximale prestaties. Eiwit zoals gewoonlijk.',
        pl: 'Więcej węglowodanów dla maksymalnej wydajności. Białko jak zwykle.',
        it: 'Più carboidrati per la massima performance. Proteine come al solito.',
      },
    },
    ovulation: {
      training: {
        de: 'Peak-Energie! HIIT, Maximalbelastung möglich. Achtung: leicht erhöhtes Verletzungsrisiko.',
        en: 'Peak energy! HIIT, max effort possible. Note: slightly higher injury risk.',
        es: '¡Energía máxima! HIIT y esfuerzo máximo posibles. Ojo: riesgo de lesión algo mayor.',
        fr: 'Énergie au maximum ! HIIT et effort maximal possibles. Attention : risque de blessure un peu plus élevé.',
        pt: 'Energia no pico! HIIT e esforço máximo são possíveis. Atenção: risco de lesão um pouco maior.',
        ar: 'ذروة الطاقة! تمارين HIIT وجهد أقصى ممكنان. انتبه: خطر الإصابة أعلى قليلًا.',
        nl: 'Piekenergie! HIIT, maximale inspanning mogelijk. Let op: iets hoger blessurerisico.',
        pl: 'Szczyt energii! HIIT, możliwy maksymalny wysiłek. Uwaga: lekko wyższe ryzyko kontuzji.',
        it: 'Energia al massimo! HIIT, sforzi massimali possibili. Attenzione: rischio di infortuni leggermente più alto.',
      },
      nutrition: {
        de: 'Ausgewogene Ernährung, Protein hoch halten. Viel Wasser trinken.',
        en: 'Balanced nutrition, keep protein high. Stay hydrated.',
        es: 'Alimentación equilibrada, mantén la proteína alta. Bebe mucha agua.',
        fr: 'Alimentation équilibrée, garde les protéines hautes. Bois beaucoup d’eau.',
        pt: 'Alimentação equilibrada, mantenha a proteína alta. Beba bastante água.',
        ar: 'تغذية متوازنة مع إبقاء البروتين مرتفعًا. واشرب ماءً كثيرًا.',
        nl: 'Gevarieerde voeding, eiwit hoog houden. Drink veel water.',
        pl: 'Zbilansowana dieta, utrzymuj wysokie spożycie białka. Pij dużo wody.',
        it: 'Alimentazione equilibrata, mantieni alte le proteine. Bevi molta acqua.',
      },
    },
    luteal: {
      training: {
        de: 'Moderate Intensität. Leichtere Gewichte, mehr Pausen. Ausdauer statt Maximalkraft.',
        en: 'Moderate intensity. Lighter weights, more rest. Endurance over max strength.',
        es: 'Intensidad moderada. Pesos más ligeros, más descanso. Resistencia antes que fuerza máxima.',
        fr: 'Intensité modérée. Charges plus légères, plus de repos. Endurance plutôt que force maximale.',
        pt: 'Intensidade moderada. Cargas mais leves, mais descanso. Resistência em vez de força máxima.',
        ar: 'شدّة معتدلة. أوزان أخف واستراحات أكثر. تحمّل بدل القوة القصوى.',
        nl: 'Gematigde intensiteit. Lichtere gewichten, meer rust. Uithoudingsvermogen boven maximale kracht.',
        pl: 'Umiarkowana intensywność. Lżejsze ciężary, dłuższe przerwy. Wytrzymałość zamiast siły maksymalnej.',
        it: 'Intensità moderata. Pesi più leggeri, più pause. Resistenza invece di forza massimale.',
      },
      nutrition: {
        de: 'Kalorienbedarf steigt (+100-300 kcal). Heißhunger ist normal — gesunde Snacks einplanen.',
        en: 'Calorie needs increase (+100-300 kcal). Cravings are normal — plan healthy snacks.',
        es: 'Sube la necesidad calórica (+100-300 kcal). Los antojos son normales: planifica snacks sanos.',
        fr: 'Les besoins caloriques montent (+100-300 kcal). Les fringales sont normales — prévois des en-cas sains.',
        pt: 'A necessidade calórica sobe (+100-300 kcal). A fome intensa é normal — planeje lanches saudáveis.',
        ar: 'ترتفع الحاجة السعرية (100-300+ سعرة). والاشتهاء أمر طبيعي — خطّط لوجبات خفيفة صحية.',
        nl: 'Caloriebehoefte stijgt (+100-300 kcal). Trek is normaal — plan gezonde snacks in.',
        pl: 'Zapotrzebowanie kaloryczne rośnie (+100-300 kcal). Napady głodu są normalne — zaplanuj zdrowe przekąski.',
        it: 'Il fabbisogno calorico aumenta (+100-300 kcal). Le voglie sono normali — pianifica snack sani.',
      },
    },
  };

  // `beschriftung` normalisiert den Sprachcode (HomePage reicht `pt-BR` durch)
  // und faellt sauber auf Englisch zurueck. Ein blosses `recs[…][lang]` liess
  // Regionalcodes ins Leere laufen.
  return recs[phase] ? {
    training: beschriftung(recs[phase].training, lang),
    nutrition: beschriftung(recs[phase].nutrition, lang),
  } : null;
}

export { PHASES };
