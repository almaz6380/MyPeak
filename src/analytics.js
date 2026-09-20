// Besucherzählung — AUSSCHLIESSLICH für die Web-Fassung (Vercel Web Analytics).
//
// Angelegt am 20.09.2026, nachdem im Vercel-Dashboard für fullrep.vercel.app
// weiterhin die Seite „Get Started" stand: gezählt wurde also nie etwas.
// Mahjong Royale hat dieselbe Datei seit Längerem; hier ist sie übernommen,
// samt der beiden Sperren, die den Unterschied ausmachen.
//
// ⚠ Die eine Regel, an der alles hängt: **nicht in der nativen App laden.**
// Capacitor kopiert das fertige Web-Bundle unverändert nach ios/ und android/
// (`npx cap sync`) — ohne die Sperre unten würden also auch die Store-Apps
// Aufrufe absetzen. Das wäre eine neue Datenweitergabe und müsste in den
// Datenschutzangaben BEIDER Stores stehen („App Privacy" bei Apple, „Data
// safety" bei Play). Die App selbst bleibt bewusst frei von eigener Analytik;
// gezählt wird nur die Seite unter fullrep.vercel.app.
//
// Was Vercel liefert: Besucher und Seitenaufrufe im Zeitverlauf, Herkunft
// (Referrer — also z. B. Instagram/TikTok), Land, Gerät und Browser.
// Cookiefrei und ohne geräteübergreifende Kennung, deshalb ist kein
// Zustimmungsbanner nötig. Genannt ist es trotzdem in der
// Datenschutzerklärung (`src/pages/legal/legalContent.js` und die
// Übersetzungen) — eine neue Verarbeitung gehört dort hinein, ob sie eine
// Einwilligung braucht oder nicht.
//
// ⚠ Sichtbar wird das erst, wenn im Vercel-Projekt unter Analytics der
// Schalter umgelegt ist. Vorher liefert `/_vercel/insights/` einen 404 und es
// wird schlicht nichts gezählt — genau der Zustand, den der Screenshot zeigte.
import { Capacitor } from '@capacitor/core'
import { inject } from '@vercel/analytics'

export function initAnalytics() {
  if (Capacitor.isNativePlatform()) return
  // Das Zählskript liegt unter /_vercel/insights/script.js und existiert nur
  // auf einem Vercel-Deployment. Lokal (npm run dev / vite preview) liefe es
  // ins Leere und würde die Konsole mit 404ern zumüllen.
  const host = location.hostname
  if (host === 'localhost' || host === '127.0.0.1' || host === '::1' || host === '') return
  inject()
}
