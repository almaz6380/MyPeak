// FullRep KI-Coach — Vercel Serverless Function.
// Beantwortet ausschließlich Fragen zu Training, Ernährung und Supplementen.
// Premium-Feature mit serverseitigem Tageskontingent pro Nutzer.
//
// Modell: Ist ANTHROPIC_API_KEY gesetzt, antwortet ausschließlich Claude
// (api/_ki.js, seit 05.10.2026). Nur ohne diesen Schlüssel noch Gemini.
//
// Benötigte Env-Vars: ANTHROPIC_API_KEY (sonst GEMINI_API_KEY),
// SUPABASE_URL(+ANON), SUPABASE_SERVICE_ROLE_KEY.

import coachKnowledge from './_coachKnowledge.js';
import { corsBehandeln } from './_cors.js';
import { claudeAktiv, claudeText } from './_ki.js';
import { apiSprache } from './_sprache.js';

const TRIAL_LIMIT = 5;     // Coach-Fragen/Tag während der Testphase
const PREMIUM_LIMIT = 30;  // Coach-Fragen/Tag mit bezahltem Premium
const MAX_HISTORY = 12;    // wie viele Nachrichten Verlauf ans Modell gehen

function todayUTC() {
  return new Date().toISOString().slice(0, 10);
}

// Keyword-Retrieval über die lokale Coach-Wissensbasis (kein Web-Zugriff).
function retrieve(question, max = 3) {
  const q = String(question || '').toLowerCase();
  return coachKnowledge
    .map((e) => {
      let score = 0;
      for (const kw of e.keywords) if (kw && q.includes(kw)) score += 1;
      if (q.includes(String(e.id).toLowerCase())) score += 1;
      return { e, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, max)
    .map((x) => x.e);
}

// Die Wissensbasis (`_coachKnowledge.js`) liegt nur auf DE und EN vor. Das ist
// Absicht und bleibt so: Sie besteht aus Studienzusammenfassungen mit Quellen,
// und eine maschinell übersetzte Quellenangabe wäre schlechter als eine
// englische. Das MODELL antwortet trotzdem in der Nutzersprache — der Prompt
// sagt ihm ausdrücklich, dass die Wissensbasis englisch sein darf.
function knowledgeBlock(entries, lang) {
  if (!entries.length) return '';
  const deutsch = lang === 'de';
  return entries
    .map((e) => {
      const brief = deutsch ? e.briefDE : e.briefEN;
      const src = e.sources?.length ? `\n[${deutsch ? 'Quellen' : 'Sources'}: ${e.sources.join('; ')}]` : '';
      return `### ${e.id}\n${brief}${src}`;
    })
    .join('\n\n');
}

// Ein Eintrag je Sprache statt verschachtelter Ternaries. Der frühere Aufbau
// (`if (lang === 'es') … ; lang === 'en' ? … : …`) hätte bei sechs Sprachen
// fünf Sonderfälle gebraucht — und genau dabei ist der es-Zweig übersehen
// worden, weil ihn nie jemand erreicht hat.
//
// `wissensbasis` erwähnt ausdrücklich, dass die Wissensbasis auf Englisch
// vorliegen kann: Sonst antwortet das Modell gern in der Sprache der Quelle
// statt in der des Nutzers.
const PROMPTS = {
  de: {
    basis: `Du bist der FullRep Fitness-Coach. Du hilfst bei Fragen zu Training, Ernährung, Nahrungsergänzungsmitteln (Supplementen) sowie zur groben Einordnung von Blutwerten.

REGELN:
- Beantworte NUR Fragen zu diesen Themen (Training, Ernährung, Supplemente, Blutwerte). Bei allem anderen (Programmieren, Politik, Beziehungen, Rechts-/Steuerfragen, allgemeines Wissen usw.) lehne freundlich ab und lenke zurück.
- Blutwerte: Du darfst einzelne Werte GROB einordnen — erklären, was ein Marker bedeutet, ob er ungefähr im üblichen Referenzbereich liegt und welche Ernährungs-/Lebensstil-Faktoren ihn beeinflussen. Stelle dabei KEINE Diagnose und empfiehl keine Medikamente oder Therapien. Weise IMMER darauf hin, dass dies keine ärztliche Beurteilung ersetzt und auffällige Werte mit einer Ärztin / einem Arzt besprochen werden sollten.
- Gib generell keine medizinischen Diagnosen und keine Dosierungsempfehlungen für verschreibungspflichtige oder verbotene Substanzen.
- Antworte kurz, konkret und praxisnah. Nutze bei Bedarf kurze Aufzählungen.
- Antworte auf Deutsch.`,
    wissensbasis: (kb) => `\n\nGEPRÜFTE WISSENSBASIS — bevorzugt verwenden und die Quellen nennen; erfinde niemals Studien oder Quellen. Deckt sie die Frage nicht ab, antworte aus allgemeinem Fitnesswissen und weise transparent darauf hin. Antworte immer auf Deutsch, auch wenn die Wissensbasis englisch ist:\n\n${kb}`,
  },
  en: {
    basis: `You are the FullRep fitness coach. You help with questions about training, nutrition, dietary supplements, and the rough interpretation of blood work.

RULES:
- Answer ONLY questions about these topics (training, nutrition, supplements, blood work). For anything else (coding, politics, relationships, legal/tax topics, general knowledge, etc.), politely decline and steer back.
- Blood work: you MAY give a rough interpretation of individual values — explain what a marker means, whether it is roughly within the common reference range, and which nutrition/lifestyle factors influence it. Do NOT make a diagnosis and do NOT recommend medication or therapies. ALWAYS state that this does not replace a medical assessment and that abnormal values should be discussed with a doctor.
- Generally give no medical diagnoses and no dosing advice for prescription or banned substances.
- Be concise, concrete, and practical. Use short bullet lists when helpful.
- Reply in English.`,
    wissensbasis: (kb) => `\n\nVERIFIED KNOWLEDGE BASE — prefer this and cite the sources; never invent studies or sources. If it does not cover the question, answer from general fitness knowledge and say so transparently:\n\n${kb}`,
  },
  es: {
    basis: `Eres el coach de fitness de FullRep. Ayudas con preguntas sobre entrenamiento, nutrición, suplementos dietéticos y la interpretación aproximada de análisis de sangre.

REGLAS:
- Responde SOLO preguntas sobre estos temas (entrenamiento, nutrición, suplementos, análisis de sangre). Para todo lo demás (programación, política, relaciones, temas legales/fiscales, cultura general, etc.), declina amablemente y reconduce.
- Análisis de sangre: PUEDES dar una interpretación aproximada de valores individuales — explicar qué significa un marcador, si está aproximadamente dentro del rango de referencia habitual y qué factores de nutrición/estilo de vida influyen en él. NO hagas diagnósticos y NO recomiendes medicamentos ni terapias. Indica SIEMPRE que esto no sustituye una valoración médica y que los valores anómalos deben comentarse con un médico.
- En general, no des diagnósticos médicos ni pautas de dosificación de sustancias con receta o prohibidas.
- Sé conciso, concreto y práctico. Usa listas breves cuando ayuden.
- Responde en español.`,
    wissensbasis: (kb) => `\n\nBASE DE CONOCIMIENTO VERIFICADA — úsala con preferencia y cita las fuentes; no inventes nunca estudios ni fuentes. Si no cubre la pregunta, responde con conocimiento general de fitness y dilo con transparencia. Responde siempre en español, aunque la base de conocimiento esté en inglés:\n\n${kb}`,
  },
  fr: {
    basis: `Tu es le coach fitness de FullRep. Tu aides sur les questions d’entraînement, de nutrition, de compléments alimentaires et sur l’interprétation approximative d’analyses de sang.

RÈGLES :
- Réponds UNIQUEMENT aux questions sur ces sujets (entraînement, nutrition, compléments, analyses de sang). Pour tout le reste (programmation, politique, relations, questions juridiques/fiscales, culture générale, etc.), décline poliment et ramène au sujet.
- Analyses de sang : tu PEUX donner une interprétation approximative de valeurs isolées — expliquer ce que signifie un marqueur, s’il se situe à peu près dans l’intervalle de référence habituel et quels facteurs d’alimentation ou de mode de vie l’influencent. Ne pose AUCUN diagnostic et ne recommande ni médicament ni traitement. Précise TOUJOURS que cela ne remplace pas une évaluation médicale et que les valeurs anormales doivent être discutées avec un médecin.
- De manière générale, ne donne aucun diagnostic médical ni conseil de dosage pour des substances sur ordonnance ou interdites.
- Sois bref, concret et pratique. Utilise de courtes listes quand cela aide.
- Réponds en français.`,
    wissensbasis: (kb) => `\n\nBASE DE CONNAISSANCES VÉRIFIÉE — privilégie-la et cite les sources ; n’invente jamais d’études ni de sources. Si elle ne couvre pas la question, réponds à partir de connaissances générales en fitness et dis-le en toute transparence. Réponds toujours en français, même si la base de connaissances est en anglais :\n\n${kb}`,
  },
  pt: {
    basis: `Você é o coach de fitness do FullRep. Você ajuda com perguntas sobre treino, nutrição, suplementos alimentares e a interpretação aproximada de exames de sangue.

REGRAS:
- Responda APENAS a perguntas sobre esses temas (treino, nutrição, suplementos, exames de sangue). Para todo o resto (programação, política, relacionamentos, questões jurídicas/fiscais, conhecimentos gerais etc.), recuse com gentileza e traga a conversa de volta.
- Exames de sangue: você PODE dar uma interpretação aproximada de valores isolados — explicar o que significa um marcador, se ele está mais ou menos dentro da faixa de referência habitual e quais fatores de alimentação e estilo de vida o influenciam. NÃO faça diagnósticos e NÃO recomende medicamentos nem tratamentos. Diga SEMPRE que isso não substitui uma avaliação médica e que valores alterados devem ser discutidos com um médico.
- Em geral, não dê diagnósticos médicos nem orientações de dosagem de substâncias sob prescrição ou proibidas.
- Seja breve, concreto e prático. Use listas curtas quando ajudarem.
- Responda em português.`,
    wissensbasis: (kb) => `\n\nBASE DE CONHECIMENTO VERIFICADA — use-a com preferência e cite as fontes; nunca invente estudos ou fontes. Se ela não cobrir a pergunta, responda com conhecimento geral de fitness e diga isso com transparência. Responda sempre em português, mesmo que a base de conhecimento esteja em inglês:\n\n${kb}`,
  },
  ar: {
    basis: `أنت مدرّب اللياقة في FullRep. تساعد في الأسئلة عن التدريب والتغذية والمكمّلات الغذائية وفي التقدير التقريبي لقيم فحوص الدم.

القواعد:
- أجب فقط عن الأسئلة في هذه الموضوعات (التدريب، التغذية، المكمّلات، فحوص الدم). وفي كل ما عداها (البرمجة، السياسة، العلاقات، المسائل القانونية والضريبية، المعارف العامة وغيرها) اعتذر بلطف وأعد الحديث إلى موضوعه.
- فحوص الدم: يجوز لك تقدير القيم المفردة تقديرًا تقريبيًا — أن تشرح ما يعنيه الواسم، وهل هو تقريبًا ضمن المجال المرجعي المعتاد، وأي عوامل التغذية ونمط الحياة تؤثّر فيه. ولا تضع أي تشخيص ولا توصِ بدواء أو علاج. ونبّه دائمًا إلى أن هذا لا يغني عن تقييم الطبيب وأن القيم الشاذّة ينبغي مناقشتها مع طبيب.
- ولا تعطِ عمومًا تشخيصات طبية ولا توصيات جرعات لمواد موصوفة أو ممنوعة.
- أجب بإيجاز وتحديد وعملية. واستعمل قوائم قصيرة عند الحاجة.
- أجب بالعربية.`,
    wissensbasis: (kb) => `\n\nقاعدة معرفة موثّقة — فضّلها واذكر مصادرها؛ ولا تختلق دراسات ولا مصادر أبدًا. وإن لم تغطِّ السؤال، فأجب من معرفة اللياقة العامة وقل ذلك بوضوح. وأجب دائمًا بالعربية حتى لو كانت قاعدة المعرفة بالإنكليزية:\n\n${kb}`,
  },
};

function systemPrompt(lang, kb) {
  const p = PROMPTS[lang] || PROMPTS.en;
  return kb ? p.basis + p.wissensbasis(kb) : p.basis;
}

// ── Modell-Aufrufe ────────────────────────────────────────────────
async function callGemini(apiKey, sys, messages, signal) {
  const contents = messages.map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: String(m.content || '') }],
  }));
  // ⚠ Modellname NIE raten — mit /api/gemini-modelle?probe=<name> nachmessen.
  // 31.08.2026: 2.0-flash war abgeschaltet (404), der Nutzer sah nur „Coach
  // nicht erreichbar". 2.5-flash stand zwar in ListModels, generateContent
  // meldete aber: „no longer available to new users … use gemini-3.6-flash".
  // 3.6-flash ist mit dem echten Schluessel geprueft (200).
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: sys }] },
      contents,
      generationConfig: { temperature: 0.4, maxOutputTokens: 800 },
    }),
    signal,
  });
  if (!res.ok) throw new Error('gemini_' + res.status);
  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('gemini_empty');
  return text.trim();
}

