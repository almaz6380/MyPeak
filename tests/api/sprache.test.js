import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { SPRACHEN as API_SPRACHEN, apiSprache } from '../../api/_sprache.js';
import { SPRACHEN as APP_SPRACHEN, appSprache } from '../../src/lib/sprache.js';
import { mahlzeitPrompt } from '../../api/analyze-meal.js';

// `api/` und `src/` führen die Sprachliste getrennt — die Serverless-Funktionen
// dürfen nicht am Client-Bündel hängen (siehe Kopf von `api/_sprache.js`).
// Diese Datei ist der Preis dafür: Sie hält die beiden Kopien zusammen.
describe('Sprachliste api/ ↔ src/', () => {
  it('führt in beiden Kopien dieselben Codes in derselben Reihenfolge', () => {
    expect(API_SPRACHEN).toEqual(APP_SPRACHEN);
  });

  it('bildet dieselben Eingaben auf dasselbe Ergebnis ab', () => {
    for (const code of ['de', 'en', 'es', 'fr', 'pt', 'ar', 'nl', 'pl', 'it', 'tr', 'ja', 'ko', 'de-AT', 'pt-BR', 'ar-EG', 'kl-KL', '', undefined, null]) {
      expect(apiSprache(code), `Code ${JSON.stringify(code)}`).toBe(appSprache(code ?? undefined));
    }
  });
});

describe('apiSprache', () => {
  it('nimmt Regionalcodes', () => {
    expect(apiSprache('pt-BR')).toBe('pt');
    expect(apiSprache('de-AT')).toBe('de');
  });

  // Der Fehler, der den spanischen Prompt zwei Versionen lang tot liegen ließ:
  // Die alte Regel war `lang === 'en' ? 'en' : 'de'`.
  it('macht aus einer unbekannten Sprache Englisch, NICHT Deutsch', () => {
    expect(apiSprache('kl-KL')).toBe('en');
    expect(apiSprache(undefined)).toBe('en');
  });
});

describe('mahlzeitPrompt', () => {
  it.each(APP_SPRACHEN)('verlangt für %s immer name_de und name_en', (sp) => {
    const p = mahlzeitPrompt(sp);
    expect(p).toContain('"name_de"');
    expect(p).toContain('"name_en"');
    expect(p).toContain('"meal_description_de"');
    expect(p).toContain('"meal_description_en"');
  });

  it.each(['es', 'fr', 'pt', 'ar', 'nl', 'pl', 'it', 'tr', 'ja', 'ko'])('verlangt für %s zusätzlich das eigene Feld', (sp) => {
    const p = mahlzeitPrompt(sp);
    expect(p).toContain(`"name_${sp}"`);
    expect(p).toContain(`"meal_description_${sp}"`);
  });

  // Bei de und en darf das Feld nicht doppelt im JSON stehen — ein doppelter
  // Schlüssel ist zwar gültiges JSON, aber das Modell liest es als Fehler und
  // liefert dann gern Prosa statt JSON.
  it.each(['de', 'en'])('nennt für %s kein Feld doppelt', (sp) => {
    const p = mahlzeitPrompt(sp);
    expect(p.match(/"name_de"/g)).toHaveLength(1);
    expect(p.match(/"name_en"/g)).toHaveLength(1);
  });

  it('nennt die Abbruchbedingung in jeder Sprache', () => {
    for (const sp of APP_SPRACHEN) {
      expect(mahlzeitPrompt(sp), sp).toContain('no_food_detected');
    }
  });

  it('fällt bei einer unbekannten Sprache auf Englisch zurück', () => {
    expect(mahlzeitPrompt('kl')).toBe(mahlzeitPrompt('en'));
  });
});

// Die eigentliche Lehre aus dem toten es-Prompt: Er stand im Code und niemand
// hat gemerkt, dass ihn kein Aufruf erreicht. Diese Prüfung liest den Quelltext
// und verlangt, dass jede Sprache aus der Liste dort auch vorkommt.
describe('Vollständigkeit der Prompt-Tabellen', () => {
  it.each([
    ['api/coach.js', 'PROMPTS'],
    ['api/analyze-meal.js', 'MAHLZEIT'],
  ])('%s deckt alle Sprachen ab', (datei) => {
    const quelle = readFileSync(new URL(`../../${datei}`, import.meta.url), 'utf8');
    for (const sp of APP_SPRACHEN) {
      expect(new RegExp(`^\\s{2}${sp}:\\s*\\{`, 'm').test(quelle), `${sp} fehlt in ${datei}`).toBe(true);
    }
  });
});
