import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUebersetzung, uebersetzt, kategorieName } from '../../data/uebersetzungen';
import { ArrowLeft, ChevronDown, ChevronUp, BookOpen, ChevronRight, Flame, TrendingUp, Clock, Zap, Scale, Play, Square, AlertTriangle } from 'lucide-react';
import { diets, dietCategories } from '../../data/dietsData';
import References from '../../components/References';
import MedicalDisclaimer from '../../components/MedicalDisclaimer';
import { useAuth } from '../../context/AuthContext';
import { startDiet, stopDiet, getActiveDiet, calculateDietGoals, applyDietGoals } from '../../data/dietStorage';
import { getNutritionGoals } from '../../data/nutritionStorage';

const CAT_ICONS = {
  fat_loss: Flame,
  recomp: TrendingUp,
  timing: Clock,
  advanced: Zap,
};

const CAT_COLORS = {
  fat_loss: 'text-orange-500 bg-orange-50 dark:bg-orange-900/20',
  recomp: 'text-green-500 bg-green-50 dark:bg-green-900/20',
  timing: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20',
  advanced: 'text-purple-500 bg-purple-50 dark:bg-purple-900/20',
};

const SECTION_COLORS = [
  'border-s-primary-400', 'border-s-blue-400', 'border-s-green-400',
  'border-s-amber-400', 'border-s-red-400', 'border-s-purple-400',
  'border-s-cyan-400',
];

