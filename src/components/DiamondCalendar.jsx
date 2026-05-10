import { useRef, useEffect, useState, useCallback } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const DAY_LABELS_DE = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
const DAY_LABELS_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function DiamondCalendar({ selectedDay, onSelectDay, scheduledDays, completedDays, year, month, lang = 'de', onOpenCalendar }) {
  const containerRef = useRef(null);
  const startXRef = useRef(0);
  const lastDayRef = useRef(selectedDay);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const dayLabels = lang === 'de' ? DAY_LABELS_DE : DAY_LABELS_EN;

  const monthName = new Date(year, month).toLocaleDateString(
    lang === 'de' ? 'de-DE' : 'en-US',
    { month: 'long' }
  );

  // Vibrate on day change
  function vibrate() {
    if (navigator.vibrate) navigator.vibrate(10);
  }

  // Touch swipe handling
  function handleTouchStart(e) {
    startXRef.current = e.touches[0].clientX;
  }

  function handleTouchMove(e) {
    const diff = startXRef.current - e.touches[0].clientX;
    const threshold = 30;

    if (Math.abs(diff) >= threshold) {
      const direction = diff > 0 ? 1 : -1; // right swipe = -1 (prev), left swipe = +1 (next)
      const newDay = Math.max(1, Math.min(daysInMonth, selectedDay + direction));
      if (newDay !== selectedDay) {
        vibrate();
        onSelectDay(newDay);
      }
      startXRef.current = e.touches[0].clientX; // Reset so next swipe step works
    }
  }

  function getDiamondColor(day) {
    if (completedDays.has(day)) return 'bg-primary-500';
    if (scheduledDays.has(day)) return 'bg-blue-500';
    return 'bg-slate-700';
  }

  function getDiamondProps(day) {
    const diff = Math.abs(day - selectedDay);
    if (diff === 0) return { size: 48, offset: 0, opacity: 1, fontSize: 15 };
    if (diff === 1) return { size: 38, offset: 6, opacity: 0.85, fontSize: 12 };
    if (diff === 2) return { size: 30, offset: 12, opacity: 0.6, fontSize: 10 };
    if (diff === 3) return { size: 24, offset: 16, opacity: 0.4, fontSize: 9 };
    return { size: 20, offset: 18, opacity: 0.25, fontSize: 8 };
  }

  // Show 9 diamonds centered on selectedDay
  const visibleRange = 4;
  const visibleDays = [];
  for (let i = -visibleRange; i <= visibleRange; i++) {
    const day = selectedDay + i;
    if (day >= 1 && day <= daysInMonth) {
      visibleDays.push(day);
    }
  }

  const date = new Date(year, month, selectedDay);
  const selectedDayName = dayLabels[date.getDay()];

  return (
    <div className="mb-4">
      {/* Month label + navigation */}
      <div className="flex items-center justify-center gap-3 mb-3">
        <button
          onClick={() => { const nd = Math.max(1, selectedDay - 1); if (nd !== selectedDay) { vibrate(); onSelectDay(nd); } }}
          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <ChevronLeft className="w-4 h-4 text-slate-400" />
        </button>
        <button
          onClick={onOpenCalendar}
          className="flex items-center gap-1.5 px-3 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <Calendar className="w-3.5 h-3.5 text-primary-500" />
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 capitalize">{monthName} {year}</span>
        </button>
        <button
          onClick={() => { const nd = Math.min(daysInMonth, selectedDay + 1); if (nd !== selectedDay) { vibrate(); onSelectDay(nd); } }}
          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>
      </div>

      {/* Diamond row — touch swipe area */}
      <div
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        className="flex items-end justify-center gap-0 touch-pan-x select-none"
        style={{ height: 70, overflowY: 'hidden' }}
      >
        {visibleDays.map((day) => {
          const { size, offset, opacity, fontSize } = getDiamondProps(day);
          const color = getDiamondColor(day);
          const isSelected = day === selectedDay;

          return (
            <button
              key={day}
              onClick={() => { if (day !== selectedDay) { vibrate(); onSelectDay(day); } }}
              className="flex-shrink-0 flex items-center justify-center"
              style={{
                width: 52,
                height: 70,
                paddingTop: offset,
                opacity,
                transition: 'all 0.15s ease-out',
              }}
            >
              <div
                className={`${color} flex items-center justify-center ${isSelected ? 'shadow-lg' : ''}`}
                style={{
                  width: size,
                  height: size,
                  transform: 'rotate(45deg)',
                  borderRadius: Math.max(4, size * 0.15),
                  transition: 'all 0.15s ease-out',
                }}
              >
                <span
                  className="font-bold text-white"
                  style={{ transform: 'rotate(-45deg)', fontSize, transition: 'font-size 0.15s ease-out' }}
                >
                  {day}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected day info */}
      <div className="text-center mt-1">
        <p className="text-sm font-semibold text-slate-900 dark:text-white">
          {selectedDayName}, {selectedDay}. {monthName}
        </p>
      </div>
    </div>
  );
}
