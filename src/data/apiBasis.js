import { Capacitor } from '@capacitor/core';

// Basis-Adresse fuer unsere /api-Endpunkte (Cloudflare Pages Functions, bis
// 03.10.2026 Vercel — dort ist das Konto gesperrt).
//
// ⚠ Im Browser ist '' richtig: Die Web-App laeuft auf derselben Domain wie die
// Funktionen, ein relativer Pfad trifft. In der NATIVEN App ist die Herkunft
// aber capacitor://localhost (iOS) bzw. https://localhost (Android) — dort gibt
// es kein /api, ein relativer fetch laeuft ins Leere und der Fehler sieht wie
// „Dienst nicht erreichbar" aus. Genau daran waren KI-Coach, Foto-Erkennung
// und Testphase-Start am Geraet gescheitert (31.08.2026), waehrend dieselben
// Aufrufe im Browser funktionierten.
//
// Fest verdrahtet statt aus einer Env-Variable: Die Adresse aendert sich nur
// mit einem Domain-Umzug, und der braucht ohnehin einen neuen App-Build.
export const API_BASIS = Capacitor.isNativePlatform() ? 'https://fullrep.pages.dev' : '';
