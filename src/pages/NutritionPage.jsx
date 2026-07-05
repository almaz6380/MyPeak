import { useState, lazy, Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import DailyOverview from './nutrition/DailyOverview';
import AddFoodEntry from './nutrition/AddFoodEntry';
import TDEECalculator from './nutrition/TDEECalculator';
import CustomMealsList from './nutrition/CustomMealsList';
import CustomMealBuilder from './nutrition/CustomMealBuilder';
import PortionPicker from './nutrition/PortionPicker';
// Lazy: Rezeptdaten erst laden, wenn das Kochbuch geöffnet wird
const Cookbook = lazy(() => import('./nutrition/Cookbook'));
import RecipeDetail from './nutrition/RecipeDetail';
import SupplementsOverview from './nutrition/SupplementsOverview';
import SupplementsList from './nutrition/SupplementsList';
import AddSupplement from './nutrition/AddSupplement';
import { useAuth } from '../context/AuthContext';
import { updateNutritionEntry } from '../data/nutritionStorage';
import { useTranslation } from 'react-i18next';
import { toLocalDateString } from '../lib/dateUtils';

export default function NutritionPage() {
  const { user } = useAuth();
  const { i18n } = useTranslation();
  const lang = i18n.language || 'de';

  const [view, setView] = useState('home');
  const [activeMealSlot, setActiveMealSlot] = useState('breakfast');
  const [activeDate, setActiveDate] = useState(formatDate(new Date()));
  const [editingEntry, setEditingEntry] = useState(null);
  const [editMeal, setEditMeal] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [editSupplement, setEditSupplement] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  function refresh() {
    setRefreshKey((k) => k + 1);
    setView('home');
  }

  // Add Food
  function handleAddFood(slot, date) {
    setActiveMealSlot(slot);
    setActiveDate(date);
    setView('addFood');
  }

  // Edit Entry
  function handleEditEntry(entry) {
    setEditingEntry(entry);
    setView('editEntry');
  }

  async function handleUpdateEntry(foodData) {
    if (!editingEntry) return;
    await updateNutritionEntry(user.id, editingEntry.id, {
      serving_size: foodData.serving_size,
      calories: foodData.calories,
      protein: foodData.protein,
      carbs: foodData.carbs,
      fat: foodData.fat,
    }, editingEntry.date);
    setEditingEntry(null);
    refresh();
  }

  // Views
  if (view === 'addFood') {
    return (
      <AddFoodEntry
        mealSlot={activeMealSlot}
        date={activeDate}
        language={lang}
        onBack={() => setView('home')}
        onSaved={refresh}
      />
    );
  }

  if (view === 'editEntry' && editingEntry) {
    return (
      <PortionPicker
        food={{
          nameDE: editingEntry.food_name,
          nameEN: editingEntry.food_name,
          brand: editingEntry.brand,
          servingSize: editingEntry.serving_size,
          servingUnit: editingEntry.serving_unit,
          calories: calcPer100(editingEntry.calories, editingEntry.serving_size),
          protein: calcPer100(editingEntry.protein, editingEntry.serving_size),
          carbs: calcPer100(editingEntry.carbs, editingEntry.serving_size),
          fat: calcPer100(editingEntry.fat, editingEntry.serving_size),
        }}
        language={lang}
        initialServing={editingEntry.serving_size}
        editMode
        onConfirm={handleUpdateEntry}
        onClose={() => { setEditingEntry(null); setView('home'); }}
      />
    );
  }

  if (view === 'tdee') {
    return <TDEECalculator onBack={() => setView('home')} onSaved={refresh} />;
  }

  if (view === 'customMeals') {
    return (
      <CustomMealsList
        onBack={() => setView('home')}
        onCreateMeal={() => { setEditMeal(null); setView('buildMeal'); }}
        onEditMeal={(meal) => { setEditMeal(meal); setView('buildMeal'); }}
      />
    );
  }

  if (view === 'buildMeal') {
    return (
      <CustomMealBuilder
        editMeal={editMeal}
        language={lang}
        onBack={() => setView('customMeals')}
        onSaved={() => { setEditMeal(null); setView('customMeals'); }}
      />
    );
  }

  if (view === 'cookbook') {
    return (
      <Suspense fallback={<div className="flex items-center justify-center pt-40"><Loader2 className="w-6 h-6 text-primary-400 animate-spin" /></div>}>
        <Cookbook
          onBack={() => setView('home')}
          onSelectRecipe={(recipe) => { setSelectedRecipe(recipe); setView('recipeDetail'); }}
        />
      </Suspense>
    );
  }

  if (view === 'recipeDetail' && selectedRecipe) {
    return (
      <RecipeDetail
        recipe={selectedRecipe}
        onBack={() => setView('cookbook')}
        onSaved={refresh}
      />
    );
  }

  if (view === 'supplements') {
    return (
      <SupplementsOverview
        onBack={() => setView('home')}
        onManage={() => setView('supplementsList')}
        onAdd={() => { setEditSupplement(null); setView('addSupplement'); }}
      />
    );
  }

  if (view === 'supplementsList') {
    return (
      <SupplementsList
        onBack={() => setView('supplements')}
        onAdd={() => { setEditSupplement(null); setView('addSupplement'); }}
        onEdit={(supp) => { setEditSupplement(supp); setView('addSupplement'); }}
      />
    );
  }

  if (view === 'addSupplement') {
    return (
      <AddSupplement
        editSupplement={editSupplement}
        onBack={() => setView(editSupplement ? 'supplementsList' : 'supplements')}
        onSaved={() => { setEditSupplement(null); setView('supplements'); }}
      />
    );
  }

  // Default: Daily Overview
  return (
    <DailyOverview
      key={refreshKey}
      onAddFood={handleAddFood}
      onEditEntry={handleEditEntry}
      onOpenTDEE={() => setView('tdee')}
      onOpenCustomMeals={() => setView('customMeals')}
      onOpenCookbook={() => setView('cookbook')}
      onOpenSupplements={() => setView('supplements')}
    />
  );
}

function formatDate(date) {
  return toLocalDateString(date);
}

function calcPer100(value, servingSize) {
  if (!servingSize || servingSize === 0) return value;
  return Math.round((value / servingSize) * 100 * 10) / 10;
}
