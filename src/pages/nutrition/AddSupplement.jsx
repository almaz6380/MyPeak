import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Check, Pill } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { saveSupplement, updateSupplement } from '../../data/supplementStorage';

const FORMS = ['tablet', 'powder', 'liquid'];
const UNITS = ['Stück', 'mg', 'g', 'ml', 'IU'];
const DAY_KEYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const TIME_SLOTS = ['morning', 'midday', 'pre_workout', 'post_workout', 'evening'];

const FORM_EMOJIS = { tablet: '💊', capsule: '🔵', powder: '🥄', liquid: '💧' };

export default function AddSupplement({ onBack, onSaved, editSupplement }) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const isEditing = !!editSupplement;

  const [name, setName] = useState(editSupplement?.name || '');
  const [brand, setBrand] = useState(editSupplement?.brand || '');
  const [form, setForm] = useState(editSupplement?.form || 'tablet');
  const [dosageAmount, setDosageAmount] = useState(editSupplement?.dosage_amount?.toString() || '1');
  const [dosageUnit, setDosageUnit] = useState(editSupplement?.dosage_unit || 'Stück');
  const [notes, setNotes] = useState(editSupplement?.notes || '');
  const [schedule, setSchedule] = useState(editSupplement?.schedule || {});
  const [saving, setSaving] = useState(false);

  // Get selected time slots (union of all days)
  const selectedSlots = [...new Set(Object.values(schedule).flat())];

  function toggleDay(day) {
    setSchedule((prev) => {
      const updated = { ...prev };
      if (updated[day]) {
        delete updated[day];
      } else {
        updated[day] = selectedSlots.length > 0 ? [...selectedSlots] : ['morning'];
      }
      return updated;
    });
  }

  function toggleTimeSlot(slot) {
    setSchedule((prev) => {
      const updated = {};
      for (const [day, slots] of Object.entries(prev)) {
        if (slots.includes(slot)) {
          const filtered = slots.filter((s) => s !== slot);
          if (filtered.length > 0) {
            updated[day] = filtered;
          } else {
            updated[day] = filtered; // Keep day but empty — will be cleaned
          }
        } else {
          updated[day] = [...slots, slot];
        }
      }
      // Clean empty days
      const cleaned = {};
      for (const [day, slots] of Object.entries(updated)) {
        if (slots.length > 0) cleaned[day] = slots;
      }
      return cleaned;
    });
  }

  function selectAllDays() {
    const slots = selectedSlots.length > 0 ? [...selectedSlots] : ['morning'];
    const all = {};
    DAY_KEYS.forEach((d) => { all[d] = [...slots]; });
    setSchedule(all);
  }

  async function handleSave() {
    if (!name.trim()) return;
    setSaving(true);

    const data = {
      name: name.trim(),
      brand: brand.trim() || null,
      form,
      dosage_amount: parseFloat(dosageAmount) || 1,
      dosage_unit: dosageUnit,
      notes: notes.trim(),
      schedule,
    };

    if (isEditing) {
      await updateSupplement(user.id, editSupplement.id, data);
    } else {
      await saveSupplement(user.id, data);
    }

    setSaving(false);
    onSaved();
  }

  const activeDays = Object.keys(schedule);

  return (
    <div className="p-4 pt-16 pb-24">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="p-2 -ml-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold">
          {isEditing ? t('supplements.edit') : t('supplements.add')}
        </h1>
      </div>

      <div className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
            {t('supplements.name')}
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t('supplements.namePlaceholder')}
            className="w-full px-4 py-3.5 bg-white dark:bg-surface-dark-alt border border-slate-200 dark:border-slate-700 rounded-2xl text-base focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {/* Brand */}
        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
            {t('supplements.brand')}
          </label>
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            placeholder={t('supplements.brandPlaceholder')}
            className="w-full px-4 py-3.5 bg-white dark:bg-surface-dark-alt border border-slate-200 dark:border-slate-700 rounded-2xl text-base focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {/* Form */}
        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
            {t('supplements.form')}
          </label>
          <div className="grid grid-cols-4 gap-2">
            {FORMS.map((f) => (
              <button
                key={f}
                onClick={() => setForm(f)}
                className={`py-3 rounded-xl text-center border-2 transition-all ${
                  form === f
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark-alt'
                }`}
              >
                <span className="text-xl block mb-1">{FORM_EMOJIS[f]}</span>
                <span className={`text-xs font-medium ${form === f ? 'text-primary-600 dark:text-primary-400' : 'text-slate-600 dark:text-slate-400'}`}>
                  {t(`supplements.form_${f}`)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Dosage */}
        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
            {t('supplements.dosage')}
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              inputMode="decimal"
              value={dosageAmount}
              onChange={(e) => setDosageAmount(e.target.value)}
              className="flex-1 px-4 py-3.5 bg-white dark:bg-surface-dark-alt border border-slate-200 dark:border-slate-700 rounded-2xl text-base text-center focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <div className="flex gap-1 overflow-x-auto">
              {UNITS.map((u) => (
                <button
                  key={u}
                  onClick={() => setDosageUnit(u)}
                  className={`px-3 py-3.5 rounded-xl text-sm font-medium whitespace-nowrap border-2 transition-all ${
                    dosageUnit === u
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Schedule — Days */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-400">
              {t('supplements.scheduleDays')}
            </label>
            <button onClick={selectAllDays} className="text-xs text-primary-500 font-medium">
              {t('supplements.selectAll')}
            </button>
          </div>
          <div className="flex gap-1.5">
            {DAY_KEYS.map((day) => (
              <button
                key={day}
                onClick={() => toggleDay(day)}
                className={`flex-1 py-3 rounded-xl text-center text-xs font-semibold border-2 transition-all ${
                  activeDays.includes(day)
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                    : 'border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400'
                }`}
              >
                {t(`supplements.day_${day}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Schedule — Time slots */}
        {activeDays.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
              {t('supplements.scheduleSlots')}
            </label>
            <div className="space-y-2">
              {TIME_SLOTS.map((slot) => {
                const active = selectedSlots.includes(slot);
                return (
                  <button
                    key={slot}
                    onClick={() => toggleTimeSlot(slot)}
                    className={`w-full px-4 py-3 rounded-xl flex items-center justify-between border-2 transition-all ${
                      active
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark-alt'
                    }`}
                  >
                    <span className={`text-sm font-medium ${active ? 'text-primary-600 dark:text-primary-400' : 'text-slate-600 dark:text-slate-400'}`}>
                      {t(`supplements.slot_${slot}`)}
                    </span>
                    {active && <Check className="w-5 h-5 text-primary-500" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
            {t('supplements.notes')}
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={t('supplements.notesPlaceholder')}
            rows={3}
            className="w-full px-4 py-3.5 bg-white dark:bg-surface-dark-alt border border-slate-200 dark:border-slate-700 rounded-2xl text-base resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {/* Save button */}
        <button
          onClick={handleSave}
          disabled={!name.trim() || saving}
          className="w-full py-4 bg-primary-500 hover:bg-primary-600 disabled:opacity-50 text-white font-semibold rounded-2xl transition-colors"
        >
          {saving ? '...' : isEditing ? t('supplements.save') : t('supplements.add')}
        </button>
      </div>
    </div>
  );
}
