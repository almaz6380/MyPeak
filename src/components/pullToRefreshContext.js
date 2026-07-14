import { createContext, useContext } from 'react';

export const PullToRefreshContext = createContext(null);

// Steigt bei jedem Pull-to-Refresh. App.jsx hängt den Routen-Baum daran, damit
// die Seite ihre Daten neu lädt — ohne die WebView neu zu starten (weißer Blitz).
export function useRefreshKey() {
  return useContext(PullToRefreshContext)?.refreshKey ?? 0;
}
