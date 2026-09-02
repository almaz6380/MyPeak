import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  // ⚠ Alle drei Pfade sind DASSELBE gebaute Bündel. `npx cap sync` kopiert
  // `dist/` nach `ios/App/App/public/` und `android/app/src/main/assets/public/`
  // — beide Kopien sind gitignored, waren aber nicht eslint-ignored.
  //
  // Folge: `npm run lint` meldete auf einem frischen Klon ~129 Probleme und
  // nach dem ersten `cap sync` 1332, ohne dass sich eine Zeile Quelltext
  // geändert hätte (minifizierter Code löst massenhaft no-unused-vars,
  // no-empty, no-fallthrough aus). Damit war die Regel „es dürfen keine neuen
  // dazukommen" nicht mehr prüfbar: Der Zähler hing daran, ob jemand vorher
  // gebaut hatte.
  globalIgnores([
    'dist',
    'ios/App/App/public',
    'android/app/src/main/assets/public',
  ]),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
  {
    // Vercel Serverless Functions laufen in Node, nicht im Browser
    files: ['api/**/*.js'],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    // Die Endpunkt-Tests laufen ebenfalls in Node (vitest, environment: 'node').
    files: ['tests/**/*.js', 'vitest.config.js'],
    languageOptions: {
      globals: globals.node,
    },
  },
])
