import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Clock, UtensilsCrossed, PenLine, ScanBarcode, Camera, Check, Plus, X } from 'lucide-react';
import FoodSearch from './FoodSearch';
import PortionPicker from './PortionPicker';
import BarcodeScanner from './BarcodeScanner';
import MealPhotoCapture from './MealPhotoCapture';
import { useAuth } from '../../context/AuthContext';
import { saveNutritionEntry, getRecentFoods, getCustomMeals, logCustomMeal } from '../../data/nutritionStorage';
import { checkAchievements } from '../../data/achievements';
import { getCategoryEmoji } from '../../data/foodDatabase';
import { maybeShowInterstitial } from '../../lib/ads';

export default function AddFoodEntry({ mealSlot, date, onBack, onSaved, language = 'de' }) {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const lang = i18n.language || language;

  const [activeTab, setActiveTab] = useState('search'); // search | recent
  const [selectedFood, setSelectedFood] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]); // Multi-select queue
  const [recentFoods, setRecentFoods] = useState([]);
  const [customMeals, setCustomMeals] = useState([]);
  const [showManual, setShowManual] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [showMealPhoto, setShowMealPhoto] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      getRecentFoods(user.id, 30).then(setRecentFoods);
      getCustomMeals(user.id).then(setCustomMeals);
    }
  }, [user]);

  // Add a food to the multi-select queue (from PortionPicker)
  function handleConfirmFood(foodData) {
    setSelectedItems((prev) => [...prev, foodData]);
    setSelectedFood(null);
  }

  // Remove from queue
  function removeFromQueue(index) {
    setSelectedItems((prev) => prev.filter((_, i) => i !== index));
  }

  // Save all selected items at once
  async function handleSaveAll() {
    if (selectedItems.length === 0) return;
    setSaving(true);
    for (const item of selectedItems) {
      await saveNutritionEntry(user.id, {
        date,
        meal_slot: mealSlot,
        ...item,
      });
    }
    setSaving(false);
    checkAchievements(user.id, { type: 'nutrition' }).catch(() => {});
    maybeShowInterstitial();
    onSaved();
  }

  // Open PortionPicker for a recent food so user can choose grams.
  // Recent entries store macros for the logged serving, but PortionPicker
  // expects per-100g values — convert back before handing over.
  function selectRecent(food) {
    const size = Number(food.serving_size) || 100;
    const factor = 100 / size;
    setSelectedFood({
      ...food,
      nameDE: food.food_name,
      nameEN: food.food_name,
      calories: Math.round((food.calories || 0) * factor),
      protein: Math.round((food.protein || 0) * factor * 10) / 10,
      carbs: Math.round((food.carbs || 0) * factor * 10) / 10,
      fat: Math.round((food.fat || 0) * factor * 10) / 10,
      servingSize: food.serving_size,
      servingUnit: food.serving_unit || 'g',
    });
  }

  // Check if a recent food is already in the queue
  function isInQueue(foodName) {
    return selectedItems.some((item) => item.food_name === foodName);
  }

  async function handleLogCustomMeal(meal) {
    await logCustomMeal(user.id, meal, date, mealSlot);
    onSaved();
  }

  async function handleManualSave(data) {
    setSelectedItems((prev) => [...prev, {
      food_name: data.food_name,
      brand: data.brand || null,
      serving_size: data.serving_size,
      serving_unit: 'g',
      calories: data.calories,
      protein: data.protein,
      carbs: data.carbs,
      fat: data.fat,
      source: 'manual',
    }]);
    setShowManual(false);
  }

  // Meal photo AI
  if (showMealPhoto) {
    return (
      <MealPhotoCapture
        onClose={() => setShowMealPhoto(false)}
        onAddItems={(items) => {
          setSelectedItems((prev) => [...prev, ...items]);
          setShowMealPhoto(false);
        }}
        language={lang}
      />
    );
  }

  // Barcode scanner
  if (showScanner) {
    return (
      <BarcodeScanner
        onScanned={(food) => {
          setShowScanner(false);
          setTimeout(() => setSelectedFood(food), 50);
        }}
        onClose={() => setShowScanner(false)}
      />
    );
  }

  // PortionPicker for a selected food
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

  const totalCalories = selectedItems.reduce((sum, item) => sum + (item.calories || 0), 0);

  return (
    <div className="p-4 pt-16 pb-32">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl font-bold">{t('nutrition.addFood')}</h1>
          <p className="text-sm text-slate-400 dark:text-slate-500">{t(`nutrition.${mealSlot}`)}</p>
        </div>
      </div>

      {/* Tabs: Lebensmittel | Letzte */}
      <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 rounded-xl p-1 mb-4">
        <button
          onClick={() => setActiveTab('search')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'search'
              ? 'bg-white dark:bg-surface-dark-alt text-slate-900 dark:text-white shadow-soft border border-slate-100 dark:border-slate-800/60'
              : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          {lang === 'de' ? 'Lebensmittel' : 'Food'}
        </button>
        <button
          onClick={() => setActiveTab('recent')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'recent'
              ? 'bg-white dark:bg-surface-dark-alt text-slate-900 dark:text-white shadow-soft border border-slate-100 dark:border-slate-800/60'
              : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          {lang === 'de' ? 'Letzte' : 'Recent'} {recentFoods.length > 0 && `(${recentFoods.length})`}
        </button>
      </div>

      {/* TAB: Search */}
      {activeTab === 'search' && (
        <>
          {/* Quick Actions */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <button
              onClick={() => setShowScanner(true)}
              className="flex flex-col items-center gap-1.5 px-2 py-3 bg-white dark:bg-surface-dark-alt rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <ScanBarcode className="w-4.5 h-4.5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <p className="text-[11px] font-medium text-slate-700 dark:text-slate-200 text-center leading-tight">{t('nutrition.scanBarcode')}</p>
            </button>
            <button
              onClick={() => setShowMealPhoto(true)}
              className="flex flex-col items-center gap-1.5 px-2 py-3 bg-white dark:bg-surface-dark-alt rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <div className="w-9 h-9 rounded-xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">
                <Camera className="w-4.5 h-4.5 text-violet-600 dark:text-violet-400" />
              </div>
              <p className="text-[11px] font-medium text-slate-700 dark:text-slate-200 text-center leading-tight">{t('nutrition.mealPhoto')}</p>
            </button>
            <button
              onClick={() => setShowManual(true)}
              className="flex flex-col items-center gap-1.5 px-2 py-3 bg-white dark:bg-surface-dark-alt rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <div className="w-9 h-9 rounded-xl bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center">
                <PenLine className="w-4.5 h-4.5 text-primary-500 dark:text-primary-400" />
              </div>
              <p className="text-[11px] font-medium text-slate-700 dark:text-slate-200 text-center leading-tight">{t('nutrition.manualEntry')}</p>
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
                  <button key={meal.id} onClick={() => handleLogCustomMeal(meal)}
                    className="flex-shrink-0 px-4 py-2.5 rounded-xl bg-white dark:bg-surface-dark-alt shadow-soft border border-slate-100 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200 whitespace-nowrap">{meal.name}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">{Math.round(meal.total_calories)} kcal</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Food Search */}
          <FoodSearch onSelectFood={setSelectedFood} language={lang} />
        </>
      )}

      {/* TAB: Recent */}
      {activeTab === 'recent' && (
        <div>
          {recentFoods.length === 0 ? (
            <p className="text-center text-sm text-slate-400 dark:text-slate-500 py-12">
              {lang === 'de' ? 'Noch keine Lebensmittel geloggt.' : 'No foods logged yet.'}
            </p>
          ) : (
            <div className="bg-white dark:bg-surface-dark-alt rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800/60 overflow-hidden">
              {recentFoods.map((food, i) => {
                const inQueue = isInQueue(food.food_name);
                return (
                  <div key={i} className="flex items-center gap-3 px-4 py-3 border-b border-slate-50 dark:border-slate-700/50 last:border-0">
                    {/* Food image/emoji */}
                    <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {food.image_url ? (
                        <img src={food.image_url} alt="" className="w-full h-full object-cover" loading="lazy" />
                      ) : (
                        <span className="text-base">{getCategoryEmoji(food.source === 'openfoodfacts' ? null : food.category)}</span>
                      )}
                    </div>
                    <button
                      onClick={() => inQueue ? null : selectRecent(food)}
                      className="flex-1 text-left min-w-0"
                    >
                      <p className={`text-sm font-medium truncate ${inQueue ? 'text-primary-400' : 'text-slate-700 dark:text-slate-200'}`}>
                        {food.food_name}
                        {food.brand && <span className="text-xs text-slate-400 ml-1">{food.brand}</span>}
                      </p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-xs text-slate-400">{food.serving_size}{food.serving_unit}</span>
                        <span className="text-slate-200 dark:text-slate-700">·</span>
                        <span className="text-xs text-slate-400">{Math.round(food.calories)} kcal</span>
                        <span className="text-slate-200 dark:text-slate-700">·</span>
                        <span className="inline-flex px-1 py-0.5 rounded bg-blue-50 dark:bg-blue-900/20 text-[10px] font-semibold text-blue-500">P {Math.round(food.protein)}g</span>
                      </div>
                    </button>
                    <button
                      onClick={() => setRecentFoods((prev) => prev.filter((_, idx) => idx !== i))}
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-slate-300 dark:text-slate-600 hover:text-red-400 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => inQueue ? null : selectRecent(food)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                        inQueue
                          ? 'bg-primary-500 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-500'
                      }`}
                    >
                      {inQueue ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Selected Items Queue (floating bottom bar) */}
      {selectedItems.length > 0 && (
        <div className="fixed bottom-20 left-0 right-0 px-4 z-30">
          <div className="max-w-lg mx-auto bg-white dark:bg-surface-dark-alt rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-3">
            {/* Items list */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-2">
              {selectedItems.map((item, i) => (
                <div key={i} className="flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-primary-50 dark:bg-primary-900/20 text-xs">
                  <span className="font-medium text-primary-600 dark:text-primary-400 max-w-[100px] truncate">{item.food_name}</span>
                  <span className="text-primary-400 dark:text-primary-500">{Math.round(item.calories)}</span>
                  <button onClick={() => removeFromQueue(i)} className="text-primary-300 hover:text-red-400 ml-0.5">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
            {/* Save button */}
            <button
              onClick={handleSaveAll}
              disabled={saving}
              className="w-full py-2.5 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <Check className="w-4 h-4" />
              {saving
                ? '...'
                : `${selectedItems.length} ${lang === 'de' ? 'Einträge speichern' : 'entries save'} · ${Math.round(totalCalories)} kcal`}
            </button>
          </div>
        </div>
      )}
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
    <div className="p-4 pt-16 pb-24">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold">{t('nutrition.manualEntry')}</h1>
      </div>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-1 block">{t('nutrition.foodName')}</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={t('nutrition.searchPlaceholder')}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400" />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-1 block">{t('nutrition.brand')}</label>
          <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400" />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-1 block">{t('nutrition.servingSize')} (g)</label>
          <input type="number" inputMode="numeric" value={servingSize} onChange={(e) => setServingSize(parseInt(e.target.value) || 0)}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-1 block">{t('nutrition.calories')} (kcal)</label>
            <input type="number" inputMode="decimal" value={calories} onChange={(e) => setCalories(e.target.value)} placeholder="0"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400" />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-1 block">{t('nutrition.protein')} (g)</label>
            <input type="number" inputMode="decimal" value={protein} onChange={(e) => setProtein(e.target.value)} placeholder="0"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400" />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-1 block">{t('nutrition.carbs')} (g)</label>
            <input type="number" inputMode="decimal" value={carbs} onChange={(e) => setCarbs(e.target.value)} placeholder="0"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400" />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-1 block">{t('nutrition.fat')} (g)</label>
            <input type="number" inputMode="decimal" value={fat} onChange={(e) => setFat(e.target.value)} placeholder="0"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400" />
          </div>
        </div>
        <button onClick={handleSave} disabled={!name.trim()}
          className="w-full py-3.5 bg-primary-500 hover:bg-primary-600 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white rounded-2xl font-semibold transition-colors">
          {t('nutrition.add')}
        </button>
      </div>
    </div>
  );
}
