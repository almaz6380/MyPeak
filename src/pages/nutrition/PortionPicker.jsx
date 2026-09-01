import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Minus, Plus, X } from 'lucide-react';
import { calculateMacrosForServing } from '../../data/foodDatabase';
import { useUebersetzung, lebensmittelName } from '../../data/uebersetzungen';

export default function PortionPicker({ food, onConfirm, onClose, initialServing, language = 'de', editMode = false }) {
  const { t } = useTranslation();
  const [servingSize, setServingSize] = useState(initialServing || food.servingSize || 100);
  const [servingUnit] = useState(food.servingUnit || 'g');

  const macros = useMemo(
    () => calculateMacrosForServing(food, servingSize),
    [food, servingSize]
  );

  const paket = useUebersetzung('foods', language);
  const name = lebensmittelName(food, language, paket);

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
    <div className="p-4 pt-16 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white truncate">{name}</h3>
          {food.brand && (
            <p className="text-sm text-slate-400 dark:text-slate-500">{food.brand}</p>
          )}
        </div>
        <button onClick={onClose} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div>
        {/* Per 100g reference */}
        <div className="bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-soft border border-slate-100 dark:border-slate-800/60 mb-4">
          <p className="text-xs font-medium text-slate-400 dark:text-slate-500 mb-2">{t('nutrition.per100g')}</p>
          <div className="flex justify-between text-center">
            <div>
              <p className="text-sm font-bold text-primary-500 dark:text-primary-400">{food.calories}</p>
              <p className="text-[10px] text-slate-400">kcal</p>
            </div>
            <div>
              <p className="text-sm font-bold text-blue-600 dark:text-blue-400">{food.protein}g</p>
              <p className="text-[10px] text-slate-400">{t('nutrition.protein')}</p>
            </div>
            <div>
              <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{food.carbs}g</p>
              <p className="text-[10px] text-slate-400">{t('nutrition.carbs')}</p>
            </div>
            <div>
              <p className="text-sm font-bold text-rose-600 dark:text-rose-400">{food.fat}g</p>
              <p className="text-[10px] text-slate-400">{t('nutrition.fat')}</p>
            </div>
          </div>
        </div>

        {/* Serving Size Picker */}
        <div className="bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-soft border border-slate-100 dark:border-slate-800/60 mb-4">
          <p className="text-xs font-medium text-slate-400 dark:text-slate-500 mb-3">{t('nutrition.servingSize')}</p>
          <div className="flex items-center justify-center gap-5">
            <button
              onClick={() => adjustServing(-10)}
              className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors active:scale-95"
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
              className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors active:scale-95"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Calculated Macros for selected serving */}
        <div className="bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-soft border border-slate-100 dark:border-slate-800/60 mb-4">
          <p className="text-xs font-medium text-slate-400 dark:text-slate-500 mb-3">{t('nutrition.perServing')}</p>
          <div className="grid grid-cols-4 gap-2">
            <MacroCard label="kcal" value={macros.calories} color="bg-primary-50 dark:bg-primary-900/20 text-primary-500 dark:text-primary-400" />
            <MacroCard label={t('nutrition.protein')} value={`${macros.protein}g`} color="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" />
            <MacroCard label={t('nutrition.carbs')} value={`${macros.carbs}g`} color="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400" />
            <MacroCard label={t('nutrition.fat')} value={`${macros.fat}g`} color="bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400" />
          </div>
        </div>
      </div>

      {/* Confirm Button */}
      <button
        onClick={handleConfirm}
        className="w-full py-3.5 bg-primary-500 hover:bg-primary-600 active:bg-primary-800 text-white rounded-2xl font-semibold transition-colors mt-4"
      >
        {editMode ? t('common.save') : t('nutrition.add')}
      </button>
    </div>
  );
}

function MacroCard({ label, value, color }) {
  return (
    <div className={`rounded-xl p-3 text-center ${color}`}>
      <p className="text-lg font-bold">{value}</p>
      <p className="text-[10px] font-medium opacity-80">{label}</p>
    </div>
  );
}
