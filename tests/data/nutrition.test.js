import { describe, it, expect, vi, beforeEach } from 'vitest';
import { installBrowserStubs, readLocal, writeLocal } from '../helpers/browserStubs.js';

const { supabase } = await vi.hoisted(async () => {
  const { makeSupabaseMock } = await import('../helpers/supabaseMock.js');
  return { supabase: makeSupabaseMock() };
});
vi.mock('../../src/lib/supabase', () => ({ supabase }));

const {
  saveNutritionEntry, updateNutritionEntry, deleteNutritionEntry, getNutritionEntries,
  saveCustomMeal, updateCustomMeal, deleteCustomMeal, getCustomMeals,
  getNutritionGoals, saveNutritionGoals,
  addWater, removeLastWater, removeWaterAmount, getWaterTotal,
} = await import('../../src/data/nutritionStorage.js');

const GAST = 'guest';
const KONTO = '11111111-1111-4111-8111-111111111111';
const TAG = '2026-08-28';
const EINTRAEGE = `nutrition_entries_${TAG}`;
const WASSER = `water_${TAG}`;

const essen = (name, kcal = 200) => ({
  date: TAG, meal_slot: 'breakfast', food_name: name,
  serving_size: 100, calories: kcal, protein: 10, carbs: 20, fat: 5,
});

beforeEach(() => { installBrowserStubs(); supabase.__reset(); });

