import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { appSprache, beschriftung } from '../../lib/sprache';
import { wochentagKuerzel } from '../../lib/datumsformat';
import { ArrowLeft, ChevronRight, ChevronDown, Dumbbell, Heart, Zap, Swords, Star, Clock, Calendar, Play, X, FlaskConical, TrendingUp } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { saveWeeklySchedule } from '../../data/workoutStorage';
import { getExerciseById } from '../../data/exercises';
import { describeSegments } from './ActiveStructuredCardio';
import Toast from '../../components/Toast';

import { peakPrograms, peakCategories } from '../../data/peakPrograms';
import { useUebersetzung, uebersetztesProgramm, studienBefund, kategorieName } from '../../data/uebersetzungen';
import { tagesBeschriftung } from '../../data/tagesbeschriftung';

const CAT_ICONS = { strength: Dumbbell, cardio: Heart, hiit: Zap, martial_arts: Swords };
const CAT_COLORS = {
  strength: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20',
  cardio: 'text-red-500 bg-red-50 dark:bg-red-900/20',
  hiit: 'text-amber-500 bg-amber-50 dark:bg-amber-900/20',
  martial_arts: 'text-purple-500 bg-purple-50 dark:bg-purple-900/20',
};

const LEVEL_LABELS = {
  beginner: { de: 'Anfänger', en: 'Beginner', es: 'Principiante', fr: 'Débutant', pt: 'Iniciante', ar: 'مبتدئ', nl: 'Beginner', pl: 'Początkujący', it: 'Principiante', tr: 'Başlangıç', ja: '初心者', ko: '초급', color: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' },
  intermediate: { de: 'Fortgeschritten', en: 'Intermediate', es: 'Intermedio', fr: 'Intermédiaire', pt: 'Intermediário', ar: 'متوسط', nl: 'Gevorderd', pl: 'Średniozaawansowany', it: 'Intermedio', tr: 'Orta seviye', ja: '中級者', ko: '중급', color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' },
  advanced: { de: 'Profi', en: 'Advanced', es: 'Avanzado', fr: 'Confirmé', pt: 'Avançado', ar: 'متقدم', nl: 'Expert', pl: 'Zaawansowany', it: 'Avanzato', tr: 'İleri seviye', ja: '上級者', ko: '고급', color: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' },
};

export default function PeakPrograms({ onBack, onProgramActivated, userGoal, userExperience, activeScheduleName }) {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const lang = appSprache(i18n.language);
  // Spanisches Programmpaket; null, solange es lädt oder die Sprache keines hat.
  const paket = useUebersetzung('programs', i18n.language);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [activating, setActivating] = useState(false);
  const [activateError, setActivateError] = useState(false);

  // Sort categories: show matching goal first
  const goalOrder = { muscle_gain: 'strength', weight_loss: 'hiit', maintenance: 'cardio' };
  const preferredCat = goalOrder[userGoal] || '';
  const sortedCategories = [...peakCategories].sort((a, b) => {
    if (a.id === preferredCat) return -1;
    if (b.id === preferredCat) return 1;
    return 0;
  });


  // ── Program Detail ──
  if (selectedProgram) {
    return (
      <>
      {activateError && (
        <Toast
          variant="error"
          message={t('ui.savingFailedPleaseTryAgain')}
          onDismiss={() => setActivateError(false)}
        />
      )}
      <ProgramDetail
        program={selectedProgram}
        lang={lang}
        paket={paket}
        userGoal={userGoal}
        userExperience={userExperience}
        activating={activating}
        activeScheduleName={activeScheduleName}
        onBack={() => setSelectedProgram(null)}
        onActivate={(customDays) => {
          const p = selectedProgram;
          const name = uebersetztesProgramm(p, lang, paket).name;
          setActivating(true);
          // _meta verknüpft den Schedule mit dem Programm → Wochen-Progression
          // wird zur Lesezeit aufgelöst (programResolver); alte Schedules ohne
          // _meta bleiben unverändert nutzbar.
          const days = {
            ...customDays,
            _meta: {
              programId: p.id,
              startedAt: new Date().toISOString().slice(0, 10),
              durationWeeks: p.duration_weeks,
            },
          };
          saveWeeklySchedule(user?.id || 'guest', {
            name,
            sessions_per_week: p.sessions_per_week,
            days,
          })
            .then(() => { setActivating(false); onProgramActivated(name); })
            .catch(() => {
              setActivating(false);
              setActivateError(true);
            });
        }}
      />
      </>
    );
  }

  // ── Category Programs List ──
  if (selectedCategory) {
    const cat = peakCategories.find((c) => c.id === selectedCategory);
    const CatIcon = CAT_ICONS[selectedCategory] || Dumbbell;
    const programs = peakPrograms.filter((p) => p.category === selectedCategory);

    // Sort: recommended first, then by level
    const levelOrder = { beginner: 0, intermediate: 1, advanced: 2 };
    programs.sort((a, b) => {
      const aRec = a.goal === userGoal || a.level === userExperience ? -1 : 0;
      const bRec = b.goal === userGoal || b.level === userExperience ? -1 : 0;
      if (aRec !== bRec) return aRec - bRec;
      return (levelOrder[a.level] || 0) - (levelOrder[b.level] || 0);
    });

    return (
      <div className="p-4 pt-16 pb-24">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setSelectedCategory(null)} className="p-2 -ms-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold">{kategorieName(cat, lang, paket)}</h1>
        </div>

        <div className="space-y-3">
          {programs.map((program) => {
            const levelInfo = LEVEL_LABELS[program.level] || LEVEL_LABELS.beginner;
            const isRecommended = program.goal === userGoal || program.level === userExperience;
            return (
              <button
                key={program.id}
                onClick={() => setSelectedProgram(program)}
                className="w-full bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-soft border border-slate-100 dark:border-slate-800/60 text-start hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${CAT_COLORS[program.category]}`}>
                    <CatIcon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        {uebersetztesProgramm(program, lang, paket).name}
                      </p>
                      {isRecommended && <Star className="w-3.5 h-3.5 text-primary-500" />}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-semibold ${levelInfo.color}`}>
                        {beschriftung(levelInfo, lang)}
                      </span>
                      <span className="text-[10px] text-slate-400">{program.duration_weeks} {t('ui.wks')} · {program.sessions_per_week}x/{t('ui.week2')}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-300 flex-shrink-0 mt-2" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ── Categories Overview ──
  return (
    <div className="p-4 pt-16 pb-24">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="p-2 -ms-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold">{t('ui.fullrepPrograms')}</h1>
      </div>

      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
        {t('ui.professionalTrainingProgramsByFull')}
      </p>

      <div className="space-y-3">
        {sortedCategories.map((cat) => {
          const CatIcon = CAT_ICONS[cat.id] || Dumbbell;
          const count = peakPrograms.filter((p) => p.category === cat.id).length;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className="w-full bg-white dark:bg-surface-dark-alt rounded-2xl p-5 shadow-soft border border-slate-100 dark:border-slate-800/60 text-start hover:shadow-md transition-shadow flex items-center gap-4"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${CAT_COLORS[cat.id]}`}>
                <CatIcon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="text-base font-semibold text-slate-900 dark:text-white">{kategorieName(cat, lang, paket)}</p>
                <p className="text-xs text-slate-400 mt-0.5">{count} {t('ui.programs2')}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300" />
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Program Detail with editable days + exercises ──
function ProgramDetail({ program, lang, paket, userGoal, userExperience, activating, activeScheduleName, onBack, onActivate }) {
  const { t } = useTranslation();
  const [confirmReplace, setConfirmReplace] = useState(false);
  const DAY_KEYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  const DAY_NAMES_SHORT = wochentagKuerzel(lang);

  const levelInfo = LEVEL_LABELS[program.level] || LEVEL_LABELS.beginner;
  const isRecommended = (program.goal === userGoal) || (program.level === userExperience);
  const text = uebersetztesProgramm(program, lang, paket);

  // Editable copy of days
  const [customDays, setCustomDays] = useState(() => JSON.parse(JSON.stringify(program.days)));
  const [editingDay, setEditingDay] = useState(null); // key of the day being edited
  const [swapSource, setSwapSource] = useState(null); // for swapping days
  const [showWhy, setShowWhy] = useState(false);
  const [previewWeek, setPreviewWeek] = useState(1);

  const hasWeeks = Array.isArray(program.weeks) && program.weeks.some((w) => w && Object.keys(w).length > 0);

  // Tag für die Anzeige: Basiswoche (customDays), in der Vorschau überlagert
  // mit dem Wochen-Override des Programms
  function displayDay(key) {
    const day = customDays[key];
    if (!day) return null;
    if (previewWeek > 1 && day.sessionId) {
      const override = program.weeks?.[previewWeek - 1]?.[day.sessionId];
      if (override) return { ...day, ...override };
    }
    return day;
  }

  const exName = (idOrObj) => {
    const id = typeof idOrObj === 'string' ? idOrObj : idOrObj.id;
    const ex = getExerciseById(id);
    return ex ? t(ex.nameKey) : id;
  };

  const fmtSec = (s) => (s >= 60 ? `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')} min` : `${s} s`);

  function swapDays(dayA, dayB) {
    setCustomDays((prev) => {
      const next = { ...prev };
      const temp = next[dayA];
      next[dayA] = next[dayB];
      next[dayB] = temp;
      return next;
    });
    setSwapSource(null);
  }

  function handleDayTap(key) {
    if (swapSource) {
      if (swapSource !== key) swapDays(swapSource, key);
      else setSwapSource(null);
    } else {
      setSwapSource(key);
    }
  }

  function removeExercise(dayKey, exIdx) {
    setCustomDays((prev) => {
      const next = { ...prev };
      if (next[dayKey]?.exercises) {
        next[dayKey] = { ...next[dayKey], exercises: next[dayKey].exercises.filter((_, i) => i !== exIdx) };
      }
      return next;
    });
  }

  function resetToOriginal() {
    setCustomDays(JSON.parse(JSON.stringify(program.days)));
  }

  return (
    <div className="p-4 pt-16 pb-24">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="p-2 -ms-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold">{text.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${levelInfo.color}`}>
              {beschriftung(levelInfo, lang)}
            </span>
            {isRecommended && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400 flex items-center gap-0.5">
                <Star className="w-3 h-3" /> {t('ui.recommended')}
              </span>
            )}
          </div>
        </div>
      </div>

      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
        {text.desc}
      </p>

      {/* Warum dieser Plan? — Wirkweise + Studienlage (eingeklappt) */}
      {(program.whyDE || program.studies?.length > 0) && (
        <div className="bg-white dark:bg-surface-dark-alt rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800/60 mb-4 overflow-hidden">
          <button onClick={() => setShowWhy(!showWhy)} className="w-full flex items-center justify-between p-4">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-primary-500" />
              {t('ui.whyThisPlan')}
            </span>
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${showWhy ? 'rotate-180' : ''}`} />
          </button>
          {showWhy && (
            <div className="px-4 pb-4">
              {program.whyDE && (
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                  {text.why}
                </p>
              )}
              {program.studies?.length > 0 && (
                <div className="space-y-2">
                  <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400">
                    {t('ui.evidence')}
                  </p>
                  {program.studies.map((s, i) => (
                    <p key={i} className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      <span className="font-semibold text-slate-600 dark:text-slate-300">{s.name} ({s.year}):</span>{' '}
                      {studienBefund(s, lang, paket)}
                    </p>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Stats */}
      <div className="flex gap-3 mb-4">
        <div className="flex-1 bg-white dark:bg-surface-dark-alt rounded-xl p-3 text-center">
          <Clock className="w-4 h-4 text-slate-400 mx-auto mb-1" />
          <p className="text-lg font-bold text-slate-900 dark:text-white">{program.duration_weeks}</p>
          <p className="text-[10px] text-slate-400">{t('ui.weeks')}</p>
        </div>
        <div className="flex-1 bg-white dark:bg-surface-dark-alt rounded-xl p-3 text-center">
          <Calendar className="w-4 h-4 text-slate-400 mx-auto mb-1" />
          <p className="text-lg font-bold text-slate-900 dark:text-white">{program.sessions_per_week}x</p>
          <p className="text-[10px] text-slate-400">{t('ui.perWeek')}</p>
        </div>
      </div>

      {/* Progressions-Regel */}
      {program.progressionDE && (
        <div className="bg-white dark:bg-surface-dark-alt rounded-xl p-3 mb-4 flex gap-2 border border-slate-100 dark:border-slate-800/60">
          <TrendingUp className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            {text.progression}
          </p>
        </div>
      )}

      {/* Day arrangement hint */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-3 mb-4">
        <p className="text-xs text-blue-700 dark:text-blue-400">
          {swapSource
            ? (t('ui.dayNamesShortDayKeysIndexof', { tag: DAY_NAMES_SHORT[DAY_KEYS.indexOf(swapSource)] }))
            : (t('ui.tapADayToSwapIt'))}
        </p>
      </div>

      {/* Editable Weekly Plan */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
          {t('ui.customizeWeeklyPlan')}
        </h2>
        <button onClick={resetToOriginal} className="text-xs text-primary-500 font-medium">
          {t('ui.reset')}
        </button>
      </div>

      {/* Wochen-Chips: Progression vor dem Start ansehen */}
      {hasWeeks && (
        <div className="mb-3">
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
            {Array.from({ length: program.duration_weeks }, (_, w) => w + 1).map((w) => (
              <button
                key={w}
                onClick={() => setPreviewWeek(w)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  previewWeek === w
                    ? 'bg-primary-500 text-white'
                    : 'bg-white dark:bg-surface-dark-alt text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
                }`}
              >
                W{w}
              </button>
            ))}
          </div>
          {previewWeek > 1 && (
            <p className="text-[10px] text-slate-400 mt-1">
              {t('ui.previewWeekPreviewweekThePlanProgr', { previewWeek })}
            </p>
          )}
        </div>
      )}

      <div className="space-y-2 mb-6">
        {DAY_KEYS.map((key, i) => {
          const day = displayDay(key);
          const isSwapSelected = swapSource === key;
          return (
            <div key={key}>
              <div
                role="button"
                tabIndex={0}
                onClick={() => handleDayTap(key)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all cursor-pointer ${
                  isSwapSelected
                    ? 'bg-primary-50 dark:bg-primary-900/20 ring-2 ring-primary-400'
                    : day
                      ? 'bg-white dark:bg-surface-dark-alt'
                      : 'bg-slate-50 dark:bg-slate-800/50'
                }`}
              >
                <span className="text-xs font-semibold text-slate-500 w-8">{DAY_NAMES_SHORT[i]}</span>
                {day ? (
                  <div className="flex-1 text-start">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{tagesBeschriftung(day.label, lang) || day.type || ''}</p>
                    {day.exercises && <p className="text-[10px] text-slate-400">{day.exercises.length} {t('ui.exercises')}</p>}
                    {day.type === 'cardio' && day.exerciseId && (
                      <p className="text-[10px] font-medium text-red-500">{exName(day.exerciseId)}</p>
                    )}
                    {day.segments ? (
                      <p className="text-[10px] text-slate-400">{describeSegments(day.segments)}</p>
                    ) : (
                      day.targetDuration && <p className="text-[10px] text-slate-400">{Math.round(day.targetDuration / 60)} min</p>
                    )}
                    {day.rounds && (
                      <p className="text-[10px] text-slate-400">
                        {day.rounds} {t('ui.rounds')} · {fmtSec(day.workTime)} / {fmtSec(day.restTime)} {t('ui.rest')}
                      </p>
                    )}
                    {text.fokus(DAY_KEYS[i], day) && (
                      <p className="text-[10px] text-primary-500 font-medium">{text.fokus(DAY_KEYS[i], day)}</p>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-slate-400 italic flex-1 text-start">{t('ui.restDay')}</p>
                )}
                {day && (
                  <button
                    onClick={(e) => { e.stopPropagation(); setEditingDay(editingDay === key ? null : key); }}
                    className="p-1 text-slate-400 hover:text-primary-500"
                  >
                    <ChevronRight className={`w-4 h-4 transition-transform ${editingDay === key ? 'rotate-90' : ''}`} />
                  </button>
                )}
              </div>

              {/* Expanded exercises */}
              {editingDay === key && day?.exercises && (
                <div className="ms-12 mt-1 space-y-1 mb-2">
                  {day.exercises.map((ex, exIdx) => (
                    <div key={exIdx} className="flex items-center justify-between px-3 py-1.5 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <span className="text-xs text-slate-600 dark:text-slate-400">
                        {exName(ex)} {ex.sets && `· ${ex.sets}×${ex.reps}`}
                      </span>
                      <button
                        onClick={() => removeExercise(key, exIdx)}
                        className="text-slate-300 hover:text-red-500 p-0.5"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Hinweis: ein aktives Programm ist bereits vorhanden */}
      {activeScheduleName && !activating && (
        <p className="text-[11px] text-slate-400 text-center mb-2 px-2">
          {t('ui.activeActiveschedulenameStartingRe', { activeScheduleName })}
        </p>
      )}

      {/* Activate Button */}
      <button
        onClick={() => (activeScheduleName ? setConfirmReplace(true) : onActivate(customDays))}
        disabled={activating}
        className="w-full py-4 bg-primary-500 hover:bg-primary-600 disabled:opacity-50 text-white font-semibold rounded-2xl flex items-center justify-center gap-2"
      >
        {activating ? (t('ui.activating')) : (
          <>
            <Play className="w-5 h-5" />
            {t('ui.startProgram')}
          </>
        )}
      </button>

      {/* Ersetzen-Bestätigung */}
      {confirmReplace && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-surface-dark-alt rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <p className="text-center font-semibold mb-1">
              {t('ui.replaceActiveProgram')}
            </p>
            <p className="text-center text-sm text-slate-500 dark:text-slate-400 mb-4">
              {t('ui.youCurrentlyHaveActiveschedulename', {
                activeScheduleName,
                programName: uebersetztesProgramm(program, lang, paket).name,
              })}
            </p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmReplace(false)} className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 font-medium text-sm">
                {t('common.cancel')}
              </button>
              <button onClick={() => { setConfirmReplace(false); onActivate(customDays); }} className="flex-1 py-2.5 rounded-xl bg-primary-500 text-white font-medium text-sm">
                {t('ui.replace')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
