import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Calculator, Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { saveNutritionGoals } from '../../data/nutritionStorage';

const ACTIVITY_MULTIPLIERS = {
  sedentary: 1.2,
  moderate: 1.55,
  very_active: 1.9,
};

const GOAL_ADJUSTMENTS = {
  muscle_gain: 300,
  maintenance: 0,
  weight_loss: -500,
};

export default function TDEECalculator({ onBack, onSaved }) {
  const { t } = useTranslation();
  const { user, profile } = useAuth();
  const [saved, setSaved] = useState(false);

  // Pre-fill from profile
  const [gender, setGender] = useState(profile?.gender || 'male');
  const [age, setAge] = useState(profile?.age || 25);
  const [weight, setWeight] = useState(profile?.weight_kg || 75);
  const [height, setHeight] = useState(profile?.height_cm || 175);
  const [activityLevel, setActivityLevel] = useState(profile?.activity_level || 'moderate');
  const [goal, setGoal] = useState(profile?.goal || 'maintenance');

  const calculations = useMemo(() => {
    // Mifflin-St Jeor
    const bmr = gender === 'female'
      ? 10 * weight + 6.25 * height - 5 * age - 161
      : 10 * weight + 6.25 * height - 5 * age + 5;

    const multiplier = ACTIVITY_MULTIPLIERS[activityLevel] || 1.55;
    const tdee = bmr * multiplier;
    const adjustment = GOAL_ADJUSTMENTS[goal] || 0;
    const dailyCalories = Math.round(tdee + adjustment);

    // Macro split
    const proteinG = Math.round(weight * (goal === 'weight_loss' ? 2.2 : 2));
    const fatCalories = dailyCalories * 0.25;
    const fatG = Math.round(fatCalories / 9);
    const proteinCalories = proteinG * 4;
    const carbCalories = dailyCalories - proteinCalories - fatCalories;
    const carbsG = Math.round(Math.max(0, carbCalories / 4));

    return {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      dailyCalories,
      adjustment,
      protein: proteinG,
      carbs: carbsG,
      fat: fatG,
    };
  }, [gender, age, weight, height, activityLevel, goal]);

  async function handleApply() {
    await saveNutritionGoals(user.id, {
      calories: calculations.dailyCalories,
      protein: calculations.protein,
      carbs: calculations.carbs,
      fat: calculations.fat,
      tdee: calculations.tdee,
    });
    setSaved(true);
    setTimeout(() => onSaved(), 800);
  }

  const activityOptions = [
    { value: 'sedentary', labelKey: 'onboarding.sedentary', descKey: 'onboarding.sedentaryDesc' },
    { value: 'moderate', labelKey: 'onboarding.moderate', descKey: 'onboarding.moderateDesc' },
    { value: 'very_active', labelKey: 'onboarding.veryActive', descKey: 'onboarding.veryActiveDesc' },
  ];

  const goalOptions = [
    { value: 'muscle_gain', labelKey: 'onboarding.muscleGain', adjustment: '+300 kcal' },
    { value: 'maintenance', labelKey: 'onboarding.maintenance', adjustment: '±0 kcal' },
    { value: 'weight_loss', labelKey: 'onboarding.weightLoss', adjustment: '-500 kcal' },
  ];

  return (
    <div className="p-4 pt-16 pb-24">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold">{t('nutrition.tdeeTitle')}</h1>
      </div>

      {/* Body Stats */}
      <div className="bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-soft border border-slate-100 dark:border-slate-800/60 mb-4">
        <div className="grid grid-cols-2 gap-3">
          {/* Gender */}
          <div>
            <label className="text-xs font-medium text-slate-400 dark:text-slate-500 mb-1 block">{t('onboarding.gender')}</label>
            <div className="flex gap-2">
              {['male', 'female'].map((g) => (
                <button
                  key={g}
                  onClick={() => setGender(g)}
                  className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
                    gender === g
                      ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-500 dark:text-primary-400 ring-2 ring-primary-400'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {t(`onboarding.${g}`)}
                </button>
              ))}
            </div>
          </div>

          {/* Age */}
          <div>
            <label className="text-xs font-medium text-slate-400 dark:text-slate-500 mb-1 block">{t('onboarding.age')}</label>
            <input
              type="number"
              inputMode="numeric"
              value={age}
              onChange={(e) => setAge(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-center focus:outline-none focus:ring-2 focus:ring-primary-400"
            />
          </div>

          {/* Weight */}
          <div>
            <label className="text-xs font-medium text-slate-400 dark:text-slate-500 mb-1 block">{t('onboarding.weight')} (kg)</label>
            <input
              type="number"
              inputMode="decimal"
              value={weight}
              onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-center focus:outline-none focus:ring-2 focus:ring-primary-400"
            />
          </div>

          {/* Height */}
          <div>
            <label className="text-xs font-medium text-slate-400 dark:text-slate-500 mb-1 block">{t('onboarding.height')} (cm)</label>
            <input
              type="number"
              inputMode="numeric"
              value={height}
              onChange={(e) => setHeight(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-center focus:outline-none focus:ring-2 focus:ring-primary-400"
            />
          </div>
        </div>
      </div>

      {/* Activity Level */}
      <div className="bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-soft border border-slate-100 dark:border-slate-800/60 mb-4">
        <label className="text-xs font-medium text-slate-400 dark:text-slate-500 mb-3 block">{t('nutrition.activityMultiplier')}</label>
        <div className="space-y-2">
          {activityOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setActivityLevel(opt.value)}
              className={`w-full p-3 rounded-xl border-2 text-left transition-all ${
                activityLevel === opt.value
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-slate-200 dark:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-semibold ${activityLevel === opt.value ? 'text-primary-500 dark:text-primary-400' : 'text-slate-700 dark:text-slate-200'}`}>
                    {t(opt.labelKey)}
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">{t(opt.descKey)}</p>
                </div>
                <span className="text-xs font-mono text-slate-400">×{ACTIVITY_MULTIPLIERS[opt.value]}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Goal */}
      <div className="bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-soft border border-slate-100 dark:border-slate-800/60 mb-4">
        <label className="text-xs font-medium text-slate-400 dark:text-slate-500 mb-3 block">{t('nutrition.goalAdjustment')}</label>
        <div className="space-y-2">
          {goalOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setGoal(opt.value)}
              className={`w-full p-3 rounded-xl border-2 text-left transition-all ${
                goal === opt.value
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-slate-200 dark:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <p className={`text-sm font-semibold ${goal === opt.value ? 'text-primary-500 dark:text-primary-400' : 'text-slate-700 dark:text-slate-200'}`}>
                  {t(opt.labelKey)}
                </p>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-lg ${
                  opt.value === 'muscle_gain' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                  opt.value === 'weight_loss' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' :
                  'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                }`}>
                  {opt.adjustment}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-soft border border-slate-100 dark:border-slate-800/60 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <Calculator className="w-4 h-4 text-primary-500" />
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">{t('nutrition.recommended')}</h3>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3 text-center">
            <p className="text-xs text-slate-400 dark:text-slate-500">{t('nutrition.bmr')}</p>
            <p className="text-lg font-bold text-slate-700 dark:text-slate-200">{calculations.bmr} kcal</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3 text-center">
            <p className="text-xs text-slate-400 dark:text-slate-500">TDEE</p>
            <p className="text-lg font-bold text-slate-700 dark:text-slate-200">{calculations.tdee} kcal</p>
          </div>
        </div>

        <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-4 text-center mb-4">
          <p className="text-xs text-primary-500 dark:text-primary-400">{t('nutrition.dailyGoal')}</p>
          <p className="text-3xl font-bold text-primary-500 dark:text-primary-400">{calculations.dailyCalories}</p>
          <p className="text-sm text-primary-500 dark:text-primary-400">kcal</p>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 text-center">
            <p className="text-[10px] text-blue-500 dark:text-blue-400">{t('nutrition.protein')}</p>
            <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{calculations.protein}g</p>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-3 text-center">
            <p className="text-[10px] text-emerald-500 dark:text-emerald-400">{t('nutrition.carbs')}</p>
            <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{calculations.carbs}g</p>
          </div>
          <div className="bg-rose-50 dark:bg-rose-900/20 rounded-xl p-3 text-center">
            <p className="text-[10px] text-rose-500 dark:text-rose-400">{t('nutrition.fat')}</p>
            <p className="text-lg font-bold text-rose-600 dark:text-rose-400">{calculations.fat}g</p>
          </div>
        </div>
      </div>

      {/* Apply Button */}
      <button
        onClick={handleApply}
        disabled={saved}
        className={`w-full py-3.5 rounded-2xl font-semibold transition-colors flex items-center justify-center gap-2 ${
          saved
            ? 'bg-green-500 text-white'
            : 'bg-primary-500 hover:bg-primary-500 text-white'
        }`}
      >
        {saved ? (
          <>
            <Check className="w-5 h-5" />
            {t('nutrition.goalSaved')}
          </>
        ) : (
          t('nutrition.apply')
        )}
      </button>
    </div>
  );
}
