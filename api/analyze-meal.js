export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  const { image, language = 'de' } = req.body;
  if (!image) {
    return res.status(400).json({ error: 'No image provided' });
  }

  // Strip data URL prefix if present
  const base64Data = image.replace(/^data:image\/\w+;base64,/, '');

  const prompt = language === 'de'
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

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
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
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Gemini API error:', response.status, errorData);
      return res.status(502).json({ error: 'AI service error' });
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

    if (parsed.error) {
      return res.status(200).json(parsed);
    }

    return res.status(200).json(parsed);
  } catch (err) {
    console.error('Analyze meal error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