export default function DietsPage({ onBack }) {
  const { t, i18n } = useTranslation();
  const { user, profile } = useAuth();
  const lang = i18n.language || 'de';
  // Spanisches Inhaltspaket; null, solange es lädt oder die Sprache keines hat.
  const paket = useUebersetzung('diets', i18n.language);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedDiet, setSelectedDiet] = useState(null);
  const [showEbook, setShowEbook] = useState(false);
  const [activeDietId, setActiveDietId] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [calculatedGoals, setCalculatedGoals] = useState(null);

  // Load active diet on mount
  useState(() => {
    if (user) {
      getActiveDiet(user.id).then((d) => { if (d) setActiveDietId(d.diet_id); });
    }
  });

  const filtered = activeCategory === 'all'
    ? diets
    : diets.filter((d) => d.category === activeCategory);

  async function handleStartDiet(diet) {
    const goals = await getNutritionGoals(user.id);
    const tdee = goals?.tdee || goals?.calories || 2000;
    const calc = calculateDietGoals(diet, profile, tdee);
    setCalculatedGoals(calc);
    setShowConfirm(true);
  }

  async function confirmStartDiet() {
    if (!selectedDiet || !calculatedGoals) return;
    await startDiet(user.id, selectedDiet.id);
    await applyDietGoals(user.id, calculatedGoals);
    setActiveDietId(selectedDiet.id);
    setShowConfirm(false);
  }

  async function handleStopDiet() {
    await stopDiet(user.id);
    setActiveDietId(null);
  }

  // ── E-BOOK VIEW ──
  if (selectedDiet && showEbook) {
    const d = selectedDiet;
    return (
      <div className="p-4 pt-16 pb-24">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setShowEbook(false)} className="p-2 -ms-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold">{uebersetzt(d, lang, paket).name}</h1>
            <p className="text-xs text-primary-400">{t('ui.detailedEBook')}</p>
          </div>
        </div>

        {d.sections && d.sections.length > 0 ? (
          <div className="space-y-3">
            {uebersetzt(d, lang, paket).sections.map((section, i) => (
              <EbookSection
                key={i}
                title={section.title}
                content={section.content}
                colorClass={SECTION_COLORS[i % SECTION_COLORS.length]}
                defaultOpen={i === 0}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
            <p className="text-slate-400 text-sm">{t('ui.eBookComingSoon')}</p>
          </div>
        )}

        <References items={d.references} />
      </div>
    );
  }

  // ── DETAIL VIEW ──
  if (selectedDiet) {
    const d = selectedDiet;
    const quick = uebersetzt(d, lang, paket).quick;
    const hasEbook = d.sections && d.sections.length > 0;
    const isActive = activeDietId === d.id;

    return (
      <div className="p-4 pt-16 pb-24">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setSelectedDiet(null)} className="p-2 -ms-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold">{uebersetzt(d, lang, paket).name}</h1>
            <p className="text-xs text-slate-400">{kategorieName(dietCategories.find((c) => c.id === d.category), lang, paket)}</p>
          </div>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${CAT_COLORS[d.category]}`}>
            <img src={`/bg-photos/diet-${d.category.replace('_', '')}-icon.png`} alt="" aria-hidden="true" className="w-7 h-7 object-contain" />
          </div>
        </div>

        {/* Summary */}
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
          {uebersetzt(d, lang, paket).summary}
        </p>

        {/* Quick Info */}
        {quick && (
          <div className="space-y-3 mb-6">
            <div className="bg-primary-50 dark:bg-primary-900/20 border-s-4 border-s-primary-400 rounded-xl p-4">
              <p className="text-xs font-semibold text-primary-600 dark:text-primary-400 mb-1">{t('ui.method')}</p>
              <p className="text-sm text-slate-700 dark:text-slate-300">{quick.methode || quick.method}</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 border-s-4 border-s-blue-400 rounded-xl p-4">
              <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">{t('ui.forWhom')}</p>
              <p className="text-sm text-slate-700 dark:text-slate-300">{quick.fuer_wen || quick.for_whom}</p>
            </div>
          </div>
        )}

        {/* E-Book Button */}
        <button
          onClick={() => hasEbook ? setShowEbook(true) : null}
          className={`w-full rounded-2xl p-4 flex items-center gap-4 mb-4 transition-all ${
            hasEbook
              ? 'bg-primary-500 text-white shadow-lg'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
          }`}
        >
          <BookOpen className="w-6 h-6 flex-shrink-0" />
          <div className="flex-1 text-start">
            <p className="font-semibold text-sm">{t('ui.readDetailedEBook')}</p>
            <p className={`text-xs mt-0.5 ${hasEbook ? 'text-white/70' : ''}`}>
              {hasEbook ? `${d.sections.length} ${t('ui.chapters')}` : (t('ui.comingSoon'))}
            </p>
          </div>
          {hasEbook && <ChevronRight className="w-5 h-5" />}
        </button>

        {/* Start / Stop Diet Button */}
        {isActive ? (
          <button
            onClick={handleStopDiet}
            className="w-full rounded-2xl p-4 flex items-center justify-center gap-2 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-semibold"
          >
            <Square className="w-5 h-5" />
            {t('ui.stopDiet')}
          </button>
        ) : (
          <button
            onClick={() => handleStartDiet(d)}
            className="w-full rounded-2xl p-4 flex items-center justify-center gap-2 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 font-semibold"
          >
            <Play className="w-5 h-5" />
            {t('ui.startThisDiet')}
          </button>
        )}

        {/* Confirm Dialog */}
        {showConfirm && calculatedGoals && (
          <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-6" onClick={() => setShowConfirm(false)}>
            <div className="bg-white dark:bg-surface-dark-alt rounded-2xl p-6 w-full max-w-sm shadow-xl" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-lg font-bold mb-2">{t('ui.adjustNutritionGoals')}</h3>
              <p className="text-sm text-slate-500 mb-4">
                {t('ui.yourDailyCalorieAndMacroGoals')}
              </p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3 text-center">
                  <p className="text-lg font-bold text-primary-500">{calculatedGoals.calories}</p>
                  <p className="text-[10px] text-slate-400">kcal</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3 text-center">
                  <p className="text-lg font-bold text-blue-500">{calculatedGoals.protein}g</p>
                  <p className="text-[10px] text-slate-400">Protein</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3 text-center">
                  <p className="text-lg font-bold text-amber-500">{calculatedGoals.carbs}g</p>
                  <p className="text-[10px] text-slate-400">Carbs</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3 text-center">
                  <p className="text-lg font-bold text-rose-500">{calculatedGoals.fat}g</p>
                  <p className="text-[10px] text-slate-400">Fat</p>
                </div>
              </div>

              {/* Letzter Punkt vor dem Setzen der Ziele. */}
              <MedicalDisclaimer lang={lang} className="mb-4" />

              <div className="flex gap-2">
                <button onClick={() => setShowConfirm(false)} className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-semibold text-sm">
                  {t('ui.cancel')}
                </button>
                <button onClick={confirmStartDiet} className="flex-1 py-3 rounded-xl bg-primary-500 text-white font-semibold text-sm">
                  {t('ui.start')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ── LIST VIEW ──
  return (
    <div className="p-4 pt-16 pb-24">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="p-2 -ms-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold">{t('ui.diets')}</h1>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
        {['all', ...dietCategories.map((c) => c.id)].map((catId) => {
          const cat = dietCategories.find((c) => c.id === catId);
          return (
            <button
              key={catId}
              onClick={() => setActiveCategory(catId)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                activeCategory === catId
                  ? 'bg-primary-500 text-white'
                  : 'bg-white dark:bg-surface-dark-alt text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {catId === 'all' ? (t('ui.all')) : kategorieName(cat, lang, paket)}
            </button>
          );
        })}
      </div>

      {/* Eine Diaet setzt Kalorien- und Makroziele — der Hinweis gehoert vor die
          Auswahl, nicht ans Seitenende. */}
      <MedicalDisclaimer lang={lang} className="mb-4" />

      <p className="text-xs text-slate-400 mb-3">
        {filtered.length} {t('ui.dietTypes')}
      </p>

      {/* Diet Cards */}
      <div className="flex flex-col gap-3">
        {filtered.map((diet) => {
          const isActive = activeDietId === diet.id;
          return (
            <button
              key={diet.id}
              onClick={() => setSelectedDiet(diet)}
              className={`w-full bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-soft border border-slate-100 dark:border-slate-800/60 text-start hover:shadow-md transition-shadow ${
                isActive ? 'ring-2 ring-primary-400' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${CAT_COLORS[diet.category]}`}>
                  <img src={`/bg-photos/diet-${diet.category.replace('_', '')}-icon.png`} alt="" aria-hidden="true" className="w-7 h-7 object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                      {uebersetzt(diet, lang, paket).name}
                    </p>
                    {isActive && (
                      <span className="px-2 py-0.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-[10px] font-semibold text-primary-600 dark:text-primary-400">
                        {t('ui.active')}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 line-clamp-2">
                    {uebersetzt(diet, lang, paket).summary}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300 flex-shrink-0 mt-2" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function EbookSection({ title, content, colorClass, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`bg-white dark:bg-surface-dark-alt rounded-xl border-s-4 ${colorClass} shadow-soft overflow-hidden`}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-4 py-3">
        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 text-start">{title}</h3>
        {open ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
      </button>
      {open && (
        <div className="px-4 pb-4">
          <div className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">{content}</div>
        </div>
      )}
    </div>
  );
}
