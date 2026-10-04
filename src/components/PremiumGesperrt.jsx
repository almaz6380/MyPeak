import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Crown } from 'lucide-react';
import { useSubscription } from '../context/SubscriptionContext';

// Gesperrter Zustand einer Premium-Seite — gleiche Form wie beim Coach.
export default function PremiumGesperrt({ titel, text, grund, onBack }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { openPaywall } = useSubscription();
  return (
    <div className="p-4 pt-16 pb-24">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack || (() => navigate(-1))} className="p-2 -ms-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <ArrowLeft className="w-5 h-5 rtl:-scale-x-100" />
        </button>
        <h1 className="text-xl font-bold">{titel}</h1>
      </div>
      <div className="text-center pt-12">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg">
          <Crown className="w-8 h-8 text-white" />
        </div>
        <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">{text}</p>
        <button
          onClick={() => openPaywall(grund)}
          className="px-6 py-3 rounded-2xl bg-primary-500 hover:bg-primary-600 text-white font-semibold shadow-lg"
        >
          {t('ui.explorePremium')}
        </button>
      </div>
    </div>
  );
}
