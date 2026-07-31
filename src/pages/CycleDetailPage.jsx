import { toLocalDateString } from '../lib/dateUtils';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Dumbbell, Apple, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import MedicalDisclaimer from '../components/MedicalDisclaimer';
import { useAuth } from '../context/AuthContext';
import {
  getCycleSettings, saveCycleSettings,
  getCycleLog, saveCycleLog,
  getCyclePhase, getPhaseRecommendations,
} from '../data/cycleStorage';

function formatDate(d) { return toLocalDateString(d); }

const MOODS = [
  { key: 'great', emoji: '😁' },
  { key: 'good', emoji: '😊' },
  { key: 'okay', emoji: '😐' },
  { key: 'bad', emoji: '😔' },
  { key: 'awful', emoji: '😢' },
];

const ENERGY_LEVELS = ['high', 'medium', 'low'];
const PAIN_LEVELS = ['none', 'mild', 'moderate', 'severe'];
const SLEEP_LEVELS = ['great', 'good', 'poor', 'terrible'];

export default function CycleDetailPage({ onBack }) {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const lang = i18n.language?.startsWith('de') ? 'de' : 'en';
  const today = formatDate(new Date());

  const [settings, setSettings] = useState(null);
  const [showSetup, setShowSetup] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [log, setLog] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) loadData();
  }, [user]);

  async function loadData() {
    setLoading(true);
    const s = await getCycleSettings(user.id);
    if (s) {
      setSettings(s);
      const l = await getCycleLog(user.id, today);
      if (l) setLog(l);
    } else {
      setShowSetup(true);
    }
    setLoading(false);
  }

  const phaseInfo = settings ? getCyclePhase(settings, today) : null;
  const recs = phaseInfo ? getPhaseRecommendations(phaseInfo.phase, lang) : null;

  function updateLog(field, value) {
    const updated = { ...log, [field]: value };
    setLog(updated);
    saveCycleLog(user.id, today, updated);
  }

  function toggleSymptom(field) {
    updateLog(field, !log[field]);
  }

  if (loading) {
    return (
      <div className="p-4 pt-16 pb-24 flex justify-center py-12">
        <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (showSetup || !settings) {
    return <CycleSetup onSave={async (s) => { await saveCycleSettings(user.id, s); setSettings(s); setShowSetup(false); }} onBack={onBack} lang={lang} />;
  }

  if (showSettings) {
    return (
      <CycleSetup
        initial={settings}
        onSave={async (s) => { await saveCycleSettings(user.id, s); setSettings(s); setShowSettings(false); }}
        onBack={() => setShowSettings(false)}
        lang={lang}
      />
    );
  }

  const phaseProgress = phaseInfo ? Math.round((phaseInfo.dayInPhase / phaseInfo.phaseLength) * 100) : 0;

  return (
    <div className="p-4 pt-16 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 -ml-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold">{t('cycle.title')}</h1>
        </div>
        <button onClick={() => setShowSettings(true)} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
          <Settings className="w-5 h-5 text-slate-400" />
        </button>
      </div>

      {/* Phase Display */}
      {phaseInfo && (
        <div className="bg-white dark:bg-surface-dark-alt rounded-2xl p-5 shadow-soft border border-slate-100 dark:border-slate-800/60 mb-4 text-center">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${phaseInfo.bgClass}/20 mb-3`}>
            <div className={`w-2.5 h-2.5 rounded-full ${phaseInfo.bgClass}`} />
            <span className={`text-sm font-semibold ${phaseInfo.textClass}`}>
              {t(`cycle.phase_${phaseInfo.phase}`)}
            </span>
          </div>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
            {t('cycle.day')} {phaseInfo.dayInPhase}/{phaseInfo.phaseLength}
          </p>
          <p className="text-xs text-slate-400 mb-3">
            {t('cycle.cycleDay')} {phaseInfo.dayInCycle}/{phaseInfo.cycleLength}
          </p>
          <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <div className={`h-full ${phaseInfo.bgClass} rounded-full transition-all`} style={{ width: `${phaseProgress}%` }} />
          </div>
        </div>
      )}

      {/* Zyklusdaten sind Gesundheitsdaten, die Empfehlungen darunter sind
          allgemein gehalten — der Hinweis steht deshalb direkt davor. */}
      <MedicalDisclaimer lang={lang} className="mb-4" />

      {/* Recommendations */}
      {recs && (
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-soft border border-slate-100 dark:border-slate-800/60">
            <div className="flex items-center gap-2 mb-2">
              <Dumbbell className="w-4 h-4 text-primary-500" />
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">{t('cycle.trainingRec')}</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{recs.training}</p>
          </div>
          <div className="bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-soft border border-slate-100 dark:border-slate-800/60">
            <div className="flex items-center gap-2 mb-2">
              <Apple className="w-4 h-4 text-green-500" />
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">{t('cycle.nutritionRec')}</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{recs.nutrition}</p>
          </div>
        </div>
      )}

      {/* Symptom Diary */}
      <div className="bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-soft border border-slate-100 dark:border-slate-800/60 mb-4">
        <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-4">{t('cycle.diary')}</h2>

        {/* Mood */}
        <div className="mb-4">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">{t('cycle.mood')}</p>
          <div className="flex gap-2">
            {MOODS.map((m) => (
              <button
                key={m.key}
                onClick={() => updateLog('mood', m.key)}
                className={`flex-1 py-2.5 rounded-xl text-xl transition-all ${
                  log.mood === m.key
                    ? 'bg-primary-100 dark:bg-primary-900/30 ring-2 ring-primary-400 scale-110'
                    : 'bg-slate-50 dark:bg-slate-800'
                }`}
              >
                {m.emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Energy */}
        <div className="mb-4">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">{t('cycle.energy')}</p>
          <div className="flex gap-2">
            {ENERGY_LEVELS.map((e) => (
              <button
                key={e}
                onClick={() => updateLog('energy', e)}
                className={`flex-1 py-2 rounded-xl text-xs font-medium transition-all ${
                  log.energy === e
                    ? 'bg-primary-500 text-white'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                {t(`cycle.energy_${e}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Pain */}
        <div className="mb-4">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">{t('cycle.pain')}</p>
          <div className="flex gap-2">
            {PAIN_LEVELS.map((p) => (
              <button
                key={p}
                onClick={() => updateLog('pain', p)}
                className={`flex-1 py-2 rounded-xl text-xs font-medium transition-all ${
                  log.pain === p
                    ? 'bg-primary-500 text-white'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                {t(`cycle.pain_${p}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Sleep */}
        <div className="mb-4">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">{t('cycle.sleep')}</p>
          <div className="flex gap-2">
            {SLEEP_LEVELS.map((s) => (
              <button
                key={s}
                onClick={() => updateLog('sleep', s)}
                className={`flex-1 py-2 rounded-xl text-xs font-medium transition-all ${
                  log.sleep === s
                    ? 'bg-primary-500 text-white'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                {t(`cycle.sleep_${s}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Symptom Toggles */}
        <div className="mb-4">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">{t('cycle.symptoms')}</p>
          <div className="flex gap-2">
            {[
              { key: 'bloating', label: t('cycle.bloating'), emoji: '🫧' },
              { key: 'headache', label: t('cycle.headache'), emoji: '🤕' },
              { key: 'cravings', label: t('cycle.cravings'), emoji: '🍫' },
            ].map((s) => (
              <button
                key={s.key}
                onClick={() => toggleSymptom(s.key)}
                className={`flex-1 py-2.5 rounded-xl text-center transition-all ${
                  log[s.key]
                    ? 'bg-primary-100 dark:bg-primary-900/30 ring-2 ring-primary-400'
                    : 'bg-slate-50 dark:bg-slate-800'
                }`}
              >
                <span className="text-lg block">{s.emoji}</span>
                <span className="text-[10px] text-slate-500">{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">{t('cycle.notes')}</p>
          <textarea
            value={log.notes || ''}
            onChange={(e) => updateLog('notes', e.target.value)}
            placeholder={t('cycle.notesPlaceholder')}
            rows={2}
            className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>
    </div>
  );
}

// ── Setup / Settings ────────────────────────────────────────────
function CycleSetup({ onSave, onBack, lang, initial }) {
  const { t, i18n } = useTranslation();
  const [lastStart, setLastStart] = useState(initial?.last_period_start || '');
  const [cycleLength, setCycleLength] = useState(initial?.cycle_length || 28);
  const [periodLength, setPeriodLength] = useState(initial?.period_length || 5);

  function handleSave() {
    if (!lastStart) return;
    onSave({ last_period_start: lastStart, cycle_length: cycleLength, period_length: periodLength, tracking_enabled: true });
  }

  return (
    <div className="p-4 pt-16 pb-24">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="p-2 -ml-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold">{initial ? t('cycle.settings') : t('cycle.setup')}</h1>
      </div>

      <div className="space-y-6">
        {/* Last period start */}
        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
            {t('cycle.lastPeriod')}
          </label>
          <input
            type="date"
            value={lastStart}
            onChange={(e) => setLastStart(e.target.value)}
            max={formatDate(new Date())}
            className="w-full px-4 py-3.5 bg-white dark:bg-surface-dark-alt border border-slate-200 dark:border-slate-700 rounded-2xl text-base focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {/* Cycle length */}
        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
            {t('cycle.cycleLength')}
          </label>
          <div className="text-center mb-2">
            <span className="text-3xl font-bold text-slate-900 dark:text-white">{cycleLength}</span>
            <span className="text-sm text-slate-400 ml-1">{t('cycle.daysUnit')}</span>
          </div>
          <input
            type="range"
            min={21}
            max={35}
            value={cycleLength}
            onChange={(e) => setCycleLength(parseInt(e.target.value))}
            className="w-full h-3 rounded-full appearance-none cursor-pointer slider-primary"
          />
          <div className="flex justify-between mt-1 text-xs text-slate-400">
            <span>21</span>
            <span>35</span>
          </div>
        </div>

        {/* Period length */}
        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
            {t('cycle.periodLength')}
          </label>
          <div className="text-center mb-2">
            <span className="text-3xl font-bold text-slate-900 dark:text-white">{periodLength}</span>
            <span className="text-sm text-slate-400 ml-1">{t('cycle.daysUnit')}</span>
          </div>
          <input
            type="range"
            min={3}
            max={7}
            value={periodLength}
            onChange={(e) => setPeriodLength(parseInt(e.target.value))}
            className="w-full h-3 rounded-full appearance-none cursor-pointer slider-primary"
          />
          <div className="flex justify-between mt-1 text-xs text-slate-400">
            <span>3</span>
            <span>7</span>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={!lastStart}
          className="w-full py-4 bg-primary-500 hover:bg-primary-600 disabled:opacity-50 text-white font-semibold rounded-2xl transition-colors"
        >
          {t('cycle.save')}
        </button>
      </div>
    </div>
  );
}
