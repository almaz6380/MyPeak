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

  it('kennt die Einheiten aller sechs Sprachen', () => {
    expect(skaliereMenge('1 EL Honig', 3)).toBe('3 EL Honig');
    expect(skaliereMenge('1 tbsp honey', 3)).toBe('3 tbsp honey');
    expect(skaliereMenge('1 cda de miel', 3)).toBe('3 cda de miel');
    expect(skaliereMenge('1 cdta de canela', 2)).toBe('2 cdta de canela');
    expect(skaliereMenge('1 c. à s. de miel', 3)).toBe('3 c. à s. de miel');
    expect(skaliereMenge('1 c. à c. de cannelle', 2)).toBe('2 c. à c. de cannelle');
    expect(skaliereMenge('1 col. sopa de mel', 3)).toBe('3 col. sopa de mel');
    expect(skaliereMenge('1 col. chá de canela', 2)).toBe('2 col. chá de canela');
    expect(skaliereMenge('1 م.ك عسل', 3)).toBe('3 م.ك عسل');
    expect(skaliereMenge('1 م.ص قرفة', 2)).toBe('2 م.ص قرفة');
  });

  // Ohne diese Einheiten waere der Fehler unauffaellig und trotzdem falsch:
  // Die Gramm wachsen, die Loeffel bleiben stehen.
  it('skaliert Gramm und Löffel in derselben Sprache gleich', () => {
    expect(skaliereMenge('80 g de flocons d’avoine', 2)).toBe('160 g de flocons d’avoine');
    expect(skaliereMenge('1/2 c. à c. d’ail en poudre', 2)).toBe('1 c. à c. d’ail en poudre');
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

  it('kennt die Löffel der neuen Sprachen', () => {
    expect(skaliereMenge('1 cucch. di miele', 2)).toBe('2 cucch. di miele');
    expect(skaliereMenge('1/2 cucchiaino di sale', 2)).toBe('1 cucchiaino di sale');
    expect(skaliereMenge('1 el olijfolie', 2)).toBe('2 el olijfolie');
    expect(skaliereMenge('1 łyżka miodu', 3)).toBe('3 łyżka miodu');
    expect(skaliereMenge('1/2 łyżeczki soli', 2)).toBe('1 łyżeczki soli');
    expect(skaliereMenge('1 yk bal', 2)).toBe('2 yk bal');
    expect(skaliereMenge('1/2 çk tuz', 2)).toBe('1 çk tuz');
    expect(skaliereMenge('꿀 1큰술', 2)).toBe('꿀 2큰술');
    expect(skaliereMenge('盐 1/2茶匙', 2)).toBe('盐 1茶匙');
  });

  it('skaliert japanische Löffel mit der Zahl dahinter', () => {
    expect(skaliereMenge('はちみつ 大さじ1', 2)).toBe('はちみつ 大さじ2');
    expect(skaliereMenge('塩 小さじ1/2', 2)).toBe('塩 小さじ1');
  });
});
