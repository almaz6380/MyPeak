import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import MuscleBodyMap from './MuscleBodyMap';
import useMuscleHeatmap, { intensityLevel } from '../../hooks/useMuscleHeatmap';

const LEGEND = [
  { label: '0', fill: null },
  { label: '1–4', fill: '#fde68a' },
  { label: '5–9', fill: '#fcd34d' },
  { label: '10–14', fill: '#fbbf24' },
  { label: '15+', fill: '#f59e0b' },
];

export default function MuscleHeatmapCard({ userId }) {
  const { t } = useTranslation();
  const { groups, totalSets, loading } = useMuscleHeatmap(userId);
  const [selected, setSelected] = useState(null);

  if (loading) return null;

  const intensities = Object.fromEntries(
    Object.entries(groups).map(([g, d]) => [g, intensityLevel(d.sets)])
  );
  const detail = selected ? groups[selected] : null;
  // Nur Regionen mit Daten sind antippbar
  const handleSelect = (group) => {
    if (groups[group]) setSelected(group);
  };

  return (
    <div className="bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-soft border border-slate-100 dark:border-slate-800/60 mb-6">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-200">{t('heatmap.title')}</h2>
        {totalSets > 0 && (
          <span className="text-xs text-slate-400">{totalSets} {t('heatmap.sets')}</span>
        )}
      </div>

      {totalSets === 0 ? (
        <p className="text-xs text-slate-400 dark:text-slate-500 py-3">{t('heatmap.empty')}</p>
      ) : (
        <>
          <div className="flex justify-center gap-2">
            <div className="w-[45%] max-w-[150px]">
              <MuscleBodyMap view="front" intensities={intensities} onSelectGroup={handleSelect} className="w-full" />
              <p className="text-center text-[10px] text-slate-400 mt-1">{t('heatmap.front')}</p>
            </div>
            <div className="w-[45%] max-w-[150px]">
              <MuscleBodyMap view="back" intensities={intensities} onSelectGroup={handleSelect} className="w-full" />
              <p className="text-center text-[10px] text-slate-400 mt-1">{t('heatmap.back')}</p>
            </div>
          </div>

          {/* Legende */}
          <div className="flex items-center justify-center gap-3 mt-2">
            <span className="text-[9px] text-slate-400">{t('heatmap.setsPerWeek')}:</span>
            {LEGEND.map((l) => (
              <span key={l.label} className="flex items-center gap-1">
                <span
                  className={`w-2.5 h-2.5 rounded-sm ${l.fill ? '' : 'bg-slate-200 dark:bg-slate-800'}`}
                  style={l.fill ? { backgroundColor: l.fill } : undefined}
                />
                <span className="text-[9px] text-slate-400">{l.label}</span>
              </span>
            ))}
          </div>

          {/* Detail zur angetippten Muskelgruppe */}
          {detail && (
            <div className="mt-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                  {t(`muscleGroups.${selected}`)}
                  <span className="ml-2 font-normal text-slate-400">
                    {detail.sets} {t('heatmap.sets')} · {Math.round(detail.volumeKg).toLocaleString()} kg
                  </span>
                </p>
                <button onClick={() => setSelected(null)} className="p-0.5 text-slate-400">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              {Object.values(detail.exercises).map((ex) => (
                <div key={ex.nameKey} className="flex items-center justify-between py-0.5">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">{t(ex.nameKey)}</span>
                  <span className="text-[11px] text-slate-400 tabular-nums">
                    {ex.sets} × · {Math.round(ex.volumeKg).toLocaleString()} kg
                  </span>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
