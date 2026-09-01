import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Plus, X, Check } from 'lucide-react';
import FoodSearch from './FoodSearch';
import PortionPicker from './PortionPicker';
import { useAuth } from '../../context/AuthContext';
import { saveCustomMeal, updateCustomMeal } from '../../data/nutritionStorage';

export default function CustomMealBuilder({ onBack, onSaved, editMeal = null, language = 'de' }) {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const lang = i18n.language || language;

  const [name, setName] = useState(editMeal?.name || '');
  const [items, setItems] = useState(editMeal?.items || []);
  const [showSearch, setShowSearch] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const totals = items.reduce(
    (acc, item) => ({
      calories: acc.calories + (item.calories || 0),
      protein: acc.protein + (item.protein || 0),
      carbs: acc.carbs + (item.carbs || 0),
      fat: acc.fat + (item.fat || 0),
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  function handleAddItem(foodData) {
    setItems((prev) => [...prev, foodData]);
    setSelectedFood(null);
    setShowSearch(false);
  }

  function removeItem(index) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSave() {
    if (!name.trim() || items.length === 0) return;
    setSaving(true);

    const mealData = {
      name: name.trim(),
      items,
      total_calories: Math.round(totals.calories),
      total_protein: Math.round(totals.protein * 10) / 10,
      total_carbs: Math.round(totals.carbs * 10) / 10,
      total_fat: Math.round(totals.fat * 10) / 10,
    };

    if (editMeal?.id) {
      await updateCustomMeal(user.id, editMeal.id, mealData);
    } else {
      await saveCustomMeal(user.id, mealData);
    }

    setSaved(true);
    setTimeout(() => onSaved(), 600);
  }

  // Show PortionPicker for selected food
  if (selectedFood) {
    return (
      <PortionPicker
        food={selectedFood}
        language={lang}
        onConfirm={handleAddItem}
        onClose={() => setSelectedFood(null)}
      />
    );
  }

  // Show FoodSearch
  if (showSearch) {
    return (
      <div className="p-4 pt-16 pb-24">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setShowSearch(false)} className="p-2 -ms-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold">{t('nutrition.addFood')}</h1>
        </div>
        <FoodSearch onSelectFood={setSelectedFood} language={lang} />
      </div>
    );
  }

  return (
    <div className="p-4 pt-16 pb-24">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="p-2 -ms-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold">
          {editMeal ? t('common.edit') : t('nutrition.newMeal')}
        </h1>
      </div>

      {/* Meal Name */}
      <div className="mb-4">
        <label className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-1 block">{t('nutrition.mealName')}</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t('nutrition.mealNamePlaceholder')}
          className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
        />
      </div>

      {/* Items List */}
      <div className="bg-white dark:bg-surface-dark-alt rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800/60 mb-4 overflow-hidden">
        {items.length === 0 ? (
          <p className="text-center text-sm text-slate-400 dark:text-slate-500 py-6">
            {t('nutrition.noEntries')}
          </p>
        ) : (
          items.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-4 py-2.5 border-b border-slate-50 dark:border-slate-700/50 last:border-0"
            >
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{item.food_name}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  {item.serving_size}{item.serving_unit || 'g'} · {Math.round(item.calories)} kcal · P {item.protein}g
                </p>
              </div>
              <button
                onClick={() => removeItem(i)}
                className="p-2 text-slate-300 dark:text-slate-600 hover:text-red-400 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))
        )}

        {/* Add Food Button */}
        <button
          onClick={() => setShowSearch(true)}
          className="w-full px-4 py-3 flex items-center justify-center gap-1.5 text-slate-400 dark:text-slate-500 hover:text-primary-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-sm"
        >
          <Plus className="w-4 h-4" />
          {t('nutrition.addFood')}
        </button>
      </div>

      {/* Totals */}
      {items.length > 0 && (
        <div className="grid grid-cols-4 gap-2 mb-4">
          <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-2.5 text-center">
            <p className="text-sm font-bold text-primary-500 dark:text-primary-400">{Math.round(totals.calories)}</p>
            <p className="text-[10px] text-primary-500 dark:text-primary-400">kcal</p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-2.5 text-center">
            <p className="text-sm font-bold text-blue-600 dark:text-blue-400">{Math.round(totals.protein)}g</p>
            <p className="text-[10px] text-blue-500 dark:text-blue-400">{t('nutrition.protein')}</p>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-2.5 text-center">
            <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{Math.round(totals.carbs)}g</p>
            <p className="text-[10px] text-emerald-500 dark:text-emerald-400">{t('nutrition.carbs')}</p>
          </div>
          <div className="bg-rose-50 dark:bg-rose-900/20 rounded-xl p-2.5 text-center">
            <p className="text-sm font-bold text-rose-600 dark:text-rose-400">{Math.round(totals.fat)}g</p>
            <p className="text-[10px] text-rose-500 dark:text-rose-400">{t('nutrition.fat')}</p>
          </div>
        </div>
      )}

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={!name.trim() || items.length === 0 || saving}
        className={`w-full py-3.5 rounded-2xl font-semibold transition-colors flex items-center justify-center gap-2 ${
          saved
            ? 'bg-green-500 text-white'
            : 'bg-primary-500 hover:bg-primary-600 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white'
        }`}
      >
        {saved ? (
          <>
            <Check className="w-5 h-5" />
            {t('nutrition.mealSaved')}
          </>
        ) : (
          t('common.save')
        )}
      </button>
    </div>
  );
}
