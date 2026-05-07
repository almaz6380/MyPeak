import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Clock, UtensilsCrossed, PenLine, ScanBarcode } from 'lucide-react';
import FoodSearch from './FoodSearch';
import PortionPicker from './PortionPicker';
import BarcodeScanner from './BarcodeScanner';
import { useAuth } from '../../context/AuthContext';
import { saveNutritionEntry, getRecentFoods, getCustomMeals, logCustomMeal } from '../../data/nutritionStorage';

export default function AddFoodEntry({ mealSlot, date, onBack, onSaved, language = 'de' }) {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const [selectedFood, setSelectedFood] = useState(null);
  const [recentFoods, setRecentFoods] = useState([]);
  const [customMeals, setCustomMeals] = useState([]);
  const [showManual, setShowManual] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const lang = i18n.language || language;

  useEffect(() => {
    if (user) {
      getRecentFoods(user.id).then(setRecentFoods);
      getCustomMeals(user.id).then(setCustomMeals);
    }
  }, [user]);

  async function handleConfirmFood(foodData) {
    const entry = {
      date,
      meal_slot: mealSlot,
      ...foodData,
    };
    await saveNutritionEntry(user.id, entry);
    setSelectedFood(null);
    onSaved();
  }

  async function handleLogCustomMeal(meal) {
    await logCustomMeal(user.id, meal, date, mealSlot);
    onSaved();
  }

  async function handleManualSave(data) {
    const entry = {
      date,
      meal_slot: mealSlot,
      food_name: data.food_name,
      brand: data.brand || null,
      serving_size: data.serving_size,
      serving_unit: 'g',
      calories: data.calories,
      protein: data.protein,
      carbs: data.carbs,
      fat: data.fat,
      source: 'manual',
    };
    await saveNutritionEntry(user.id, entry);
    onSaved();
  }

  // If a food is selected, show the PortionPicker
  if (selectedFood) {
    return (
      <PortionPicker
        food={selectedFood}
        language={lang}
        onConfirm={handleConfirmFood}
        onClose={() => setSelectedFood(null)}
      />
    );
  }

  // Barcode scanner
  if (showScanner) {
    return (
      <BarcodeScanner
        onScanned={(food) => {
          setShowScanner(false);
          setSelectedFood(food);
        }}
        onClose={() => setShowScanner(false)}
      />
    );
  }

  // Manual entry form
  if (showManual) {
    return (
      <ManualEntryForm
        onBack={() => setShowManual(false)}
        onSave={handleManualSave}
        t={t}
      />
    );
  }

  return (
    <div className="p-4 pb-24">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl font-bold">{t('nutrition.addFood')}</h1>
          <p className="text-sm text-slate-400 dark:text-slate-500">{t(`nutrition.${mealSlot}`)}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <button
          onClick={() => setShowScanner(true)}
          className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-surface-dark-alt rounded-2xl shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
            <ScanBarcode className="w-4.5 h-4.5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-left min-w-0">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{t('nutrition.scanBarcode')}</p>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate">{t('nutrition.scanBarcodeDesc')}</p>
          </div>
        </button>

        <button
          onClick={() => setShowManual(true)}
          className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-surface-dark-alt rounded-2xl shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          <div className="w-9 h-9 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
            <PenLine className="w-4.5 h-4.5 text-primary-600 dark:text-primary-400" />
          </div>
          <div className="text-left min-w-0">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{t('nutrition.manualEntry')}</p>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate">{t('nutrition.manualEntryDesc')}</p>
          </div>
        </button>
      </div>

      {/* Custom Meals */}
      {customMeals.length > 0 && (
        <div className="mb-4">
          <h3 className="text-xs font-medium text-slate-400 dark:text-slate-500 mb-2 flex items-center gap-1.5">
            <UtensilsCrossed className="w-3.5 h-3.5" />
            {t('nutrition.customMeals')}
          </h3>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {customMeals.map((meal) => (
              <button
                key={meal.id}
                onClick={() => handleLogCustomMeal(meal)}
                className="flex-shrink-0 px-4 py-2.5 rounded-xl bg-white dark:bg-surface-dark-alt shadow-sm border border-slate-100 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
              >
                <p className="text-sm font-medium text-slate-700 dark:text-slate-200 whitespace-nowrap">{meal.name}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500">{Math.round(meal.total_calories)} kcal</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Recent Foods */}
      {recentFoods.length > 0 && (
        <div className="mb-4">
          <h3 className="text-xs font-medium text-slate-400 dark:text-slate-500 mb-2 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {t('nutrition.recentFoods')}
          </h3>
          <div className="bg-white dark:bg-surface-dark-alt rounded-2xl shadow-sm overflow-hidden">
            {recentFoods.map((food, i) => (
              <button
                key={i}
                onClick={() => setSelectedFood({
                  ...food,
                  nameDE: food.food_name,
                  nameEN: food.food_name,
                  servingSize: food.serving_size,
                  servingUnit: food.serving_unit,
                })}
                className="w-full flex items-center justify-between px-4 py-2.5 text-left border-b border-slate-50 dark:border-slate-700/50 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{food.food_name}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    {food.serving_size}{food.serving_unit} · {Math.round(food.calories)} kcal
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Food Search */}
      <FoodSearch onSelectFood={setSelectedFood} language={lang} />
    </div>
  );
}

function ManualEntryForm({ onBack, onSave, t }) {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [servingSize, setServingSize] = useState(100);
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');

  function handleSave() {
    if (!name.trim()) return;
    onSave({
      food_name: name.trim(),
      brand: brand.trim() || null,
      serving_size: servingSize,
      calories: parseFloat(calories) || 0,
      protein: parseFloat(protein) || 0,
      carbs: parseFloat(carbs) || 0,
      fat: parseFloat(fat) || 0,
    });
  }

  return (
    <div className="p-4 pb-24">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold">{t('nutrition.manualEntry')}</h1>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-1 block">{t('nutrition.foodName')}</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t('nutrition.searchPlaceholder')}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-1 block">{t('nutrition.brand')}</label>
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-1 block">{t('nutrition.servingSize')} (g)</label>
          <input
            type="number"
            inputMode="numeric"
            value={servingSize}
            onChange={(e) => setServingSize(parseInt(e.target.value) || 0)}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-1 block">{t('nutrition.calories')} (kcal)</label>
            <input
              type="number"
              inputMode="decimal"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              placeholder="0"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-1 block">{t('nutrition.protein')} (g)</label>
            <input
              type="number"
              inputMode="decimal"
              value={protein}
              onChange={(e) => setProtein(e.target.value)}
              placeholder="0"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-1 block">{t('nutrition.carbs')} (g)</label>
            <input
              type="number"
              inputMode="decimal"
              value={carbs}
              onChange={(e) => setCarbs(e.target.value)}
              placeholder="0"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-1 block">{t('nutrition.fat')} (g)</label>
            <input
              type="number"
              inputMode="decimal"
              value={fat}
              onChange={(e) => setFat(e.target.value)}
              placeholder="0"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={!name.trim()}
          className="w-full py-3.5 bg-primary-600 hover:bg-primary-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white rounded-2xl font-semibold transition-colors"
        >
          {t('nutrition.add')}
        </button>
      </div>
    </div>
  );
}