describe('Ernährungseinträge', () => {
  describe('Gastmodus', () => {
    it('speichert einen Eintrag rein lokal', async () => {
      await saveNutritionEntry(GAST, essen('Haferflocken'));
      expect(readLocal(EINTRAEGE)).toHaveLength(1);
      expect(readLocal(EINTRAEGE)[0].food_name).toBe('Haferflocken');
      expect(supabase.__calls).toHaveLength(0);
    });

    it('gibt mehreren auf einmal gespeicherten Lebensmitteln EIGENE Kennungen', async () => {
      // AddFoodEntry.handleSaveAll speichert die Mehrfachauswahl in einer
      // Schleife. Als Gast läuft die ohne Netz, also mehrere Durchläufe in
      // derselben Millisekunde. Bei `local_${Date.now()}` bekamen dann alle
      // dieselbe Kennung — und das Löschen eines Eintrags entfernte alle.
      for (const name of ['Haferflocken', 'Banane', 'Milch']) {
        await saveNutritionEntry(GAST, essen(name));
      }
      const ids = readLocal(EINTRAEGE).map((e) => e.id);
      expect(new Set(ids).size).toBe(3);
    });

    it('löscht aus einer Mehrfachauswahl genau einen Eintrag', async () => {
      for (const name of ['Haferflocken', 'Banane', 'Milch']) {
        await saveNutritionEntry(GAST, essen(name));
      }
      const banane = readLocal(EINTRAEGE).find((e) => e.food_name === 'Banane');
      await deleteNutritionEntry(GAST, banane.id, TAG);

      expect(readLocal(EINTRAEGE).map((e) => e.food_name)).toEqual(['Haferflocken', 'Milch']);
      expect(supabase.__calls).toHaveLength(0);
    });

    it('ändert einen Eintrag lokal', async () => {
      await saveNutritionEntry(GAST, essen('Haferflocken'));
      const { id } = readLocal(EINTRAEGE)[0];
      await updateNutritionEntry(GAST, id, { calories: 350 }, TAG);
      expect(readLocal(EINTRAEGE)[0].calories).toBe(350);
      expect(supabase.__calls).toHaveLength(0);
    });

    it('liest die Einträge des Tages zurück', async () => {
      await saveNutritionEntry(GAST, essen('Haferflocken'));
      supabase.__reset();
      expect(await getNutritionEntries(GAST, TAG)).toHaveLength(1);
      expect(supabase.__calls).toHaveLength(0);
    });

    it('hält die Tage auseinander', async () => {
      await saveNutritionEntry(GAST, essen('Haferflocken'));
      await saveNutritionEntry(GAST, { ...essen('Abendbrot'), date: '2026-08-29' });
      expect(await getNutritionEntries(GAST, TAG)).toHaveLength(1);
      expect(await getNutritionEntries(GAST, '2026-08-29')).toHaveLength(1);
    });

    it('merkt sich beim Löschen nichts zum Nachholen', async () => {
      // Die Nachholliste ist für fehlgeschlagene Cloud-Löschungen. Ein Gast
      // hat keine Cloud — stünde dort etwas, liefe es nach einer späteren
      // Registrierung gegen fremde Kennungen.
      await saveNutritionEntry(GAST, essen('Haferflocken'));
      const { id } = readLocal(EINTRAEGE)[0];
      await deleteNutritionEntry(GAST, id, TAG);
      expect(readLocal('nutrition_pending_deletes', [])).toEqual([]);
    });
  });

  describe('eingeloggt', () => {
    it('legt den Eintrag in Supabase an und übernimmt dessen Kennung', async () => {
      supabase.__respond({ data: { id: 'cloud-1', ...essen('Haferflocken') }, error: null });
      await saveNutritionEntry(KONTO, essen('Haferflocken'));
      expect(readLocal(EINTRAEGE)[0].id).toBe('cloud-1');
      expect(supabase.__argsOf('nutrition_entries', 'insert')[0]).toMatchObject({
        user_id: KONTO, food_name: 'Haferflocken', date: TAG,
      });
    });

    it('behält den Eintrag lokal, wenn Supabase scheitert', async () => {
      supabase.__respond({ data: null, error: { message: 'offline' } });
      await saveNutritionEntry(KONTO, essen('Haferflocken'));
      expect(readLocal(EINTRAEGE)).toHaveLength(1);
      expect(String(readLocal(EINTRAEGE)[0].id)).toMatch(/^local_/);
    });

    it('grenzt Ändern und Löschen auf den eigenen Nutzer ein', async () => {
      writeLocal(EINTRAEGE, [{ id: 'cloud-1', ...essen('Haferflocken') }]);
      supabase.__respond({ data: { id: 'cloud-1', date: TAG }, error: null });
      await updateNutritionEntry(KONTO, 'cloud-1', { calories: 350 }, TAG);
      await deleteNutritionEntry(KONTO, 'cloud-1', TAG);

      for (const aufruf of supabase.__for('nutrition_entries')) {
        const eq = aufruf.ops.filter((o) => o.op === 'eq').map((o) => o.args);
        expect(eq).toContainEqual(['user_id', KONTO]);
      }
    });

    it('merkt sich eine fehlgeschlagene Löschung zum Nachholen', async () => {
      // Offline gelöschte Einträge kämen sonst beim nächsten Abgleich zurück.
      writeLocal(EINTRAEGE, [{ id: 'cloud-1', ...essen('Haferflocken') }]);
      supabase.__respond(() => { throw new Error('offline'); });
      await deleteNutritionEntry(KONTO, 'cloud-1', TAG);

      expect(readLocal(EINTRAEGE)).toEqual([]);
      expect(readLocal('nutrition_pending_deletes')).toEqual(['cloud-1']);
    });

    it('schickt Änderungen an local_-Einträgen nicht an Supabase', async () => {
      writeLocal(EINTRAEGE, [{ id: 'local_1_1', ...essen('Haferflocken') }]);
      await updateNutritionEntry(KONTO, 'local_1_1', { calories: 350 }, TAG);
      expect(readLocal(EINTRAEGE)[0].calories).toBe(350);
      expect(supabase.__calls).toHaveLength(0);
    });
  });
});

describe('Eigene Mahlzeiten', () => {
  const mahlzeit = (name) => ({
    name, items: [{ food_name: 'Reis', calories: 200 }],
    calories: 200, protein: 5, carbs: 40, fat: 1,
  });

  describe('Gastmodus', () => {
    it('legt eine Mahlzeit an, ändert und löscht sie — alles lokal', async () => {
      await saveCustomMeal(GAST, mahlzeit('Meal Prep'));
      const [gespeichert] = readLocal('custom_meals');
      expect(gespeichert.name).toBe('Meal Prep');

      await updateCustomMeal(GAST, gespeichert.id, mahlzeit('Meal Prep 2'));
      expect(readLocal('custom_meals')[0].name).toBe('Meal Prep 2');

      await deleteCustomMeal(GAST, gespeichert.id);
      expect(await getCustomMeals(GAST)).toEqual([]);
      expect(supabase.__calls).toHaveLength(0);
    });

    it('gibt zwei schnell angelegten Mahlzeiten eigene Kennungen', async () => {
      await saveCustomMeal(GAST, mahlzeit('Erste'));
      await saveCustomMeal(GAST, mahlzeit('Zweite'));
      const ids = readLocal('custom_meals').map((m) => m.id);
      expect(new Set(ids).size).toBe(2);
    });
  });
});

