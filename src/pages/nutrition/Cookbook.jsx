import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { beschriftung } from '../../lib/sprache';
import { ArrowLeft, Search, Clock, ChefHat, Heart } from 'lucide-react';
import recipes from '../../data/recipesData';
import { useUebersetzung, uebersetztesRezept } from '../../data/uebersetzungen';

const MEAL_FILTERS = [
  { key: 'all', de: 'Alle', en: 'All', es: 'Todas', fr: 'Toutes', pt: 'Todas', ar: 'الكل', nl: 'Alle', pl: 'Wszystkie', it: 'Tutte' },
  { key: 'breakfast', de: 'Frühstück', en: 'Breakfast', es: 'Desayuno', fr: 'Petit-déjeuner', pt: 'Café da manhã', ar: 'الإفطار', nl: 'Ontbijt', pl: 'Śniadanie', it: 'Colazione' },
  { key: 'lunch', de: 'Mittagessen', en: 'Lunch', es: 'Comida', fr: 'Déjeuner', pt: 'Almoço', ar: 'الغداء', nl: 'Lunch', pl: 'Obiad', it: 'Pranzo' },
  { key: 'dinner', de: 'Abendessen', en: 'Dinner', es: 'Cena', fr: 'Dîner', pt: 'Jantar', ar: 'العشاء', nl: 'Diner', pl: 'Kolacja', it: 'Cena' },
  { key: 'snack', de: 'Snack', en: 'Snack', es: 'Tentempié', fr: 'Collation', pt: 'Lanche', ar: 'وجبة خفيفة', nl: 'Snack', pl: 'Przekąska', it: 'Spuntino' },
  { key: 'postworkout', de: 'Post-Workout', en: 'Post-Workout', es: 'Post-entreno', fr: 'Après séance', pt: 'Pós-treino', ar: 'بعد التمرين', nl: 'Post-workout', pl: 'Po treningu', it: 'Post-allenamento' },
];

const TAG_FILTERS = [
  { key: 'all', de: 'Alle', en: 'All', es: 'Todas', fr: 'Toutes', pt: 'Todas', ar: 'الكل', nl: 'Alle', pl: 'Wszystkie', it: 'Tutte' },
  { key: 'normal', de: 'Normal', en: 'Normal', es: 'Normal', fr: 'Normal', pt: 'Normal', ar: 'عادي', nl: 'Normaal', pl: 'Standardowa', it: 'Normale' },
  { key: 'vegetarian', de: 'Vegetarisch', en: 'Vegetarian', es: 'Vegetariana', fr: 'Végétarien', pt: 'Vegetariana', ar: 'نباتي', nl: 'Vegetarisch', pl: 'Wegetariańska', it: 'Vegetariana' },
  { key: 'vegan', de: 'Vegan', en: 'Vegan', es: 'Vegana', fr: 'Végétalien', pt: 'Vegana', ar: 'نباتي صرف', nl: 'Veganistisch', pl: 'Wegańska', it: 'Vegana' },
  { key: 'keto', de: 'Keto', en: 'Keto', es: 'Keto', fr: 'Céto', pt: 'Keto', ar: 'كيتو', nl: 'Keto', pl: 'Keto', it: 'Keto' },
  { key: 'lowcarb', de: 'Low Carb', en: 'Low Carb', es: 'Baja en carbohidratos', fr: 'Pauvre en glucides', pt: 'Baixo carboidrato', ar: 'قليل الكربوهيدرات', nl: 'Low carb', pl: 'Low carb', it: 'Low carb' },
  { key: 'highcarb', de: 'High Carb', en: 'High Carb', es: 'Alta en carbohidratos', fr: 'Riche en glucides', pt: 'Alto carboidrato', ar: 'عالي الكربوهيدرات', nl: 'High carb', pl: 'High carb', it: 'High carb' },
  { key: 'glutenfree', de: 'Glutenfrei', en: 'Gluten-free', es: 'Sin gluten', fr: 'Sans gluten', pt: 'Sem glúten', ar: 'خالٍ من الغلوتين', nl: 'Glutenvrij', pl: 'Bez glutenu', it: 'Senza glutine' },
  { key: 'lactosefree', de: 'Laktosefrei', en: 'Lactose-free', es: 'Sin lactosa', fr: 'Sans lactose', pt: 'Sem lactose', ar: 'خالٍ من اللاكتوز', nl: 'Lactosevrij', pl: 'Bez laktozy', it: 'Senza lattosio' },
];

