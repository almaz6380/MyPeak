import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Minus, Plus, X } from 'lucide-react';
import { calculateMacrosForServing } from '../../data/foodDatabase';

export default function PortionPicker({ food, onConfirm, onClose, initialServing, language = 'de', editMode = false }) {
  const { t } = useTranslation();
  const [servingSize, setServingSize] = useState(initialServing || food.servingSize || 100);
  const [servingUnit] = useState(food.servingUnit || 'g');

  const macros = useMemo(
    () => calculateMacrosForServing(food, servingSize),
    [food, servingSize]
  );

  const name = language === 'de' ? (food.nameDE || food.nameEN) : (food.nameEN || food.nameDE);

  function adjustServing(amount) {
    setServingSize((prev) => Math.max(1, prev + amount));
  }

  function handleConfirm() {
    onConfirm({
      food_name: name,
      brand: food.brand || null,
      serving_size: servingSize,
      serving_unit: servingUnit,
      calories: macros.calories,
      protein: macros.protein,
      carbs: macros.carbs,
      fat: macros.fat,
      source: food.source || (food.id?.startsWith('off_') ? 'openfoodfacts' : 'local_db'),
      source_id: food.source_id || food.id,
    });
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50" onClick={onClose}>
      <div
        className="bg-white dark:bg-surface-dark-alt rounded-t-2xl w-full max-w-lg shadow-xl animate-slide-up max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3 shrink-0">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white truncate">{name}</h3>
            {food.brand && (
              <p className="text-sm text-slate-400 dark:text-slate-500">{food.brand}</p>
            )}
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 min-h-0">
          {/* Serving Size Picker */}
          <div className="px-5 py-3">
            <p className="text-xs font-medium text-slate-400 dark:text-slate-500 mb-2">{t('nutrition.servingSize')}</p>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => adjustServing(-10)}
                className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xl font-bold flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                <Minus className="w-5 h-5" />
              </button>
              <div className="text-center">
                <input
                  type="number"
                  inputMode="numeric"
                  value={servingSize}
                  onChange={(e) => setServingSize(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-24 text-center text-3xl font-bold bg-transparent focus:outline-none text-slate-900 dark:text-white"
                />
                <p className="text-sm text-slate-400 dark:text-slate-500">
                  {servingUnit === 'g' ? t('nutrition.grams') :
                   servingUnit === 'ml' ? t('nutrition.ml') :
                   servingUnit === 'piece' ? t('nutrition.piece') :
                   t('nutrition.portion')}
                </p>
              </div>
              <button
                onClick={() => adjustServing(10)}
                className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xl font-bold flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Macro Display */}
          <div className="px-5 pb-3">
            <div className="grid grid-cols-4 gap-2">
              <MacroCard label="kcal" value={macros.calories} color="bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400" />
              <MacroCard label={t('nutrition.protein')} value={`${macros.protein}g`} color="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" />
              <MacroCard label={t('nutrition.carbs')} value={`${macros.carbs}g`} color="bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400" />
              <MacroCard label={t('nutrition.fat')} value={`${macros.fat}g`} color="bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400" />
            </div>
            <p className="text-center text-[10px] text-slate-300 dark:text-slate-600 mt-1.5">
              {t('nutrition.per100g')}: {food.calories} kcal · P {food.protein}g · C {food.carbs}g · F {food.fat}g
            </p>
          </div>
        </div>

        {/* Confirm Button — fixed at bottom */}
        <div className="px-5 pt-3 pb-5 shrink-0 border-t border-slate-100 dark:border-slate-700" style={{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}>
          <button
            onClick={handleConfirm}
            className="w-full py-3.5 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl font-semibold transition-colors"
          >
            {editMode ? t('common.save') : t('nutrition.add')}
          </button>
        </div>
      </div>
    </div>
  );
}

function MacroCard({ label, value, color }) {
  return (
    <div className={`rounded-xl p-2.5 text-center ${color}`}>
      <p className="text-lg font-bold">{value}</p>
      <p className="text-[10px] font-medium opacity-80">{label}</p>
    </div>
  );
}
