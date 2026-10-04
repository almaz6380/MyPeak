import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Dumbbell, Apple, Scale, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSubscription } from '../context/SubscriptionContext';
import { getWorkouts } from '../data/workoutStorage';
import { getWeightEntries } from '../data/weightStorage';
import { getNutritionEntriesRange, getNutritionGoals } from '../data/nutritionStorage';
import { getExerciseDisplayName } from '../data/exercises';
import { wochenUebersicht, topUebungen, ernaehrungsSchnitt, gewichtsTrend } from '../lib/statistik';
import { toLocalDateString } from '../lib/dateUtils';
import { datumsLocale } from '../lib/datumsformat';
import PremiumGesperrt from '../components/PremiumGesperrt';

const WOCHEN = 8;

function vorTagen(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return toLocalDateString(d);
}

// Detaillierte Analysen & Statistiken (Premium). Rechnet alles auf dem Gerät
// aus den vorhandenen Daten — kein Server, kein Modell.
export default function StatsPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isPremium } = useSubscription();
  const [daten, setDaten] = useState(null);
  const [zeitraum, setZeitraum] = useState(30);

  useEffect(() => {
    if (!user?.id || !isPremium) return;
    let abgebrochen = false;
    Promise.all([
      getWorkouts(user.id),
      getWeightEntries(user.id, 365),
      getNutritionEntriesRange(user.id, vorTagen(89), vorTagen(0)),
      getNutritionGoals(user.id),
    ]).then(([workouts, gewicht, essen, ziele]) => {
      if (!abgebrochen) setDaten({ workouts, gewicht, essen, ziele });
    }).catch(() => {
      if (!abgebrochen) setDaten({ workouts: [], gewicht: [], essen: {}, ziele: {} });
    });
    return () => { abgebrochen = true; };
  }, [user?.id, isPremium]);

  const auswertung = useMemo(() => {
    if (!daten) return null;
    const ab = vorTagen(zeitraum - 1);
    const essenImZeitraum = Object.fromEntries(Object.entries(daten.essen).filter(([d]) => d >= ab));
    return {
      wochen: wochenUebersicht(daten.workouts, new Date(), WOCHEN),
      top: topUebungen(daten.workouts, ab),
      trainingsImZeitraum: (daten.workouts || []).filter((w) => w.date >= ab).length,
      essen: ernaehrungsSchnitt(essenImZeitraum, daten.ziele),
      gewicht: gewichtsTrend(daten.gewicht, ab),
      ziele: daten.ziele || {},
    };
  }, [daten, zeitraum]);

  if (!isPremium) {
    return <PremiumGesperrt titel={t('premium.statsTitle')} text={t('premium.statsLocked')} grund="stats" />;
  }

  return (
    <div className="p-4 pt-16 pb-24">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => navigate(-1)} className="p-2 -ms-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <ArrowLeft className="w-5 h-5 rtl:-scale-x-100" />
        </button>
        <h1 className="text-xl font-bold">{t('premium.statsTitle')}</h1>
      </div>

      <div className="flex gap-2 mb-4">
        {[7, 30, 90].map((n) => (
          <button
            key={n}
            onClick={() => setZeitraum(n)}
            className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${
              zeitraum === n ? 'bg-primary-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}
          >
            {t('premium.statsDays', { n })}
          </button>
        ))}
      </div>

      {!auswertung ? (
        <div className="flex justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-primary-500" /></div>
      ) : (
        <>
          <Training a={auswertung} t={t} locale={datumsLocale(i18n.language)} />
          <Ernaehrung a={auswertung} t={t} />
          <Gewicht a={auswertung} t={t} />
        </>
      )}
    </div>
  );
}

function Karte({ icon: Icon, titel, children }) {
  return (
    <div className="karte p-4 mb-4">
      <h2 className="flex items-center gap-2 text-sm font-semibold mb-3">
        <Icon className="w-4 h-4 text-primary-500" />
        {titel}
      </h2>
      {children}
    </div>
  );
}

function Kennzahl({ wert, text }) {
  return (
    <div className="flex-1 rounded-xl bg-slate-50 dark:bg-slate-800/60 p-3">
      <p className="text-lg font-bold" dir="ltr">{wert}</p>
      <p className="text-[11px] text-slate-400 leading-tight">{text}</p>
    </div>
  );
}

// Balken je Woche. Höhe relativ zum Maximum; reine CSS-Balken, keine Bibliothek.
function Balken({ werte, beschriftung, format }) {
  const max = Math.max(1, ...werte);
  return (
    <div className="flex items-end gap-1.5 h-28" dir="ltr">
      {werte.map((w, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
          <span className="text-[9px] text-slate-400">{w ? format(w) : ''}</span>
          <div
            className={`w-full rounded-t-md ${i === werte.length - 1 ? 'bg-primary-500' : 'bg-primary-300/70 dark:bg-primary-700/70'}`}
            style={{ height: `${Math.max(w ? 6 : 2, (w / max) * 80)}%` }}
          />
          <span className="text-[9px] text-slate-400">{beschriftung[i]}</span>
        </div>
      ))}
    </div>
  );
}

