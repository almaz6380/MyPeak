import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dumbbell, Apple, Pill, Droplets, Syringe, ChevronRight } from 'lucide-react';
import MyPeakLogo from '../components/MyPeakLogo';
import PeptidesPage from './library/PeptidesPage';

export default function LibraryPage() {
  const { t } = useTranslation();
  const [view, setView] = useState('home');

  if (view === 'peptides') {
    return <PeptidesPage onBack={() => setView('home')} />;
  }

  const sections = [
    { id: 'training', icon: <Dumbbell className="w-6 h-6" />, label: t('library.training'), color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400', ready: false },
    { id: 'nutrition', icon: <Apple className="w-6 h-6" />, label: t('library.nutrition'), color: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400', ready: false },
    { id: 'supplements', icon: <Pill className="w-6 h-6" />, label: t('library.supplements'), color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400', ready: false },
    { id: 'peptides', icon: <Syringe className="w-6 h-6" />, label: t('library.peptides'), color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400', ready: true },
    { id: 'bloodwork', icon: <Droplets className="w-6 h-6" />, label: t('library.bloodwork'), color: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400', ready: false },
  ];

  return (
    <div className="p-4 pt-14 pb-24">
      <div className="flex flex-col items-center pt-12 mb-6">
        <MyPeakLogo size={36} />
        <h1 className="text-2xl font-bold mt-2">{t('library.title')}</h1>
      </div>

      <div className="flex flex-col gap-3">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => section.ready ? setView(section.id) : null}
            className={`bg-white dark:bg-surface-dark-alt rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow text-left ${!section.ready ? 'opacity-50' : ''}`}
          >
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
