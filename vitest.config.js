import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Die Endpunkte sind reine Node-Serverless-Funktionen — kein DOM nötig.
    environment: 'node',
    include: ['tests/**/*.test.js'],
    restoreMocks: true,
    unstubEnvs: true,
    unstubGlobals: true,
  },
});
