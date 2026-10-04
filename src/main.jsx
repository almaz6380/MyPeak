import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import './i18n'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import { SubscriptionProvider } from './context/SubscriptionContext'
import ErrorBoundary from './components/ErrorBoundary'
import App from './App.jsx'
import { initAds } from './lib/ads'

// ⚠ VOR dem Rendern. Gemessen am 20.09.2026: Wirft der Supabase-Client beim
// Start (etwa weil die Umgebungsvariablen fehlen), bleibt die Seite weiss —
// und stand der Aufruf hinter `render()`, wurde der Besuch nicht einmal
// gezählt. Ausgerechnet die kaputten Ladevorgänge fehlten damit in der
// Statistik, also die, die man am dringendsten sehen will.

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <SubscriptionProvider>
              <App />
            </SubscriptionProvider>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
)

// Werbung (nur nativ) initialisieren — inkl. DSGVO-Einwilligung.
// Verzögert, damit der App-Start nicht blockiert wird.
setTimeout(() => { initAds(); }, 1500);

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}

// Fehler-Monitoring: nur aktiv, wenn VITE_SENTRY_DSN gesetzt ist.
// Dynamischer Import → Sentry landet in einem eigenen Chunk und wird ohne DSN nie geladen.
if (import.meta.env.VITE_SENTRY_DSN) {
  import('@sentry/react').then((Sentry) => {
    Sentry.init({
      dsn: import.meta.env.VITE_SENTRY_DSN,
      environment: import.meta.env.MODE,
      // Nur Fehler, kein Performance-Tracing/Replay — hält das freie Kontingent klein
      tracesSampleRate: 0,
      sendDefaultPii: false,
    });
  }).catch(() => {});
}

// Nach einem Deploy können lazy geladene Chunks mit altem Hash 404en —
// einmaliges Neuladen holt das frische index.html (Schleifen-Schutz via sessionStorage)
window.addEventListener('vite:preloadError', (event) => {
  if (!sessionStorage.getItem('chunk-reload')) {
    sessionStorage.setItem('chunk-reload', '1');
    event.preventDefault();
    window.location.reload();
  }
});
