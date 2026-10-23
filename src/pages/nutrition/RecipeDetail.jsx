import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { beschriftung } from '../../lib/sprache';
import { useUebersetzung, uebersetztesRezept } from '../../data/uebersetzungen';
import { skaliereMenge } from '../../lib/mengenSkalierung';
import { ArrowLeft, Clock, Heart, Minus, Plus, Check, ChefHat, UtensilsCrossed } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { saveNutritionEntry } from '../../data/nutritionStorage';
import { todayLocal } from '../../lib/dateUtils';

const DIFFICULTY = {
  easy: { de: 'Einfach', en: 'Easy', es: 'Fácil', fr: 'Facile', pt: 'Fácil', ar: 'سهل', nl: 'Makkelijk', pl: 'Łatwy', it: 'Facile', tr: 'Kolay', color: 'text-green-500 bg-green-50 dark:bg-green-900/20' },
  medium: { de: 'Mittel', en: 'Medium', es: 'Media', fr: 'Moyen', pt: 'Média', ar: 'متوسط', nl: 'Gemiddeld', pl: 'Średni', it: 'Media', tr: 'Orta', color: 'text-amber-500 bg-amber-50 dark:bg-amber-900/20' },
  hard: { de: 'Schwer', en: 'Hard', es: 'Difícil', fr: 'Difficile', pt: 'Difícil', ar: 'صعب', nl: 'Moeilijk', pl: 'Trudny', it: 'Difficile', tr: 'Zor', color: 'text-red-500 bg-red-50 dark:bg-red-900/20' },
};

const TAG_LABELS = {
  normal: { de: 'Normal', en: 'Normal', es: 'Normal', fr: 'Normal', pt: 'Normal', ar: 'عادي', nl: 'Normaal', pl: 'Standardowa', it: 'Normale', tr: 'Normal' },
  vegetarian: { de: 'Vegetarisch', en: 'Vegetarian', es: 'Vegetariana', fr: 'Végétarien', pt: 'Vegetariana', ar: 'نباتي', nl: 'Vegetarisch', pl: 'Wegetariańska', it: 'Vegetariana', tr: 'Vejetaryen' },
  vegan: { de: 'Vegan', en: 'Vegan', es: 'Vegana', fr: 'Végétalien', pt: 'Vegana', ar: 'نباتي صرف', nl: 'Veganistisch', pl: 'Wegańska', it: 'Vegana', tr: 'Vegan' },
  keto: { de: 'Keto', en: 'Keto', es: 'Keto', fr: 'Céto', pt: 'Keto', ar: 'كيتو', nl: 'Keto', pl: 'Keto', it: 'Keto', tr: 'Keto' },
  lowcarb: { de: 'Low Carb', en: 'Low Carb', es: 'Baja en carbohidratos', fr: 'Pauvre en glucides', pt: 'Baixo carboidrato', ar: 'قليل الكربوهيدرات', nl: 'Low carb', pl: 'Low carb', it: 'Low carb', tr: 'Düşük karbonhidrat' },
  highcarb: { de: 'High Carb', en: 'High Carb', es: 'Alta en carbohidratos', fr: 'Riche en glucides', pt: 'Alto carboidrato', ar: 'عالي الكربوهيدرات', nl: 'High carb', pl: 'High carb', it: 'High carb', tr: 'Yüksek karbonhidrat' },
  glutenfree: { de: 'Glutenfrei', en: 'Gluten-free', es: 'Sin gluten', fr: 'Sans gluten', pt: 'Sem glúten', ar: 'خالٍ من الغلوتين', nl: 'Glutenvrij', pl: 'Bez glutenu', it: 'Senza glutine', tr: 'Glutensiz' },
  lactosefree: { de: 'Laktosefrei', en: 'Lactose-free', es: 'Sin lactosa', fr: 'Sans lactose', pt: 'Sem lactose', ar: 'خالٍ من اللاكتوز', nl: 'Lactosevrij', pl: 'Bez laktozy', it: 'Senza lattosio', tr: 'Laktozsuz' },
};

