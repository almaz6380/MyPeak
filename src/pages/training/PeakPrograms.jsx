import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ChevronRight, Dumbbell, Heart, Zap, Swords, Star, Clock, Calendar, Play, Check, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { saveWeeklySchedule } from '../../data/workoutStorage';

import { peakPrograms, peakCategories } from '../../data/peakPrograms';

const CAT_ICONS = { strength: Dumbbell, cardio: Heart, hiit: Zap, martial_arts: Swords };
const CAT_COLORS = {
  strength: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20',
  cardio: 'text-red-500 bg-red-50 dark:bg-red-900/20',
  hiit: 'text-amber-500 bg-amber-50 dark:bg-amber-900/20',
  martial_arts: 'text-purple-500 bg-purple-50 dark:bg-purple-900/20',
};

const LEVEL_LABELS = {
  beginner: { de: 'Anfänger', en: 'Beginner', color: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' },
  intermediate: { de: 'Fortgeschritten', en: 'Intermediate', color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' },
  advanced: { de: 'Profi', en: 'Advanced', color: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' },
};

export default function PeakPrograms({ onBack, onProgramActivated, userGoal, userExperience }) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const lang = t('common.back') === 'Zurück' ? 'de' : 'en';
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [activating, setActivating] = useState(false);

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
      <ProgramDetail
        program={selectedProgram}
        lang={lang}
        userGoal={userGoal}
        userExperience={userExperience}
        activating={activating}
        onBack={() => setSelectedProgram(null)}
        onActivate={(customDays) => {
          const p = selectedProgram;
          setActivating(true);
          saveWeeklySchedule(user.id, {
            name: lang === 'de' ? p.nameDE : p.nameEN,
            sessions_per_week: p.sessions_per_week,
            days: customDays,
          }).then(() => { setActivating(false); onProgramActivated(); });
        }}
      />
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
          <button onClick={() => setSelectedCategory(null)} className="p-2 -ml-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold">{lang === 'de' ? cat?.nameDE : cat?.nameEN}</h1>
        </div>

        <div className="space-y-3">
          {programs.map((program) => {
            const levelInfo = LEVEL_LABELS[program.level] || LEVEL_LABELS.beginner;
            const isRecommended = program.goal === userGoal || program.level === userExperience;
            return (
              <button
                key={program.id}
                onClick={() => setSelectedProgram(program)}
                className="w-full bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-soft border border-slate-100 dark:border-slate-800/60 text-left hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${CAT_COLORS[program.category]}`}>
                    <CatIcon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        {lang === 'de' ? program.nameDE : program.nameEN}
                      </p>
                      {isRecommended && <Star className="w-3.5 h-3.5 text-primary-500" />}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-semibold ${levelInfo.color}`}>
                        {lang === 'de' ? levelInfo.de : levelInfo.en}
                      </span>
                      <span className="text-[10px] text-slate-400">{program.duration_weeks} {lang === 'de' ? 'Wo.' : 'wks'} · {program.sessions_per_week}x/{lang === 'de' ? 'Woche' : 'week'}</span>
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
        <button onClick={onBack} className="p-2 -ml-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold">Peak-{lang === 'de' ? 'Programme' : 'Programs'}</h1>
      </div>

      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
        {lang === 'de'
          ? 'Professionelle Trainingsprogramme von MyPeak. Wähle eine Kategorie.'
          : 'Professional training programs by MyPeak. Choose a category.'}
      </p>

      <div className="space-y-3">
        {sortedCategories.map((cat) => {
          const CatIcon = CAT_ICONS[cat.id] || Dumbbell;
          const count = peakPrograms.filter((p) => p.category === cat.id).length;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className="w-full bg-white dark:bg-surface-dark-alt rounded-2xl p-5 shadow-soft border border-slate-100 dark:border-slate-800/60 text-left hover:shadow-md transition-shadow flex items-center gap-4"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${CAT_COLORS[cat.id]}`}>
                <CatIcon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="text-base font-semibold text-slate-900 dark:text-white">{lang === 'de' ? cat.nameDE : cat.nameEN}</p>
                <p className="text-xs text-slate-400 mt-0.5">{count} {lang === 'de' ? 'Programme' : 'programs'}</p>
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
function ProgramDetail({ program, lang, userGoal, userExperience, activating, onBack, onActivate }) {
  const DAY_KEYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  const DAY_NAMES_SHORT = lang === 'de' ? ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'] : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const DAY_NAMES = lang === 'de'
    ? ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag']
    : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const levelInfo = LEVEL_LABELS[program.level] || LEVEL_LABELS.beginner;
  const isRecommended = (program.goal === userGoal) || (program.level === userExperience);

  // Editable copy of days
  const [customDays, setCustomDays] = useState(() => JSON.parse(JSON.stringify(program.days)));
  const [editingDay, setEditingDay] = useState(null); // key of the day being edited
  const [swapSource, setSwapSource] = useState(null); // for swapping days

  // Get training sessions (non-null days) in order
  const trainingSessions = DAY_KEYS
    .map((key) => ({ key, data: program.days[key] }))
    .filter((d) => d.data !== null);

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
        <button onClick={onBack} className="p-2 -ml-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold">{lang === 'de' ? program.nameDE : program.nameEN}</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${levelInfo.color}`}>
              {lang === 'de' ? levelInfo.de : levelInfo.en}
            </span>
            {isRecommended && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400 flex items-center gap-0.5">
                <Star className="w-3 h-3" /> {lang === 'de' ? 'Empfohlen' : 'Recommended'}
              </span>
            )}
          </div>
        </div>
      </div>

      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
        {lang === 'de' ? program.descDE : program.descEN}
      </p>

      {/* Stats */}
      <div className="flex gap-3 mb-4">
        <div className="flex-1 bg-white dark:bg-surface-dark-alt rounded-xl p-3 text-center">
          <Clock className="w-4 h-4 text-slate-400 mx-auto mb-1" />
          <p className="text-lg font-bold text-slate-900 dark:text-white">{program.duration_weeks}</p>
          <p className="text-[10px] text-slate-400">{lang === 'de' ? 'Wochen' : 'Weeks'}</p>
        </div>
        <div className="flex-1 bg-white dark:bg-surface-dark-alt rounded-xl p-3 text-center">
          <Calendar className="w-4 h-4 text-slate-400 mx-auto mb-1" />
          <p className="text-lg font-bold text-slate-900 dark:text-white">{program.sessions_per_week}x</p>
          <p className="text-[10px] text-slate-400">{lang === 'de' ? 'pro Woche' : 'per week'}</p>
        </div>
      </div>

      {/* Day arrangement hint */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-3 mb-4">
        <p className="text-xs text-blue-700 dark:text-blue-400">
          {swapSource
            ? (lang === 'de' ? `${DAY_NAMES_SHORT[DAY_KEYS.indexOf(swapSource)]} ausgewählt — tippe auf einen anderen Tag zum Tauschen` : `${DAY_NAMES_SHORT[DAY_KEYS.indexOf(swapSource)]} selected — tap another day to swap`)
            : (lang === 'de' ? 'Tippe auf einen Tag um ihn mit einem anderen zu tauschen. Übungen können entfernt werden.' : 'Tap a day to swap it with another. Exercises can be removed.')}
        </p>
      </div>

      {/* Editable Weekly Plan */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
          {lang === 'de' ? 'Wochenplan anpassen' : 'Customize Weekly Plan'}
        </h2>
        <button onClick={resetToOriginal} className="text-xs text-primary-500 font-medium">
          {lang === 'de' ? 'Zurücksetzen' : 'Reset'}
        </button>
      </div>

      <div className="space-y-2 mb-6">
        {DAY_KEYS.map((key, i) => {
          const day = customDays[key];
          const isSwapSelected = swapSource === key;
          return (
            <div key={key}>
              <button
                onClick={() => handleDayTap(key)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${
                  isSwapSelected
                    ? 'bg-primary-50 dark:bg-primary-900/20 ring-2 ring-primary-400'
                    : day
                      ? 'bg-white dark:bg-surface-dark-alt'
                      : 'bg-slate-50 dark:bg-slate-800/50'
                }`}
              >
                <span className="text-xs font-semibold text-slate-500 w-8">{DAY_NAMES_SHORT[i]}</span>
                {day ? (
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{day.label || day.type || ''}</p>
                    {day.exercises && <p className="text-[10px] text-slate-400">{day.exercises.length} {lang === 'de' ? 'Übungen' : 'exercises'}</p>}
                    {day.targetDuration && <p className="text-[10px] text-slate-400">{Math.round(day.targetDuration / 60)} min</p>}
                    {day.rounds && <p className="text-[10px] text-slate-400">{day.rounds} {lang === 'de' ? 'Runden' : 'rounds'}</p>}
                  </div>
                ) : (
                  <p className="text-sm text-slate-400 italic flex-1 text-left">{lang === 'de' ? 'Ruhetag' : 'Rest day'}</p>
                )}
                {day && (
                  <button
                    onClick={(e) => { e.stopPropagation(); setEditingDay(editingDay === key ? null : key); }}
                    className="p-1 text-slate-400 hover:text-primary-500"
                  >
                    <ChevronRight className={`w-4 h-4 transition-transform ${editingDay === key ? 'rotate-90' : ''}`} />
                  </button>
                )}
              </button>

              {/* Expanded exercises */}
              {editingDay === key && day?.exercises && (
                <div className="ml-12 mt-1 space-y-1 mb-2">
                  {day.exercises.map((ex, exIdx) => (
                    <div key={exIdx} className="flex items-center justify-between px-3 py-1.5 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <span className="text-xs text-slate-600 dark:text-slate-400">
                        {ex.id || ex} {ex.sets && `· ${ex.sets}×${ex.reps}`}
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

      {/* Activate Button */}
      <button
        onClick={() => onActivate(customDays)}
        disabled={activating}
        className="w-full py-4 bg-primary-500 hover:bg-primary-600 disabled:opacity-50 text-white font-semibold rounded-2xl flex items-center justify-center gap-2"
      >
        {activating ? '...' : (
          <>
            <Play className="w-5 h-5" />
            {lang === 'de' ? 'Programm starten' : 'Start Program'}
          </>
        )}
      </button>
    </div>
  );
}
