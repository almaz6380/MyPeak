import { useTranslation } from 'react-i18next';
import { BookOpen, Dumbbell, Apple, Pill, Droplets } from 'lucide-react';
import MyPeakLogo from '../components/MyPeakLogo';

export default function LibraryPage() {
  const { t } = useTranslation();

  const sections = [
    { icon: <Dumbbell className="w-6 h-6" />, label: t('library.training'), color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' },
    { icon: <Apple className="w-6 h-6" />, label: t('library.nutrition'), color: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' },
    { icon: <Pill className="w-6 h-6" />, label: t('library.supplements'), color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' },
    { icon: <Droplets className="w-6 h-6" />, label: t('library.bloodwork'), color: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' },
  ];

  return (
    <div className="p-4 pb-24">
      <div className="flex flex-col items-center pt-4 mb-6">
        <MyPeakLogo size={36} />
        <h1 className="text-2xl font-bold mt-2">{t('library.title')}</h1>
      </div>

      <div className="flex flex-col gap-3">
        {sections.map((section) => (
          <button
            key={section.label}
            className="bg-white dark:bg-surface-dark-alt rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow text-left"
          >
            <span className={`rounded-xl p-3 ${section.color}`}>{section.icon}</span>
            <span className="font-medium text-lg">{section.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
