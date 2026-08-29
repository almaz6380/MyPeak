import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Search, Plus, X, Check, Dumbbell, Heart, Zap, RefreshCw, ChevronRight, Trash2 } from 'lucide-react';
import exercises, { muscleGroups, getExercisesByType } from '../../data/exercises';
import { getCustomExercises, saveCustomExercise, deleteCustomExercise } from '../../data/workoutStorage';
import { useAuth } from '../../context/AuthContext';
import MuscleGroupIcon from '../../components/icons/MuscleGroupIcon';
import ExerciseDetailSheet from './ExerciseDetailSheet';
import { hasDemo } from '../../data/exerciseDemos';

const EQUIPMENT_TYPES = [
  { key: 'all', de: 'Alle', en: 'All' },
  { key: 'barbell', de: 'Langhantel', en: 'Barbell' },
  { key: 'dumbbell', de: 'Kurzhantel', en: 'Dumbbell' },
  { key: 'cable', de: 'Kabelzug', en: 'Cable' },
  { key: 'machine', de: 'Maschine', en: 'Machine' },
  { key: 'bodyweight', de: 'Körpergewicht', en: 'Bodyweight' },
];

const TRAINING_TYPES = [
  { key: 'strength', de: 'Krafttraining', en: 'Strength', icon: Dumbbell },
  { key: 'martial-arts', de: 'Kampfsport', en: 'Martial Arts', icon: null },
  { key: 'cardio', de: 'Cardio', en: 'Cardio', icon: Heart },
  { key: 'hiit', de: 'HIIT', en: 'HIIT', icon: Zap },
  { key: 'circuit', de: 'Zirkel', en: 'Circuit', icon: RefreshCw },
];

const MA_CATEGORIES = [
  { key: 'all', de: 'Alle Stile', en: 'All Styles' },
  { key: 'boxing', de: 'Boxen', en: 'Boxing' },
  { key: 'kickboxing', de: 'Kickboxen', en: 'Kickboxing' },
  { key: 'mma', de: 'MMA', en: 'MMA' },
  { key: 'judo', de: 'Judo', en: 'Judo' },
  { key: 'bjj', de: 'BJJ', en: 'BJJ' },
  { key: 'taekwondo', de: 'Taekwondo', en: 'Taekwondo' },
  { key: 'wrestling', de: 'Ringen', en: 'Wrestling' },
];

