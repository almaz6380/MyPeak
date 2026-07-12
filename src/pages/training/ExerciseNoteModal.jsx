import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Check, Plus, Trash2, Camera, Image } from 'lucide-react';
import { saveExerciseNote } from '../../data/workoutStorage';
import { getExercisePhoto, saveExercisePhoto, deleteExercisePhoto, compressImage } from '../../data/exercisePhotos';
import { useAuth } from '../../context/AuthContext';

export default function ExerciseNoteModal({ exerciseId, exerciseName, initialNote, initialSettings, onClose, onSaved }) {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const lang = i18n.language?.startsWith('de') ? 'de' : 'en';

  const [note, setNote] = useState(initialNote || '');
  const [settings, setSettings] = useState(initialSettings || []);
  const [photo, setPhoto] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getExercisePhoto(exerciseId).then((p) => p && setPhoto(p));
  }, [exerciseId]);

  function addSetting() {
    setSettings((prev) => [...prev, { label: '', value: '' }]);
  }

  function updateSetting(index, field, value) {
    setSettings((prev) => prev.map((s, i) => i === index ? { ...s, [field]: value } : s));
  }

  function removeSetting(index) {
    setSettings((prev) => prev.filter((_, i) => i !== index));
  }

  async function handlePhotoUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const compressed = await compressImage(file);
    setPhoto(compressed);
    await saveExercisePhoto(exerciseId, compressed);
  }

  async function handleDeletePhoto() {
    setPhoto(null);
    await deleteExercisePhoto(exerciseId);
  }

  async function handleSave() {
    setSaving(true);
    const cleanSettings = settings.filter((s) => s.label.trim());
    await saveExerciseNote(user.id, exerciseId, note, cleanSettings);
    setSaving(false);
    onSaved(note, cleanSettings);
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-white dark:bg-surface-dark z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-14 pb-3 shrink-0">
        <h3 className="text-lg font-bold truncate">{exerciseName}</h3>
        <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="overflow-y-auto flex-1 px-5 space-y-4">
          {/* Free text note */}
          <div>
            <label className="text-xs font-medium text-slate-400 dark:text-slate-500 mb-1 block">
              {lang === 'de' ? 'Notiz' : 'Note'}
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={lang === 'de' ? 'z.B. Ellenbogen eng halten, langsam absenken...' : 'e.g. Keep elbows close, lower slowly...'}
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 resize-none"
            />
          </div>

          {/* Machine settings */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-medium text-slate-400 dark:text-slate-500">
                {lang === 'de' ? 'Geräte-Einstellungen' : 'Machine Settings'}
              </label>
              <button onClick={addSetting} className="text-xs text-primary-400 hover:text-primary-500 font-medium flex items-center gap-1">
                <Plus className="w-3 h-3" /> {lang === 'de' ? 'Hinzufügen' : 'Add'}
              </button>
            </div>

            {settings.length === 0 && (
              <p className="text-xs text-slate-300 dark:text-slate-600 italic">
                {lang === 'de' ? 'z.B. Sitz: 5, Rücken: 3, Gewicht-Pin: 7' : 'e.g. Seat: 5, Back: 3, Weight pin: 7'}
              </p>
            )}

            <div className="space-y-2">
              {settings.map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={s.label}
                    onChange={(e) => updateSetting(i, 'label', e.target.value)}
                    placeholder={lang === 'de' ? 'Einstellung' : 'Setting'}
                    className="flex-1 px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
                  />
                  <input
                    type="text"
                    value={s.value}
                    onChange={(e) => updateSetting(i, 'value', e.target.value)}
                    placeholder={lang === 'de' ? 'Wert' : 'Value'}
                    className="w-20 px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-center focus:outline-none focus:ring-2 focus:ring-primary-400"
                  />
                  <button onClick={() => removeSetting(i)} className="p-1.5 text-slate-300 hover:text-red-400">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Photo */}
          <div>
            <label className="text-xs font-medium text-slate-400 dark:text-slate-500 mb-2 block">
              {lang === 'de' ? 'Foto' : 'Photo'}
            </label>

            {photo ? (
              <div className="relative">
                <img src={photo} alt="Exercise" className="w-full h-40 object-cover rounded-xl" />
                <button onClick={handleDeletePhoto}
                  className="absolute top-2 right-2 p-1.5 bg-black/50 rounded-lg text-white hover:bg-red-500 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="w-full border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl py-6 flex flex-col items-center justify-center gap-2 text-slate-400 dark:text-slate-500 hover:border-primary-400 hover:text-primary-500 transition-colors cursor-pointer">
                <Camera className="w-6 h-6" />
                <span className="text-xs">{lang === 'de' ? 'Foto aufnehmen oder auswählen' : 'Take or choose photo'}</span>
                <input type="file" accept="image/*" capture="environment" onChange={handlePhotoUpload} className="hidden" />
              </label>
            )}
          </div>
        </div>

      {/* Save — fixed above bottom nav */}
      <div className="px-5 py-4 shrink-0 border-t border-slate-100 dark:border-slate-700 mb-20">
        <button onClick={handleSave} disabled={saving}
          className="w-full py-3.5 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors">
          <Check className="w-4 h-4" />
          {saving ? '...' : t('common.save')}
        </button>
      </div>
    </div>
  );
}
