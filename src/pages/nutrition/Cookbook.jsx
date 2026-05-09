import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Search, Clock, ChefHat, Heart } from 'lucide-react';
import recipes from '../../data/recipesData';

const MEAL_FILTERS = [
  { key: 'all', de: 'Alle', en: 'All' },
  { key: 'breakfast', de: 'Frühstück', en: 'Breakfast' },
  { key: 'lunch', de: 'Mittagessen', en: 'Lunch' },
  { key: 'dinner', de: 'Abendessen', en: 'Dinner' },
  { key: 'snack', de: 'Snack', en: 'Snack' },
  { key: 'postworkout', de: 'Post-Workout', en: 'Post-Workout' },
];

const TAG_FILTERS = [
  { key: 'all', de: 'Alle', en: 'All' },
  { key: 'normal', de: 'Normal', en: 'Normal' },
  { key: 'vegetarian', de: 'Vegetarisch', en: 'Vegetarian' },
  { key: 'vegan', de: 'Vegan', en: 'Vegan' },
  { key: 'keto', de: 'Keto', en: 'Keto' },
  { key: 'lowcarb', de: 'Low Carb', en: 'Low Carb' },
  { key: 'highcarb', de: 'High Carb', en: 'High Carb' },
  { key: 'glutenfree', de: 'Glutenfrei', en: 'Gluten-free' },
  { key: 'lactosefree', de: 'Laktosefrei', en: 'Lactose-free' },
];

const DIFFICULTY = {
  easy: { de: 'Einfach', en: 'Easy', color: 'text-green-500 bg-green-50 dark:bg-green-900/20' },
  medium: { de: 'Mittel', en: 'Medium', color: 'text-amber-500 bg-amber-50 dark:bg-amber-900/20' },
  hard: { de: 'Schwer', en: 'Hard', color: 'text-red-500 bg-red-50 dark:bg-red-900/20' },
};

export default function Cookbook({ onBack, onSelectRecipe }) {
  const { i18n } = useTranslation();
  const lang = i18n.language || 'de';
  const [search, setSearch] = useState('');
  const [mealFilter, setMealFilter] = useState('all');
  const [tagFilter, setTagFilter] = useState('all');
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem('recipeFavorites') || '[]'); } catch { return []; }
  });

  const filtered = (recipes || []).filter((r) => {
    const name = (lang === 'de' ? r.nameDE : r.nameEN).toLowerCase();
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
    <div className="p-4 pt-14 pb-24">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={onBack} className="p-2 -ml-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold">{lang === 'de' ? 'Kochbuch' : 'Cookbook'}</h1>
      </div>

      {/* Search */}
      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={lang === 'de' ? 'Rezept suchen...' : 'Search recipes...'}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-surface-dark-alt border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
        />
      </div>

      {/* Meal Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-2 scrollbar-hide">
        {MEAL_FILTERS.map((f) => (
          <button key={f.key} onClick={() => setMealFilter(f.key)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              mealFilter === f.key ? 'bg-primary-500 text-white' : 'bg-white dark:bg-surface-dark-alt text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
            }`}>
            {lang === 'de' ? f.de : f.en}
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
            {lang === 'de' ? f.de : f.en}
          </button>
        ))}
      </div>

      <p className="text-xs text-slate-400 dark:text-slate-500 mb-3">
        {filtered.length} {lang === 'de' ? 'Rezepte' : 'Recipes'}
      </p>

      {/* Recipe Cards */}
      <div className="flex flex-col gap-3">
        {filtered.map((recipe) => {
          const diff = DIFFICULTY[recipe.difficulty] || DIFFICULTY.easy;
          const isFav = favorites.includes(recipe.id);

          return (
            <button
              key={recipe.id}
              onClick={() => onSelectRecipe(recipe)}
              className="w-full bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow text-left"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">{lang === 'de' ? recipe.nameDE : recipe.nameEN}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                    {lang === 'de' ? recipe.descDE : recipe.descEN}
                  </p>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); toggleFav(recipe.id); }}
                  className={`p-1.5 ml-2 flex-shrink-0 ${isFav ? 'text-red-500' : 'text-slate-300 dark:text-slate-600'}`}
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
                  {lang === 'de' ? diff.de : diff.en}
                </span>
                {/* Macros */}
                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-primary-50 dark:bg-primary-900/20 text-[10px] font-semibold text-primary-500 dark:text-primary-400">
                  {recipe.nutrition.calories} kcal
                </span>
                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-900/20 text-[10px] font-semibold text-blue-600 dark:text-blue-400">
                  P {recipe.nutrition.protein}g
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-sm text-slate-400 dark:text-slate-500 py-8">
          {lang === 'de' ? 'Keine Rezepte gefunden.' : 'No recipes found.'}
        </p>
      )}
    </div>
  );
}