const MEAL_SLOTS = [
  { key: 'breakfast', de: 'Frühstück', en: 'Breakfast', es: 'Desayuno', fr: 'Petit-déjeuner', pt: 'Café da manhã', ar: 'الإفطار', nl: 'Ontbijt', pl: 'Śniadanie', it: 'Colazione', tr: 'Kahvaltı' },
  { key: 'lunch', de: 'Mittagessen', en: 'Lunch', es: 'Comida', fr: 'Déjeuner', pt: 'Almoço', ar: 'الغداء', nl: 'Lunch', pl: 'Obiad', it: 'Pranzo', tr: 'Öğle yemeği' },
  { key: 'dinner', de: 'Abendessen', en: 'Dinner', es: 'Cena', fr: 'Dîner', pt: 'Jantar', ar: 'العشاء', nl: 'Diner', pl: 'Kolacja', it: 'Cena', tr: 'Akşam yemeği' },
  { key: 'snack', de: 'Snack', en: 'Snack', es: 'Tentempié', fr: 'Collation', pt: 'Lanche', ar: 'وجبة خفيفة', nl: 'Snack', pl: 'Przekąska', it: 'Spuntino', tr: 'Ara öğün' },
];

export default function RecipeDetail({ recipe, onBack, onSaved }) {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const lang = i18n.language || 'de';
  // Spanisches Rezeptpaket; null, solange es lädt oder die Sprache keines hat.
  const paket = useUebersetzung('recipes', i18n.language);
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
  const { name, ingredients, steps } = uebersetztesRezept(recipe, lang, paket);


  function toggleFav() {
    const favs = JSON.parse(localStorage.getItem('recipeFavorites') || '[]');
    const next = isFav ? favs.filter((f) => f !== recipe.id) : [...favs, recipe.id];
    localStorage.setItem('recipeFavorites', JSON.stringify(next));
    setIsFav(!isFav);
  }

  async function handleEaten(mealSlot) {
    const today = todayLocal();
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
    <div className="p-4 pt-16 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 -ms-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
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
          {beschriftung(diff, lang)}
        </span>
        {recipe.tags.map((tag) => (
          <span key={tag} className="px-2 py-1 rounded-lg bg-primary-50 dark:bg-primary-900/20 text-xs text-primary-500 dark:text-primary-400">
            {TAG_LABELS[tag]?.[lang] || tag}
          </span>
        ))}
      </div>

      {/* Servings Picker */}
      <div className="bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-soft border border-slate-100 dark:border-slate-800/60 mb-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">{t('ui.servings')}</p>
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
        <MacroCard label={t('ui.protein')} value={`${scaledNutrition.protein}g`} color="bg-blue-50 dark:bg-blue-900/20 text-blue-500" />
        <MacroCard label="Carbs" value={`${scaledNutrition.carbs}g`} color="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500" />
        <MacroCard label={t('ui.fat')} value={`${scaledNutrition.fat}g`} color="bg-rose-50 dark:bg-rose-900/20 text-rose-500" />
        <MacroCard label={t('ui.fiber')} value={`${scaledNutrition.fiber}g`} color="bg-green-50 dark:bg-green-900/20 text-green-500" />
      </div>

      {/* Ingredients */}
      <div className="bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-soft border border-slate-100 dark:border-slate-800/60 mb-4">
        <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <UtensilsCrossed className="w-4 h-4 text-primary-400" />
          {t('ui.ingredients')}
        </h2>
        <ul className="space-y-2">
          {(ingredients || []).map((item, i) => (
            <li key={i} className="text-sm text-slate-600 dark:text-slate-300 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-1.5 flex-shrink-0" />
              {skaliereMenge(item, scale)}
            </li>
          ))}
        </ul>
      </div>

      {/* Steps */}
      <div className="bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-soft border border-slate-100 dark:border-slate-800/60 mb-6">
        <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <ChefHat className="w-4 h-4 text-primary-400" />
          {t('ui.instructions')}
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
          <><Check className="w-5 h-5" /> {t('ui.saved')}</>
        ) : (
          <>{t('ui.eatenAddToTracking')}</>
        )}
      </button>

      {/* Meal Slot Picker Modal */}
      {showMealPicker && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowMealPicker(false)}>
          <div className="bg-white dark:bg-surface-dark-alt rounded-2xl p-6 w-full max-w-sm shadow-xl" onClick={(e) => e.stopPropagation()}>
            <p className="text-center font-semibold mb-4">{t('ui.forWhichMeal')}</p>
            <div className="space-y-2">
              {MEAL_SLOTS.map((slot) => (
                <button
                  key={slot.key}
                  onClick={() => handleEaten(slot.key)}
                  className="w-full py-3 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-primary-50 dark:hover:bg-primary-900/20 text-sm font-medium transition-colors"
                >
                  {beschriftung(slot, lang)}
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
