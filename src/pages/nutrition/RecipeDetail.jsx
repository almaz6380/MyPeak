import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Clock, Heart, Minus, Plus, Check, ChefHat, UtensilsCrossed } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { saveNutritionEntry } from '../../data/nutritionStorage';

const DIFFICULTY = {
  easy: { de: 'Einfach', en: 'Easy', color: 'text-green-500 bg-green-50 dark:bg-green-900/20' },
  medium: { de: 'Mittel', en: 'Medium', color: 'text-amber-500 bg-amber-50 dark:bg-amber-900/20' },
  hard: { de: 'Schwer', en: 'Hard', color: 'text-red-500 bg-red-50 dark:bg-red-900/20' },
};

const TAG_LABELS = {
  normal: { de: 'Normal', en: 'Normal' },
  vegetarian: { de: 'Vegetarisch', en: 'Vegetarian' },
  vegan: { de: 'Vegan', en: 'Vegan' },
  keto: { de: 'Keto', en: 'Keto' },
  lowcarb: { de: 'Low Carb', en: 'Low Carb' },
  highcarb: { de: 'High Carb', en: 'High Carb' },
  glutenfree: { de: 'Glutenfrei', en: 'Gluten-free' },
  lactosefree: { de: 'Laktosefrei', en: 'Lactose-free' },
};

const MEAL_SLOTS = [
  { key: 'breakfast', de: 'Frühstück', en: 'Breakfast' },
  { key: 'lunch', de: 'Mittagessen', en: 'Lunch' },
  { key: 'dinner', de: 'Abendessen', en: 'Dinner' },
  { key: 'snack', de: 'Snack', en: 'Snack' },
];

