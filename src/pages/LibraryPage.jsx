import { useState, lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Loader2, Sparkles } from 'lucide-react';
import MyPeakLogo from '../components/MyPeakLogo';
import CardPhotoMotif from '../components/CardPhotoMotif';
import { useSubscription } from '../context/SubscriptionContext';

// Lazy: Die E-Book-Texte (Peptide ~480 KB, Diäten ~220 KB) werden erst
// geladen, wenn die Sektion geöffnet wird — verkleinert das Start-Bundle massiv.
const PeptidesPage = lazy(() => import('./library/PeptidesPage'));
const DietsPage = lazy(() => import('./library/DietsPage'));
const TrainingKnowledgePage = lazy(() => import('./library/TrainingKnowledgePage'));
const NutritionKnowledgePage = lazy(() => import('./library/NutritionKnowledgePage'));
const SupplementsKnowledgePage = lazy(() => import('./library/SupplementsKnowledgePage'));
const BloodworkKnowledgePage = lazy(() => import('./library/BloodworkKnowledgePage'));

function SectionLoader() {
  return (
    <div className="flex items-center justify-center pt-40">
      <Loader2 className="w-6 h-6 text-primary-400 animate-spin" />
    </div>
  );
}

export default function LibraryPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { requirePremium } = useSubscription();
  const [view, setView] = useState('home');

  if (view === 'training') {
    return (
      <Suspense fallback={<SectionLoader />}>
        <TrainingKnowledgePage onBack={() => setView('home')} />
      </Suspense>
    );
  }

  if (view === 'nutrition') {
    return (
      <Suspense fallback={<SectionLoader />}>
        <NutritionKnowledgePage onBack={() => setView('home')} />
      </Suspense>
    );
  }

  if (view === 'supplements') {
    return (
      <Suspense fallback={<SectionLoader />}>
        <SupplementsKnowledgePage onBack={() => setView('home')} />
      </Suspense>
    );
  }

  if (view === 'bloodwork') {
    return (
      <Suspense fallback={<SectionLoader />}>
        <BloodworkKnowledgePage onBack={() => setView('home')} />
      </Suspense>
    );
  }

  if (view === 'peptides') {
    return (
      <Suspense fallback={<SectionLoader />}>
        <PeptidesPage onBack={() => setView('home')} />
      </Suspense>
    );
  }

  if (view === 'diets') {
    return (
      <Suspense fallback={<SectionLoader />}>
        <DietsPage onBack={() => setView('home')} />
      </Suspense>
    );
  }

  // Unfertige Sektionen (training, nutrition, supplements, bloodwork) sind bis
  // zum Fertigstellen ausgeblendet — halbleere "Bald"-Kacheln wirken unfertig.
  const sections = [
    { id: 'training', icon: <img src="/bg-photos/training-icon.png" alt="" aria-hidden="true" className="h-7 w-auto object-contain" />, motif: '/bg-photos/training-icon.png', label: t('library.training'), color: 'bg-blue-100 dark:bg-blue-900/30', ready: true },
    { id: 'nutrition', icon: <img src="/bg-photos/flame-icon.png" alt="" aria-hidden="true" className="h-7 w-auto object-contain" />, motif: '/bg-photos/flame-icon.png', label: t('library.nutrition'), color: 'bg-red-100 dark:bg-red-900/30', ready: true },
    { id: 'supplements', icon: <img src="/bg-photos/supplement-icon.png" alt="" aria-hidden="true" className="h-7 w-auto object-contain" />, motif: '/bg-photos/supplement-icon.png', label: t('library.supplements'), color: 'bg-green-100 dark:bg-green-900/30', ready: true },
    { id: 'bloodwork', icon: <img src="/bg-photos/drop-icon.png" alt="" aria-hidden="true" className="h-7 w-auto object-contain" />, motif: '/bg-photos/drop-icon.png', label: t('library.bloodwork'), color: 'bg-rose-100 dark:bg-rose-900/30', ready: true },
    { id: 'diets', icon: <img src="/bg-photos/weight-icon.png" alt="" aria-hidden="true" className="h-7 w-auto object-contain" />, motif: '/bg-photos/weight-icon.png', label: t('library.diets'), color: 'bg-orange-100 dark:bg-orange-900/30', ready: true },
    { id: 'peptides', icon: <img src="/bg-photos/peptide-icon.png" alt="" aria-hidden="true" className="h-7 w-auto object-contain" />, motif: '/bg-photos/peptide-icon.png', label: t('library.peptides'), color: 'bg-amber-100 dark:bg-amber-900/30', ready: true },
  ].filter((s) => s.ready);

  return (
    <div className="p-4 pt-16 pb-24">
      <div className="flex flex-col items-center pt-12 mb-6">
        <MyPeakLogo size={36} />
        <h1 className="text-2xl font-bold mt-2">{t('library.title')}</h1>
      </div>

      {/* KI-Coach (Premium) */}
      <button
        onClick={() => { if (requirePremium('ki_coach')) navigate('/coach'); }}
        className="relative overflow-hidden w-full rounded-2xl p-4 mb-3 flex items-center gap-4 bg-gradient-to-br from-primary-400 to-primary-600 text-white shadow-lg"
      >
        <span className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-6 h-6" />
        </span>
        <div className="flex-1 text-left">
          <p className="font-semibold">{t('coach.title')}</p>
          <p className="text-xs text-white/80">{t('coach.subtitle')}</p>
        </div>
        <ChevronRight className="w-5 h-5 text-white/70" />
      </button>

      <div className="flex flex-col gap-3">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => section.ready ? setView(section.id) : null}
            className={`relative overflow-hidden bg-white dark:bg-surface-dark-alt rounded-2xl p-4 flex items-center gap-4 shadow-soft border border-slate-100 dark:border-slate-800/60 hover:shadow-md transition-shadow text-left ${!section.ready ? 'opacity-50' : ''}`}
          >
            <CardPhotoMotif src={section.motif} />
            <span className={`rounded-xl p-3 ${section.color}`}>{section.icon}</span>
            <span className="font-medium text-lg flex-1">{section.label}</span>
            {section.ready && <ChevronRight className="w-5 h-5 text-slate-300 dark:text-slate-600" />}
            {!section.ready && <span className="text-xs text-slate-400 dark:text-slate-500 italic">Bald</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
