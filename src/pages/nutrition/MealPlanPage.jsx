import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, Loader2, AlertTriangle, Plus, Check, RefreshCw } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSubscription } from '../../context/SubscriptionContext';
import { getNutritionGoals, saveNutritionEntry } from '../../data/nutritionStorage';
import { requestMealPlan, ladeLetztenPlan, speichereLetztenPlan } from '../../data/premiumApi';
import { appSprache } from '../../lib/sprache';
import { todayLocal } from '../../lib/dateUtils';
import PremiumGesperrt from '../../components/PremiumGesperrt';
import MedicalDisclaimer from '../../components/MedicalDisclaimer';

const FORMEN = ['omnivore', 'vegetarian', 'pescetarian', 'vegan'];
const MAHLZEITEN = [3, 4, 5];

// KI-Ernährungsplan (Premium): ein Tagesplan aus den eigenen Makrozielen.
export default function MealPlanPage() {
  const { t, i18n } = useTranslation();
  const lang = appSprache(i18n.language);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isPremium, openPaywall } = useSubscription();

  const gespeichert = ladeLetztenPlan(user?.id);
  const [ziele, setZiele] = useState(null);
  const [form, setForm] = useState(gespeichert?.eingabe?.diet || 'omnivore');
  const [anzahl, setAnzahl] = useState(gespeichert?.eingabe?.meals || 4);
  const [ohne, setOhne] = useState(gespeichert?.eingabe?.exclude || '');
  const [plan, setPlan] = useState(gespeichert?.plan || null);
  const [laedt, setLaedt] = useState(false);
  const [fehler, setFehler] = useState('');
  const [rest, setRest] = useState(null);
  const [hinzugefuegt, setHinzugefuegt] = useState({});

  useEffect(() => {
    if (user?.id) getNutritionGoals(user.id).then(setZiele);
  }, [user?.id]);

  if (!isPremium) {
    return <PremiumGesperrt titel={t('premium.planTitle')} text={t('premium.planLocked')} grund="meal_plan" />;
  }

  async function erstellen() {
    if (!ziele || laedt) return;
    setFehler('');
    setLaedt(true);
    const eingabe = {
      goals: { calories: ziele.calories, protein: ziele.protein, carbs: ziele.carbs, fat: ziele.fat },
      diet: form, meals: anzahl, exclude: ohne.trim(), lang,
    };
    const res = await requestMealPlan(eingabe);
    setLaedt(false);
    if (res.error) {
      if (res.error === 'premium_required') { openPaywall('meal_plan'); return; }
      setFehler(
        res.error === 'quota_exceeded' ? t('ui.dailyLimitReachedContinuesTomorrow')
          : res.error === 'invalid_goals' ? t('premium.planInvalidGoals')
            : res.error === 'login_required' ? t('premium.loginRequired')
              : t('premium.aiUnavailable'),
      );
      if (res.error === 'quota_exceeded') setRest(0);
      return;
    }
    const { remaining, ...neu } = res;
    setPlan(neu);
    setHinzugefuegt({});
    if (typeof remaining === 'number') setRest(remaining);
    speichereLetztenPlan(user?.id, { plan: neu, eingabe, erstellt: new Date().toISOString() });
  }

  async function mahlzeitEintragen(index) {
    const m = plan.meals[index];
    const date = todayLocal();
    for (const i of m.items) {
      await saveNutritionEntry(user.id, {
        date, meal_slot: m.slot, food_name: i.name, brand: null,
        serving_size: i.grams || 1, serving_unit: 'g',
        calories: i.calories, protein: i.protein, carbs: i.carbs, fat: i.fat,
        source: 'ai_plan',
      });
    }
    setHinzugefuegt((h) => ({ ...h, [index]: true }));
  }

  const chip = (aktiv) => `px-3 py-1.5 rounded-xl text-sm font-medium transition-colors ${
    aktiv ? 'bg-primary-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`;

  return (
    <div className="p-4 pt-16 pb-24">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => navigate(-1)} className="p-2 -ms-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <ArrowLeft className="w-5 h-5 rtl:-scale-x-100" />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-bold">{t('premium.planTitle')}</h1>
          {rest !== null && <p className="text-[11px] text-slate-400">{t('premium.planRemaining', { remaining: rest })}</p>}
        </div>
      </div>

      {/* Ziele + Einstellungen */}
      <div className="karte p-4 mb-4 space-y-4">
        {ziele && (
          <div>
            <p className="text-xs font-medium text-slate-400 mb-1">{t('premium.planGoals')}</p>
            <p className="text-sm font-semibold" dir="ltr">
              {ziele.calories} kcal · P {ziele.protein} g · C {ziele.carbs} g · F {ziele.fat} g
            </p>
          </div>
        )}
        <div>
          <p className="text-xs font-medium text-slate-400 mb-2">{t('premium.planDiet')}</p>
          <div className="flex flex-wrap gap-2">
            {FORMEN.map((f) => (
              <button key={f} onClick={() => setForm(f)} className={chip(form === f)}>{t(`premium.diet_${f}`)}</button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-slate-400 mb-2">{t('premium.planMeals')}</p>
          <div className="flex gap-2">
            {MAHLZEITEN.map((n) => (
              <button key={n} onClick={() => setAnzahl(n)} className={chip(anzahl === n)}>{n}</button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-slate-400 mb-2">{t('premium.planExclude')}</p>
          <input
            value={ohne}
            onChange={(e) => setOhne(e.target.value.slice(0, 200))}
            placeholder={t('premium.planExcludePlaceholder')}
            className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm"
          />
        </div>
        <button
          onClick={erstellen}
          disabled={!ziele || laedt}
          className="w-full py-3 rounded-2xl bg-primary-500 hover:bg-primary-600 disabled:opacity-60 text-white font-semibold flex items-center justify-center gap-2"
        >
          {laedt ? <Loader2 className="w-4 h-4 animate-spin" /> : (plan ? <RefreshCw className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />)}
          {laedt ? t('premium.planCreating') : (plan ? t('premium.planRegenerate') : t('premium.planCreate'))}
        </button>
      </div>

      {fehler && (
        <div className="mb-4 flex items-start gap-2 p-3 rounded-xl bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 text-sm">
          <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>{fehler}</span>
        </div>
      )}

      {plan && !laedt && (
        <>
          <div className="karte p-4 mb-4 flex justify-between text-center" dir="ltr">
            <Wert zahl={plan.totals.calories} einheit="kcal" />
            <Wert zahl={plan.totals.protein} einheit={`g ${t('nutrition.protein')}`} />
            <Wert zahl={plan.totals.carbs} einheit={`g ${t('nutrition.carbs')}`} />
            <Wert zahl={plan.totals.fat} einheit={`g ${t('nutrition.fat')}`} />
          </div>

          {plan.meals.map((m, index) => (
            <div key={index} className="karte p-4 mb-3">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="min-w-0">
                  <p className="text-xs font-medium text-primary-500">{t(`nutrition.${m.slot}`)}</p>
                  <p className="font-semibold">{m.title}</p>
                </div>
                <p className="text-sm font-semibold whitespace-nowrap" dir="ltr">{m.totals.calories} kcal</p>
              </div>
              <ul className="space-y-1 mb-3">
                {m.items.map((i, k) => (
                  <li key={k} className="flex justify-between gap-2 text-sm">
                    <span className="text-slate-700 dark:text-slate-200">{i.name}</span>
                    <span className="text-slate-400 whitespace-nowrap" dir="ltr">{i.grams} g · {i.calories} kcal</span>
                  </li>
                ))}
              </ul>
              <p className="text-[11px] text-slate-400 mb-3" dir="ltr">
                P {m.totals.protein} g · C {m.totals.carbs} g · F {m.totals.fat} g
              </p>
              <button
                onClick={() => mahlzeitEintragen(index)}
                disabled={hinzugefuegt[index]}
                className="w-full py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm font-medium flex items-center justify-center gap-1.5 disabled:text-emerald-600"
              >
                {hinzugefuegt[index] ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                {hinzugefuegt[index] ? t('premium.planAdded') : t('premium.planAddToday')}
              </button>
            </div>
          ))}

          {plan.tip && <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">💡 {plan.tip}</p>}
        </>
      )}

      <MedicalDisclaimer lang={lang} type="general" className="mt-2" />
    </div>
  );
}

function Wert({ zahl, einheit }) {
  return (
    <div>
      <p className="text-base font-bold">{zahl}</p>
      <p className="text-[10px] text-slate-400">{einheit}</p>
    </div>
  );
}
