// Gemeinsamer Zugang zu Claude für alle KI-Endpunkte (Coach, Mahlzeit-Foto,
// Nährwerttabelle, Ernährungsplan).
//
// Seit 05.10.2026 gilt: Ist ANTHROPIC_API_KEY gesetzt, läuft JEDE KI-Funktion
// über Claude — ohne Ausweichen auf Gemini. Grund ist der Datenschutz, nicht
// die Qualität: Die kostenlose Gemini-Stufe verwendet Eingaben für Googles
// Produktverbesserung und darf laut Googles Bedingungen Nutzern im EWR gar
// nicht angeboten werden. Bei Anthropic gilt das DPA der Commercial Terms, und
// Eingaben werden nicht zum Training verwendet. Ein stilles Ausweichen auf
// Gemini bei einem Claude-Fehler würde genau diese Zusage brechen.
//
// Ohne Schlüssel bleibt alles wie vorher (Gemini), damit ein Deploy ohne
// hinterlegten Schlüssel nichts kaputt macht.
//
// ⚠ Zeitbudget: Die Apps im Store haben feste Zeitlimits eingebaut (Coach
// 28 s, Foto 25 s, Etikett 28 s, Plan 35 s). Jeder Aufruf hier muss DARUNTER
// fertig sein, sonst bricht die App ab, während wir noch bezahlen. Deshalb
// kein automatischer Wiederholversuch und Aufwand standardmäßig „low“.
// Beides lässt sich ohne Code in Cloudflare umstellen (CLAUDE_MODELL,
// CLAUDE_EFFORT).

import Anthropic from '@anthropic-ai/sdk';
import { geminiJson } from './_premium.js';

export const CLAUDE_STANDARD_MODELL = 'claude-opus-5-5';

export function claudeAktiv() {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}

function claudeModell() {
  return process.env.CLAUDE_MODELL || CLAUDE_STANDARD_MODELL;
}

// Haiku kennt den Aufwand-Regler nicht und antwortet darauf mit 400.
function aufwand(modell) {
  const effort = process.env.CLAUDE_EFFORT ?? 'low';
  if (!effort || modell.includes('haiku')) return undefined;
  return { effort };
}

// Der Client wird je Aufruf gebaut: Das SDK merkt sich `fetch` beim Anlegen,
// und auf Cloudflare liegt der Schlüssel erst je Anfrage in process.env.
function client(timeoutMs) {
  return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY, maxRetries: 0, timeout: timeoutMs });
}

async function anfrage({ system, messages, maxTokens, timeoutMs }) {
  const model = claudeModell();
  const output_config = aufwand(model);
  const antwort = await client(timeoutMs).messages.create({
    model,
    max_tokens: maxTokens,
    ...(system ? { system } : {}),
    messages,
    ...(output_config ? { output_config } : {}),
  });
  if (antwort.stop_reason === 'refusal') throw new Error('claude_refusal');
  const text = antwort.content
    .filter((b) => b.type === 'text')
    .map((b) => b.text)
    .join('')
    .trim();
  if (!text) throw new Error(antwort.stop_reason === 'max_tokens' ? 'claude_max_tokens' : 'claude_empty');
  return { text, stopReason: antwort.stop_reason };
}

// Mehrteiliges Gespräch (Coach). Liefert den Antworttext.
export async function claudeText({ system, messages, maxTokens = 8000, timeoutMs = 25000 }) {
  const { text } = await anfrage({ system, messages, maxTokens, timeoutMs });
  return text;
}

// Eine Aufgabe mit optionalem Foto, Antwort als JSON-Objekt.
// Die Prompts beschreiben die Form bereits; hier wird nur robust ausgepackt.
export async function claudeJson({ system, text, bildBase64, maxTokens = 16000, timeoutMs = 25000 }) {
  const content = [];
  if (bildBase64) {
    content.push({ type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data: bildBase64 } });
  }
  content.push({ type: 'text', text: `${text}\n\nAnswer with the JSON object only, no other text.` });
  const { text: roh, stopReason } = await anfrage({
    system,
    messages: [{ role: 'user', content }],
    maxTokens,
    timeoutMs,
  });
  return jsonAuspacken(roh, stopReason);
}

// Exportiert für die Tests.
export function jsonAuspacken(roh, stopReason) {
  const ohneZaun = roh.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '').trim();
  const start = ohneZaun.indexOf('{');
  const ende = ohneZaun.lastIndexOf('}');
  if (start === -1 || ende <= start) {
    throw new Error(stopReason === 'max_tokens' ? 'claude_max_tokens' : 'claude_no_json');
  }
  return JSON.parse(ohneZaun.slice(start, ende + 1));
}

// Für die JSON-Endpunkte (Etikett, Plan): Claude, wenn ein Schlüssel da ist,
// sonst Gemini wie bisher. Nie beides nacheinander.
export async function kiJson({ text, bildBase64, maxTokens, timeoutMs }) {
  if (claudeAktiv()) return claudeJson({ text, bildBase64, timeoutMs });
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('no_model_configured');
  const parts = [{ text }];
  if (bildBase64) parts.push({ inline_data: { mime_type: 'image/jpeg', data: bildBase64 } });
  return geminiJson(apiKey, { parts, maxTokens, timeoutMs });
}

export function kiVerfuegbar() {
  return claudeAktiv() || Boolean(process.env.GEMINI_API_KEY);
}

// Fehler des SDK auf das abbilden, was die Endpunkte nach außen melden.
export function istRateLimit(err) {
  return err instanceof Anthropic.RateLimitError;
}