const DIFFICULTY = {
  easy: { de: 'Einfach', en: 'Easy', es: 'Fácil', fr: 'Facile', pt: 'Fácil', ar: 'سهل', nl: 'Makkelijk', pl: 'Łatwy', it: 'Facile', color: 'text-green-500 bg-green-50 dark:bg-green-900/20' },
  medium: { de: 'Mittel', en: 'Medium', es: 'Media', fr: 'Moyen', pt: 'Média', ar: 'متوسط', nl: 'Gemiddeld', pl: 'Średni', it: 'Media', color: 'text-amber-500 bg-amber-50 dark:bg-amber-900/20' },
  hard: { de: 'Schwer', en: 'Hard', es: 'Difícil', fr: 'Difficile', pt: 'Difícil', ar: 'صعب', nl: 'Moeilijk', pl: 'Trudny', it: 'Difficile', color: 'text-red-500 bg-red-50 dark:bg-red-900/20' },
};

export default function Cookbook({ onBack, onSelectRecipe }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || 'de';
  // Spanisches Rezeptpaket; null, solange es lädt oder die Sprache keines hat.
  const paket = useUebersetzung('recipes', i18n.language);
  const [search, setSearch] = useState('');
  const [mealFilter, setMealFilter] = useState('all');
  const [tagFilter, setTagFilter] = useState('all');
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem('recipeFavorites') || '[]'); } catch { return []; }
  });

  const filtered = (recipes || []).filter((r) => {
    const name = uebersetztesRezept(r, lang, paket).name.toLowerCase();
    const matchesMeal = mealFilter === 'all' || r.meal === mealFilter;
    const matchesTag = tagFilter === 'all' || r.tags.includes(tagFilter);
    const matchesSearch = !search || name.includes(search.toLowerCase());
    return matchesMeal && matchesTag && matchesSearch;
  });

  function toggleFav(id) {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id];
      localStorage.setItem('recipeFavorites', JSON.stringify(next));
      return next;
    });
  }

  return (
    <div className="p-4 pt-16 pb-24">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={onBack} className="p-2 -ms-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold">{t('ui.cookbook')}</h1>
      </div>

      {/* Search */}
      <div className="relative mb-3">
        <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t('ui.searchRecipes')}
          className="w-full ps-10 pe-4 py-2.5 rounded-xl bg-white dark:bg-surface-dark-alt border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
        />
      </div>

      {/* Meal Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-2 scrollbar-hide">
        {MEAL_FILTERS.map((f) => (
          <button key={f.key} onClick={() => setMealFilter(f.key)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              mealFilter === f.key ? 'bg-primary-500 text-white' : 'bg-white dark:bg-surface-dark-alt text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
            }`}>
            {beschriftung(f, lang)}
          </button>
        ))}
      </div>

      {/* Tag Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
        {TAG_FILTERS.map((f) => (
          <button key={f.key} onClick={() => setTagFilter(f.key)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              tagFilter === f.key ? 'bg-primary-500 text-white' : 'bg-white dark:bg-surface-dark-alt text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
            }`}>
            {beschriftung(f, lang)}
          </button>
        ))}
      </div>

      <p className="text-xs text-slate-400 dark:text-slate-500 mb-3">
        {filtered.length} {t('ui.recipes')}
      </p>

      {/* Recipe Cards */}
      <div className="flex flex-col gap-3">
        {filtered.map((recipe) => {
          const diff = DIFFICULTY[recipe.difficulty] || DIFFICULTY.easy;
          const isFav = favorites.includes(recipe.id);
          const text = uebersetztesRezept(recipe, lang, paket);

          return (
            <div
              key={recipe.id}
              role="button"
              tabIndex={0}
              onClick={() => onSelectRecipe(recipe)}
              className="w-full bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-soft border border-slate-100 dark:border-slate-800/60 hover:shadow-md transition-shadow text-start cursor-pointer"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">{text.name}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                    {text.desc}
                  </p>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); toggleFav(recipe.id); }}
                  className={`p-1.5 ms-2 flex-shrink-0 ${isFav ? 'text-red-500' : 'text-slate-300 dark:text-slate-600'}`}
                >
                  <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                </button>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {/* Time */}
                <span className="inline-flex items-center gap-1 text-[10px] text-slate-400 dark:text-slate-500">
                  <Clock className="w-3 h-3" /> {recipe.prepTime} min
                </span>
                {/* Difficulty */}
                <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${diff.color}`}>
                  {beschriftung(diff, lang)}
                </span>
                {/* Macros */}
                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-primary-50 dark:bg-primary-900/20 text-[10px] font-semibold text-primary-500 dark:text-primary-400">
                  {recipe.nutrition.calories} kcal
                </span>
                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-900/20 text-[10px] font-semibold text-blue-600 dark:text-blue-400">
                  P {recipe.nutrition.protein}g
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-sm text-slate-400 dark:text-slate-500 py-8">
          {t('ui.noRecipesFound')}
        </p>
      )}
    </div>
  );
}