function Training({ a, t, locale }) {
  const fmt = new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'numeric' });
  const labels = a.wochen.map((w) => fmt.format(new Date(w.start + 'T12:00:00')));
  const proWoche = a.wochen.slice(0, -1).reduce((s, w) => s + w.trainings, 0) / Math.max(1, a.wochen.length - 1);
  return (
    <Karte icon={Dumbbell} titel={t('premium.statsTraining')}>
      <div className="flex gap-2 mb-4">
        <Kennzahl wert={a.trainingsImZeitraum} text={t('premium.statsWorkouts')} />
        <Kennzahl wert={proWoche.toFixed(1)} text={t('premium.statsPerWeek')} />
      </div>
      <p className="text-xs text-slate-400 mb-2">{t('premium.statsWorkoutsPerWeek')}</p>
      <Balken werte={a.wochen.map((w) => w.trainings)} beschriftung={labels} format={(v) => v} />
      <p className="text-xs text-slate-400 mt-4 mb-2">{t('premium.statsVolume')}</p>
      <Balken
        werte={a.wochen.map((w) => w.volumenKg)}
        beschriftung={labels}
        format={(v) => (v >= 1000 ? `${Math.round(v / 100) / 10}t` : v)}
      />
      {a.top.length > 0 && (
        <>
          <p className="text-xs text-slate-400 mt-4 mb-2">{t('premium.statsTopExercises')}</p>
          <ul className="space-y-1.5">
            {a.top.map((e) => (
              <li key={e.exerciseId} className="flex justify-between gap-2 text-sm">
                <span className="truncate">{getExerciseDisplayName({ id: e.exerciseId, nameKey: e.nameKey }, null, t)}</span>
                <span className="text-slate-400 whitespace-nowrap" dir="ltr">
                  {t('premium.statsSets', { n: e.saetze })}{e.bestKg > 0 ? ` · ${e.bestKg} kg` : ''}
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </Karte>
  );
}

function Ernaehrung({ a, t }) {
  const { essen, ziele } = a;
  if (!essen.geloggteTage) {
    return <Karte icon={Apple} titel={t('premium.statsNutrition')}><p className="text-sm text-slate-400">{t('premium.statsNoData')}</p></Karte>;
  }
  const zeile = (key, label, einheit) => {
    const ziel = Number(ziele[key]) || 0;
    const ist = essen.schnitt[key];
    const anteil = ziel ? Math.min(150, Math.round((ist / ziel) * 100)) : 0;
    return (
      <div key={key} className="mb-3">
        <div className="flex justify-between text-sm mb-1">
          <span>{label}</span>
          <span className="text-slate-400" dir="ltr">{ist}{einheit}{ziel ? ` / ${ziel}${einheit}` : ''}</span>
        </div>
        {ziel > 0 && (
          <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div className={`h-full rounded-full ${anteil > 110 ? 'bg-rose-400' : 'bg-primary-500'}`} style={{ width: `${Math.min(100, anteil)}%` }} />
          </div>
        )}
      </div>
    );
  };
  return (
    <Karte icon={Apple} titel={t('premium.statsNutrition')}>
      <div className="flex gap-2 mb-4">
        <Kennzahl wert={essen.geloggteTage} text={t('premium.statsLoggedDays')} />
        <Kennzahl wert={essen.imZiel} text={t('premium.statsOnTarget')} />
      </div>
      <p className="text-xs text-slate-400 mb-2">{t('premium.statsAverage')}</p>
      {zeile('calories', 'kcal', '')}
      {zeile('protein', t('nutrition.protein'), ' g')}
      {zeile('carbs', t('nutrition.carbs'), ' g')}
      {zeile('fat', t('nutrition.fat'), ' g')}
    </Karte>
  );
}

function Gewicht({ a, t }) {
  const g = a.gewicht;
  if (g.punkte.length < 2) {
    return <Karte icon={Scale} titel={t('premium.statsWeight')}><p className="text-sm text-slate-400">{t('premium.statsNoWeight')}</p></Karte>;
  }
  const vorzeichen = (v) => (v > 0 ? `+${v}` : `${v}`);
  return (
    <Karte icon={Scale} titel={t('premium.statsWeight')}>
      <div className="flex gap-2">
        <Kennzahl wert={`${g.punkte[g.punkte.length - 1].kg} kg`} text={t('premium.statsCurrent')} />
        <Kennzahl wert={`${vorzeichen(g.aenderungKg)} kg`} text={t('premium.statsChange')} />
        {g.proWocheKg !== null && <Kennzahl wert={`${vorzeichen(g.proWocheKg)} kg`} text={t('premium.statsPerWeekWeight')} />}
      </div>
    </Karte>
  );
}
