import { useTranslation } from 'react-i18next';
import { Apple, Plus } from 'lucide-react';

export default function NutritionPage() {
  const { t } = useTranslation();

  return (
    <div className="p-4 pb-24">
      <h1 className="text-2xl font-bold mb-6">{t('nutrition.title')}</h1>

      <div className="bg-white dark:bg-surface-dark-alt rounded-2xl p-5 shadow-sm mb-4">
        <h2 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">{t('nutrition.today')}</h2>
        <div className="flex justify-between text-center">
          <MacroCircle label="kcal" value="0" max="2000" color="text-primary-500" />
          <MacroCircle label="Protein" value="0g" max="150g" color="text-blue-500" />
          <MacroCircle label="Carbs" value="0g" max="250g" color="text-amber-500" />
          <MacroCircle label="Fat" value="0g" max="70g" color="text-rose-500" />
        </div>
      </div>

      <button className="w-full border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-2xl p-4 flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400 hover:border-primary-400 hover:text-primary-500 transition-colors">
        <Plus className="w-5 h-5" />
        {t('nutrition.meals')}
      </button>
    </div>
  );
}

function MacroCircle({ label, value, color }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className={`text-xl font-bold ${color}`}>{value}</span>
      <span className="text-xs text-slate-500 dark:text-slate-400">{label}</span>
    </div>
  );
}
