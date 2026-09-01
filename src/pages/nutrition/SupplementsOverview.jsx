import { toLocalDateString } from '../../lib/dateUtils';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Plus, Check, Pill, Settings, Sun, Moon, Dumbbell, Coffee, Sunset } from 'lucide-react';
import CardPhotoMotif from '../../components/CardPhotoMotif';
import MedicalDisclaimer from '../../components/MedicalDisclaimer';
import { useAuth } from '../../context/AuthContext';
import {
  getSupplements,
  getSupplementLogs,
  logSupplementTaken,
  unlogSupplementTaken,
  getTodayScheduledSupplements,
  getSupplementProgress,
} from '../../data/supplementStorage';
import { localId } from '../../data/localId';

const TIME_SLOTS = ['morning', 'midday', 'pre_workout', 'post_workout', 'evening'];

const SLOT_ICONS = {
  morning: Sun,
  midday: Coffee,
  pre_workout: Dumbbell,
  post_workout: Dumbbell,
  evening: Moon,
};

function formatDate(d) {
  return toLocalDateString(d);
}

export default function SupplementsOverview({ onBack, onManage, onAdd }) {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const [supplements, setSupplements] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const today = formatDate(new Date());

  useEffect(() => {
    if (user) loadData();
  }, [user]);

  async function loadData() {
    setLoading(true);
    const [supps, logsData] = await Promise.all([
      getSupplements(user.id),
      getSupplementLogs(user.id, today),
    ]);
    setSupplements(supps);
    setLogs(logsData);
    setLoading(false);
  }

  const scheduled = getTodayScheduledSupplements(supplements, today);
  const progress = getSupplementProgress(scheduled, logs);

  // Group supplements by time slot
  const grouped = {};
  for (const slot of TIME_SLOTS) {
    const items = scheduled.filter((s) => s.todaySlots.includes(slot));
    if (items.length > 0) {
      grouped[slot] = items;
    }
  }

  function isLogged(supplementId, timeSlot) {
    return logs.some((l) => l.supplement_id === supplementId && l.time_slot === timeSlot);
  }

  async function toggleLog(supplementId, timeSlot) {
    if (isLogged(supplementId, timeSlot)) {
      setLogs((prev) => prev.filter((l) => !(l.supplement_id === supplementId && l.time_slot === timeSlot)));
      unlogSupplementTaken(user.id, supplementId, today, timeSlot);
    } else {
      const newLog = { supplement_id: supplementId, time_slot: timeSlot, id: localId() };
      setLogs((prev) => [...prev, newLog]);
      logSupplementTaken(user.id, supplementId, today, timeSlot);
    }
  }

  const formIcon = (form) => {
    switch (form) {
      case 'tablet': return '💊';
      case 'capsule': return '🔵';
      case 'powder': return '🥄';
      case 'liquid': return '💧';
      default: return '💊';
    }
  };

  return (
    <div className="p-4 pt-16 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 -ms-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold">{t('supplements.title')}</h1>
        </div>
        <div className="flex gap-2">
          <button onClick={onManage} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
            <Settings className="w-5 h-5 text-slate-400" />
          </button>
          <button onClick={onAdd} className="p-2 rounded-xl bg-primary-500 text-white">
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Nahrungsergaenzung ist gesundheitsbezogen — Hinweis oberhalb des
          Einnahmeplans, damit er nicht erst nach dem Abhaken auftaucht. */}
      <MedicalDisclaimer lang={i18n.language} className="mb-4" />

      {/* Progress */}
      {scheduled.length > 0 && (
        <div className="relative overflow-hidden bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-soft border border-slate-100 dark:border-slate-800/60 mb-4">
          <CardPhotoMotif src="/bg-photos/supplement-icon.png" />
          <div className="relative flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{t('supplements.todayProgress')}</p>
            <p className="text-sm font-bold text-primary-500">{progress.taken}/{progress.total}</p>
          </div>
          <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-500 rounded-full transition-all duration-300"
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
          {progress.taken < progress.total && (
            <p className="text-xs text-amber-600 dark:text-amber-400 mt-2">
              {t('supplements.remaining', { count: progress.total - progress.taken })}
            </p>
          )}
          {progress.taken === progress.total && progress.total > 0 && (
            <p className="text-xs text-green-600 dark:text-green-400 mt-2">
              {t('supplements.allDone')}
            </p>
          )}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <p className="text-center text-sm text-slate-400 py-8">{t('common.loading')}</p>
      )}

      {/* Empty state */}
      {!loading && supplements.length === 0 && (
        <div className="text-center py-12">
          <Pill className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <p className="text-slate-500 dark:text-slate-400 mb-4">{t('supplements.empty')}</p>
          <button onClick={onAdd} className="px-6 py-3 bg-primary-500 text-white font-semibold rounded-2xl">
            {t('supplements.addFirst')}
          </button>
        </div>
      )}

      {/* No supplements scheduled today */}
      {!loading && supplements.length > 0 && scheduled.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500 dark:text-slate-400">{t('supplements.noneToday')}</p>
        </div>
      )}

      {/* Time slot groups */}
      {!loading && Object.entries(grouped).map(([slot, items]) => {
        const SlotIcon = SLOT_ICONS[slot] || Sun;
        return (
          <div key={slot} className="mb-4">
            <div className="flex items-center gap-2 mb-2 px-1">
              <SlotIcon className="w-4 h-4 text-slate-400" />
              <h2 className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                {t(`supplements.slot_${slot}`)}
              </h2>
            </div>
            <div className="bg-white dark:bg-surface-dark-alt rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800/60 overflow-hidden">
              {items.map((supp, i) => {
                const logged = isLogged(supp.id, slot);
                return (
                  <div
                    key={supp.id}
                    className={`flex items-center gap-3 px-4 py-3.5 ${
                      i < items.length - 1 ? 'border-b border-slate-50 dark:border-slate-700/50' : ''
                    }`}
                  >
                    {/* Checkbox */}
                    <button
                      onClick={() => toggleLog(supp.id, slot)}
                      className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                        logged
                          ? 'border-green-500 bg-green-500'
                          : 'border-slate-300 dark:border-slate-600 hover:border-primary-400'
                      }`}
                    >
                      {logged && <Check className="w-4 h-4 text-white" />}
                    </button>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${logged ? 'line-through text-slate-400' : 'text-slate-900 dark:text-white'}`}>
                        {formIcon(supp.form)} {supp.name}
                      </p>
                      <p className="text-xs text-slate-400">
                        {supp.dosage_amount} {supp.dosage_unit}
                        {supp.brand && ` · ${supp.brand}`}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
