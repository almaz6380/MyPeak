import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, UserPlus, Check, X, User, Trash2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getFriends, getFriendRequests, respondToFriendRequest, removeFriend, sendFriendRequest, lookupFriendCode } from '../../data/socialStorage';

export default function FriendsList({ onBack, onAddFriend }) {
  const { t } = useTranslation();
  const { user, isGuestMode } = useAuth();
  const lang = t('common.back') === 'Zurück' ? 'de' : 'en';
  const [friends, setFriends] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [codeInput, setCodeInput] = useState('');
  const [addStatus, setAddStatus] = useState(null); // null | 'sending' | 'sent' | 'error' | 'notfound'

  useEffect(() => {
    if (user && !isGuestMode) loadData();
    else setLoading(false);
  }, [user]);

  async function loadData() {
    setLoading(true);
    const [f, r] = await Promise.all([getFriends(user.id), getFriendRequests(user.id)]);
    setFriends(f);
    setRequests(r);
    setLoading(false);
  }

  async function handleAccept(requestId) {
    await respondToFriendRequest(requestId, true);
    loadData();
  }

  async function handleDecline(requestId) {
    await respondToFriendRequest(requestId, false);
    setRequests((prev) => prev.filter((r) => r.id !== requestId));
  }

  async function handleRemove(friendshipId) {
    await removeFriend(friendshipId);
    setFriends((prev) => prev.filter((f) => f.friendshipId !== friendshipId));
  }

  async function handleSendRequest() {
    if (!codeInput.trim()) return;
    setAddStatus('sending');

    const friendId = await lookupFriendCode(codeInput);
    if (!friendId) {
      setAddStatus('notfound');
      return;
    }
    if (friendId === user.id) {
      setAddStatus('error');
      return;
    }

    const { error } = await sendFriendRequest(user.id, friendId);
    setAddStatus(error ? 'error' : 'sent');
    if (!error) setCodeInput('');
  }

  if (isGuestMode) {
    return (
      <div className="p-4 pt-16 pb-24">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={onBack} className="p-2 -ml-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"><ArrowLeft className="w-5 h-5" /></button>
          <h1 className="text-2xl font-bold">{lang === 'de' ? 'Freunde' : 'Friends'}</h1>
        </div>
        <p className="text-center text-slate-400 dark:text-slate-500 py-12">{lang === 'de' ? 'Registriere dich, um Freunde hinzuzufügen.' : 'Sign up to add friends.'}</p>
      </div>
    );
  }

  return (
    <div className="p-4 pt-16 pb-24">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 -ml-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"><ArrowLeft className="w-5 h-5" /></button>
          <h1 className="text-2xl font-bold">{lang === 'de' ? 'Freunde' : 'Friends'}</h1>
        </div>
        <button onClick={() => setShowAdd(!showAdd)} className="p-2 rounded-xl bg-primary-500 text-white">
          <UserPlus className="w-5 h-5" />
        </button>
      </div>

      {/* Add Friend */}
      {showAdd && (
        <div className="bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-sm mb-4">
          <p className="text-sm font-medium mb-2">{lang === 'de' ? 'MyPeak-Code eingeben' : 'Enter MyPeak Code'}</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={codeInput}
              onChange={(e) => { setCodeInput(e.target.value.toUpperCase()); setAddStatus(null); }}
              placeholder="MP-NAME-1234"
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-mono text-center focus:outline-none focus:ring-2 focus:ring-primary-400"
            />
            <button onClick={handleSendRequest} disabled={!codeInput.trim() || addStatus === 'sending'} className="px-4 py-2.5 rounded-xl bg-primary-500 hover:bg-primary-600 disabled:opacity-50 text-white text-sm font-medium">
              {addStatus === 'sending' ? '...' : lang === 'de' ? 'Senden' : 'Send'}
            </button>
          </div>
          {addStatus === 'sent' && <p className="text-xs text-green-500 mt-2">{lang === 'de' ? 'Anfrage gesendet!' : 'Request sent!'}</p>}
          {addStatus === 'notfound' && <p className="text-xs text-red-500 mt-2">{lang === 'de' ? 'Code nicht gefunden.' : 'Code not found.'}</p>}
          {addStatus === 'error' && <p className="text-xs text-red-500 mt-2">{lang === 'de' ? 'Fehler beim Senden.' : 'Error sending.'}</p>}
        </div>
      )}

      {/* Pending Requests */}
      {requests.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xs font-medium text-slate-400 dark:text-slate-500 mb-2">{lang === 'de' ? 'Anfragen' : 'Requests'} ({requests.length})</h2>
          <div className="bg-white dark:bg-surface-dark-alt rounded-2xl shadow-sm overflow-hidden">
            {requests.map((req) => (
              <div key={req.id} className="flex items-center justify-between px-4 py-3 border-b border-slate-50 dark:border-slate-700/50 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center">
                    <User className="w-4 h-4 text-primary-400" />
                  </div>
                  <p className="text-sm font-medium">{req.sender?.name || 'User'}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleAccept(req.id)} className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-500"><Check className="w-4 h-4" /></button>
                  <button onClick={() => handleDecline(req.id)} className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-500"><X className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Friends List */}
      <h2 className="text-xs font-medium text-slate-400 dark:text-slate-500 mb-2">{lang === 'de' ? 'Meine Freunde' : 'My Friends'} ({friends.length})</h2>
      {loading ? (
        <p className="text-center text-sm text-slate-400 py-8">{t('common.loading')}</p>
      ) : friends.length === 0 ? (
        <p className="text-center text-sm text-slate-400 dark:text-slate-500 py-8">
          {lang === 'de' ? 'Noch keine Freunde. Teile deinen MyPeak-Code!' : 'No friends yet. Share your MyPeak code!'}
        </p>
      ) : (
        <div className="bg-white dark:bg-surface-dark-alt rounded-2xl shadow-sm overflow-hidden">
          {friends.map((friend) => (
            <div key={friend.id} className="flex items-center justify-between px-4 py-3 border-b border-slate-50 dark:border-slate-700/50 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center">
                  <User className="w-4 h-4 text-primary-400" />
                </div>
                <p className="text-sm font-medium">{friend.name || 'User'}</p>
              </div>
              <button onClick={() => handleRemove(friend.friendshipId)} className="p-2 text-slate-300 hover:text-red-400">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
