import { corsBehandeln } from './_cors.js';
import { apiSprache } from './_sprache.js';

// ── Prompt je Sprache ─────────────────────────────────────────────
//
// Das JSON-Gerüst wird BERECHNET, nicht je Sprache abgetippt. Vorher stand es
// dreimal im Code, und in der englischen Fassung war
// `"meal_description_de": "Short description in German"` stehengeblieben —
// eine Beschreibung des Feldes statt eines Beispiels. Bei sechs Sprachen wäre
// aus dem Fehler ein Muster geworden.
//
// `name_de` und `name_en` kommen IMMER mit, auch für einen arabischen Nutzer:
// Die Lebensmittelsuche und die gespeicherten Einträge hängen daran, und alte
// App-Versionen kennen nur diese beiden Felder. Die Sprache des Nutzers kommt
// als drittes Feld dazu — fehlt sie, fällt der Client sauber auf Englisch
// zurück.
const MAHLZEIT = {
  de: {
    intro: 'Du bist ein Ernährungsanalyse-Assistent. Analysiere dieses Foto einer Mahlzeit und identifiziere jedes sichtbare Lebensmittel.',
    schaetze: 'Für jedes Lebensmittel schätze:',
    felder: ['Portionsgröße in Gramm (basierend auf visueller Größe relativ zum Teller/Schüssel)', 'Kalorien (kcal)', 'Protein (g)', 'Kohlenhydrate (g)', 'Fett (g)', 'Konfidenz (high, medium, low)'],
    namenZeile: (s) => `Name auf ${s}`,
    wichtig: 'Wichtig:',
    regeln: ['Schätze Portionen basierend auf der visuellen Größe', 'Nutze Standard-Nährwertdatenbanken als Referenz', 'Gehe von einer normalen Öl-/Fettmenge bei der Zubereitung aus', 'Falls du ein Lebensmittel nicht identifizieren kannst, beschreibe es und gib deine beste Schätzung', 'Falls das Bild kein Essen zeigt, antworte mit {"error": "no_food_detected"}'],
    format: 'Antworte NUR mit validem JSON in genau diesem Format, kein anderer Text:',
    sprachname: 'Deutsch',
    beispielName: 'Hähnchenbrust',
    beispielBeschreibung: 'Kurze Beschreibung der Mahlzeit',
  },
  en: {
    intro: 'You are a nutrition analysis assistant. Analyze this meal photo and identify each visible food item.',
    schaetze: 'For each food item, estimate:',
    felder: ['Portion size in grams (based on visual size relative to plate/bowl)', 'Calories (kcal)', 'Protein (g)', 'Carbohydrates (g)', 'Fat (g)', 'Confidence level (high, medium, low)'],
    namenZeile: (s) => `Name in ${s}`,
    wichtig: 'Important:',
    regeln: ['Estimate portions based on visual size', 'Use standard nutritional databases as reference', 'Assume normal oil/fat amount in preparation', 'If you cannot identify a food, describe it and provide your best estimate', 'If the image does not show food, return {"error": "no_food_detected"}'],
    format: 'Return ONLY valid JSON in this exact format, no other text:',
    sprachname: 'English',
    beispielName: 'Chicken breast',
    beispielBeschreibung: 'Short description of the meal',
  },
  es: {
    intro: 'Eres un asistente de análisis nutricional. Analiza esta foto de una comida e identifica cada alimento visible.',
    schaetze: 'Para cada alimento, estima:',
    felder: ['Tamaño de la porción en gramos (según el tamaño visual respecto al plato/bol)', 'Calorías (kcal)', 'Proteínas (g)', 'Carbohidratos (g)', 'Grasas (g)', 'Nivel de confianza (high, medium, low)'],
    namenZeile: (s) => `Nombre en ${s}`,
    wichtig: 'Importante:',
    regeln: ['Estima las porciones según el tamaño visual', 'Usa bases de datos nutricionales estándar como referencia', 'Asume una cantidad normal de aceite/grasa en la preparación', 'Si no puedes identificar un alimento, descríbelo y da tu mejor estimación', 'Si la imagen no muestra comida, responde con {"error": "no_food_detected"}'],
    format: 'Responde SOLO con JSON válido exactamente en este formato, sin ningún otro texto:',
    sprachname: 'español',
    beispielName: 'Pechuga de pollo',
    beispielBeschreibung: 'Breve descripción de la comida',
  },
  fr: {
    intro: 'Tu es un assistant d’analyse nutritionnelle. Analyse cette photo de repas et identifie chaque aliment visible.',
    schaetze: 'Pour chaque aliment, estime :',
    felder: ['Taille de la portion en grammes (d’après la taille visuelle par rapport à l’assiette ou au bol)', 'Calories (kcal)', 'Protéines (g)', 'Glucides (g)', 'Lipides (g)', 'Niveau de confiance (high, medium, low)'],
    namenZeile: (s) => `Nom en ${s}`,
    wichtig: 'Important :',
    regeln: ['Estime les portions d’après la taille visuelle', 'Utilise des bases de données nutritionnelles standard comme référence', 'Suppose une quantité normale d’huile ou de matière grasse à la préparation', 'Si tu ne peux pas identifier un aliment, décris-le et donne ta meilleure estimation', 'Si l’image ne montre pas de nourriture, réponds {"error": "no_food_detected"}'],
    format: 'Réponds UNIQUEMENT avec du JSON valide, exactement dans ce format, sans aucun autre texte :',
    sprachname: 'français',
    beispielName: 'Blanc de poulet',
    beispielBeschreibung: 'Brève description du repas',
  },
  pt: {
    intro: 'Você é um assistente de análise nutricional. Analise esta foto de uma refeição e identifique cada alimento visível.',
    schaetze: 'Para cada alimento, estime:',
    felder: ['Tamanho da porção em gramas (conforme o tamanho visual em relação ao prato ou à tigela)', 'Calorias (kcal)', 'Proteínas (g)', 'Carboidratos (g)', 'Gorduras (g)', 'Nível de confiança (high, medium, low)'],
    namenZeile: (s) => `Nome em ${s}`,
    wichtig: 'Importante:',
    regeln: ['Estime as porções conforme o tamanho visual', 'Use bases de dados nutricionais padrão como referência', 'Considere uma quantidade normal de óleo ou gordura no preparo', 'Se não conseguir identificar um alimento, descreva-o e dê sua melhor estimativa', 'Se a imagem não mostrar comida, responda com {"error": "no_food_detected"}'],
    format: 'Responda APENAS com JSON válido exatamente neste formato, sem nenhum outro texto:',
    sprachname: 'português',
    beispielName: 'Peito de frango',
    beispielBeschreibung: 'Breve descrição da refeição',
  },
  ar: {
    intro: 'أنت مساعد لتحليل التغذية. حلّل صورة الوجبة هذه وحدّد كل طعام ظاهر فيها.',
    schaetze: 'وقدّر لكل طعام:',
    felder: ['حجم الحصة بالغرامات (بحسب الحجم المرئي نسبةً إلى الطبق أو الوعاء)', 'السعرات (kcal)', 'البروتين (g)', 'الكربوهيدرات (g)', 'الدهون (g)', 'درجة الثقة (high, medium, low)'],
    namenZeile: (s) => `الاسم بـ${s}`,
    wichtig: 'مهم:',
    regeln: ['قدّر الحصص بحسب الحجم المرئي', 'استعمل قواعد بيانات التغذية المعيارية مرجعًا', 'افترض كمية زيت أو دهن معتادة في التحضير', 'وإن تعذّر عليك تحديد طعام، فصفه وأعطِ أفضل تقدير لديك', 'وإن لم تُظهر الصورة طعامًا، فأجب بـ {"error": "no_food_detected"}'],
    format: 'أجب فقط بـJSON صالح بهذه الصيغة تمامًا، بلا أي نص آخر:',
    sprachname: 'العربية',
    beispielName: 'صدر دجاج',
    beispielBeschreibung: 'وصف موجز للوجبة',
  },
  nl: {
    intro: 'Je bent een assistent voor voedingsanalyse. Analyseer deze foto van een maaltijd en herken elk zichtbaar voedingsmiddel.',
    schaetze: 'Schat voor elk voedingsmiddel:',
    felder: ['Portiegrootte in gram (op basis van de zichtbare grootte ten opzichte van het bord of de kom)', 'Calorieën (kcal)', 'Eiwitten (g)', 'Koolhydraten (g)', 'Vetten (g)', 'Betrouwbaarheid (high, medium, low)'],
    namenZeile: (s) => `Naam in ${s}`,
    wichtig: 'Belangrijk:',
    regeln: ['Schat porties op basis van de zichtbare grootte', 'Gebruik standaard voedingsdatabases als referentie', 'Ga uit van een normale hoeveelheid olie of vet bij de bereiding', 'Als je een voedingsmiddel niet kunt herkennen, beschrijf het en geef je beste schatting', 'Als de afbeelding geen eten toont, antwoord dan met {"error": "no_food_detected"}'],
    format: 'Antwoord ALLEEN met geldige JSON in precies dit formaat, zonder andere tekst:',
    sprachname: 'Nederlands',
    beispielName: 'Kipfilet',
    beispielBeschreibung: 'Korte beschrijving van de maaltijd',
  },
  pl: {
    intro: 'Jesteś asystentem do analizy żywienia. Przeanalizuj to zdjęcie posiłku i rozpoznaj każdy widoczny produkt.',
    schaetze: 'Dla każdego produktu oszacuj:',
    felder: ['Wielkość porcji w gramach (na podstawie wielkości widocznej w stosunku do talerza/miski)', 'Kalorie (kcal)', 'Białko (g)', 'Węglowodany (g)', 'Tłuszcz (g)', 'Poziom pewności (high, medium, low)'],
    namenZeile: (s) => `Nazwa w językach: ${s}`,
    wichtig: 'Ważne:',
    regeln: ['Szacuj porcje na podstawie widocznej wielkości', 'Korzystaj ze standardowych baz danych wartości odżywczych jako punktu odniesienia', 'Przyjmij normalną ilość oleju/tłuszczu użytego do przygotowania', 'Jeśli nie możesz rozpoznać produktu, opisz go i podaj swoje najlepsze oszacowanie', 'Jeśli zdjęcie nie przedstawia jedzenia, odpowiedz {"error": "no_food_detected"}'],
    format: 'Odpowiedz WYŁĄCZNIE poprawnym JSON-em dokładnie w tym formacie, bez żadnego innego tekstu:',
    sprachname: 'polski',
    beispielName: 'Pierś z kurczaka',
    beispielBeschreibung: 'Krótki opis posiłku',
  },
};

