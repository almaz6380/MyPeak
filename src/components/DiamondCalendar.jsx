import { useRef, useEffect, useState, useCallback } from 'react';
import { Calendar } from 'lucide-react';

const DAY_LABELS_DE = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
const DAY_LABELS_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const ITEM_WIDTH = 52; // width per diamond slot
const CENTER_SIZE = 44;
const MIN_SIZE = 22;

export default function DiamondCalendar({ selectedDay, onSelectDay, scheduledDays, completedDays, year, month, lang = 'de', onOpenCalendar }) {
  const scrollRef = useRef(null);
  const isScrollingRef = useRef(false);
  const snapTimerRef = useRef(null);
  const [scrollCenter, setScrollCenter] = useState(0);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const dayLabels = lang === 'de' ? DAY_LABELS_DE : DAY_LABELS_EN;

  const monthName = new Date(year, month).toLocaleDateString(
    lang === 'de' ? 'de-DE' : 'en-US',
    { month: 'long' }
  );

  // Scroll to a specific day
  const scrollToDay = useCallback((day, smooth = true) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const containerCenter = container.clientWidth / 2;
    const targetLeft = (day - 1) * ITEM_WIDTH + ITEM_WIDTH / 2 - containerCenter + container.clientWidth / 2;
    // Account for left padding
    const paddingLeft = container.clientWidth / 2 - ITEM_WIDTH / 2;
    const scrollLeft = (day - 1) * ITEM_WIDTH;
    container.scrollTo({ left: scrollLeft, behavior: smooth ? 'smooth' : 'instant' });
  }, []);

  // Initial scroll
  useEffect(() => {
    scrollToDay(selectedDay, false);
  }, []);

  // Update on selectedDay change (from calendar picker)
  useEffect(() => {
    scrollToDay(selectedDay, true);
  }, [selectedDay, scrollToDay]);

  // Handle scroll — update sizes in real-time + snap to nearest day
  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const center = container.scrollLeft + container.clientWidth / 2 - container.clientWidth / 2 + ITEM_WIDTH / 2;
    setScrollCenter(container.scrollLeft);

    // Snap to nearest day after scroll ends
    clearTimeout(snapTimerRef.current);
    snapTimerRef.current = setTimeout(() => {
      const nearestDay = Math.round(container.scrollLeft / ITEM_WIDTH) + 1;
      const clamped = Math.max(1, Math.min(daysInMonth, nearestDay));
      if (clamped !== selectedDay) {
        onSelectDay(clamped);
      }
      // Snap scroll position
      const targetScroll = (clamped - 1) * ITEM_WIDTH;
      if (Math.abs(container.scrollLeft - targetScroll) > 2) {
        container.scrollTo({ left: targetScroll, behavior: 'smooth' });
      }
    }, 80);
  }, [daysInMonth, onSelectDay, selectedDay]);

  function getDiamondColor(day) {
    if (completedDays.has(day)) return 'bg-primary-500';
    if (scheduledDays.has(day)) return 'bg-blue-500';
    return 'bg-slate-700 dark:bg-slate-700';
  }

  function getDiamondStyle(day) {
    if (!scrollRef.current) {
      const diff = Math.abs(day - selectedDay);
      const t = Math.max(0, 1 - diff * 0.2);
      const size = MIN_SIZE + (CENTER_SIZE - MIN_SIZE) * t;
      const offsetY = (1 - t) * 16;
      return { size, offsetY, opacity: 0.3 + t * 0.7 };
    }

    const container = scrollRef.current;
    const containerCenter = container.scrollLeft + container.clientWidth / 2;
    const itemCenter = (day - 1) * ITEM_WIDTH + ITEM_WIDTH / 2 + (container.clientWidth / 2 - ITEM_WIDTH / 2);
    const distance = Math.abs(containerCenter - itemCenter);
    const maxDist = container.clientWidth / 2;
    const t = Math.max(0, 1 - distance / maxDist);
    const size = MIN_SIZE + (CENTER_SIZE - MIN_SIZE) * Math.pow(t, 0.8);
    const offsetY = (1 - Math.pow(t, 0.6)) * 18;
    const opacity = 0.25 + t * 0.75;

    return { size, offsetY, opacity };
  }

  const date = new Date(year, month, selectedDay);
  const selectedDayName = dayLabels[date.getDay()];

  return (
    <div className="mb-4">
      {/* Month label + calendar button */}
      <div className="flex items-center justify-center gap-2 mb-3">
        <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">{monthName} {year}</p>
        {onOpenCalendar && (
          <button onClick={onOpenCalendar} className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
          </button>
        )}
      </div>

      {/* Diamond scroll area — fixed height, no vertical scroll */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex items-end overflow-x-auto scrollbar-hide overscroll-x-contain touch-pan-x"
        style={{ height: 72, overflowY: 'hidden' }}
      >
        {/* Left padding */}
        <div className="flex-shrink-0" style={{ width: `calc(50% - ${ITEM_WIDTH / 2}px)` }} />

        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const { size, offsetY, opacity } = getDiamondStyle(day);
          const color = getDiamondColor(day);

          return (
            <button
              key={day}
              onClick={() => { onSelectDay(day); scrollToDay(day); }}
              className="flex-shrink-0 flex items-center justify-center"
              style={{ width: ITEM_WIDTH, height: 72, paddingTop: offsetY, opacity }}
            >
              <div
                className={`${color} flex items-center justify-center`}
                style={{
                  width: size,
                  height: size,
                  transform: 'rotate(45deg)',
                  borderRadius: Math.max(4, size * 0.15),
                }}
              >
                <span
                  className="font-bold text-white"
                  style={{ transform: 'rotate(-45deg)', fontSize: Math.max(9, size * 0.3) }}
                >
                  {day}
                </span>
              </div>
            </button>
          );
        })}

        {/* Right padding */}
        <div className="flex-shrink-0" style={{ width: `calc(50% - ${ITEM_WIDTH / 2}px)` }} />
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
