import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Check, RotateCcw, Sparkles, Info } from 'lucide-react';
import OilLevelPicker from '../../components/OilLevelPicker';
import { applyOilAdjustment, itemsToNutritionEntries } from '../../data/mealPhotoAnalysis';

const confidenceColors = {
  high: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
  medium: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
  low: 'bg-red-100 dark:bg-red-900/30 text-red-500 dark:text-red-400',
};

export default function MealAnalysisResult({ result, photo, oilLevel, onOilChange, onAddAll, onRetake, onClose, language = 'de' }) {
  const { t } = useTranslation();

  const adjustedItems = useMemo(
    () => applyOilAdjustment(result.items, oilLevel),
    [result.items, oilLevel]
  );

  const totals = useMemo(() => {
    return adjustedItems.reduce(
      (acc, item) => ({
        calories: acc.calories + Math.round(item.calories),
        protein: acc.protein + Math.round(item.protein * 10) / 10,
        carbs: acc.carbs + Math.round(item.carbs * 10) / 10,
        fat: acc.fat + Math.round(item.fat * 10) / 10,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  }, [adjustedItems]);

  function handleAddAll() {
    const entries = itemsToNutritionEntries(adjustedItems, language);
    onAddAll(entries);
  }

  const description = language === 'de' ? result.meal_description_de : result.meal_description_en;

  return (
    <div className="fixed inset-0 bg-white dark:bg-[#0a0a0a] z-50 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-lg z-10">
        <div className="flex items-center gap-3 p-4 pt-14">
          <button onClick={onClose} className="p-2 -ml-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary-500" />
            <h1 className="text-lg font-bold">{t('nutrition.aiResults')}</h1>
          </div>
        </div>
      </div>

      <div className="p-4 pb-32 space-y-4">
        {/* Photo + Description */}
        <div className="flex gap-3 items-start">
          {photo && (
            <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
              <img src={photo} alt="" className="w-full h-full object-cover" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            {description && (
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{description}</p>
            )}
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 flex items-center gap-1">
              <Info className="w-3 h-3" />
              {t('nutrition.aiEstimateNote')}
            </p>
          </div>
        </div>

        {/* Total Summary */}
        <div className="bg-slate-50 dark:bg-surface-dark-alt rounded-2xl p-4">
          <p className="text-xs font-medium text-slate-400 dark:text-slate-500 mb-3">{t('nutrition.totalCalories')}</p>
          <div className="grid grid-cols-4 gap-3">
            <div className="text-center">
              <p className="text-xl font-bold text-slate-900 dark:text-white">{Math.round(totals.calories)}</p>
              <p className="text-[10px] text-slate-400">kcal</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-blue-500">{Math.round(totals.protein)}</p>
              <p className="text-[10px] text-slate-400">{t('nutrition.protein')}</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-emerald-500">{Math.round(totals.carbs)}</p>
              <p className="text-[10px] text-slate-400">{t('nutrition.carbs')}</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-rose-500">{Math.round(totals.fat)}</p>
              <p className="text-[10px] text-slate-400">{t('nutrition.fat')}</p>
            </div>
          </div>
        </div>

        {/* Oil Level */}
        <OilLevelPicker value={oilLevel} onChange={onOilChange} />

        {/* Individual Items */}
        <div>
          <p className="text-xs font-medium text-slate-400 dark:text-slate-500 mb-2">
            {t('nutrition.aiDetectedItems', { count: adjustedItems.length })}
          </p>
          <div className="space-y-2">
            {adjustedItems.map((item, i) => (
              <div key={i} className="bg-white dark:bg-surface-dark-alt rounded-xl p-3 shadow-soft border border-slate-100 dark:border-slate-800/60">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                      {language === 'de' ? item.name_de : item.name_en}
                    </p>
                    <p className="text-xs text-slate-400">{item.portion_g}g</p>
                  </div>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${confidenceColors[item.confidence] || confidenceColors.medium}`}>
                    {t(`nutrition.confidence_${item.confidence}`)}
                  </span>
                </div>
                <div className="flex gap-3">
                  <span className="text-xs text-slate-500">{Math.round(item.calories)} kcal</span>
                  <span className="inline-flex px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-900/20 text-[10px] font-semibold text-blue-500">P {Math.round(item.protein)}g</span>
                  <span className="inline-flex px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-900/20 text-[10px] font-semibold text-emerald-500">C {Math.round(item.carbs)}g</span>
                  <span className="inline-flex px-1.5 py-0.5 rounded bg-rose-50 dark:bg-rose-900/20 text-[10px] font-semibold text-rose-500">F {Math.round(item.fat)}g</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-4 pb-8 bg-gradient-to-t from-white dark:from-[#0a0a0a] via-white/95 dark:via-[#0a0a0a]/95 to-transparent">
        <div className="flex gap-3 max-w-lg mx-auto">
          <button
            onClick={onRetake}
            className="px-4 py-3.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-2xl font-medium text-sm flex items-center gap-2 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            {t('nutrition.retakePhoto')}
          </button>
          <button
            onClick={handleAddAll}
            className="flex-1 py-3.5 bg-primary-500 hover:bg-primary-600 text-white rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <Check className="w-4 h-4" />
            {t('nutrition.addAllItems')} ({Math.round(totals.calories)} kcal)
          </button>
        </div>
      </div>
    </div>
  );
}
