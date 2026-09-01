// CORS fuer die NATIVE App. (Unterstrich-Praefix: wird von Vercel nicht als
// eigener Endpunkt veroeffentlicht, wie _coachKnowledge.js.)
//
// Die Web-App braucht das nicht — sie laeuft auf derselben Domain wie /api.
// Die native App laedt ihre Oberflaeche aber aus dem App-Paket, ihre Herkunft
// ist capacitor://localhost (iOS) bzw. https://localhost (Android). Ein fetch
// von dort auf fullrep.vercel.app ist cross-origin: Der Browser schickt erst
// ein OPTIONS-Preflight (unsere Handler antworteten darauf mit 405!) und
// verwirft ohne Access-Control-Header auch jede echte Antwort. Deshalb sah
// die App „nicht erreichbar", waehrend derselbe Aufruf per curl funktionierte.
//
// Bewusst NUR die App-Herkuenfte, nicht '*': Die Endpunkte kosten je Aufruf
// Geld (Gemini) — fremde Webseiten sollen sie nicht aus dem Browser ihrer
// Besucher mitbenutzen koennen. (Der Schutz ist die Login-Pflicht; die enge
// Origin-Liste haelt zusaetzlich fremde Seiten fern.)
const ERLAUBTE_HERKUENFTE = new Set([
  'capacitor://localhost', // iOS-App
  'https://localhost',     // Android-App
  'http://localhost',      // aeltere Android-WebViews
]);

// Setzt die CORS-Header und beantwortet Preflights.
// Rueckgabe true = Preflight wurde beantwortet, Handler soll aufhoeren.
export function corsBehandeln(req, res) {
  const herkunft = req.headers.origin;
  if (herkunft && ERLAUBTE_HERKUENFTE.has(herkunft)) {
    res.setHeader('Access-Control-Allow-Origin', herkunft);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Max-Age', '86400');
  }
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return true;
  }
  return false;
}
