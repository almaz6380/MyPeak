import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Wifi, WifiOff, AlertTriangle } from 'lucide-react';
import { searchLocalFoods, searchOpenFoodFacts } from '../../data/foodDatabase';

export default function FoodSearch({ onSelectFood, language = 'de' }) {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [localResults, setLocalResults] = useState([]);
  const [onlineResults, setOnlineResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const inputRef = useRef(null);
  const debounceRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!query || query.length < 2) {
      setLocalResults([]);
      setOnlineResults([]);
      return;
    }

    // Instant local search
    const local = searchLocalFoods(query, language);
    setLocalResults(local);

    // Debounced online search
    clearTimeout(debounceRef.current);
    if (query.length >= 3) {
      setSearching(true);
      debounceRef.current = setTimeout(async () => {
        const online = await searchOpenFoodFacts(query, language);
        setOnlineResults(online);
        setSearching(false);
      }, 400);
    } else {
      setOnlineResults([]);
    }

    return () => clearTimeout(debounceRef.current);
  }, [query, language]);

  const hasResults = localResults.length > 0 || onlineResults.length > 0;

  return (
    <div>
      {/* Search Input */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('nutrition.searchPlaceholder')}
          className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all"
        />
      </div>

      {/* Local Results */}
      {localResults.length > 0 && (
        <div className="mb-4">
          <h3 className="text-xs font-medium text-slate-400 dark:text-slate-500 mb-2 flex items-center gap-1.5">
            <WifiOff className="w-3.5 h-3.5" />
            {t('nutrition.localResults')}
          </h3>
          <div className="bg-white dark:bg-surface-dark-alt rounded-2xl shadow-sm overflow-hidden">
            {localResults.slice(0, 10).map((food) => (
              <FoodResultItem
                key={food.id}
                food={food}
                language={language}
                onSelect={onSelectFood}
              />
            ))}
          </div>
        </div>
      )}

      {/* Online Results */}
      {onlineResults.length > 0 && (
        <div className="mb-4">
          <h3 className="text-xs font-medium text-slate-400 dark:text-slate-500 mb-2 flex items-center gap-1.5">
            <Wifi className="w-3.5 h-3.5" />
            {t('nutrition.onlineResults')}
          </h3>
          <div className="bg-white dark:bg-surface-dark-alt rounded-2xl shadow-sm overflow-hidden">
            {onlineResults.slice(0, 15).map((food) => (
              <FoodResultItem
                key={food.id}
                food={food}
                language={language}
                onSelect={onSelectFood}
                isOnline
              />
            ))}
          </div>
        </div>
      )}

      {/* Searching indicator */}
      {searching && (
        <p className="text-center text-sm text-slate-400 dark:text-slate-500 py-4">
          {t('nutrition.searching')}
        </p>
      )}

      {/* No Results */}
      {query.length >= 2 && !searching && !hasResults && (
        <p className="text-center text-sm text-slate-400 dark:text-slate-500 py-8">
          {t('nutrition.noResults')}
        </p>
      )}
    </div>
  );
}

function FoodResultItem({ food, language, onSelect, isOnline }) {
  const name = language === 'de' ? (food.nameDE || food.nameEN) : (food.nameEN || food.nameDE);

  return (
    <button
      onClick={() => onSelect(food)}
      className="w-full flex items-center justify-between px-4 py-3 text-left border-b border-slate-50 dark:border-slate-700/50 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
    >
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">
          {name}
          {food.incomplete && (
            <AlertTriangle className="inline w-3.5 h-3.5 text-amber-400 ml-1" />
          )}
        </p>
        <p className="text-xs text-slate-400 dark:text-slate-500">
          {food.brand && `${food.brand} · `}
          {food.calories} kcal · P {food.protein}g · C {food.carbs}g · F {food.fat}g
          <span className="text-slate-300 dark:text-slate-600"> / 100g</span>
        </p>
      </div>
      <div className="text-right ml-3 flex-shrink-0">
        <span className="text-xs font-medium text-primary-500">{food.servingSize}{food.servingUnit}</span>
      </div>
    </button>
  );
}
