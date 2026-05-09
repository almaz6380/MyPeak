import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, RotateCcw, Loader2, Trash2 } from 'lucide-react';
import { getDeletedCustomPlans, restoreCustomPlan, permanentDeleteCustomPlan } from '../../data/workoutStorage';
import { getHiddenDefaultPlans, restoreDefaultPlan, permanentDeleteDefaultPlan, getPermanentDeletedDefaultPlans } from '../../data/settingsStorage';
import { allDefaultPlans } from '../../data/defaultPlans';
import { getPlanType } from '../../data/workoutStorage';
import { useAuth } from '../../context/AuthContext';

export default function DeletedPlans({ onBack }) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [deletedCustom, setDeletedCustom] = useState([]);
  const [hiddenDefaultIds, setHiddenDefaultIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [permanentDeleteConfirm, setPermanentDeleteConfirm] = useState(null); // { type: 'custom'|'default', id }

  useEffect(() => {
    const permaDeleted = getPermanentDeletedDefaultPlans();
    const hidden = getHiddenDefaultPlans().filter((id) => !permaDeleted.includes(id));
    setHiddenDefaultIds(hidden);
    if (user) {
      getDeletedCustomPlans(user.id).then((plans) => {
        setDeletedCustom(plans);
        setLoading(false);
      });
    }
  }, [user]);

  const hiddenDefaults = allDefaultPlans.filter((p) => hiddenDefaultIds.includes(p.id));

  const handleRestoreCustom = async (planId) => {
    await restoreCustomPlan(user.id, planId);
    setDeletedCustom((prev) => prev.filter((p) => p.id !== planId));
  };

  const handleRestoreDefault = (planId) => {
    restoreDefaultPlan(planId);
    setHiddenDefaultIds((prev) => prev.filter((id) => id !== planId));
  };

  const handlePermanentDeleteCustom = async (planId) => {
    await permanentDeleteCustomPlan(user.id, planId);
    setDeletedCustom((prev) => prev.filter((p) => p.id !== planId));
    setPermanentDeleteConfirm(null);
  };

  const handlePermanentDeleteDefault = (planId) => {
    permanentDeleteDefaultPlan(planId);
    setHiddenDefaultIds((prev) => prev.filter((id) => id !== planId));
    setPermanentDeleteConfirm(null);
  };

  const allEmpty = deletedCustom.length === 0 && hiddenDefaults.length === 0;

  return (
    <div className="p-4 pt-16 pb-24">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="p-2 -ml-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold">{t('plans.deletedPlans')}</h1>
      </div>

      {loading ? (
        <div className="text-center py-16">
          <Loader2 className="w-8 h-8 text-primary-600 animate-spin mx-auto" />
        </div>
      ) : allEmpty ? (
        <div className="text-center py-16 text-slate-400 dark:text-slate-500">
          <Trash2 className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>{t('plans.noDeletedPlans')}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {/* Deleted custom plans */}
          {deletedCustom.map((plan) => (
            <div key={plan.id} className="bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-sm opacity-70">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg truncate">{plan.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {Array.isArray(plan.days)
                      ? `${plan.days.length} ${plan.days.length === 1 ? 'Tag' : 'Tage'}`
                      : (plan.days?.type || 'strength').toUpperCase()
                    }
                  </p>
                </div>
                <div className="flex items-center gap-2 ml-3 flex-shrink-0">
                  <button
                    onClick={() => handleRestoreCustom(plan.id)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-primary-50 dark:bg-primary-900/20 text-primary-500 dark:text-primary-400 text-sm font-medium hover:bg-primary-100 dark:hover:bg-primary-900/40 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    {t('plans.restore')}
                  </button>
                  <button
                    onClick={() => setPermanentDeleteConfirm({ type: 'custom', id: plan.id })}
                    className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Hidden default plans */}
          {hiddenDefaults.map((plan) => (
            <div key={plan.id} className="bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-sm opacity-70">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg truncate">{t(plan.nameKey)}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{t(plan.descKey)}</p>
                </div>
                <div className="flex items-center gap-2 ml-3 flex-shrink-0">
                  <button
                    onClick={() => handleRestoreDefault(plan.id)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-primary-50 dark:bg-primary-900/20 text-primary-500 dark:text-primary-400 text-sm font-medium hover:bg-primary-100 dark:hover:bg-primary-900/40 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    {t('plans.restore')}
                  </button>
                  <button
                    onClick={() => setPermanentDeleteConfirm({ type: 'default', id: plan.id })}
                    className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Permanent delete confirmation */}
      {permanentDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-surface-dark-alt rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <p className="text-center font-semibold mb-2">{t('plans.permanentDelete')}</p>
            <p className="text-center text-sm text-slate-500 dark:text-slate-400 mb-4">{t('plans.confirmPermanentDelete')}</p>
            <div className="flex gap-3">
              <button
                onClick={() => setPermanentDeleteConfirm(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 font-medium text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                {t('common.cancel')}
              </button>
              <button
                onClick={() => permanentDeleteConfirm.type === 'custom'
                  ? handlePermanentDeleteCustom(permanentDeleteConfirm.id)
                  : handlePermanentDeleteDefault(permanentDeleteConfirm.id)}
                className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium text-sm transition-colors"
              >
                {t('common.delete')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
