import { describe, it, expect } from 'vitest';
import { skaliereMenge } from '../../src/lib/mengenSkalierung.js';

describe('Mengen in Zutatenzeilen skalieren', () => {
  it('lässt bei Faktor 1 alles unangetastet', () => {
    expect(skaliereMenge('80 g Haferflocken', 1)).toBe('80 g Haferflocken');
  });

  it('rechnet ganze Zahlen hoch und runter', () => {
    expect(skaliereMenge('80 g Haferflocken', 2)).toBe('160 g Haferflocken');
    expect(skaliereMenge('200 ml Milch', 0.5)).toBe('100 ml Milch');
  });

  it('versteht Dezimalzahlen mit Komma und Punkt', () => {
    expect(skaliereMenge('1,5 kg Kartoffeln', 2)).toBe('3 kg Kartoffeln');
    expect(skaliereMenge('0.5 l Wasser', 3)).toBe('1.5 l Wasser');
  });

  // Der eigentliche Anlass für dieses Modul: Der alte Ausdruck griff bei
  // „1/2 TL" auf die 2 hinter dem Schrägstrich — Verdoppeln ergab „1/4 TL“.
  it('behandelt Brüche als eine Zahl, nicht als zwei', () => {
    expect(skaliereMenge('1/2 TL Knoblauchpulver', 2)).toBe('1 TL Knoblauchpulver');
    expect(skaliereMenge('1/2 cdta de ajo en polvo', 2)).toBe('1 cdta de ajo en polvo');
    expect(skaliereMenge('1/4 TL Salz', 2)).toBe('0.5 TL Salz');
  });

  it('kennt die Einheiten aller drei Sprachen', () => {
    expect(skaliereMenge('1 EL Honig', 3)).toBe('3 EL Honig');
    expect(skaliereMenge('1 tbsp honey', 3)).toBe('3 tbsp honey');
    expect(skaliereMenge('1 cda de miel', 3)).toBe('3 cda de miel');
    expect(skaliereMenge('1 cdta de canela', 2)).toBe('2 cdta de canela');
  });

  it('rührt Zahlen ohne Einheit nicht an', () => {
    // „2 reife Bananen“ und „1 Prise Zimt“ haben keine Mengeneinheit; sie
    // stehen als Stückzahl bzw. als unbestimmte Menge da.
    expect(skaliereMenge('1 pizca de canela', 2)).toBe('1 pizca de canela');
    expect(skaliereMenge('2 reife Bananen', 2)).toBe('2 reife Bananen');
  });

  it('greift nicht in Wörter hinein, die mit einer Einheit anfangen', () => {
    // „150 gramos“ darf nicht zu „300 g ramos“ werden.
    expect(skaliereMenge('150 gramos de quinoa', 2)).toBe('150 gramos de quinoa');
  });

  it('skaliert mehrere Angaben in derselben Zeile', () => {
    expect(skaliereMenge('100 g Mehl und 50 ml Milch', 2)).toBe('200 g Mehl und 100 ml Milch');
  });
});
