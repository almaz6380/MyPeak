import { useState, useRef, useCallback, createContext } from 'react';

export const PullToRefreshContext = createContext(null);

const THRESHOLD = 80;
const MAX_PULL = 120;

export default function PullToRefresh({ children }) {
  const [pullDistance, setPullDistance] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
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
      setRefreshing(true);
      setPullDistance(0);
      setTimeout(() => {
        window.location.reload();
      }, 900);
    } else {
      setPullDistance(0);
    }
  }

  return (
    <PullToRefreshContext.Provider value={{ refreshing }}>
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {children}
      </div>
    </PullToRefreshContext.Provider>
  );
}
