import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight, Check, Dumbbell, User, Users, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

const TOTAL_STEPS = 8;

export default function OnboardingPage() {
  const { t } = useTranslation();
  const { user, refreshProfile } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState({
    name: '',
    gender: '',
    age: 25,
    weight_kg: 75,
    height_cm: 175,
    goal: '',
    activity_level: '',
    experience: '',
  });

  function updateField(field, value) {
    setData((prev) => ({ ...prev, [field]: value }));
  }

  function canProceed() {
    switch (step) {
      case 1: return data.name.trim().length > 0;
      case 2: return !!data.gender;
      case 3: return data.age > 0;
      case 4: return data.weight_kg > 0;
      case 5: return data.height_cm > 0;
      case 6: return !!data.goal;
      case 7: return !!data.activity_level;
      case 8: return !!data.experience;
      default: return false;
    }
  }

  async function handleFinish() {
    setLoading(true);
    setError('');
    try {
      const payload = { ...data, onboarding_completed: true, updated_at: new Date().toISOString() };
      console.log('Onboarding payload:', payload);
      console.log('User ID:', user.id);

      const { error: updateError, count } = await supabase
        .from('profiles')
        .update(payload)
        .eq('id', user.id)
        .select();

      console.log('Supabase response — error:', updateError, 'count:', count);

      if (updateError) {
        console.error('Onboarding save error:', updateError);
        setError(`${t('onboarding.saveError')} (${updateError.message})`);
        return;
      }
      await refreshProfile();
    } catch (err) {
      console.error('Onboarding error:', err);
      setError(`${t('onboarding.saveError')} (${err.message})`);
    } finally {
      setLoading(false);
    }
  }

  function handleNext() {
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
    } else {
      handleFinish();
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-surface-dark flex flex-col p-4">
      <div className="w-full max-w-sm mx-auto flex-1 flex flex-col">
        {/* Progress bar */}
        <div className="mb-8 mt-4">
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center mb-3">
            {t('onboarding.step', { current: step, total: TOTAL_STEPS })}
          </p>
          <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-500 rounded-full transition-all duration-300"
              style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
            />
          </div>
        </div>

        {/* Step content */}
        <div className="flex-1 flex flex-col justify-center">
          {step === 1 && <NameStep value={data.name} onChange={(v) => updateField('name', v)} />}
          {step === 2 && <GenderStep value={data.gender} onChange={(v) => updateField('gender', v)} />}
          {step === 3 && <AgeStep value={data.age} onChange={(v) => updateField('age', v)} />}
          {step === 4 && <WeightStep value={data.weight_kg} onChange={(v) => updateField('weight_kg', v)} />}
          {step === 5 && <HeightStep value={data.height_cm} onChange={(v) => updateField('height_cm', v)} />}
          {step === 6 && <GoalStep value={data.goal} onChange={(v) => updateField('goal', v)} />}
          {step === 7 && <ActivityStep value={data.activity_level} onChange={(v) => updateField('activity_level', v)} />}
          {step === 8 && <ExperienceStep value={data.experience} onChange={(v) => updateField('experience', v)} />}
        </div>

        {/* Navigation */}
        <div className="flex gap-3 mt-8 mb-6">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex-1 py-3.5 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              {t('onboarding.back')}
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!canProceed() || loading}
            className="flex-1 py-3.5 bg-primary-500 hover:bg-primary-600 disabled:opacity-50 text-white font-semibold rounded-2xl flex items-center justify-center gap-2 transition-colors"
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

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}
      </div>
    </div>
  );
}