export default function RecipeDetail({ recipe, onBack, onSaved }) {
  const { i18n } = useTranslation();
  const { user } = useAuth();
  const lang = i18n.language || 'de';
  const [servings, setServings] = useState(recipe.servings || 2);
  const [showMealPicker, setShowMealPicker] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isFav, setIsFav] = useState(() => {
    try { return JSON.parse(localStorage.getItem('recipeFavorites') || '[]').includes(recipe.id); } catch { return false; }
  });

  const scale = servings / (recipe.servings || 2);
  const n = recipe.nutrition;
  const scaledNutrition = {
    calories: Math.round(n.calories * scale),
    protein: Math.round(n.protein * scale * 10) / 10,
    carbs: Math.round(n.carbs * scale * 10) / 10,
    fat: Math.round(n.fat * scale * 10) / 10,
    fiber: Math.round((n.fiber || 0) * scale * 10) / 10,
  };

  const diff = DIFFICULTY[recipe.difficulty] || DIFFICULTY.easy;
  const name = lang === 'de' ? recipe.nameDE : recipe.nameEN;
  const ingredients = lang === 'de' ? recipe.ingredientsDE : recipe.ingredientsEN;
  const steps = lang === 'de' ? recipe.stepsDE : recipe.stepsEN;

  function scaleIngredient(text) {
    if (scale === 1) return text;
    return text.replace(/(\d+(?:[.,]\d+)?)\s*(g|ml|kg|l|EL|TL|Stk|Stück|tbsp|tsp|cups?|pcs?)/gi, (match, num, unit) => {
      const scaled = Math.round(parseFloat(num.replace(',', '.')) * scale * 10) / 10;
      return `${scaled} ${unit}`;
    });
  }

  function toggleFav() {
    const favs = JSON.parse(localStorage.getItem('recipeFavorites') || '[]');
    const next = isFav ? favs.filter((f) => f !== recipe.id) : [...favs, recipe.id];
    localStorage.setItem('recipeFavorites', JSON.stringify(next));
    setIsFav(!isFav);
  }

  async function handleEaten(mealSlot) {
    const today = new Date().toISOString().split('T')[0];
    await saveNutritionEntry(user.id, {
      date: today,
      meal_slot: mealSlot,
      food_name: name,
      serving_size: servings,
      serving_unit: 'portion',
      calories: scaledNutrition.calories,
      protein: scaledNutrition.protein,
      carbs: scaledNutrition.carbs,
      fat: scaledNutrition.fat,
      source: 'recipe',
      source_id: recipe.id,
    });
    setShowMealPicker(false);
    setSaved(true);
    setTimeout(() => { setSaved(false); if (onSaved) onSaved(); }, 1500);
  }

  return (
    <div className="p-4 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 -ml-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold">{name}</h1>
        </div>
        <button onClick={toggleFav} className={`p-2 ${isFav ? 'text-red-500' : 'text-slate-400'}`}>
          <Heart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs text-slate-500">
          <Clock className="w-3 h-3" /> {recipe.prepTime} min
        </span>
        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${diff.color}`}>
          {lang === 'de' ? diff.de : diff.en}
        </span>
        {recipe.tags.map((tag) => (
          <span key={tag} className="px-2 py-1 rounded-lg bg-primary-50 dark:bg-primary-900/20 text-xs text-primary-500 dark:text-primary-400">
            {TAG_LABELS[tag]?.[lang] || tag}
          </span>
        ))}
      </div>

      {/* Servings Picker */}
      <div className="bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-sm mb-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">{lang === 'de' ? 'Portionen' : 'Servings'}</p>
          <div className="flex items-center gap-3">
            <button onClick={() => setServings(Math.max(1, servings - 1))}
              className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-lg font-bold w-8 text-center">{servings}</span>
            <button onClick={() => setServings(servings + 1)}
              className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Nutrition */}
      <div className="grid grid-cols-5 gap-2 mb-4">
        <MacroCard label="kcal" value={scaledNutrition.calories} color="bg-primary-50 dark:bg-primary-900/20 text-primary-500" />
        <MacroCard label={lang === 'de' ? 'Protein' : 'Protein'} value={`${scaledNutrition.protein}g`} color="bg-blue-50 dark:bg-blue-900/20 text-blue-500" />
        <MacroCard label="Carbs" value={`${scaledNutrition.carbs}g`} color="bg-amber-50 dark:bg-amber-900/20 text-amber-500" />
        <MacroCard label={lang === 'de' ? 'Fett' : 'Fat'} value={`${scaledNutrition.fat}g`} color="bg-rose-50 dark:bg-rose-900/20 text-rose-500" />
        <MacroCard label={lang === 'de' ? 'Ballast.' : 'Fiber'} value={`${scaledNutrition.fiber}g`} color="bg-green-50 dark:bg-green-900/20 text-green-500" />
      </div>

      {/* Ingredients */}
      <div className="bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-sm mb-4">
        <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <UtensilsCrossed className="w-4 h-4 text-primary-400" />
          {lang === 'de' ? 'Zutaten' : 'Ingredients'}
        </h2>
        <ul className="space-y-2">
          {(ingredients || []).map((item, i) => (
            <li key={i} className="text-sm text-slate-600 dark:text-slate-300 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-1.5 flex-shrink-0" />
              {scaleIngredient(item)}
            </li>
          ))}
        </ul>
      </div>

      {/* Steps */}
      <div className="bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-sm mb-6">
        <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <ChefHat className="w-4 h-4 text-primary-400" />
          {lang === 'de' ? 'Zubereitung' : 'Instructions'}
        </h2>
        <ol className="space-y-3">
          {(steps || []).map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/20 text-primary-500 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                {i + 1}
              </span>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{step}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* Eaten Button */}
      <button
        onClick={() => saved ? null : setShowMealPicker(true)}
        className={`w-full py-3.5 rounded-2xl font-semibold transition-colors flex items-center justify-center gap-2 ${
          saved ? 'bg-green-500 text-white' : 'bg-primary-500 hover:bg-primary-600 text-white'
        }`}
      >
        {saved ? (
          <><Check className="w-5 h-5" /> {lang === 'de' ? 'Gespeichert!' : 'Saved!'}</>
        ) : (
          <>{lang === 'de' ? 'Gegessen — ins Tracking übernehmen' : 'Eaten — add to tracking'}</>
        )}
      </button>

      {/* Meal Slot Picker Modal */}
      {showMealPicker && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowMealPicker(false)}>
          <div className="bg-white dark:bg-surface-dark-alt rounded-2xl p-6 w-full max-w-sm shadow-xl" onClick={(e) => e.stopPropagation()}>
            <p className="text-center font-semibold mb-4">{lang === 'de' ? 'Für welche Mahlzeit?' : 'For which meal?'}</p>
            <div className="space-y-2">
              {MEAL_SLOTS.map((slot) => (
                <button
                  key={slot.key}
                  onClick={() => handleEaten(slot.key)}
                  className="w-full py-3 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-primary-50 dark:hover:bg-primary-900/20 text-sm font-medium transition-colors"
                >
                  {lang === 'de' ? slot.de : slot.en}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MacroCard({ label, value, color }) {
  return (
    <div className={`rounded-xl p-2 text-center ${color}`}>
      <p className="text-sm font-bold">{value}</p>
      <p className="text-[9px] font-medium opacity-70">{label}</p>
    </div>
  );
}
