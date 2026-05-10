import { useState, useRef, useCallback } from 'react';

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
      setPullDistance(THRESHOLD);
      setTimeout(() => {
        window.location.reload();
      }, 900);
    } else {
      setPullDistance(0);
    }
  }

  const progress = Math.min(1, pullDistance / THRESHOLD);
  const showIndicator = pullDistance > 10 || refreshing;

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative"
    >
      {/* Pull indicator */}
      {showIndicator && (
        <div
          className="fixed top-0 left-0 right-0 flex items-center justify-center z-[100] pointer-events-none"
          style={{ height: `${pullDistance}px` }}
        >
          <div style={{ opacity: progress, transform: `scale(${0.5 + progress * 0.5})` }}>
            <svg width="48" height="48" viewBox="0 0 512 512" fill="none">
              <polyline
                points="45,400 130,270 195,340 275,210 340,280 430,150"
                stroke="#fbbf24"
                strokeWidth="9"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="900"
                strokeDashoffset={refreshing ? undefined : 900 * (1 - progress)}
                className={refreshing ? 'ptr-line-animate' : ''}
              />
              <path
                d="M400,165 L430,150 L432,183"
                stroke="#fbbf24"
                strokeWidth="9"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={refreshing ? undefined : (progress > 0.8 ? (progress - 0.8) * 5 : 0)}
                className={refreshing ? 'ptr-arrow-animate' : ''}
              />
            </svg>
          </div>
        </div>
      )}

      {/* Content with pull offset */}
      <div
        style={{
          transform: pullDistance > 0 ? `translateY(${pullDistance}px)` : undefined,
          transition: pulling.current ? 'none' : 'transform 0.3s ease-out',
        }}
      >
        {children}
      </div>
    </div>
  );
}