export default function ExerciseLibrary({ onBack, onSelect, selectionMode = false, initialType = null }) {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const lang = i18n.language?.startsWith('de') ? 'de' : 'en';

  const [trainingType, setTrainingType] = useState(initialType); // null = show type chooser
  const [muscleFilter, setMuscleFilter] = useState('all');
  const [equipmentFilter, setEquipmentFilter] = useState('all');
  const [maFilter, setMaFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState([]);
  const [customExercises, setCustomExercises] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [detailExercise, setDetailExercise] = useState(null);

  useEffect(() => {
    getCustomExercises(user?.id || 'guest').then(setCustomExercises);
  }, [user]);

  const allExercises = [
    ...exercises,
    ...customExercises.map((ce) => ({
      id: ce.exercise_id || ce.id, type: 'strength', muscleGroup: ce.muscle_group || 'chest',
      equipment: ce.equipment || 'bodyweight', nameKey: `__custom__${ce.name}`, descKey: '', _customName: ce.name, _isCustom: true,
    })),
  ];

  // Filter exercises based on current state
  const filtered = allExercises.filter((ex) => {
    const exType = ex.type || 'strength';
    if (trainingType && exType !== trainingType) return false;
    if (trainingType === 'strength' && muscleFilter !== 'all' && ex.muscleGroup !== muscleFilter) return false;
    if (trainingType === 'strength' && equipmentFilter !== 'all' && ex.equipment !== equipmentFilter) return false;
    if (trainingType === 'martial-arts' && maFilter !== 'all' && ex.martialArtsCategory !== maFilter) return false;
    const name = (ex._customName || t(ex.nameKey)).toLowerCase();
    if (search && !name.includes(search.toLowerCase())) return false;
    return true;
  });

  const toggleSelect = (id) => setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  const handleConfirm = () => {
    const selectedExercises = allExercises.filter((ex) => selected.includes(ex.id));
    onSelect(selectedExercises);
  };

  async function handleCreateExercise(data) {
    const exercise = { exercise_id: `custom_${Date.now()}`, name: data.name, muscle_group: data.muscleGroup, equipment: data.equipment };
    try {
      await saveCustomExercise(user?.id || 'guest', exercise);
    } catch (err) {
      console.error('Failed to save custom exercise:', err);
    }
    setCustomExercises((prev) => [...prev, exercise]);
    setShowCreateModal(false);
  }

  async function handleDeleteCustomExercise(exerciseId) {
    if (!confirm(t('training.confirmDeleteExercise'))) return;
    try {
      await deleteCustomExercise(user?.id || 'guest', exerciseId);
    } catch (err) {
      console.error('Failed to delete custom exercise:', err);
    }
    setCustomExercises((prev) => prev.filter((e) => (e.exercise_id || e.id) !== exerciseId));
    setSelected((prev) => prev.filter((id) => id !== exerciseId));
  }

  // ── TYPE CHOOSER (Stufe 1) ──
  if (!trainingType) {
    return (
      <div className="p-4 pt-16 pb-24">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={onBack} className="p-2 -ml-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold">
            {selectionMode ? t('training.selectExercises') : t('training.exercises')}
          </h1>
        </div>

        <div className="flex flex-col gap-3">
          {TRAINING_TYPES.map((tt) => {
            const Icon = tt.icon || Dumbbell;
            const count = allExercises.filter((ex) => (ex.type || 'strength') === tt.key).length;
            return (
              <button key={tt.key} onClick={() => setTrainingType(tt.key)}
                className="w-full bg-white dark:bg-surface-dark-alt rounded-2xl p-4 flex items-center gap-4 shadow-soft border border-slate-100 dark:border-slate-800/60 hover:shadow-md transition-shadow text-left">
                <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-primary-400" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{lang === 'de' ? tt.de : tt.en}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">{count} {lang === 'de' ? 'Übungen' : 'exercises'}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300 dark:text-slate-600" />
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ── EXERCISE LIST (Stufe 2) ──
  return (
    <div className="p-4 pt-16 pb-24">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => {
          // Mit initialType gibt es keinen Typ-Wähler — zurück verlässt die Bibliothek direkt
          if (initialType && trainingType === initialType) { onBack(); return; }
          setTrainingType(null); setSearch(''); setMuscleFilter('all'); setEquipmentFilter('all'); setMaFilter('all');
        }}
          className="p-2 -ml-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold">
          {TRAINING_TYPES.find((tt) => tt.key === trainingType)?.[lang] || t('training.exercises')}
        </h1>
      </div>

      {/* Search */}
      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder={lang === 'de' ? 'Übung suchen...' : 'Search exercise...'}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-surface-dark-alt border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400" />
      </div>

      {/* Filters for Strength */}
      {trainingType === 'strength' && (
        <>
          <div className="flex gap-2 overflow-x-auto pb-2 mb-2 scrollbar-hide">
            <FilterPill label={lang === 'de' ? 'Alle' : 'All'} active={muscleFilter === 'all'} onClick={() => setMuscleFilter('all')} />
            {muscleGroups.map((mg) => (
              <FilterPill key={mg} label={t(`muscleGroups.${mg}`)} active={muscleFilter === mg} onClick={() => setMuscleFilter(mg)} />
            ))}
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 mb-3 scrollbar-hide">
            {EQUIPMENT_TYPES.map((eq) => (
              <FilterPill key={eq.key} label={lang === 'de' ? eq.de : eq.en} active={equipmentFilter === eq.key} onClick={() => setEquipmentFilter(eq.key)} />
            ))}
          </div>
        </>
      )}

      {/* Filters for Martial Arts */}
      {trainingType === 'martial-arts' && (
        <div className="flex gap-2 overflow-x-auto pb-2 mb-3 scrollbar-hide">
          {MA_CATEGORIES.map((cat) => (
            <FilterPill key={cat.key} label={lang === 'de' ? cat.de : cat.en} active={maFilter === cat.key} onClick={() => setMaFilter(cat.key)} />
          ))}
        </div>
      )}

      {/* Create custom exercise */}
      {trainingType === 'strength' && (
        <button onClick={() => setShowCreateModal(true)}
          className="w-full mb-4 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl py-3 flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400 hover:border-primary-400 hover:text-primary-500 transition-colors">
          <Plus className="w-5 h-5" />
          {t('training.createExercise')}
        </button>
      )}

      {/* Count */}
      <p className="text-xs text-slate-400 dark:text-slate-500 mb-2">{filtered.length} {lang === 'de' ? 'Übungen' : 'exercises'}</p>

      {/* Exercise list */}
      <div className="flex flex-col gap-2">
        {filtered.map((ex) => {
          const displayName = ex._customName || t(ex.nameKey);
          const isCustom = !!ex._isCustom;
          return (
            <div key={ex.id} className={`bg-white dark:bg-surface-dark-alt rounded-xl p-3 text-left shadow-soft border border-slate-100 dark:border-slate-800/60 transition-all ${selected.includes(ex.id) ? 'ring-2 ring-primary-400' : ''}`}>
              <div className="flex items-center justify-between cursor-pointer" onClick={() => selectionMode ? toggleSelect(ex.id) : setDetailExercise(ex)}>
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center flex-shrink-0">
                    <MuscleGroupIcon group={ex.muscleGroup || ex.type} size={24} className="text-primary-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">
                      {displayName}
                      {hasDemo(ex.id) && (
                        <span className="ml-2 align-middle inline-block px-1.5 py-0.5 rounded text-[9px] font-bold bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                          {t('training.demoBadge')}
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {ex.muscleGroup ? t(`muscleGroups.${ex.muscleGroup}`) : ''}{ex.equipment ? ` · ${t(`equipment.${ex.equipment}`)}` : ''}
                      {isCustom && <span className="ml-1 text-primary-500">· {t('training.customExercise')}</span>}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                  {isCustom && (
                    <button onClick={(e) => { e.stopPropagation(); handleDeleteCustomExercise(ex.id); }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                  {selectionMode && (
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selected.includes(ex.id) ? 'bg-primary-500 border-primary-500' : 'border-slate-300 dark:border-slate-600'}`}>
                      {selected.includes(ex.id) && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  )}
                </div>
              </div>
              {ex.descKey && <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 line-clamp-2">{t(ex.descKey)}</p>}
            </div>
          );
        })}
      </div>

      {showCreateModal && <CreateExerciseModal onSave={handleCreateExercise} onClose={() => setShowCreateModal(false)} t={t} />}

      {detailExercise && <ExerciseDetailSheet exercise={detailExercise} onClose={() => setDetailExercise(null)} />}

      {selectionMode && selected.length > 0 && (
        <div className="fixed bottom-20 left-0 right-0 px-4 pb-2">
          <button onClick={handleConfirm}
            className="w-full max-w-lg mx-auto block bg-primary-500 hover:bg-primary-600 text-white rounded-2xl py-3.5 font-semibold text-center shadow-lg transition-colors">
            {t('training.addExercise')} ({selected.length})
          </button>
        </div>
      )}
    </div>
  );
}

function FilterPill({ label, active, onClick }) {
  return (
    <button onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
        active ? 'bg-primary-500 text-white' : 'bg-white dark:bg-surface-dark-alt text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'}`}>
      {label}
    </button>
  );
}

function CreateExerciseModal({ onSave, onClose, t }) {
  const [name, setName] = useState('');
  const [muscleGroup, setMuscleGroup] = useState('chest');
  const [equipment, setEquipment] = useState('bodyweight');
  const equipmentOptions = ['barbell', 'dumbbell', 'cable', 'machine', 'bodyweight'];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white dark:bg-surface-dark-alt rounded-2xl w-full max-w-sm shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <h3 className="text-lg font-bold">{t('training.createExercise')}</h3>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><X className="w-5 h-5" /></button>
        </div>
        <div className="px-5 space-y-4">
          <div>
            <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">{t('training.exerciseName')}</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={t('training.exerciseNamePlaceholder')}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400" />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">{t('training.muscleGroup')}</label>
            <div className="flex flex-wrap gap-1.5">
              {muscleGroups.map((mg) => (
                <button key={mg} onClick={() => setMuscleGroup(mg)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${muscleGroup === mg ? 'bg-primary-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
                  {t(`muscleGroups.${mg}`)}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">{t('training.equipment')}</label>
            <div className="flex flex-wrap gap-1.5">
              {equipmentOptions.map((eq) => (
                <button key={eq} onClick={() => setEquipment(eq)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${equipment === eq ? 'bg-primary-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
                  {t(`equipment.${eq}`)}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="px-5 pt-5 pb-5">
          <button onClick={() => name.trim() && onSave({ name: name.trim(), muscleGroup, equipment })} disabled={!name.trim()}
            className="w-full py-3 bg-primary-500 hover:bg-primary-600 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors">
            <Check className="w-4 h-4" /> {t('common.save')}
          </button>
        </div>
      </div>
    </div>
  );
}