describe('Ernährungsziele', () => {
  it('liefert dem Gast Standardwerte, bevor er etwas gesetzt hat', async () => {
    const ziele = await getNutritionGoals(GAST);
    expect(ziele.calories).toBe(2000);
    expect(ziele.water_ml).toBe(3000);
    expect(supabase.__calls).toHaveLength(0);
  });

  it('speichert und liest die Ziele des Gastes lokal', async () => {
    await saveNutritionGoals(GAST, { calories: 2400, protein: 180, carbs: 260, fat: 80, fiber: 35, water_ml: 3500 });
    const ziele = await getNutritionGoals(GAST);
    expect(ziele.calories).toBe(2400);
    expect(ziele.water_ml).toBe(3500);
    expect(supabase.__calls).toHaveLength(0);
  });

  it('behält ein Ziel von 0, statt es auf den Standard zurückzusetzen', async () => {
    // Wer bewusst 0 einträgt (z. B. Kohlenhydrate bei Keto), soll das behalten.
    await saveNutritionGoals(GAST, { calories: 2000, protein: 150, carbs: 0, fat: 150, fiber: 30, water_ml: 3000 });
    expect((await getNutritionGoals(GAST)).carbs).toBe(0);
  });

  it('schreibt die Ziele für ein Konto auch in Supabase', async () => {
    await saveNutritionGoals(KONTO, { calories: 2400, protein: 180, carbs: 260, fat: 80, fiber: 35, water_ml: 3500 });
    const geschrieben = supabase.__argsOf('nutrition_goals', 'upsert')[0];
    expect(geschrieben).toMatchObject({ user_id: KONTO, calories: 2400, fiber: 35, water_ml: 3500 });
  });
});

describe('Wasser-Tracking', () => {
  describe('Gastmodus', () => {
    it('zählt zusammen, was hinzugefügt wurde', async () => {
      await addWater(GAST, TAG, 250);
      await addWater(GAST, TAG, 500);
      expect((await getWaterTotal(GAST, TAG)).total).toBe(750);
      expect(supabase.__calls).toHaveLength(0);
    });

    it('gibt jedem Schluck eine eigene Kennung', async () => {
      await addWater(GAST, TAG, 250);
      await addWater(GAST, TAG, 250);
      const ids = readLocal(WASSER).entries.map((e) => e.id);
      expect(new Set(ids).size).toBe(2);
    });

    it('nimmt den letzten Eintrag zurück', async () => {
      await addWater(GAST, TAG, 250);
      await addWater(GAST, TAG, 500);
      await removeLastWater(GAST, TAG);
      expect((await getWaterTotal(GAST, TAG)).total).toBe(250);
      expect(supabase.__calls).toHaveLength(0);
    });

    it('rechnet die Summe nach dem Abziehen neu aus den Einträgen', async () => {
      // Die Summe separat zu dekrementieren driftet auseinander: 300 ml von
      // einem 500-ml-Eintrag abziehen entfernt den ganzen Eintrag, die Summe
      // bliebe sonst fälschlich bei 200.
      await addWater(GAST, TAG, 500);
      await removeWaterAmount(GAST, TAG, 300);

      const stand = await getWaterTotal(GAST, TAG);
      const summeDerEintraege = stand.entries.reduce((s, e) => s + e.amount_ml, 0);
      expect(stand.total).toBe(summeDerEintraege);
    });

    it('geht beim Zurücknehmen nicht unter null', async () => {
      await addWater(GAST, TAG, 250);
      await removeWaterAmount(GAST, TAG, 1000);
      expect((await getWaterTotal(GAST, TAG)).total).toBe(0);
    });

    it('verkraftet das Zurücknehmen ohne jeden Eintrag', async () => {
      await expect(removeLastWater(GAST, TAG)).resolves.not.toThrow();
      expect((await getWaterTotal(GAST, TAG)).total).toBe(0);
    });
  });

  describe('eingeloggt', () => {
    it('schreibt den Schluck auch in Supabase', async () => {
      await addWater(KONTO, TAG, 250);
      expect(supabase.__argsOf('water_entries', 'insert')[0]).toMatchObject({
        user_id: KONTO, date: TAG, amount_ml: 250,
      });
    });

    it('löscht einen local_-Schluck nicht in Supabase', async () => {
      await addWater(KONTO, TAG, 250);
      supabase.__reset();
      await removeLastWater(KONTO, TAG);
      expect(supabase.__calls).toHaveLength(0);
    });
  });
});
