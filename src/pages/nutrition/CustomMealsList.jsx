import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Plus, ChevronDown, ChevronUp, Trash2, Pencil } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getCustomMeals, deleteCustomMeal } from '../../data/nutritionStorage';

export default function CustomMealsList({ onBack, onCreateMeal, onEditMeal }) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [meals, setMeals] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) loadMeals();
  }, [user]);

  async function loadMeals() {
    setLoading(true);
    const data = await getCustomMeals(user.id);
    setMeals(data);
    setLoading(false);
  }

  async function handleDelete(mealId) {
    await deleteCustomMeal(user.id, mealId);
    setMeals((prev) => prev.filter((m) => m.id !== mealId));
    setConfirmDeleteId(null);
  }

  return (
    <div className="p-4 pt-16 pb-24">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold">{t('nutrition.customMeals')}</h1>
      </div>

      {/* Create Button */}
      <button
        onClick={onCreateMeal}
        className="w-full border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-2xl p-4 flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400 hover:border-primary-400 hover:text-primary-500 transition-colors mb-4"
      >
        <Plus className="w-5 h-5" />
        {t('nutrition.newMeal')}
      </button>

      {/* Meals List */}
      {loading ? (
        <p className="text-center text-sm text-slate-400 py-8">{t('common.loading')}</p>
      ) : meals.length === 0 ? (
        <p className="text-center text-sm text-slate-400 py-8">{t('nutrition.noCustomMeals')}</p>
      ) : (
        <div className="space-y-3">
          {meals.map((meal) => (
            <div key={meal.id} className="bg-white dark:bg-surface-dark-alt rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800/60 overflow-hidden">
              {/* Meal Header */}
              <button
                onClick={() => setExpandedId(expandedId === meal.id ? null : meal.id)}
                className="w-full flex items-center justify-between px-4 py-3.5 text-left"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{meal.name}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    {Math.round(meal.total_calories)} kcal · P {Math.round(meal.total_protein)}g · C {Math.round(meal.total_carbs)}g · F {Math.round(meal.total_fat)}g
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-300 dark:text-slate-600">
                    {t('nutrition.mealItems', { count: meal.items?.length || 0 })}
                  </span>
                  {expandedId === meal.id ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </button>

              {/* Expanded Items */}
              {expandedId === meal.id && (
                <div className="border-t border-slate-100 dark:border-slate-700">
                  {(meal.items || []).map((item, i) => (
                    <div
                      key={i}
                      className="px-4 py-2 border-b border-slate-50 dark:border-slate-700/50 last:border-0"
                    >
                      <p className="text-sm text-slate-600 dark:text-slate-300">{item.food_name}</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500">
                        {item.serving_size}{item.serving_unit || 'g'} · {Math.round(item.calories)} kcal
                      </p>
                    </div>
                  ))}

                  {/* Actions */}
                  <div className="flex gap-2 p-3">
                    <button
                      onClick={() => onEditMeal(meal)}
                      className="flex-1 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-medium flex items-center justify-center gap-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      {t('common.edit')}
                    </button>
                    <button
                      onClick={() => setConfirmDeleteId(meal.id)}
                      className="flex-1 py-2 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-500 text-sm font-medium flex items-center justify-center gap-1.5 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      {t('common.delete')}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirm Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-surface-dark-alt rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <p className="text-center font-semibold mb-4">{t('nutrition.confirmDeleteMeal')}</p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 font-medium text-sm"
              >
                {t('common.cancel')}
              </button>
              <button
                onClick={() => handleDelete(confirmDeleteId)}
                className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium text-sm"
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
