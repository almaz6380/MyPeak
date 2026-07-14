import { useState, useRef, useCallback } from 'react';
import { RefreshCw } from 'lucide-react';
import { PullToRefreshContext } from './pullToRefreshContext';

const THRESHOLD = 80;
const MAX_PULL = 120;

export default function PullToRefresh({ children, onRefresh }) {
  const [pullDistance, setPullDistance] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const startY = useRef(0);
  const pulling = useRef(false);

  const isAtTop = useCallback(() => {
    return window.scrollY <= 0;
  }, []);

  function handleTouchStart(e) {
    if (refreshing) return;
    if (isAtTop()) {
      startY.current = e.touches[0].clientY;
      pulling.current = true;
    }
  }

  function handleTouchMove(e) {
    if (!pulling.current || refreshing) return;
    if (!isAtTop()) {
      pulling.current = false;
      setPullDistance(0);
      return;
    }

    const currentY = e.touches[0].clientY;
    const diff = currentY - startY.current;

    if (diff > 0) {
      const dampened = Math.min(MAX_PULL, diff * 0.4);
      setPullDistance(dampened);
    }
  }

  function handleTouchEnd() {
    if (!pulling.current || refreshing) return;
    pulling.current = false;

    if (pullDistance >= THRESHOLD) {
      // Kein window.location.reload() mehr — das lud die ganze WebView neu und
      // blitzte dabei kurz weiß auf. Jetzt laden nur die Daten der Seite neu.
      setRefreshing(true);
      setPullDistance(0);
      setRefreshKey((k) => k + 1);
      onRefresh?.();
      // Kurz stehen lassen, damit die Logo-Animation sichtbar durchläuft.
      setTimeout(() => setRefreshing(false), 900);
    } else {
      setPullDistance(0);
    }
  }

  const progress = Math.min(1, pullDistance / THRESHOLD);
  const visible = refreshing || pullDistance > 0;

  return (
    <PullToRefreshContext.Provider value={{ refreshing, refreshKey }}>
      {/* Der Indikator schwebt über dem Inhalt. Der Inhalt selbst wird NICHT
          verschoben — ein Transform auf dem Wrapper würde die fixed-Modals
          der Seiten aus der Verankerung reißen. */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-40 flex justify-center pointer-events-none"
        style={{
          opacity: visible ? 1 : 0,
          transform: `translateY(${refreshing ? 16 : pullDistance * 0.5}px)`,
          // Während des Ziehens folgt der Indikator dem Finger ohne Nachlauf,
          // beim Loslassen federt er zurück.
          transition: pullDistance > 0 ? 'none' : 'transform 220ms ease-out, opacity 220ms ease-out',
        }}
      >
        <div className="mt-2 rounded-full bg-white dark:bg-surface-dark-alt shadow-soft border border-slate-100 dark:border-slate-800/60 p-2">
          <RefreshCw
            className={`w-5 h-5 text-primary-500 ${refreshing ? 'animate-spin' : ''}`}
            style={{
              transform: refreshing ? undefined : `rotate(${progress * 270}deg)`,
              opacity: 0.4 + progress * 0.6,
            }}
          />
        </div>
      </div>

      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      >
        {children}
      </div>
    </PullToRefreshContext.Provider>
  );
}
