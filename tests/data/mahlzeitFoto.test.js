import { describe, it, expect, vi } from 'vitest';

const { supabase } = await vi.hoisted(async () => {
  const { makeSupabaseMock } = await import('../helpers/supabaseMock.js');
  return { supabase: makeSupabaseMock() };
});
vi.mock('../../src/lib/supabase', () => ({ supabase }));
// compressImage zieht Canvas und Image nach; für `itemName` wird nichts davon
// gebraucht, deshalb hier eine Attrappe statt jsdom.
vi.mock('../../src/data/exercisePhotos', () => ({ compressImage: async (b) => b }));

const { itemName } = await import('../../src/data/mealPhotoAnalysis.js');

// Die API liefert `name_de` und `name_en` immer, die Nutzersprache zusätzlich.
// Die Auswahl lief früher über eine Handliste (`de`, dann `es`) — fr/pt/ar
// bekamen englische Namen, obwohl das Modell sie mitschickte.
const HUHN = {
  name_de: 'Hähnchenbrust',
  name_en: 'Chicken breast',
  name_es: 'Pechuga de pollo',
  name_fr: 'Blanc de poulet',
  name_pt: 'Peito de frango',
  name_ar: 'صدر دجاج',
};

describe('itemName', () => {
  it.each([
    ['de', 'Hähnchenbrust'],
    ['en', 'Chicken breast'],
    ['es', 'Pechuga de pollo'],
    ['fr', 'Blanc de poulet'],
    ['pt', 'Peito de frango'],
    ['ar', 'صدر دجاج'],
  ])('nimmt für %s den passenden Namen', (sprache, erwartet) => {
    expect(itemName(HUHN, sprache)).toBe(erwartet);
  });

  it.each([
    ['de-AT', 'Hähnchenbrust'],
    ['pt-BR', 'Peito de frango'],
    ['ar-EG', 'صدر دجاج'],
  ])('versteht den Regionalcode %s', (sprache, erwartet) => {
    expect(itemName(HUHN, sprache)).toBe(erwartet);
  });

  // Eine Antwort aus einer älteren App-Version kennt nur de/en. Sie darf keine
  // leere Zeile ergeben — lieber der englische Name als gar keiner.
  it('fällt auf Englisch zurück, wenn das Feld der Sprache fehlt', () => {
    const alt = { name_de: 'Reis', name_en: 'Rice' };
    expect(itemName(alt, 'fr')).toBe('Rice');
    expect(itemName(alt, 'ar')).toBe('Rice');
  });

  it('fällt auf Deutsch zurück, wenn auch Englisch fehlt', () => {
    expect(itemName({ name_de: 'Reis' }, 'pt')).toBe('Reis');
  });

  it('gibt bei einem leeren Eintrag einen leeren Text, keinen Absturz', () => {
    expect(itemName(null, 'de')).toBe('');
    expect(itemName({}, 'de')).toBe('');
  });

  it('behandelt eine unbekannte Sprache wie Englisch', () => {
    expect(itemName(HUHN, 'kl-KL')).toBe('Chicken breast');
  });
});
