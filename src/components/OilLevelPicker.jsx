import { useTranslation } from 'react-i18next';
import { Droplets } from 'lucide-react';

const levels = [
  { key: 'wenig', iconSize: 'w-3.5 h-3.5' },
  { key: 'normal', iconSize: 'w-4 h-4' },
  { key: 'viel', iconSize: 'w-5 h-5' },
];

export default function OilLevelPicker({ value = 'normal', onChange }) {
  const { t } = useTranslation();

  return (
    <div>
      <p className="text-xs font-medium text-slate-400 dark:text-slate-500 mb-2">
        {t('nutrition.oilLevel')}
      </p>
      <div className="flex gap-2">
        {levels.map(({ key, iconSize }) => {
          const isActive = value === key;
          return (
            <button
              key={key}
              onClick={() => onChange(key)}
              className={`flex-1 flex flex-col items-center gap-1 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                isActive
                  ? 'bg-primary-500 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
              }`}
            >
              <Droplets className={iconSize} />
              {t(`nutrition.oil_${key}`)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
