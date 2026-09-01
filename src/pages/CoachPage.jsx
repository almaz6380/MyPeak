import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Sparkles, Crown, AlertTriangle, Trash2 } from 'lucide-react';
import { medicalDisclaimerText } from '../components/MedicalDisclaimer';
import { useAuth } from '../context/AuthContext';
import { useSubscription } from '../context/SubscriptionContext';
import { askCoach, getCoachUsageToday } from '../data/coachStorage';

const TRIAL_LIMIT = 5;
const PREMIUM_LIMIT = 30;

// Verlauf pro Nutzer auf dem Geraet halten. Vorher lebten die Nachrichten nur
// im React-State — Seite verlassen, alles weg; es sah aus, als gaebe es keinen
// Verlauf. Bewusst localStorage statt Supabase: Coach-Fragen sind persoenliche
// Gesundheits-/Trainingsdaten, die nirgendwohin muessen; auf dem Geraet
// brauchen sie weder Sync noch einen neuen Absatz in der Datenschutzerklaerung.
const VERLAUF_MAX = 60; // Nachrichten; haelt den Eintrag klein und das Rendern fluessig
const verlaufKey = (userId) => `fullrep.coach.verlauf.${userId}`;

function ladeVerlauf(userId) {
  if (!userId) return [];
  try {
    const roh = JSON.parse(localStorage.getItem(verlaufKey(userId)) || '[]');
    if (!Array.isArray(roh)) return [];
    return roh.filter((m) => (m?.role === 'user' || m?.role === 'assistant') && typeof m?.content === 'string');
  } catch {
    return [];
  }
}

function speichereVerlauf(userId, messages) {
  if (!userId) return;
  try {
    localStorage.setItem(verlaufKey(userId), JSON.stringify(messages.slice(-VERLAUF_MAX)));
  } catch {
    // voll oder gesperrt (privater Modus) — dann eben ohne Verlauf, kein Absturz
  }
}

export default function CoachPage() {
  const { t, i18n } = useTranslation();
  // es zaehlt mit: der Coach-Server hat seit 1.4.0 auch einen spanischen
  // System-Prompt. Die restlichen Inline-Texte dieser Seite fallen fuer es
  // auf Englisch zurueck — bewusst, bis alles auf i18n-Schluessel umzieht.
  const lang = ['de', 'es'].find((l) => i18n.language?.startsWith(l)) || 'en';
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isPremium, isTrial, openPaywall } = useSubscription();

  // Verlauf sofort aus dem Speicher — kein Effect, sonst blitzt erst der leere
  // Zustand auf und der wiederhergestellte Verlauf springt nach.
  const [messages, setMessages] = useState(() => ladeVerlauf(user?.id));
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [remaining, setRemaining] = useState(null);
  const [error, setError] = useState('');
  const scrollRef = useRef(null);

  const dailyLimit = isTrial ? TRIAL_LIMIT : PREMIUM_LIMIT;

  // Jede Aenderung sichern (auch die Nutzerfrage allein, falls die App vor der
  // Antwort beendet wird).
  useEffect(() => {
    if (user?.id) speichereVerlauf(user.id, messages);
  }, [user?.id, messages]);

  // Verbrauch beim Öffnen laden.
  useEffect(() => {
    if (!user?.id || !isPremium) return;
    getCoachUsageToday(user.id).then((used) => setRemaining(Math.max(0, dailyLimit - used)));
  }, [user?.id, isPremium, dailyLimit]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  // Kein Premium → gesperrter Zustand mit Paywall-CTA.
  if (!isPremium) {
    return (
      <div className="p-4 pt-16 pb-24">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold">{t('ui.aiCoach')}</h1>
        </div>
        <div className="text-center pt-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg">
            <Crown className="w-8 h-8 text-white" />
          </div>
          <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
            {t('ui.theAiCoachAnswersYourQuestions')}
          </p>
          <button
            onClick={() => openPaywall('ki_coach')}
            className="px-6 py-3 rounded-2xl bg-primary-500 hover:bg-primary-600 text-white font-semibold shadow-lg"
          >
            {t('ui.explorePremium')}
          </button>
        </div>
      </div>
    );
  }

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    if (remaining !== null && remaining <= 0) return;

    setError('');
    const next = [...messages, { role: 'user', content: text }];
    setMessages(next);
    setInput('');
    setLoading(true);

    const res = await askCoach(next, lang);
    setLoading(false);

    if (res.error) {
      if (res.error === 'quota_exceeded') {
        setRemaining(0);
        setError(t('ui.dailyLimitReachedContinuesTomorrow'));
      } else if (res.error === 'premium_required') {
        openPaywall('ki_coach');
      } else {
        setError(t('ui.theCoachIsUnavailableRightNow'));
      }
      return;
    }

    setMessages((prev) => [...prev, { role: 'assistant', content: res.reply }]);
    if (typeof res.remaining === 'number') setRemaining(res.remaining);
  };

  const quota = remaining !== null;
  const outOfQuota = quota && remaining <= 0;

  return (
    <div className="flex flex-col h-[100dvh]">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-14 pb-3 border-b border-slate-100 dark:border-slate-800/60">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-base font-bold leading-tight">{t('ui.aiCoach')}</h1>
          {quota && (
            <p className="text-[11px] text-slate-400">
              {t('ui.remainingQuestionsLeftToday', { remaining })}
            </p>
          )}
        </div>
        {messages.length > 0 && (
          <button
            onClick={() => {
              if (window.confirm(t('ui.clearHistory'))) {
                setMessages([]);
                setError('');
              }
            }}
            aria-label={t('ui.clearHistory2')}
            className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Nachrichten */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.length === 0 && (
          <div className="text-center pt-8">
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              {t('ui.askMeAnythingAboutTrainingNutritio')}
            </p>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                m.role === 'user'
                  ? 'bg-primary-500 text-white rounded-br-md'
                  : 'bg-white dark:bg-surface-dark-alt border border-slate-100 dark:border-slate-800/60 text-slate-700 dark:text-slate-200 rounded-bl-md'
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-surface-dark-alt border border-slate-100 dark:border-slate-800/60 rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        {error && (
          <div className="flex items-center gap-2 justify-center text-xs text-red-500 pt-1">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Eingabe */}
      <div className="px-4 pb-6 pt-2 border-t border-slate-100 dark:border-slate-800/60">
        <div className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
            rows={1}
            disabled={outOfQuota}
            placeholder={outOfQuota
              ? (t('ui.dailyLimitReached'))
              : (t('ui.askAQuestion'))}
            className="flex-1 resize-none rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark-alt px-4 py-2.5 text-sm focus:outline-none focus:border-primary-400 disabled:opacity-50 max-h-32"
          />
          <button
            onClick={send}
            disabled={loading || outOfQuota || !input.trim()}
            className="w-11 h-11 rounded-2xl bg-primary-500 hover:bg-primary-600 disabled:opacity-40 text-white flex items-center justify-center flex-shrink-0 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-[10px] text-slate-400 dark:text-slate-500 text-center mt-2 leading-relaxed">
          {medicalDisclaimerText(lang)}
        </p>
      </div>
    </div>
  );
}