function SelectionCard({ selected, onClick, icon, label, description }) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-2xl border-2 text-left transition-all ${
        selected
          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark-alt hover:border-slate-300 dark:hover:border-slate-600'
      }`}
    >
      <div className="flex items-center gap-3">
        {icon && <div className={`${selected ? 'text-primary-600' : 'text-slate-400'}`}>{icon}</div>}
        <div>
          <p className={`font-semibold ${selected ? 'text-primary-500 dark:text-primary-400' : 'text-slate-900 dark:text-white'}`}>
            {label}
          </p>
          {description && (
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{description}</p>
          )}
        </div>
      </div>
    </button>
  );
}

function NumberInput({ value, onChange, min, max, unit, label, step = 1, decimal = false }) {
  const { t } = useTranslation();
  const displayValue = decimal ? parseFloat(value).toFixed(1) : value;
  return (
    <div className="text-center space-y-6">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white">{label}</h2>
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => onChange(Math.max(min, parseFloat((value - step).toFixed(1))))}
          className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-2xl font-bold flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700"
        >
          -
        </button>
        <div className="text-center">
          <input
            type="number"
            step={step}
            value={displayValue}
            onChange={(e) => {
              const v = decimal ? (parseFloat(e.target.value) || min) : (parseInt(e.target.value) || min);
              onChange(Math.min(max, Math.max(min, parseFloat(v.toFixed(1)))));
            }}
            className="w-24 text-center text-4xl font-bold bg-transparent text-slate-900 dark:text-white focus:outline-none"
          />
          <p className="text-slate-500 dark:text-slate-400 text-sm">{unit}</p>
        </div>
        <button
          onClick={() => onChange(Math.min(max, parseFloat((value + step).toFixed(1))))}
          className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-2xl font-bold flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700"
        >
          +
        </button>
      </div>
    </div>
  );
}

function NameStep({ value, onChange }) {
  const { t } = useTranslation();
  return (
    <div className="text-center space-y-6">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white">{t('onboarding.name')}</h2>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t('onboarding.namePlaceholder')}
        className="w-full text-center text-2xl font-semibold bg-transparent text-slate-900 dark:text-white border-b-2 border-slate-300 dark:border-slate-600 focus:border-primary-500 focus:outline-none py-3 placeholder:text-slate-400 dark:placeholder:text-slate-500"
        autoFocus
      />
    </div>
  );
}

function GenderStep({ value, onChange }) {
  const { t } = useTranslation();
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white text-center mb-6">
        {t('onboarding.gender')}
      </h2>
      <SelectionCard
        selected={value === 'male'}
        onClick={() => onChange('male')}
        icon={<User className="w-6 h-6" />}
        label={t('onboarding.male')}
      />
      <SelectionCard
        selected={value === 'female'}
        onClick={() => onChange('female')}
        icon={<User className="w-6 h-6" />}
        label={t('onboarding.female')}
      />
      <SelectionCard
        selected={value === 'diverse'}
        onClick={() => onChange('diverse')}
        icon={<Users className="w-6 h-6" />}
        label={t('onboarding.diverse')}
      />
    </div>
  );
}

function AgeStep({ value, onChange }) {
  const { t } = useTranslation();
  return <NumberInput value={value} onChange={onChange} min={14} max={100} unit={t('onboarding.years')} label={t('onboarding.age')} />;
}

function WeightStep({ value, onChange }) {
  const { t } = useTranslation();
  return <NumberInput value={value} onChange={onChange} min={30} max={300} unit="kg" label={t('onboarding.weight')} step={0.5} decimal />;
}

function HeightStep({ value, onChange }) {
  const { t } = useTranslation();
  return <NumberInput value={value} onChange={onChange} min={120} max={230} unit={t('onboarding.heightCm')} label={t('onboarding.height')} />;
}

function GoalStep({ value, onChange }) {
  const { t } = useTranslation();
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white text-center mb-6">
        {t('onboarding.goal')}
      </h2>
      <SelectionCard
        selected={value === 'muscle_gain'}
        onClick={() => onChange('muscle_gain')}
        icon={<Dumbbell className="w-6 h-6" />}
        label={t('onboarding.muscleGain')}
      />
      <SelectionCard
        selected={value === 'maintenance'}
        onClick={() => onChange('maintenance')}
        label={t('onboarding.maintenance')}
      />
      <SelectionCard
        selected={value === 'weight_loss'}
        onClick={() => onChange('weight_loss')}
        label={t('onboarding.weightLoss')}
      />
    </div>
  );
}

function ActivityStep({ value, onChange }) {
  const { t } = useTranslation();
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white text-center mb-6">
        {t('onboarding.activityLevel')}
      </h2>
      <SelectionCard
        selected={value === 'sedentary'}
        onClick={() => onChange('sedentary')}
        label={t('onboarding.sedentary')}
        description={t('onboarding.sedentaryDesc')}
      />
      <SelectionCard
        selected={value === 'moderate'}
        onClick={() => onChange('moderate')}
        label={t('onboarding.moderate')}
        description={t('onboarding.moderateDesc')}
      />
      <SelectionCard
        selected={value === 'very_active'}
        onClick={() => onChange('very_active')}
        label={t('onboarding.veryActive')}
        description={t('onboarding.veryActiveDesc')}
      />
    </div>
  );
}

function ExperienceStep({ value, onChange }) {
  const { t } = useTranslation();
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white text-center mb-6">
        {t('onboarding.experience')}
      </h2>
      <SelectionCard
        selected={value === 'beginner'}
        onClick={() => onChange('beginner')}
        label={t('onboarding.beginner')}
        description={t('onboarding.beginnerDesc')}
      />
      <SelectionCard
        selected={value === 'intermediate'}
        onClick={() => onChange('intermediate')}
        label={t('onboarding.intermediate')}
        description={t('onboarding.intermediateDesc')}
      />
      <SelectionCard
        selected={value === 'pro'}
        onClick={() => onChange('pro')}
        label={t('onboarding.pro')}
        description={t('onboarding.proDesc')}
      />
    </div>
  );
}
