import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { datumsLocale } from '../../lib/datumsformat';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, Trash2, X, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { saveProgressPhoto, getProgressPhotos, deleteProgressPhoto, compressImage } from '../../data/exercisePhotos';
import { getWeightEntries } from '../../data/weightStorage';
import { todayLocal } from '../../lib/dateUtils';
import { appSprache } from '../../lib/sprache';

function formatDate(dateStr, lang) {
  return new Date(dateStr + 'T12:00:00').toLocaleDateString(datumsLocale(lang), {
    day: 'numeric', month: 'short', year: 'numeric',
  });
}

export default function ProgressPhotosPage() {
  const { t, i18n } = useTranslation();
  const lang = appSprache(i18n.language);
  const navigate = useNavigate();
  const { user } = useAuth();
  const fileInputRef = useRef(null);

  const [photos, setPhotos] = useState([]);
  const [selected, setSelected] = useState([]); // ids für Vergleich (max 2)
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    getProgressPhotos().then(setPhotos);
  }, []);

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = '';
    try {
      const base64 = await compressImage(file, 1080, 0.7);
      // Gewicht als Snapshot: letzter Eintrag bis heute
      let weightKg = null;
      try {
        const entries = await getWeightEntries(user?.id || 'guest');
        const today = todayLocal();
        const past = entries.filter((w) => w.date <= today);
        if (past.length > 0) weightKg = past[past.length - 1].weight_kg;
      } catch {}
      await saveProgressPhoto({ date: todayLocal(), base64, weightKg });
      setPhotos(await getProgressPhotos());
    } catch (err) {
      console.error('Progress photo failed:', err);
    }
  }

  function toggleSelect(id) {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 2) return [prev[1], id];
      return [...prev, id];
    });
  }

  async function handleDelete(id) {
    await deleteProgressPhoto(id);
    setPhotos(await getProgressPhotos());
    setSelected((prev) => prev.filter((x) => x !== id));
    setConfirmDelete(null);
  }

  // Vergleich: chronologisch ordnen (älteres links)
  const compare = selected.length === 2
    ? [...selected].map((id) => photos.find((p) => p.id === id)).filter(Boolean).sort((a, b) => a.date.localeCompare(b.date))
    : null;

  const weightDelta = compare && compare[0].weightKg != null && compare[1].weightKg != null
    ? Math.round((compare[1].weightKg - compare[0].weightKg) * 10) / 10
    : null;
  const daysBetween = compare
    ? Math.round((new Date(compare[1].date) - new Date(compare[0].date)) / 86400000)
    : 0;

  return (
    <div className="p-4 pt-16 pb-24">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => navigate(-1)} className="p-2 -ms-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold">{t('progressPhotos.title')}</h1>
      </div>

      {/* Privacy-Hinweis */}
      <div className="flex items-start gap-2 bg-slate-50 dark:bg-slate-800/50 rounded-xl px-3 py-2.5 mb-4">
        <Lock className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" />
        <p className="text-[11px] text-slate-500 dark:text-slate-400">{t('progressPhotos.privacy')}</p>
      </div>

      {/* Vergleichsansicht */}
      {compare && (
        <div className="bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-soft border border-slate-100 dark:border-slate-800/60 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-200">{t('progressPhotos.compare')}</h2>
            <button onClick={() => setSelected([])} className="p-1 text-slate-400">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {compare.map((p) => (
              <div key={p.id}>
                <img src={p.base64} alt="" className="w-full aspect-[3/4] object-cover rounded-xl" />
                <p className="text-center text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">
                  {formatDate(p.date, lang)}
                  {p.weightKg != null && <span className="font-semibold"> · {p.weightKg} kg</span>}
                </p>
              </div>
            ))}
          </div>
          {((weightDelta != null && weightDelta !== 0) || daysBetween > 0) && (
            <div className="flex justify-center mt-3">
              <span className="px-3 py-1.5 rounded-full bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 text-xs font-bold text-primary-600 dark:text-primary-400">
                {weightDelta != null && weightDelta !== 0 && `${weightDelta > 0 ? '+' : ''}${weightDelta} kg`}
                {weightDelta != null && weightDelta !== 0 && daysBetween > 0 && ' · '}
                {daysBetween > 0 && `${daysBetween} ${t('progressPhotos.days')}`}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Foto aufnehmen */}
      <input ref={fileInputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFile} />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="w-full bg-gradient-to-b from-primary-400 to-primary-500 text-white rounded-2xl py-3.5 font-semibold flex items-center justify-center gap-2 shadow-md shadow-primary-500/25 mb-4"
      >
        <Camera className="w-5 h-5" />
        {t('progressPhotos.takePhoto')}
      </button>

      {photos.length === 0 ? (
        <p className="text-center text-sm text-slate-400 dark:text-slate-500 py-10">{t('progressPhotos.empty')}</p>
      ) : (
        <>
          {photos.length >= 2 && selected.length < 2 && (
            <p className="text-[11px] text-slate-400 dark:text-slate-500 mb-2">{t('progressPhotos.selectHint')}</p>
          )}
          <div className="grid grid-cols-3 gap-2">
            {photos.map((p) => (
              <div
                key={p.id}
                role="button"
                tabIndex={0}
                onClick={() => toggleSelect(p.id)}
                className={`relative rounded-xl overflow-hidden cursor-pointer ${selected.includes(p.id) ? 'ring-2 ring-primary-400' : ''}`}
              >
                <img src={p.base64} alt="" className="w-full aspect-[3/4] object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-1.5 pb-1 pt-4">
                  <p className="text-[9px] text-white leading-tight">
                    {formatDate(p.date, lang)}
                    {p.weightKg != null && <span className="block font-semibold">{p.weightKg} kg</span>}
                  </p>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); setConfirmDelete(p.id); }}
                  className="absolute top-1 end-1 p-1 rounded-lg bg-black/50 text-white/80"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Lösch-Bestätigung */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6" onClick={() => setConfirmDelete(null)}>
          <div className="bg-white dark:bg-surface-dark-alt rounded-2xl p-5 w-full max-w-xs shadow-xl" onClick={(e) => e.stopPropagation()}>
            <p className="text-sm text-slate-700 dark:text-slate-200 mb-4">{t('progressPhotos.deleteConfirm')}</p>
            <div className="flex gap-2">
              <button onClick={() => setConfirmDelete(null)} className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm font-semibold text-slate-600 dark:text-slate-300">
                {t('common.cancel')}
              </button>
              <button onClick={() => handleDelete(confirmDelete)} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold">
                {t('common.delete')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