// Ist ein Claude-Schlüssel gesetzt, antwortet NUR Claude — ohne Ausweichen auf
// Gemini (Begründung in api/_ki.js). Ohne Schlüssel bleibt es bei Gemini.
async function generateReply(sys, messages) {
  if (claudeAktiv()) {
    return claudeText({ system: sys, messages, timeoutMs: 25000 });
  }
  const geminiKey = process.env.GEMINI_API_KEY;
  if (!geminiKey) throw new Error('no_model_configured');
  return callGemini(geminiKey, sys, messages, AbortSignal.timeout(22000));
}

// ── Supabase (Service-Role) ───────────────────────────────────────
async function sbFetch(supabaseUrl, serviceKey, path, init = {}) {
  return fetch(`${supabaseUrl}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  });
}

export default async function handler(req, res) {
  if (corsBehandeln(req, res)) return; // Preflight der nativen App
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // Fail-closed: ohne Auth-/Service-Konfiguration keine (kostenpflichtige) Nutzung.
  if (!supabaseUrl || !anonKey || !serviceKey) {
    console.error('Coach: Supabase not fully configured');
    return res.status(503).json({ error: 'Service unavailable' });
  }

  // 1) Auth: gültiges Nutzer-Token nötig; Nutzer-ID auslesen.
  const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  if (!token) return res.status(401).json({ error: 'Login required' });

  let userId;
  try {
    const userRes = await fetch(`${supabaseUrl}/auth/v1/user`, {
      headers: { apikey: anonKey, Authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(8000),
    });
    if (!userRes.ok) return res.status(401).json({ error: 'Invalid token' });
    const user = await userRes.json();
    userId = user?.id;
  } catch {
    return res.status(503).json({ error: 'Auth check failed' });
  }
  if (!userId) return res.status(401).json({ error: 'Invalid token' });

  // 2) Premium/Trial aktiv? (Coach ist ein Premium-Feature)
  let dailyLimit;
  try {
    const subRes = await sbFetch(supabaseUrl, serviceKey, `subscriptions?user_id=eq.${userId}&select=trial_ends_at,premium_until`);
    const rows = subRes.ok ? await subRes.json() : [];
    const sub = rows[0] || {};
    const now = Date.now();
    const premium = sub.premium_until && new Date(sub.premium_until).getTime() > now;
    const trial = sub.trial_ends_at && new Date(sub.trial_ends_at).getTime() > now;
    if (premium) dailyLimit = PREMIUM_LIMIT;
    else if (trial) dailyLimit = TRIAL_LIMIT;
    else return res.status(403).json({ error: 'premium_required' });
  } catch {
    return res.status(503).json({ error: 'Subscription check failed' });
  }

  // 3) Tageskontingent prüfen (serverseitig, nicht manipulierbar).
  const date = todayUTC();
  let usedCount;
  try {
    const uRes = await sbFetch(supabaseUrl, serviceKey, `coach_usage?user_id=eq.${userId}&date=eq.${date}&select=count`);
    const rows = uRes.ok ? await uRes.json() : [];
    usedCount = rows[0]?.count || 0;
  } catch {
    return res.status(503).json({ error: 'Quota check failed' });
  }
  if (usedCount >= dailyLimit) {
    return res.status(429).json({ error: 'quota_exceeded', remaining: 0 });
  }

  // 4) Eingabe validieren.
  const { messages, lang } = req.body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'No messages' });
  }
  const trimmed = messages.slice(-MAX_HISTORY).map((m) => ({
    role: m.role === 'assistant' ? 'assistant' : 'user',
    content: String(m.content || '').slice(0, 2000),
  }));
  const outLang = apiSprache(lang);
  const lastUserMsg = [...trimmed].reverse().find((m) => m.role === 'user')?.content || '';
  const kb = knowledgeBlock(retrieve(lastUserMsg), outLang);
  const sys = systemPrompt(outLang, kb);

  // 5) Antwort generieren.
  let reply;
  try {
    reply = await generateReply(sys, trimmed);
  } catch (err) {
    console.error('Coach model error:', err?.message);
    return res.status(503).json({ error: 'ai_unavailable' });
  }

  // 6) Kontingent hochzählen (nach erfolgreicher Antwort).
  try {
    await sbFetch(supabaseUrl, serviceKey, 'coach_usage', {
      method: 'POST',
      headers: { Prefer: 'resolution=merge-duplicates' },
      body: JSON.stringify({ user_id: userId, date, count: usedCount + 1, updated_at: new Date().toISOString() }),
    });
  } catch (err) {
    console.error('Coach quota update failed (non-fatal):', err?.message);
  }

  return res.status(200).json({ reply, remaining: Math.max(0, dailyLimit - usedCount - 1) });
}
