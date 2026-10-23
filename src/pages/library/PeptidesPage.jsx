import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUebersetzung, uebersetzt } from '../../data/uebersetzungen';
import { beschriftung } from '../../lib/sprache';
import { ArrowLeft, ChevronDown, ChevronUp, FlaskConical, Brain, Flame, Heart, ShieldCheck, BookOpen, ChevronRight, Stethoscope } from 'lucide-react';
import peptides from '../../data/peptidesData';
import References from '../../components/References';
import MedicalDisclaimer from '../../components/MedicalDisclaimer';

const CATEGORIES = [
  { id: 'healing', icon: Heart, color: 'text-green-500 bg-green-50 dark:bg-green-900/20' },
  { id: 'gh', icon: FlaskConical, color: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20' },
  { id: 'fatloss', icon: Flame, color: 'text-orange-500 bg-orange-50 dark:bg-orange-900/20' },
  { id: 'antiaging', icon: ShieldCheck, color: 'text-purple-500 bg-purple-50 dark:bg-purple-900/20' },
  { id: 'cognitive', icon: Brain, color: 'text-cyan-500 bg-cyan-50 dark:bg-cyan-900/20' },
];

const SECTION_COLORS = [
  'border-s-primary-400', 'border-s-blue-400', 'border-s-green-400',
  'border-s-amber-400', 'border-s-red-400', 'border-s-purple-400',
  'border-s-cyan-400', 'border-s-rose-400',
];

// Gelesen wird ausschliesslich ueber `beschriftung()`, nie direkt mit `[lang]`.
// Genau das hat auf Spanisch die rohen Ids gezeigt („healing", „gh") — und an
// zwei der drei Fundstellen fehlte selbst dieser Rueckfall, dort stand nichts.
// Der Helfer faellt sauber auf EN, dann DE zurueck.
const categoryNames = {
  all: { de: 'Alle', en: 'All', es: 'Todos', fr: 'Tous', pt: 'Todos', ar: 'الكل', nl: 'Alle', pl: 'Wszystkie', it: 'Tutti', tr: 'Tümü', ja: 'すべて' },
  healing: { de: 'Heilung & Recovery', en: 'Healing & Recovery', es: 'Curación y recuperación', fr: 'Guérison et récupération', pt: 'Cura e recuperação', ar: 'الشفاء والاستشفاء', nl: 'Herstel & recovery', pl: 'Regeneracja i leczenie', it: 'Guarigione e recupero', tr: 'İyileşme & Recovery', ja: '回復・リカバリー' },
  gh: { de: 'Wachstumshormon', en: 'Growth Hormone', es: 'Hormona del crecimiento', fr: 'Hormone de croissance', pt: 'Hormônio do crescimento', ar: 'هرمون النمو', nl: 'Groeihormoon', pl: 'Hormon wzrostu', it: 'Ormone della crescita', tr: 'Büyüme hormonu', ja: '成長ホルモン' },
  fatloss: { de: 'Fettabbau', en: 'Fat Loss', es: 'Pérdida de grasa', fr: 'Perte de graisse', pt: 'Perda de gordura', ar: 'حرق الدهون', nl: 'Vetverlies', pl: 'Redukcja tłuszczu', it: 'Perdita di grasso', tr: 'Yağ yakımı', ja: '脂肪燃焼' },
  antiaging: { de: 'Anti-Aging', en: 'Anti-Aging', es: 'Antienvejecimiento', fr: 'Anti-âge', pt: 'Antienvelhecimento', ar: 'مقاومة الشيخوخة', nl: 'Anti-aging', pl: 'Anti-aging', it: 'Anti-aging', tr: 'Anti-aging', ja: 'アンチエイジング' },
  cognitive: { de: 'Kognition', en: 'Cognition', es: 'Cognición', fr: 'Cognition', pt: 'Cognição', ar: 'الإدراك', nl: 'Cognitie', pl: 'Funkcje poznawcze', it: 'Cognizione', tr: 'Bilişsel performans', ja: '認知機能' },
};

export default function PeptidesPage({ onBack }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || 'de';
  // Spanisches Inhaltspaket; null, solange es lädt oder die Sprache keines hat.
  const paket = useUebersetzung('peptides', i18n.language);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedPeptide, setSelectedPeptide] = useState(null);
  const [showEbook, setShowEbook] = useState(false);

  const filtered = activeCategory === 'all'
    ? peptides
    : peptides.filter((p) => p.category === activeCategory);

  // ── E-BOOK VIEW ──
  if (selectedPeptide && showEbook) {
    const p = selectedPeptide;
    return (
      <div className="p-4 pt-16 pb-24">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setShowEbook(false)} className="p-2 -ms-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold">{uebersetzt(p, lang, paket).name}</h1>
            <p className="text-xs text-primary-400">{t('ui.detailedEBook')}</p>
          </div>
        </div>

        {p.sections && p.sections.length > 0 ? (
          <div className="space-y-3">
            {uebersetzt(p, lang, paket).sections.map((section, i) => (
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
            <p className="text-slate-400 dark:text-slate-500 text-sm">
              {t('ui.eBookIsBeingCreated')}
            </p>
          </div>
        )}

        <References items={p.references} />
        <Disclaimer lang={lang} />
      </div>
    );
  }

  // ── KURZFASSUNG (Detail-Ansicht) ──
  if (selectedPeptide) {
    const p = selectedPeptide;
    const cat = CATEGORIES.find((c) => c.id === p.category);
    const quick = uebersetzt(p, lang, paket).quick;
    const hasEbook = p.sections && p.sections.length > 0;

    return (
      <div className="p-4 pt-16 pb-24">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setSelectedPeptide(null)} className="p-2 -ms-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold">{uebersetzt(p, lang, paket).name}</h1>
            <p className="text-xs text-slate-400 dark:text-slate-500">{beschriftung(categoryNames[p.category], lang)}</p>
          </div>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${cat?.color}`}>
            <img src={`/bg-photos/pep-${p.category}-icon.png`} alt="" aria-hidden="true" className="w-7 h-7 object-contain" />
          </div>
        </div>

        <Disclaimer lang={lang} />

        {/* Summary */}
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
          {uebersetzt(p, lang, paket).summary}
        </p>

        {/* Quick Info Cards */}
        {quick && (
          <div className="space-y-3 mb-6">
            <QuickCard
              title={t('ui.effects')}
              text={quick.wirkung}
              color="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-s-green-400"
            />
            <QuickCard
              title={t('ui.sideEffects')}
              text={quick.nebenwirkungen}
              color="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-s-red-400"
            />
          </div>
        )}

        {/* Medical Advice Notice */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-4 mb-4 flex gap-3">
          <Stethoscope className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-blue-700 dark:text-blue-400 leading-relaxed">
            {t('ui.dosageAndAdministrationShouldOnlyB')}
          </p>
        </div>

        {/* E-Book Button */}
        <button
          onClick={() => hasEbook ? setShowEbook(true) : null}
          className={`w-full rounded-2xl p-4 flex items-center gap-4 transition-all ${
            hasEbook
              ? 'bg-primary-500 hover:bg-primary-500 text-white shadow-lg'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500'
          }`}
        >
          <BookOpen className="w-6 h-6 flex-shrink-0" />
          <div className="flex-1 text-start">
            <p className="font-semibold text-sm">
              {t('ui.readDetailedEBook')}
            </p>
            <p className={`text-xs mt-0.5 ${hasEbook ? 'text-white/70' : ''}`}>
              {hasEbook
                ? `${p.sections.length} ${t('ui.chapters')}`
                : (t('ui.comingSoon'))}
            </p>
          </div>
          {hasEbook && <ChevronRight className="w-5 h-5" />}
        </button>

        <References items={p.references} />
        <Disclaimer lang={lang} />
      </div>
    );
  }

  // ── LIST VIEW ──
  return (
    <div className="p-4 pt-16 pb-24">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="p-2 -ms-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold">{t('ui.peptides')}</h1>
      </div>

      <Disclaimer lang={lang} />

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
        {['all', ...CATEGORIES.map((c) => c.id)].map((catId) => (
          <button
            key={catId}
            onClick={() => setActiveCategory(catId)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              activeCategory === catId
                ? 'bg-primary-500 text-white'
                : 'bg-white dark:bg-surface-dark-alt text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
            }`}
          >
            {beschriftung(categoryNames[catId], lang) || catId}
          </button>
        ))}
      </div>

      <p className="text-xs text-slate-400 dark:text-slate-500 mb-3">
        {filtered.length} {t('ui.peptides')}
      </p>

      {/* Peptide Cards */}
      <div className="flex flex-col gap-3">
        {filtered.map((peptide) => {
          const cat = CATEGORIES.find((c) => c.id === peptide.category);
          const hasEbook = peptide.sections && peptide.sections.length > 0;

          return (
            <button
              key={peptide.id}
              onClick={() => setSelectedPeptide(peptide)}
              className="w-full bg-white dark:bg-surface-dark-alt rounded-2xl p-4 flex items-center gap-4 shadow-soft border border-slate-100 dark:border-slate-800/60 hover:shadow-md transition-shadow text-start"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${cat?.color}`}>
                <img src={`/bg-photos/pep-${peptide.category}-icon.png`} alt="" aria-hidden="true" className="w-7 h-7 object-contain" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{uebersetzt(peptide, lang, paket).name}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{beschriftung(categoryNames[peptide.category], lang)}</p>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                {hasEbook && (
                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-primary-50 dark:bg-primary-900/20 text-[10px] font-semibold text-primary-500 dark:text-primary-400">
                    <BookOpen className="w-3 h-3" />
                    E-Book
                  </span>
                )}
                <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function QuickCard({ title, text, color }) {
  return (
    <div className={`rounded-xl p-3 border-s-4 ${color}`}>
      <p className="text-xs font-semibold mb-1">{title}</p>
      <p className="text-xs opacity-90 leading-relaxed">{text}</p>
    </div>
  );
}

function EbookSection({ title, content, colorClass, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`bg-white dark:bg-surface-dark-alt rounded-2xl shadow-soft overflow-hidden border-s-4 ${colorClass}`}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-4 text-start">
        <h3 className="font-semibold text-sm">{title}</h3>
        {open ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
      </button>
      {open && (
        <div className="px-4 pb-4">
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">{content}</p>
        </div>
      )}
    </div>
  );
}

function Disclaimer({ lang }) {
  const { t } = useTranslation();
  // Der Grundhinweis kommt aus dem gemeinsamen Baustein; peptidspezifisch bleiben
  // die Verschreibungspflicht und der Stand der Forschung.
  const extra = t('ui.peptidesArePrescriptionOnlyOrUnapp');

  return <MedicalDisclaimer lang={lang} type="medical" extra={extra} className="mt-6 mb-4" />;
}