export function mahlzeitPrompt(sprache) {
  // ⚠ Selbst normalisieren, nicht auf den Aufrufer verlassen. Ohne diese Zeile
  // baut ein roher Code wie 'kl-KL' oder 'pt-BR' ein Feld `name_kl-KL` ins
  // JSON-Gerüst — der Test hat genau das gefangen.
  const lang = apiSprache(sprache);
  const t = MAHLZEIT[lang];
  // de und en immer, die Nutzersprache zusätzlich — und nur einmal.
  const codes = [...new Set(['de', 'en', lang])];
  // `codes` enthält nach der Normalisierung nur bekannte Codes — kein
  // zusätzlicher Rückfall nötig.
  //
  // Die Sprachen werden als `de (Deutsch)` genannt, nicht bloß als „Deutsch":
  // Der Code stellt den Bezug zum JSON-Feld `name_de` her. Ohne ihn muss das
  // Modell raten, welcher Name zu welchem Feld gehört — und der Satz „الاسم
  // بـDeutsch, English" liest sich zudem in keiner Sprache gut.
  const sprachnamen = codes.map((c) => `${c} (${MAHLZEIT[c].sprachname})`).join(', ');
  const namensfelder = codes.map((c) => `      "name_${c}": "${MAHLZEIT[c].beispielName}"`).join(',\n');
  const beschreibungen = codes.map((c) => `  "meal_description_${c}": "${MAHLZEIT[c].beispielBeschreibung}"`).join(',\n');

  return `${t.intro}

${t.schaetze}
- ${t.namenZeile(sprachnamen)}
${t.felder.map((f) => `- ${f}`).join('\n')}

${t.wichtig}
${t.regeln.map((r) => `- ${r}`).join('\n')}

${t.format}
{
  "items": [
    {
${namensfelder},
      "portion_g": 150,
      "calories": 248,
      "protein": 46.5,
      "carbs": 0,
      "fat": 5.4,
      "confidence": "high"
    }
  ],
${beschreibungen}
}`;
}

