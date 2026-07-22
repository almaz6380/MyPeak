import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  // Reverse-Domain nach Betreiber Josef Gallab (Konvention wie at.gallab.swaply)
  appId: 'at.gallab.mypeak',
  appName: 'MyPeak',
  webDir: 'dist',
  backgroundColor: '#f6f4f0',
  plugins: {
    // @capacitor-community/safe-area übernimmt die Edge-to-Edge-Insets
    // (Android-System-/Navigationsleiste). Dazu Capacitors eigenes
    // SystemBars-Inset-Handling deaktivieren, damit das Plugin greift.
    SystemBars: {
      insetsHandling: 'disable',
    },
  },
};

export default config;
