import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Plus, Swords, Check, X, Clock, Trophy, ChevronRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getChallenges, respondToChallenge } from '../../data/socialStorage';
import { getExerciseById } from '../../data/exercises';

export default function ChallengesList({ onBack, onCreateChallenge, onViewChallenge }) {
  const { t, i18n } = useTranslation();
  const { user, isGuestMode } = useAuth();
  const lang = i18n.language?.startsWith('de') ? 'de' : 'en';
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && !isGuestMode) {
      getChallenges(user.id).then((data) => { setChallenges(data); setLoading(false); });
    } else {
      setLoading(false);
    }
  }, [user]);

  async function handleRespond(challengeId, accept) {
    await respondToChallenge(challengeId, accept);
    setChallenges((prev) => prev.map((c) => c.id === challengeId ? { ...c, status: accept ? 'active' : 'declined' } : c));
  }

  const pending = challenges.filter((c) => c.status === 'pending' && c.opponent_id === user?.id);
  const active = challenges.filter((c) => c.status === 'active');
  const completed = challenges.filter((c) => c.status === 'completed');

  if (isGuestMode) {
    return (
      <div className="p-4 pt-16 pb-24">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={onBack} className="p-2 -ml-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"><ArrowLeft className="w-5 h-5" /></button>
          <h1 className="text-2xl font-bold">Challenges</h1>
        </div>
        <p className="text-center text-slate-400 dark:text-slate-500 py-12">{lang === 'de' ? 'Registriere dich für Challenges.' : 'Sign up for challenges.'}</p>
      </div>
    );
  }

  return (
    <div className="p-4 pt-16 pb-24">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 -ml-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"><ArrowLeft className="w-5 h-5" /></button>
          <h1 className="text-2xl font-bold">Challenges</h1>
        </div>
        <button onClick={onCreateChallenge} className="p-2 rounded-xl bg-primary-500 text-white">
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {loading ? (
        <p className="text-center text-sm text-slate-400 py-8">{t('common.loading')}</p>
      ) : (
        <>
          {/* Pending */}
          {pending.length > 0 && (
            <div className="mb-4">
              <h2 className="text-xs font-medium text-slate-400 mb-2">{lang === 'de' ? 'Eingehende Challenges' : 'Incoming Challenges'}</h2>
              {pending.map((c) => (
                <div key={c.id} className="bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-soft border border-slate-100 dark:border-slate-800/60 mb-2">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Swords className="w-4 h-4 text-primary-400" />
                      <p className="text-sm font-semibold">{c.challenger?.name || 'User'}</p>
                    </div>
                    <span className="text-xs text-slate-400">{c.criteria === 'volume' ? 'Volumen' : 'Runden'}</span>
                  </div>
                  <p className="text-xs text-slate-400 mb-3">
                    {(c.exercise_ids || []).map((id) => { const ex = getExerciseById(id); return ex ? t(ex.nameKey) : id; }).join(', ')}
                  </p>
                  <div className="flex gap-2">
                    <button onClick={() => handleRespond(c.id, true)} className="flex-1 py-2 rounded-xl bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-sm font-medium flex items-center justify-center gap-1">
                      <Check className="w-4 h-4" /> {lang === 'de' ? 'Annehmen' : 'Accept'}
                    </button>
                    <button onClick={() => handleRespond(c.id, false)} className="flex-1 py-2 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm font-medium flex items-center justify-center gap-1">
                      <X className="w-4 h-4" /> {lang === 'de' ? 'Ablehnen' : 'Decline'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Active */}
          {active.length > 0 && (
            <div className="mb-4">
              <h2 className="text-xs font-medium text-slate-400 mb-2">{lang === 'de' ? 'Aktive Challenges' : 'Active Challenges'}</h2>
              {active.map((c) => {
                const isChallenger = c.challenger_id === user.id;
                const opponent = isChallenger ? c.opponent : c.challenger;
                const myScore = isChallenger ? c.challenger_score : c.opponent_score;
                const theirScore = isChallenger ? c.opponent_score : c.challenger_score;
                const daysLeft = Math.max(0, Math.ceil((new Date(c.end_date) - new Date()) / 86400000));

                return (
                  <button key={c.id} onClick={() => onViewChallenge && onViewChallenge(c)} className="w-full bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-soft border border-slate-100 dark:border-slate-800/60 mb-2 text-left">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-semibold">{lang === 'de' ? 'vs.' : 'vs.'} {opponent?.name || 'User'}</p>
                      <div className="flex items-center gap-1 text-xs text-slate-400">
                        <Clock className="w-3.5 h-3.5" />
                        {daysLeft} {lang === 'de' ? 'Tage' : 'days'}
                      </div>
                    </div>
                    <div className="flex items-center justify-around">
                      <div className="text-center flex-1">
                        <p className="text-lg font-bold text-primary-400">{Math.round(myScore)}</p>
                        <p className="text-[10px] text-slate-400">{lang === 'de' ? 'Du' : 'You'}</p>
                      </div>
                      <Swords className="w-5 h-5 text-slate-300 dark:text-slate-600 flex-shrink-0" />
                      <div className="text-center flex-1">
                        <p className="text-lg font-bold text-slate-500">{Math.round(theirScore)}</p>
                        <p className="text-[10px] text-slate-400 truncate">{opponent?.name}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Completed */}
          {completed.length > 0 && (
            <div>
              <h2 className="text-xs font-medium text-slate-400 mb-2">{lang === 'de' ? 'Abgeschlossen' : 'Completed'}</h2>
              {completed.slice(0, 5).map((c) => {
                const won = c.winner_id === user.id;
                const opponent = c.challenger_id === user.id ? c.opponent : c.challenger;

                return (
                  <div key={c.id} className="bg-white dark:bg-surface-dark-alt rounded-2xl p-3 shadow-soft border border-slate-100 dark:border-slate-800/60 mb-2 flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${won ? 'bg-amber-100 dark:bg-amber-900/30' : 'bg-slate-100 dark:bg-slate-800'}`}>
                      {won ? <Trophy className="w-4 h-4 text-amber-500" /> : <X className="w-4 h-4 text-slate-400" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{lang === 'de' ? 'vs.' : 'vs.'} {opponent?.name}</p>
                      <p className="text-xs text-slate-400">{won ? (lang === 'de' ? 'Gewonnen' : 'Won') : (lang === 'de' ? 'Verloren' : 'Lost')} · +{won ? c.xp_reward : 0} XP</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {challenges.length === 0 && (
            <p className="text-center text-sm text-slate-400 dark:text-slate-500 py-8">
              {lang === 'de' ? 'Noch keine Challenges. Fordere einen Freund heraus!' : 'No challenges yet. Challenge a friend!'}
            </p>
          )}
        </>
      )}
    </div>
  );
}