export default async function handler(req, res) {
  if (corsBehandeln(req, res)) return; // Preflight der nativen App
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  // Nur eingeloggte User dürfen die (kostenpflichtige) KI-Analyse nutzen —
  // sonst könnte jeder im Internet den Gemini-Schlüssel auf unsere Kosten verwenden.
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  // Fail-closed: fehlt die Auth-Konfiguration, wird die (kostenpflichtige)
  // Analyse NICHT durchgelassen — sonst wäre der Gemini-Schlüssel bei einem
  // fehlkonfigurierten Deploy offen für jeden im Internet.
  if (!supabaseUrl || !anonKey) {
    console.error('Auth not configured: SUPABASE_URL/ANON_KEY missing — refusing request');
    return res.status(503).json({ error: 'Service unavailable' });
  }
  const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  if (!token) {
    return res.status(401).json({ error: 'Login required' });
  }
  let userRes;
  try {
    userRes = await fetch(`${supabaseUrl}/auth/v1/user`, {
      headers: { apikey: anonKey, Authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(8000),
    });
  } catch {
    return res.status(503).json({ error: 'Auth check failed' });
  }
  if (!userRes.ok) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  const { image, language = 'de' } = req.body;
  if (!image) {
    return res.status(400).json({ error: 'No image provided' });
  }

  // Strip data URL prefix if present
  const base64Data = image.replace(/^data:image\/\w+;base64,/, '');

  // Reject oversized payloads (max ~3MB base64 ≈ ~2.25MB image)
  if (base64Data.length > 4_000_000) {
    return res.status(413).json({ error: 'Image too large. Please use a compressed image under 3MB.' });
  }

  const prompt = mahlzeitPrompt(apiSprache(language));

  // ⚠ Modellname synchron mit api/coach.js halten und NIE raten — mit
  // /api/gemini-modelle?probe=<name> nachmessen. 2.0-flash abgeschaltet,
  // 2.5-flash „not available to new users"; 3.6-flash geprueft (31.08.2026).
  const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`;
  const geminiBody = JSON.stringify({
    contents: [
      {
        parts: [
          {
            inline_data: {
              mime_type: 'image/jpeg',
              data: base64Data,
            },
          },
          {
            text: prompt,
          },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.1,
      maxOutputTokens: 1024,
      responseMimeType: 'application/json',
    },
  });

  // Retry with exponential backoff for rate limits (429)
  const MAX_RETRIES = 3;
  let lastError = null;
  let last429 = false;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    // Zu Beginn JEDES Versuchs zurücksetzen, damit am Ende nur der letzte
    // Ausgang zählt. Stünde das erst nach dem fetch, bliebe ein 429 aus einem
    // früheren Versuch stehen, wenn der fetch danach wirft (Netz/Timeout) —
    // der Nutzer sähe dann „Rate-Limit" und wartete auf ein Kontingent, das
    // gar nicht das Problem war.
    last429 = false;
    try {
      const response = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: geminiBody,
        signal: AbortSignal.timeout(20000),
      });

      // Rate limited — wait and retry
      if (response.status === 429) {
        last429 = true;
        const waitSeconds = Math.pow(2, attempt + 1); // 2s, 4s, 8s
        console.log(`Rate limited (429), retrying in ${waitSeconds}s (attempt ${attempt + 1}/${MAX_RETRIES})`);
        await new Promise((r) => setTimeout(r, waitSeconds * 1000));
        continue;
      }

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Gemini API error:', response.status, errorData);
        return res.status(502).json({ error: 'AI service error', detail: `Status ${response.status}` });
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!text) {
        return res.status(502).json({ error: 'Empty AI response' });
      }

      // Parse JSON from response
      let parsed;
      try {
        const jsonStr = text.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
        parsed = JSON.parse(jsonStr);
      } catch {
        console.error('Failed to parse AI response:', text);
        return res.status(422).json({ error: 'Could not parse AI response' });
      }

      return res.status(200).json(parsed);
    } catch (err) {
      lastError = err;
      console.error(`Attempt ${attempt + 1} failed:`, err.message);
      if (attempt < MAX_RETRIES - 1) {
        await new Promise((r) => setTimeout(r, Math.pow(2, attempt + 1) * 1000));
      }
    }
  }

  console.error('All retries failed:', lastError);
  // Nur echtes Rate-Limit als 429 melden; Netzwerk-/Timeout-Fehler sonst
  // fälschlich als „Rate-Limit" (der Nutzer wartet dann vergeblich).
  if (last429) {
    return res.status(429).json({ error: 'rate_limit', message: 'AI service is busy. Please wait a moment and try again.' });
  }
  return res.status(503).json({ error: 'ai_unavailable', message: 'AI service unavailable. Please try again.' });
}
