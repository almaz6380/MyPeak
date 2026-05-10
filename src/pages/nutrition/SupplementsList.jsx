import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Plus, Trash2, Pencil, Pill } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getSupplements, deleteSupplement } from '../../data/supplementStorage';

const FORM_EMOJIS = { tablet: '💊', capsule: '🔵', powder: '🥄', liquid: '💧' };

export default function SupplementsList({ onBack, onAdd, onEdit }) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [supplements, setSupplements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getSupplements(user.id).then((data) => {
        setSupplements(data);
        setLoading(false);
      });
    }
  }, [user]);

  async function handleDelete(id) {
    await deleteSupplement(user.id, id);
    setSupplements((prev) => prev.filter((s) => s.id !== id));
  }

  const scheduleSummary = (schedule) => {
    const days = Object.keys(schedule || {});
    if (days.length === 7) return t('supplements.daily');
    if (days.length === 0) return t('supplements.noSchedule');
    return days.map((d) => t(`supplements.day_${d}`)).join(', ');
  };

  return (
    <div className="p-4 pt-16 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 -ml-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold">{t('supplements.manage')}</h1>
        </div>
        <button onClick={onAdd} className="p-2 rounded-xl bg-primary-500 text-white">
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {loading && <p className="text-center text-sm text-slate-400 py-8">{t('common.loading')}</p>}

      {!loading && supplements.length === 0 && (
        <div className="text-center py-12">
          <Pill className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <p className="text-slate-500 dark:text-slate-400 mb-4">{t('supplements.empty')}</p>
          <button onClick={onAdd} className="px-6 py-3 bg-primary-500 text-white font-semibold rounded-2xl">
            {t('supplements.addFirst')}
          </button>
        </div>
      )}

      {!loading && supplements.length > 0 && (
        <div className="space-y-2">
          {supplements.map((supp) => (
            <div key={supp.id} className="bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-sm flex items-center gap-3">
              <div className="text-2xl flex-shrink-0">{FORM_EMOJIS[supp.form] || '💊'}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{supp.name}</p>
                <p className="text-xs text-slate-400">
                  {supp.dosage_amount} {supp.dosage_unit} · {scheduleSummary(supp.schedule)}
                </p>
                {supp.notes && (
                  <p className="text-xs text-slate-400 truncate mt-0.5">{supp.notes}</p>
                )}
              </div>
              <div className="flex gap-1 flex-shrink-0">
                <button onClick={() => onEdit(supp)} className="p-2 text-slate-400 hover:text-primary-500 transition-colors">
                  <Pencil className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(supp.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
