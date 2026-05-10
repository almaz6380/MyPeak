import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight, Check, Dumbbell, User, Users, Loader2, Target, Scale, TrendingDown, Zap, Activity, Flame, Baby, Award, Crown } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

const TOTAL_STEPS = 8;

export default function OnboardingPage() {
  const { t } = useTranslation();
  const { user, refreshProfile } = useAuth();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1); // 1=forward, -1=back
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState({
    name: '',
    birthdate: '',
    gender: '',
    height_cm: 175,
    weight_kg: 75.0,
    goal: '',
    activity_level: '',
    experience: '',
    terms_accepted: false,
  });

  function updateField(field, value) {
    setData((prev) => ({ ...prev, [field]: value }));
  }

  function getAge(birthdate) {
    if (!birthdate) return 0;
    const today = new Date();
    const birth = new Date(birthdate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  }

  function canProceed() {
    switch (step) {
      case 1: return data.name.trim().length > 0 && data.birthdate.length > 0 && getAge(data.birthdate) >= 14;
      case 2: return !!data.gender;
      case 3: return data.height_cm >= 120 && data.height_cm <= 230;
      case 4: return data.weight_kg >= 30 && data.weight_kg <= 300;
      case 5: return !!data.goal;
      case 6: return !!data.activity_level;
      case 7: return !!data.experience;
      case 8: return data.terms_accepted;
      default: return false;
    }
  }

  async function handleFinish() {
    setLoading(true);
    setError('');
    try {
      const age = getAge(data.birthdate);
      const payload = {
        name: data.name,
        gender: data.gender,
        age,
        weight_kg: data.weight_kg,
        height_cm: data.height_cm,
        goal: data.goal,
        activity_level: data.activity_level,
        experience: data.experience,
        onboarding_completed: true,
        updated_at: new Date().toISOString(),
      };

      const { error: updateError } = await supabase
        .from('profiles')
        .upsert({ id: user.id, ...payload }, { onConflict: 'id' })
        .select();

      if (updateError) {
        setError(`${t('onboarding.saveError')} (${updateError.message})`);
        return;
      }
      await refreshProfile();
    } catch (err) {
      setError(`${t('onboarding.saveError')} (${err.message})`);
    } finally {
      setLoading(false);
    }
  }

  function handleNext() {
    if (step < TOTAL_STEPS) {
      setDirection(1);
      setStep(step + 1);
    } else {
      handleFinish();
    }
  }

  function handleBack() {
    if (step > 1) {
      setDirection(-1);
      setStep(step - 1);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-surface-dark flex flex-col">
      {/* Progress bar */}
      <div className="px-6 pt-14 pb-4">
        <div className="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      {/* Step content */}
      <div className="flex-1 flex flex-col px-6 overflow-hidden">
        <div
          key={step}
          className="flex-1 flex flex-col animate-fade-in"
        >
          {step === 1 && <NameBirthdateStep data={data} updateField={updateField} />}
          {step === 2 && <GenderStep value={data.gender} onChange={(v) => updateField('gender', v)} />}
          {step === 3 && <HeightStep value={data.height_cm} onChange={(v) => updateField('height_cm', v)} />}
          {step === 4 && <WeightStep value={data.weight_kg} onChange={(v) => updateField('weight_kg', v)} />}
          {step === 5 && <GoalStep value={data.goal} onChange={(v) => updateField('goal', v)} />}
          {step === 6 && <ActivityStep value={data.activity_level} onChange={(v) => updateField('activity_level', v)} />}
          {step === 7 && <ExperienceStep value={data.experience} onChange={(v) => updateField('experience', v)} />}
          {step === 8 && <TermsStep value={data.terms_accepted} onChange={(v) => updateField('terms_accepted', v)} />}
        </div>
      </div>

      {/* Navigation */}
      <div className="px-6 pb-8 pt-4">
        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}
        <div className="flex gap-3">
          {step > 1 && (
            <button
              onClick={handleBack}
              className="w-14 h-14 flex items-center justify-center border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex-shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!canProceed() || loading}
            className="flex-1 h-14 bg-primary-500 hover:bg-primary-600 disabled:opacity-40 disabled:hover:bg-primary-500 text-white font-semibold rounded-2xl flex items-center justify-center gap-2 transition-colors"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : step === TOTAL_STEPS ? (
              <>
                <Check className="w-5 h-5" />
                {t('onboarding.finish')}
              </>
            ) : (
              <>
                {t('onboarding.next')}
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Step 1: Name + Birthdate ────────────────────────────────────
function NameBirthdateStep({ data, updateField }) {
  const { t } = useTranslation();
  return (
    <div className="flex-1 flex flex-col justify-center space-y-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          {t('onboarding.welcomeTitle')}
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          {t('onboarding.welcomeSubtitle')}
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
            {t('onboarding.name')}
          </label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => updateField('name', e.target.value)}
            placeholder={t('onboarding.namePlaceholder')}
            className="w-full px-4 py-4 bg-white dark:bg-surface-dark-alt border border-slate-200 dark:border-slate-700 rounded-2xl text-lg font-medium text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            autoFocus
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
            {t('onboarding.birthdate')}
          </label>
          <input
            type="date"
            value={data.birthdate}
            onChange={(e) => updateField('birthdate', e.target.value)}
            max={new Date(new Date().setFullYear(new Date().getFullYear() - 14)).toISOString().split('T')[0]}
            min="1930-01-01"
            className="w-full px-4 py-4 bg-white dark:bg-surface-dark-alt border border-slate-200 dark:border-slate-700 rounded-2xl text-lg font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
}

// ── Step 2: Gender ──────────────────────────────────────────────
function GenderStep({ value, onChange }) {
  const { t } = useTranslation();
  const options = [
    { id: 'male', icon: <User className="w-8 h-8" />, label: t('onboarding.male'), emoji: '👨' },
    { id: 'female', icon: <User className="w-8 h-8" />, label: t('onboarding.female'), emoji: '👩' },
    { id: 'diverse', icon: <Users className="w-8 h-8" />, label: t('onboarding.diverse'), emoji: '🧑' },
  ];

  return (
    <div className="flex-1 flex flex-col justify-center">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-2">
        {t('onboarding.gender')}
      </h1>
      <p className="text-slate-500 dark:text-slate-400 text-center mb-8">
        {t('onboarding.genderSubtitle')}
      </p>

      <div className="space-y-3">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            className={`w-full p-5 rounded-2xl border-2 transition-all flex items-center gap-4 ${
              value === opt.id
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-lg shadow-primary-500/10'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark-alt hover:border-slate-300 dark:hover:border-slate-600'
            }`}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${
              value === opt.id
                ? 'bg-primary-100 dark:bg-primary-900/40'
                : 'bg-slate-100 dark:bg-slate-800'
            }`}>
              {opt.emoji}
            </div>
            <span className={`text-lg font-semibold ${
              value === opt.id ? 'text-primary-600 dark:text-primary-400' : 'text-slate-900 dark:text-white'
            }`}>
              {opt.label}
            </span>
            {value === opt.id && (
              <div className="ml-auto">
                <Check className="w-6 h-6 text-primary-500" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Step 3: Height (Slider) ─────────────────────────────────────
function HeightStep({ value, onChange }) {
  const { t } = useTranslation();

  return (
    <div className="flex-1 flex flex-col justify-center">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-2">
        {t('onboarding.height')}
      </h1>
      <p className="text-slate-500 dark:text-slate-400 text-center mb-10">
        {t('onboarding.heightSubtitle')}
      </p>

      {/* Big display */}
      <div className="text-center mb-10">
        <span className="text-6xl font-bold text-slate-900 dark:text-white">{value}</span>
        <span className="text-2xl font-medium text-slate-400 ml-2">cm</span>
      </div>

      {/* Slider */}
      <div className="px-4">
        <input
          type="range"
          min={120}
          max={230}
          step={1}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="w-full h-3 rounded-full appearance-none cursor-pointer slider-primary"
        />
        <div className="flex justify-between mt-3 text-xs text-slate-400">
          <span>120 cm</span>
          <span>230 cm</span>
        </div>
      </div>
    </div>
  );
}

// ── Step 4: Weight (Slider) ─────────────────────────────────────
function WeightStep({ value, onChange }) {
  const { t } = useTranslation();

  return (
    <div className="flex-1 flex flex-col justify-center">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-2">
        {t('onboarding.weight')}
      </h1>
      <p className="text-slate-500 dark:text-slate-400 text-center mb-10">
        {t('onboarding.weightSubtitle')}
      </p>

      {/* Big display */}
      <div className="text-center mb-10">
        <span className="text-6xl font-bold text-slate-900 dark:text-white">{value.toFixed(1)}</span>
        <span className="text-2xl font-medium text-slate-400 ml-2">kg</span>
      </div>

      {/* Slider */}
      <div className="px-4">
        <input
          type="range"
          min={30}
          max={200}
          step={0.5}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full h-3 rounded-full appearance-none cursor-pointer slider-primary"
        />
        <div className="flex justify-between mt-3 text-xs text-slate-400">
          <span>30 kg</span>
          <span>200 kg</span>
        </div>
      </div>

      {/* Fine-tune buttons */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={() => onChange(Math.max(30, parseFloat((value - 0.5).toFixed(1))))}
          className="w-12 h-12 rounded-2xl bg-white dark:bg-surface-dark-alt border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xl font-bold flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          -
        </button>
        <button
          onClick={() => onChange(Math.min(200, parseFloat((value + 0.5).toFixed(1))))}
          className="w-12 h-12 rounded-2xl bg-white dark:bg-surface-dark-alt border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xl font-bold flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          +
        </button>
      </div>
    </div>
  );
}

// ── Step 5: Goal ────────────────────────────────────────────────
function GoalStep({ value, onChange }) {
  const { t } = useTranslation();
  const options = [
    { id: 'muscle_gain', icon: <Dumbbell className="w-7 h-7" />, label: t('onboarding.muscleGain'), color: 'text-blue-500' },
    { id: 'maintenance', icon: <Target className="w-7 h-7" />, label: t('onboarding.maintenance'), color: 'text-green-500' },
    { id: 'weight_loss', icon: <TrendingDown className="w-7 h-7" />, label: t('onboarding.weightLoss'), color: 'text-orange-500' },
  ];

  return (
    <div className="flex-1 flex flex-col justify-center">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-2">
        {t('onboarding.goal')}
      </h1>
      <p className="text-slate-500 dark:text-slate-400 text-center mb-8">
        {t('onboarding.goalSubtitle')}
      </p>

      <div className="space-y-3">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            className={`w-full p-5 rounded-2xl border-2 transition-all flex items-center gap-4 ${
              value === opt.id
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-lg shadow-primary-500/10'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark-alt hover:border-slate-300 dark:hover:border-slate-600'
            }`}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
              value === opt.id
                ? 'bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400'
                : `bg-slate-100 dark:bg-slate-800 ${opt.color}`
            }`}>
              {opt.icon}
            </div>
            <span className={`text-lg font-semibold ${
              value === opt.id ? 'text-primary-600 dark:text-primary-400' : 'text-slate-900 dark:text-white'
            }`}>
              {opt.label}
            </span>
            {value === opt.id && (
              <div className="ml-auto">
                <Check className="w-6 h-6 text-primary-500" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Step 6: Activity Level ──────────────────────────────────────
function ActivityStep({ value, onChange }) {
  const { t } = useTranslation();
  const options = [
    { id: 'sedentary', icon: <Activity className="w-7 h-7" />, label: t('onboarding.sedentary'), desc: t('onboarding.sedentaryDesc') },
    { id: 'moderate', icon: <Zap className="w-7 h-7" />, label: t('onboarding.moderate'), desc: t('onboarding.moderateDesc') },
    { id: 'very_active', icon: <Flame className="w-7 h-7" />, label: t('onboarding.veryActive'), desc: t('onboarding.veryActiveDesc') },
  ];

  return (
    <div className="flex-1 flex flex-col justify-center">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-2">
        {t('onboarding.activityLevel')}
      </h1>
      <p className="text-slate-500 dark:text-slate-400 text-center mb-8">
        {t('onboarding.activitySubtitle')}
      </p>

      <div className="space-y-3">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            className={`w-full p-5 rounded-2xl border-2 transition-all flex items-center gap-4 ${
              value === opt.id
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-lg shadow-primary-500/10'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark-alt hover:border-slate-300 dark:hover:border-slate-600'
            }`}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
              value === opt.id
                ? 'bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
            }`}>
              {opt.icon}
            </div>
            <div className="text-left flex-1">
              <span className={`text-base font-semibold block ${
                value === opt.id ? 'text-primary-600 dark:text-primary-400' : 'text-slate-900 dark:text-white'
              }`}>
                {opt.label}
              </span>
              <span className="text-sm text-slate-500 dark:text-slate-400">{opt.desc}</span>
            </div>
            {value === opt.id && (
              <div className="flex-shrink-0">
                <Check className="w-6 h-6 text-primary-500" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Step 7: Experience ──────────────────────────────────────────
function ExperienceStep({ value, onChange }) {
  const { t } = useTranslation();
  const options = [
    { id: 'beginner', icon: <Baby className="w-7 h-7" />, label: t('onboarding.beginner'), desc: t('onboarding.beginnerDesc') },
    { id: 'intermediate', icon: <Award className="w-7 h-7" />, label: t('onboarding.intermediate'), desc: t('onboarding.intermediateDesc') },
    { id: 'pro', icon: <Crown className="w-7 h-7" />, label: t('onboarding.pro'), desc: t('onboarding.proDesc') },
  ];

  return (
    <div className="flex-1 flex flex-col justify-center">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-2">
        {t('onboarding.experience')}
      </h1>
      <p className="text-slate-500 dark:text-slate-400 text-center mb-8">
        {t('onboarding.experienceSubtitle')}
      </p>

      <div className="space-y-3">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            className={`w-full p-5 rounded-2xl border-2 transition-all flex items-center gap-4 ${
              value === opt.id
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-lg shadow-primary-500/10'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark-alt hover:border-slate-300 dark:hover:border-slate-600'
            }`}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
              value === opt.id
                ? 'bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
            }`}>
              {opt.icon}
            </div>
            <div className="text-left flex-1">
              <span className={`text-base font-semibold block ${
                value === opt.id ? 'text-primary-600 dark:text-primary-400' : 'text-slate-900 dark:text-white'
              }`}>
                {opt.label}
              </span>
              <span className="text-sm text-slate-500 dark:text-slate-400">{opt.desc}</span>
            </div>
            {value === opt.id && (
              <div className="flex-shrink-0">
                <Check className="w-6 h-6 text-primary-500" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Step 8: Terms & Privacy ─────────────────────────────────────
function TermsStep({ value, onChange }) {
  const { t } = useTranslation();

  return (
    <div className="flex-1 flex flex-col justify-center">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-2">
        {t('onboarding.termsTitle')}
      </h1>
      <p className="text-slate-500 dark:text-slate-400 text-center mb-8">
        {t('onboarding.termsSubtitle')}
      </p>

      <div className="bg-white dark:bg-surface-dark-alt rounded-2xl border border-slate-200 dark:border-slate-700 p-5 mb-6">
        <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400 max-h-48 overflow-y-auto">
          <p className="font-semibold text-slate-900 dark:text-white">{t('onboarding.termsHeading')}</p>
          <p>{t('onboarding.termsText1')}</p>
          <p className="font-semibold text-slate-900 dark:text-white">{t('onboarding.privacyHeading')}</p>
          <p>{t('onboarding.privacyText1')}</p>
        </div>
      </div>

      <button
        onClick={() => onChange(!value)}
        className={`w-full p-5 rounded-2xl border-2 transition-all flex items-center gap-4 ${
          value
            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
            : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark-alt'
        }`}
      >
        <div className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all ${
          value
            ? 'border-primary-500 bg-primary-500'
            : 'border-slate-300 dark:border-slate-600'
        }`}>
          {value && <Check className="w-4 h-4 text-white" />}
        </div>
        <span className={`text-sm font-medium flex-1 text-left ${
          value ? 'text-primary-600 dark:text-primary-400' : 'text-slate-700 dark:text-slate-300'
        }`}>
          {t('onboarding.termsAccept')}
        </span>
      </button>
    </div>
  );
}
