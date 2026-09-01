import { corsBehandeln } from './_cors.js';

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

  // Fuer es kommen name_es/meal_description_es ZUSAETZLICH zu de/en mit —
  // die Client-Weichen fallen auf en zurueck, wenn ein Feld fehlt (alte
  // App-Versionen schicken weiter nur de/en und bleiben unberuehrt).
  const prompt = language === 'es'
    ? `Eres un asistente de análisis nutricional. Analiza esta foto de una comida e identifica cada alimento visible.

Para cada alimento, estima:
- Nombre en español, alemán e inglés
- Tamaño de la porción en gramos (según el tamaño visual respecto al plato/bol)
- Calorías (kcal)
- Proteínas (g)
- Carbohidratos (g)
- Grasas (g)
- Nivel de confianza (high, medium, low)

Importante:
- Estima las porciones según el tamaño visual
- Usa bases de datos nutricionales estándar como referencia
- Asume una cantidad normal de aceite/grasa en la preparación
- Si no puedes identificar un alimento, descríbelo y da tu mejor estimación
- Si la imagen no muestra comida, responde con {"error": "no_food_detected"}

Responde SOLO con JSON válido exactamente en este formato, sin ningún otro texto:
{
  "items": [
    {
      "name_es": "Pechuga de pollo",
      "name_de": "Hähnchenbrust",
      "name_en": "Chicken breast",
      "portion_g": 150,
      "calories": 248,
      "protein": 46.5,
      "carbs": 0,
      "fat": 5.4,
      "confidence": "high"
    }
  ],
  "meal_description_es": "Breve descripción de la comida",
  "meal_description_de": "Kurze Beschreibung der Mahlzeit",
  "meal_description_en": "Short description of the meal"
}`
    : language === 'de'
    ? `Du bist ein Ernährungsanalyse-Assistent. Analysiere dieses Foto einer Mahlzeit und identifiziere jedes sichtbare Lebensmittel.

Für jedes Lebensmittel schätze:
- Name auf Deutsch und Englisch
- Portionsgröße in Gramm (basierend auf visueller Größe relativ zum Teller/Schüssel)
- Kalorien (kcal)
- Protein (g)
- Kohlenhydrate (g)
- Fett (g)
- Konfidenz (high, medium, low)

Wichtig:
- Schätze Portionen basierend auf der visuellen Größe
- Nutze Standard-Nährwertdatenbanken als Referenz
- Gehe von einer normalen Öl-/Fettmenge bei der Zubereitung aus
- Falls du ein Lebensmittel nicht identifizieren kannst, beschreibe es und gib deine beste Schätzung
- Falls das Bild kein Essen zeigt, antworte mit {"error": "no_food_detected"}

Antworte NUR mit validem JSON in genau diesem Format, kein anderer Text:
{
  "items": [
    {
      "name_de": "Hähnchenbrust",
      "name_en": "Chicken breast",
      "portion_g": 150,
      "calories": 248,
      "protein": 46.5,
      "carbs": 0,
      "fat": 5.4,
      "confidence": "high"
    }
  ],
  "meal_description_de": "Kurze Beschreibung der Mahlzeit",
  "meal_description_en": "Short description of the meal"
}`
    : `You are a nutrition analysis assistant. Analyze this meal photo and identify each visible food item.

For each food item, estimate:
- Name in both German and English
- Portion size in grams (based on visual size relative to plate/bowl)
- Calories (kcal)
- Protein (g)
- Carbohydrates (g)
- Fat (g)
- Confidence level (high, medium, low)

Important:
- Estimate portions based on visual size
- Use standard nutritional databases as reference
- Assume normal oil/fat amount in preparation
- If you cannot identify a food, describe it and provide your best estimate
- If the image does not show food, return {"error": "no_food_detected"}

Return ONLY valid JSON in this exact format, no other text:
{
  "items": [
    {
      "name_de": "Hähnchenbrust",
      "name_en": "Chicken breast",
      "portion_g": 150,
      "calories": 248,
      "protein": 46.5,
      "carbs": 0,
      "fat": 5.4,
      "confidence": "high"
    }
  ],
  "meal_description_de": "Short description in German",
  "meal_description_en": "Short description of the meal"
}`;

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
