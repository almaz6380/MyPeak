// Lokale Lebensmittel-Datenbank (~150 gängige Lebensmittel)
// Alle Werte pro 100g/100ml sofern nicht anders angegeben

const foods = [
  // ── Milchprodukte ──────────────────────────────────────────
  { id: 'magerquark', nameDE: 'Magerquark', nameEN: 'Low-fat quark', category: 'dairy', servingSize: 150, servingUnit: 'g', calories: 67, protein: 12, carbs: 4, fat: 0.3 },
  { id: 'griechischer-joghurt', nameDE: 'Griechischer Joghurt', nameEN: 'Greek yogurt', category: 'dairy', servingSize: 150, servingUnit: 'g', calories: 97, protein: 9, carbs: 3.6, fat: 5 },
  { id: 'naturjoghurt', nameDE: 'Naturjoghurt 1,5%', nameEN: 'Plain yogurt 1.5%', category: 'dairy', servingSize: 150, servingUnit: 'g', calories: 49, protein: 4.1, carbs: 5.2, fat: 1.5 },
  { id: 'vollmilch', nameDE: 'Vollmilch 3,5%', nameEN: 'Whole milk 3.5%', category: 'dairy', servingSize: 250, servingUnit: 'ml', calories: 64, protein: 3.3, carbs: 4.8, fat: 3.5 },
  { id: 'fettarme-milch', nameDE: 'Fettarme Milch 1,5%', nameEN: 'Low-fat milk 1.5%', category: 'dairy', servingSize: 250, servingUnit: 'ml', calories: 47, protein: 3.4, carbs: 4.9, fat: 1.5 },
  { id: 'huettenkaese', nameDE: 'Hüttenkäse', nameEN: 'Cottage cheese', category: 'dairy', servingSize: 150, servingUnit: 'g', calories: 104, protein: 13, carbs: 2.6, fat: 4.3 },
  { id: 'gouda', nameDE: 'Gouda', nameEN: 'Gouda cheese', category: 'dairy', servingSize: 30, servingUnit: 'g', calories: 356, protein: 25, carbs: 0, fat: 28 },
  { id: 'mozzarella', nameDE: 'Mozzarella', nameEN: 'Mozzarella', category: 'dairy', servingSize: 125, servingUnit: 'g', calories: 263, protein: 19, carbs: 1, fat: 20 },
  { id: 'parmesan', nameDE: 'Parmesan', nameEN: 'Parmesan', category: 'dairy', servingSize: 20, servingUnit: 'g', calories: 392, protein: 36, carbs: 0, fat: 28 },
  { id: 'skyr', nameDE: 'Skyr', nameEN: 'Skyr', category: 'dairy', servingSize: 150, servingUnit: 'g', calories: 63, protein: 11, carbs: 4, fat: 0.2 },
  { id: 'butter', nameDE: 'Butter', nameEN: 'Butter', category: 'dairy', servingSize: 10, servingUnit: 'g', calories: 741, protein: 0.7, carbs: 0.6, fat: 83 },
  { id: 'frischkaese', nameDE: 'Frischkäse', nameEN: 'Cream cheese', category: 'dairy', servingSize: 30, servingUnit: 'g', calories: 262, protein: 5.5, carbs: 2.5, fat: 25 },

  // ── Eier ───────────────────────────────────────────────────
  { id: 'ei-ganz', nameDE: 'Ei (Größe M)', nameEN: 'Egg (medium)', category: 'eggs', servingSize: 60, servingUnit: 'piece', calories: 155, protein: 13, carbs: 1.1, fat: 11 },
  { id: 'eiweiss', nameDE: 'Eiweiß', nameEN: 'Egg white', category: 'eggs', servingSize: 33, servingUnit: 'piece', calories: 52, protein: 11, carbs: 0.7, fat: 0.2 },

  // ── Fleisch ────────────────────────────────────────────────
  { id: 'haehnchenbrust', nameDE: 'Hähnchenbrust', nameEN: 'Chicken breast', category: 'meat', servingSize: 150, servingUnit: 'g', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  { id: 'putenbrust', nameDE: 'Putenbrust', nameEN: 'Turkey breast', category: 'meat', servingSize: 150, servingUnit: 'g', calories: 135, protein: 30, carbs: 0, fat: 1.5 },
  { id: 'rinderhack', nameDE: 'Rinderhackfleisch', nameEN: 'Ground beef', category: 'meat', servingSize: 150, servingUnit: 'g', calories: 254, protein: 17, carbs: 0, fat: 20 },
  { id: 'rindersteak', nameDE: 'Rindersteak', nameEN: 'Beef steak', category: 'meat', servingSize: 200, servingUnit: 'g', calories: 217, protein: 26, carbs: 0, fat: 12 },
  { id: 'schweinefilet', nameDE: 'Schweinefilet', nameEN: 'Pork tenderloin', category: 'meat', servingSize: 150, servingUnit: 'g', calories: 143, protein: 24, carbs: 0, fat: 5 },
  { id: 'schinken-gekocht', nameDE: 'Kochschinken', nameEN: 'Cooked ham', category: 'meat', servingSize: 30, servingUnit: 'g', calories: 120, protein: 21, carbs: 1, fat: 3 },
  { id: 'salami', nameDE: 'Salami', nameEN: 'Salami', category: 'meat', servingSize: 30, servingUnit: 'g', calories: 400, protein: 20, carbs: 1, fat: 35 },
  { id: 'haehnchenschenkel', nameDE: 'Hähnchenschenkel', nameEN: 'Chicken thigh', category: 'meat', servingSize: 150, servingUnit: 'g', calories: 209, protein: 26, carbs: 0, fat: 11 },

  // ── Fisch ──────────────────────────────────────────────────
  { id: 'lachs', nameDE: 'Lachs', nameEN: 'Salmon', category: 'fish', servingSize: 150, servingUnit: 'g', calories: 208, protein: 20, carbs: 0, fat: 13 },
  { id: 'thunfisch-dose', nameDE: 'Thunfisch (Dose, im eigenen Saft)', nameEN: 'Canned tuna (in water)', category: 'fish', servingSize: 100, servingUnit: 'g', calories: 116, protein: 26, carbs: 0, fat: 1 },
  { id: 'garnelen', nameDE: 'Garnelen', nameEN: 'Shrimp', category: 'fish', servingSize: 100, servingUnit: 'g', calories: 99, protein: 24, carbs: 0.2, fat: 0.3 },
  { id: 'forelle', nameDE: 'Forelle', nameEN: 'Trout', category: 'fish', servingSize: 150, servingUnit: 'g', calories: 141, protein: 20, carbs: 0, fat: 6.6 },
  { id: 'kabeljau', nameDE: 'Kabeljau', nameEN: 'Cod', category: 'fish', servingSize: 150, servingUnit: 'g', calories: 82, protein: 18, carbs: 0, fat: 0.7 },

  // ── Getreide & Beilagen ────────────────────────────────────
  { id: 'haferflocken', nameDE: 'Haferflocken', nameEN: 'Oats', category: 'grains', servingSize: 50, servingUnit: 'g', calories: 372, protein: 13, carbs: 59, fat: 7 },
  { id: 'reis-gekocht', nameDE: 'Reis (gekocht)', nameEN: 'Rice (cooked)', category: 'grains', servingSize: 200, servingUnit: 'g', calories: 130, protein: 2.7, carbs: 28, fat: 0.3 },
  { id: 'vollkornreis-gekocht', nameDE: 'Vollkornreis (gekocht)', nameEN: 'Brown rice (cooked)', category: 'grains', servingSize: 200, servingUnit: 'g', calories: 123, protein: 2.7, carbs: 26, fat: 1 },
  { id: 'nudeln-gekocht', nameDE: 'Nudeln (gekocht)', nameEN: 'Pasta (cooked)', category: 'grains', servingSize: 200, servingUnit: 'g', calories: 158, protein: 5, carbs: 31, fat: 0.9 },
  { id: 'vollkornnudeln-gekocht', nameDE: 'Vollkornnudeln (gekocht)', nameEN: 'Whole wheat pasta (cooked)', category: 'grains', servingSize: 200, servingUnit: 'g', calories: 150, protein: 6, carbs: 30, fat: 1.2 },
  { id: 'kartoffeln-gekocht', nameDE: 'Kartoffeln (gekocht)', nameEN: 'Potatoes (boiled)', category: 'grains', servingSize: 200, servingUnit: 'g', calories: 77, protein: 2, carbs: 17, fat: 0.1 },
  { id: 'suesskartoffel', nameDE: 'Süßkartoffel', nameEN: 'Sweet potato', category: 'grains', servingSize: 200, servingUnit: 'g', calories: 86, protein: 1.6, carbs: 20, fat: 0.1 },
  { id: 'couscous-gekocht', nameDE: 'Couscous (gekocht)', nameEN: 'Couscous (cooked)', category: 'grains', servingSize: 200, servingUnit: 'g', calories: 112, protein: 3.8, carbs: 23, fat: 0.2 },
  { id: 'quinoa-gekocht', nameDE: 'Quinoa (gekocht)', nameEN: 'Quinoa (cooked)', category: 'grains', servingSize: 200, servingUnit: 'g', calories: 120, protein: 4.4, carbs: 21, fat: 1.9 },
  { id: 'bulgur-gekocht', nameDE: 'Bulgur (gekocht)', nameEN: 'Bulgur (cooked)', category: 'grains', servingSize: 200, servingUnit: 'g', calories: 83, protein: 3.1, carbs: 19, fat: 0.2 },

  // ── Brot & Backwaren ───────────────────────────────────────
  { id: 'vollkornbrot', nameDE: 'Vollkornbrot', nameEN: 'Whole grain bread', category: 'bakery', servingSize: 50, servingUnit: 'g', calories: 213, protein: 7, carbs: 41, fat: 1.4 },
  { id: 'toast-weiss', nameDE: 'Toastbrot (weiß)', nameEN: 'White toast', category: 'bakery', servingSize: 30, servingUnit: 'piece', calories: 264, protein: 8, carbs: 49, fat: 3.5 },
  { id: 'brezel', nameDE: 'Brezel', nameEN: 'Pretzel', category: 'bakery', servingSize: 85, servingUnit: 'piece', calories: 300, protein: 9, carbs: 60, fat: 2 },
  { id: 'roggenbrot', nameDE: 'Roggenbrot', nameEN: 'Rye bread', category: 'bakery', servingSize: 50, servingUnit: 'g', calories: 230, protein: 6, carbs: 46, fat: 1.3 },
  { id: 'dinkelbroetchen', nameDE: 'Dinkelbrötchen', nameEN: 'Spelt roll', category: 'bakery', servingSize: 60, servingUnit: 'piece', calories: 260, protein: 9, carbs: 50, fat: 2 },
  { id: 'reiswaffeln', nameDE: 'Reiswaffeln', nameEN: 'Rice cakes', category: 'bakery', servingSize: 10, servingUnit: 'piece', calories: 387, protein: 8, carbs: 82, fat: 2.8 },
  { id: 'wrap-tortilla', nameDE: 'Wrap/Tortilla', nameEN: 'Wrap/Tortilla', category: 'bakery', servingSize: 65, servingUnit: 'piece', calories: 312, protein: 8, carbs: 52, fat: 8 },

  // ── Obst ───────────────────────────────────────────────────
  { id: 'banane', nameDE: 'Banane', nameEN: 'Banana', category: 'fruit', servingSize: 120, servingUnit: 'piece', calories: 89, protein: 1.1, carbs: 23, fat: 0.3 },
  { id: 'apfel', nameDE: 'Apfel', nameEN: 'Apple', category: 'fruit', servingSize: 180, servingUnit: 'piece', calories: 52, protein: 0.3, carbs: 14, fat: 0.2 },
  { id: 'erdbeeren', nameDE: 'Erdbeeren', nameEN: 'Strawberries', category: 'fruit', servingSize: 150, servingUnit: 'g', calories: 32, protein: 0.7, carbs: 8, fat: 0.3 },
  { id: 'blaubeeren', nameDE: 'Blaubeeren', nameEN: 'Blueberries', category: 'fruit', servingSize: 125, servingUnit: 'g', calories: 57, protein: 0.7, carbs: 14, fat: 0.3 },
  { id: 'himbeeren', nameDE: 'Himbeeren', nameEN: 'Raspberries', category: 'fruit', servingSize: 125, servingUnit: 'g', calories: 52, protein: 1.2, carbs: 12, fat: 0.7 },
  { id: 'orange', nameDE: 'Orange', nameEN: 'Orange', category: 'fruit', servingSize: 180, servingUnit: 'piece', calories: 47, protein: 0.9, carbs: 12, fat: 0.1 },
  { id: 'weintrauben', nameDE: 'Weintrauben', nameEN: 'Grapes', category: 'fruit', servingSize: 150, servingUnit: 'g', calories: 69, protein: 0.7, carbs: 18, fat: 0.2 },
  { id: 'wassermelone', nameDE: 'Wassermelone', nameEN: 'Watermelon', category: 'fruit', servingSize: 200, servingUnit: 'g', calories: 30, protein: 0.6, carbs: 8, fat: 0.2 },
  { id: 'mango', nameDE: 'Mango', nameEN: 'Mango', category: 'fruit', servingSize: 200, servingUnit: 'piece', calories: 60, protein: 0.8, carbs: 15, fat: 0.4 },
  { id: 'kiwi', nameDE: 'Kiwi', nameEN: 'Kiwi', category: 'fruit', servingSize: 75, servingUnit: 'piece', calories: 61, protein: 1.1, carbs: 15, fat: 0.5 },
  { id: 'birne', nameDE: 'Birne', nameEN: 'Pear', category: 'fruit', servingSize: 180, servingUnit: 'piece', calories: 57, protein: 0.4, carbs: 15, fat: 0.1 },
  { id: 'ananas', nameDE: 'Ananas', nameEN: 'Pineapple', category: 'fruit', servingSize: 150, servingUnit: 'g', calories: 50, protein: 0.5, carbs: 13, fat: 0.1 },

  // ── Gemüse ─────────────────────────────────────────────────
  { id: 'brokkoli', nameDE: 'Brokkoli', nameEN: 'Broccoli', category: 'vegetables', servingSize: 150, servingUnit: 'g', calories: 34, protein: 2.8, carbs: 7, fat: 0.4 },
  { id: 'spinat', nameDE: 'Spinat', nameEN: 'Spinach', category: 'vegetables', servingSize: 100, servingUnit: 'g', calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4 },
  { id: 'tomate', nameDE: 'Tomate', nameEN: 'Tomato', category: 'vegetables', servingSize: 120, servingUnit: 'piece', calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2 },
  { id: 'gurke', nameDE: 'Gurke', nameEN: 'Cucumber', category: 'vegetables', servingSize: 150, servingUnit: 'g', calories: 12, protein: 0.7, carbs: 2, fat: 0.1 },
  { id: 'paprika', nameDE: 'Paprika', nameEN: 'Bell pepper', category: 'vegetables', servingSize: 150, servingUnit: 'piece', calories: 26, protein: 1, carbs: 6, fat: 0.2 },
  { id: 'karotten', nameDE: 'Karotten', nameEN: 'Carrots', category: 'vegetables', servingSize: 100, servingUnit: 'g', calories: 41, protein: 0.9, carbs: 10, fat: 0.2 },
  { id: 'zucchini', nameDE: 'Zucchini', nameEN: 'Zucchini', category: 'vegetables', servingSize: 150, servingUnit: 'g', calories: 17, protein: 1.2, carbs: 3.1, fat: 0.3 },
  { id: 'champignons', nameDE: 'Champignons', nameEN: 'Mushrooms', category: 'vegetables', servingSize: 100, servingUnit: 'g', calories: 22, protein: 3.1, carbs: 3.3, fat: 0.3 },
  { id: 'zwiebel', nameDE: 'Zwiebel', nameEN: 'Onion', category: 'vegetables', servingSize: 80, servingUnit: 'piece', calories: 40, protein: 1.1, carbs: 9.3, fat: 0.1 },
  { id: 'mais', nameDE: 'Mais (Dose)', nameEN: 'Corn (canned)', category: 'vegetables', servingSize: 100, servingUnit: 'g', calories: 115, protein: 3, carbs: 22, fat: 1.5 },
  { id: 'erbsen', nameDE: 'Erbsen', nameEN: 'Peas', category: 'vegetables', servingSize: 100, servingUnit: 'g', calories: 81, protein: 5.4, carbs: 14, fat: 0.4 },
  { id: 'bohnen-gruen', nameDE: 'Grüne Bohnen', nameEN: 'Green beans', category: 'vegetables', servingSize: 100, servingUnit: 'g', calories: 31, protein: 1.8, carbs: 7, fat: 0.1 },
  { id: 'blumenkohl', nameDE: 'Blumenkohl', nameEN: 'Cauliflower', category: 'vegetables', servingSize: 150, servingUnit: 'g', calories: 25, protein: 1.9, carbs: 5, fat: 0.3 },
  { id: 'avocado', nameDE: 'Avocado', nameEN: 'Avocado', category: 'vegetables', servingSize: 80, servingUnit: 'g', calories: 160, protein: 2, carbs: 9, fat: 15 },
  { id: 'salat-mix', nameDE: 'Blattsalat (gemischt)', nameEN: 'Mixed salad leaves', category: 'vegetables', servingSize: 100, servingUnit: 'g', calories: 15, protein: 1.3, carbs: 2.5, fat: 0.2 },

  // ── Hülsenfrüchte ──────────────────────────────────────────
  { id: 'kichererbsen-dose', nameDE: 'Kichererbsen (Dose)', nameEN: 'Chickpeas (canned)', category: 'legumes', servingSize: 150, servingUnit: 'g', calories: 164, protein: 9, carbs: 27, fat: 2.6 },
  { id: 'linsen-gekocht', nameDE: 'Linsen (gekocht)', nameEN: 'Lentils (cooked)', category: 'legumes', servingSize: 150, servingUnit: 'g', calories: 116, protein: 9, carbs: 20, fat: 0.4 },
  { id: 'kidneybohnen', nameDE: 'Kidneybohnen (Dose)', nameEN: 'Kidney beans (canned)', category: 'legumes', servingSize: 150, servingUnit: 'g', calories: 127, protein: 8.7, carbs: 22, fat: 0.5 },
  { id: 'edamame', nameDE: 'Edamame', nameEN: 'Edamame', category: 'legumes', servingSize: 100, servingUnit: 'g', calories: 122, protein: 11, carbs: 9, fat: 5 },
  { id: 'tofu', nameDE: 'Tofu (natur)', nameEN: 'Tofu (plain)', category: 'legumes', servingSize: 100, servingUnit: 'g', calories: 144, protein: 15, carbs: 1.9, fat: 8.7 },

  // ── Nüsse & Samen ──────────────────────────────────────────
  { id: 'mandeln', nameDE: 'Mandeln', nameEN: 'Almonds', category: 'nuts', servingSize: 30, servingUnit: 'g', calories: 579, protein: 21, carbs: 22, fat: 50 },
  { id: 'walnuesse', nameDE: 'Walnüsse', nameEN: 'Walnuts', category: 'nuts', servingSize: 30, servingUnit: 'g', calories: 654, protein: 15, carbs: 14, fat: 65 },
  { id: 'cashews', nameDE: 'Cashews', nameEN: 'Cashews', category: 'nuts', servingSize: 30, servingUnit: 'g', calories: 553, protein: 18, carbs: 30, fat: 44 },
  { id: 'erdnuesse', nameDE: 'Erdnüsse', nameEN: 'Peanuts', category: 'nuts', servingSize: 30, servingUnit: 'g', calories: 567, protein: 26, carbs: 16, fat: 49 },
  { id: 'erdnussbutter', nameDE: 'Erdnussbutter', nameEN: 'Peanut butter', category: 'nuts', servingSize: 20, servingUnit: 'g', calories: 588, protein: 25, carbs: 20, fat: 50 },
  { id: 'chiasamen', nameDE: 'Chiasamen', nameEN: 'Chia seeds', category: 'nuts', servingSize: 15, servingUnit: 'g', calories: 486, protein: 17, carbs: 42, fat: 31 },
  { id: 'leinsamen', nameDE: 'Leinsamen', nameEN: 'Flaxseeds', category: 'nuts', servingSize: 15, servingUnit: 'g', calories: 534, protein: 18, carbs: 29, fat: 42 },
  { id: 'sonnenblumenkerne', nameDE: 'Sonnenblumenkerne', nameEN: 'Sunflower seeds', category: 'nuts', servingSize: 20, servingUnit: 'g', calories: 584, protein: 21, carbs: 20, fat: 51 },

  // ── Öle & Fette ────────────────────────────────────────────
  { id: 'olivenoel', nameDE: 'Olivenöl', nameEN: 'Olive oil', category: 'oils', servingSize: 10, servingUnit: 'ml', calories: 884, protein: 0, carbs: 0, fat: 100 },
  { id: 'kokosoel', nameDE: 'Kokosöl', nameEN: 'Coconut oil', category: 'oils', servingSize: 10, servingUnit: 'ml', calories: 862, protein: 0, carbs: 0, fat: 100 },
  { id: 'rapsoel', nameDE: 'Rapsöl', nameEN: 'Canola oil', category: 'oils', servingSize: 10, servingUnit: 'ml', calories: 884, protein: 0, carbs: 0, fat: 100 },

  // ── Getränke ───────────────────────────────────────────────
  { id: 'wasser', nameDE: 'Wasser', nameEN: 'Water', category: 'drinks', servingSize: 250, servingUnit: 'ml', calories: 0, protein: 0, carbs: 0, fat: 0 },
  { id: 'orangensaft', nameDE: 'Orangensaft', nameEN: 'Orange juice', category: 'drinks', servingSize: 250, servingUnit: 'ml', calories: 45, protein: 0.7, carbs: 10, fat: 0.2 },
  { id: 'apfelsaft', nameDE: 'Apfelsaft', nameEN: 'Apple juice', category: 'drinks', servingSize: 250, servingUnit: 'ml', calories: 46, protein: 0.1, carbs: 11, fat: 0.1 },
  { id: 'cola', nameDE: 'Cola', nameEN: 'Cola', category: 'drinks', servingSize: 330, servingUnit: 'ml', calories: 42, protein: 0, carbs: 11, fat: 0 },
  { id: 'cola-zero', nameDE: 'Cola Zero', nameEN: 'Cola Zero', category: 'drinks', servingSize: 330, servingUnit: 'ml', calories: 0, protein: 0, carbs: 0, fat: 0 },
  { id: 'kaffee-schwarz', nameDE: 'Kaffee (schwarz)', nameEN: 'Coffee (black)', category: 'drinks', servingSize: 250, servingUnit: 'ml', calories: 2, protein: 0.3, carbs: 0, fat: 0 },
  { id: 'proteinshake', nameDE: 'Proteinshake (Whey)', nameEN: 'Protein shake (whey)', category: 'drinks', servingSize: 30, servingUnit: 'g', calories: 400, protein: 80, carbs: 8, fat: 6 },
  { id: 'hafermilch', nameDE: 'Hafermilch', nameEN: 'Oat milk', category: 'drinks', servingSize: 250, servingUnit: 'ml', calories: 46, protein: 1, carbs: 7, fat: 1.5 },
  { id: 'mandelmilch', nameDE: 'Mandelmilch', nameEN: 'Almond milk', category: 'drinks', servingSize: 250, servingUnit: 'ml', calories: 24, protein: 0.5, carbs: 3, fat: 1.1 },

  // ── Snacks & Süßes ────────────────────────────────────────
  { id: 'schokolade-dunkel', nameDE: 'Zartbitterschokolade', nameEN: 'Dark chocolate', category: 'snacks', servingSize: 25, servingUnit: 'g', calories: 546, protein: 5, carbs: 60, fat: 31 },
  { id: 'schokolade-vollmilch', nameDE: 'Vollmilchschokolade', nameEN: 'Milk chocolate', category: 'snacks', servingSize: 25, servingUnit: 'g', calories: 535, protein: 7.3, carbs: 59, fat: 30 },
  { id: 'honig', nameDE: 'Honig', nameEN: 'Honey', category: 'snacks', servingSize: 20, servingUnit: 'g', calories: 304, protein: 0.3, carbs: 82, fat: 0 },
  { id: 'marmelade', nameDE: 'Marmelade', nameEN: 'Jam', category: 'snacks', servingSize: 20, servingUnit: 'g', calories: 250, protein: 0.3, carbs: 63, fat: 0.1 },
  { id: 'nutella', nameDE: 'Nutella', nameEN: 'Nutella', brand: 'Ferrero', category: 'snacks', servingSize: 15, servingUnit: 'g', calories: 539, protein: 6.3, carbs: 57, fat: 31 },
  { id: 'muesliriegel', nameDE: 'Müsliriegel', nameEN: 'Granola bar', category: 'snacks', servingSize: 25, servingUnit: 'piece', calories: 450, protein: 7, carbs: 63, fat: 18 },
  { id: 'chips', nameDE: 'Kartoffelchips', nameEN: 'Potato chips', category: 'snacks', servingSize: 30, servingUnit: 'g', calories: 536, protein: 6, carbs: 53, fat: 33 },
  { id: 'popcorn', nameDE: 'Popcorn (natur)', nameEN: 'Popcorn (plain)', category: 'snacks', servingSize: 30, servingUnit: 'g', calories: 387, protein: 12, carbs: 78, fat: 4.5 },
  { id: 'trockenobst-mix', nameDE: 'Trockenobst-Mix', nameEN: 'Dried fruit mix', category: 'snacks', servingSize: 40, servingUnit: 'g', calories: 280, protein: 2, carbs: 68, fat: 0.5 },
  { id: 'protein-riegel', nameDE: 'Proteinriegel', nameEN: 'Protein bar', category: 'snacks', servingSize: 60, servingUnit: 'piece', calories: 350, protein: 33, carbs: 35, fat: 12 },

  // ── Fertiggerichte & Saucen ────────────────────────────────
  { id: 'hummus', nameDE: 'Hummus', nameEN: 'Hummus', category: 'prepared', servingSize: 30, servingUnit: 'g', calories: 166, protein: 8, carbs: 14, fat: 10 },
  { id: 'tomatensauce', nameDE: 'Tomatensauce', nameEN: 'Tomato sauce', category: 'prepared', servingSize: 100, servingUnit: 'g', calories: 35, protein: 1.3, carbs: 7, fat: 0.2 },
  { id: 'pesto', nameDE: 'Pesto (grün)', nameEN: 'Pesto (green)', category: 'prepared', servingSize: 20, servingUnit: 'g', calories: 387, protein: 5, carbs: 4, fat: 38 },
  { id: 'ketchup', nameDE: 'Ketchup', nameEN: 'Ketchup', category: 'prepared', servingSize: 15, servingUnit: 'g', calories: 112, protein: 1.2, carbs: 26, fat: 0.1 },
  { id: 'senf', nameDE: 'Senf', nameEN: 'Mustard', category: 'prepared', servingSize: 10, servingUnit: 'g', calories: 66, protein: 4, carbs: 6, fat: 3 },
  { id: 'sojasauce', nameDE: 'Sojasauce', nameEN: 'Soy sauce', category: 'prepared', servingSize: 15, servingUnit: 'ml', calories: 53, protein: 8, carbs: 5, fat: 0 },
  { id: 'mayo', nameDE: 'Mayonnaise', nameEN: 'Mayonnaise', category: 'prepared', servingSize: 15, servingUnit: 'g', calories: 680, protein: 1, carbs: 1, fat: 75 },

  // ── Supplements ────────────────────────────────────────────
  { id: 'whey-protein', nameDE: 'Whey Protein Pulver', nameEN: 'Whey protein powder', category: 'supplements', servingSize: 30, servingUnit: 'g', calories: 400, protein: 80, carbs: 8, fat: 6 },
  { id: 'kreatin', nameDE: 'Kreatin Monohydrat', nameEN: 'Creatine monohydrate', category: 'supplements', servingSize: 5, servingUnit: 'g', calories: 0, protein: 0, carbs: 0, fat: 0 },
  { id: 'casein-protein', nameDE: 'Casein Protein Pulver', nameEN: 'Casein protein powder', category: 'supplements', servingSize: 30, servingUnit: 'g', calories: 370, protein: 75, carbs: 7, fat: 4 },

  // ── Frühstück & Cerealien ──────────────────────────────────
  { id: 'muesli', nameDE: 'Müsli (ohne Zucker)', nameEN: 'Muesli (no sugar)', category: 'breakfast', servingSize: 60, servingUnit: 'g', calories: 355, protein: 10, carbs: 60, fat: 8 },
  { id: 'cornflakes', nameDE: 'Cornflakes', nameEN: 'Cornflakes', category: 'breakfast', servingSize: 30, servingUnit: 'g', calories: 378, protein: 7, carbs: 84, fat: 1 },
  { id: 'crunchy-muesli', nameDE: 'Knusper-Müsli', nameEN: 'Crunchy muesli', category: 'breakfast', servingSize: 50, servingUnit: 'g', calories: 450, protein: 8, carbs: 64, fat: 17 },
  { id: 'pancakes', nameDE: 'Pfannkuchen/Pancakes', nameEN: 'Pancakes', category: 'breakfast', servingSize: 75, servingUnit: 'piece', calories: 227, protein: 6.4, carbs: 28, fat: 10 },

  // ── Tiefkühl & Convenience ─────────────────────────────────
  { id: 'pizza-margherita', nameDE: 'Pizza Margherita (TK)', nameEN: 'Pizza Margherita (frozen)', category: 'frozen', servingSize: 350, servingUnit: 'piece', calories: 230, protein: 9, carbs: 30, fat: 8 },
  { id: 'pommes', nameDE: 'Pommes frites (TK)', nameEN: 'French fries (frozen)', category: 'frozen', servingSize: 150, servingUnit: 'g', calories: 274, protein: 3.5, carbs: 36, fat: 13 },
  { id: 'fischstaebchen', nameDE: 'Fischstäbchen (TK)', nameEN: 'Fish sticks (frozen)', category: 'frozen', servingSize: 100, servingUnit: 'g', calories: 204, protein: 12, carbs: 18, fat: 9 },
  { id: 'gemuese-mix-tk', nameDE: 'Gemüse-Mix (TK)', nameEN: 'Mixed vegetables (frozen)', category: 'frozen', servingSize: 150, servingUnit: 'g', calories: 50, protein: 2.5, carbs: 8, fat: 0.5 },
];

// ── Suchfunktion (lokal) ─────────────────────────────────────

export function searchLocalFoods(query, language = 'de') {
  if (!query || query.length < 2) return [];
  const q = query.toLowerCase();
  return foods.filter((f) => {
    const name = language === 'de' ? f.nameDE : f.nameEN;
    return name.toLowerCase().includes(q) || (f.brand && f.brand.toLowerCase().includes(q));
  });
}

export function getLocalFoodById(id) {
  return foods.find((f) => f.id === id);
}

export function getLocalFoodsByCategory(category) {
  return foods.filter((f) => f.category === category);
}

// Alle Kategorien
export const foodCategories = [
  { id: 'dairy', nameDE: 'Milchprodukte', nameEN: 'Dairy' },
  { id: 'eggs', nameDE: 'Eier', nameEN: 'Eggs' },
  { id: 'meat', nameDE: 'Fleisch', nameEN: 'Meat' },
  { id: 'fish', nameDE: 'Fisch', nameEN: 'Fish' },
  { id: 'grains', nameDE: 'Getreide & Beilagen', nameEN: 'Grains & Sides' },
  { id: 'bakery', nameDE: 'Brot & Backwaren', nameEN: 'Bread & Bakery' },
  { id: 'fruit', nameDE: 'Obst', nameEN: 'Fruit' },
  { id: 'vegetables', nameDE: 'Gemüse', nameEN: 'Vegetables' },
  { id: 'legumes', nameDE: 'Hülsenfrüchte', nameEN: 'Legumes' },
  { id: 'nuts', nameDE: 'Nüsse & Samen', nameEN: 'Nuts & Seeds' },
  { id: 'oils', nameDE: 'Öle & Fette', nameEN: 'Oils & Fats' },
  { id: 'drinks', nameDE: 'Getränke', nameEN: 'Drinks' },
  { id: 'snacks', nameDE: 'Snacks & Süßes', nameEN: 'Snacks & Sweets' },
  { id: 'prepared', nameDE: 'Saucen & Fertigprodukte', nameEN: 'Sauces & Prepared' },
  { id: 'supplements', nameDE: 'Supplements', nameEN: 'Supplements' },
  { id: 'breakfast', nameDE: 'Frühstück & Cerealien', nameEN: 'Breakfast & Cereals' },
  { id: 'frozen', nameDE: 'Tiefkühl & Convenience', nameEN: 'Frozen & Convenience' },
];

// ── Open Food Facts API ──────────────────────────────────────

const offCache = new Map();

export async function searchOpenFoodFacts(query, language = 'de') {
  if (!query || query.length < 3) return [];

  const cacheKey = `${query}_${language}`;
  if (offCache.has(cacheKey)) return offCache.get(cacheKey);

  try {
    const lc = language === 'de' ? 'de' : 'en';
    const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=20&lc=${lc}`;

    const res = await fetch(url);
    if (!res.ok) return [];

    const json = await res.json();
    const results = (json.products || [])
      .filter((p) => p.product_name && p.nutriments)
      .map((p) => ({
        id: `off_${p.code || p._id}`,
        nameDE: p.product_name_de || p.product_name || '',
        nameEN: p.product_name_en || p.product_name || '',
        brand: p.brands || '',
        servingSize: 100,
        servingUnit: 'g',
        calories: Math.round(p.nutriments['energy-kcal_100g'] || p.nutriments['energy-kcal'] || 0),
        protein: Math.round((p.nutriments.proteins_100g || 0) * 10) / 10,
        carbs: Math.round((p.nutriments.carbohydrates_100g || 0) * 10) / 10,
        fat: Math.round((p.nutriments.fat_100g || 0) * 10) / 10,
        fiber: Math.round((p.nutriments.fiber_100g || 0) * 10) / 10,
        sugar: Math.round((p.nutriments.sugars_100g || 0) * 10) / 10,
        source: 'openfoodfacts',
        source_id: p.code || p._id,
        incomplete: !p.nutriments['energy-kcal_100g'] || !p.nutriments.proteins_100g,
      }))
      .filter((r) => r.calories > 0 || r.protein > 0);

    offCache.set(cacheKey, results);
    return results;
  } catch {
    return [];
  }
}

// ── Makro-Berechnung für Portionsgröße ───────────────────────

export function calculateMacrosForServing(food, servingSize) {
  const factor = servingSize / 100;
  return {
    calories: Math.round(food.calories * factor),
    protein: Math.round(food.protein * factor * 10) / 10,
    carbs: Math.round(food.carbs * factor * 10) / 10,
    fat: Math.round(food.fat * factor * 10) / 10,
  };
}
