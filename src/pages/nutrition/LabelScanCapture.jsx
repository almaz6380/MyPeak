import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Camera, ImageIcon, Loader2, AlertTriangle, Crown } from 'lucide-react';
import { compressMealPhoto } from '../../data/mealPhotoAnalysis';
import { scanNutritionLabel, etikettAlsLebensmittel } from '../../data/premiumApi';
import { useSubscription } from '../../context/SubscriptionContext';
import { appSprache } from '../../lib/sprache';

// Nährwerttabelle per Foto (Premium). Liest die Werte je 100 g ab und gibt sie
// als Lebensmittel an den Portionswähler weiter.
export default function LabelScanCapture({ onClose, onScanned }) {
  const { t, i18n } = useTranslation();
  const { openPaywall } = useSubscription();
  const kamera = useRef(null);
  const galerie = useRef(null);
  const [laedt, setLaedt] = useState(false);
  const [fehler, setFehler] = useState('');

  async function auswerten(e) {
    const datei = e.target.files?.[0];
    e.target.value = '';
    if (!datei) return;
    setFehler('');
    setLaedt(true);
    try {
      const bild = await compressMealPhoto(datei);
      const res = await scanNutritionLabel(bild, appSprache(i18n.language));
      if (res.error) {
        if (res.error === 'premium_required') { openPaywall('label_scan'); return; }
        setFehler(
          res.error === 'no_label_detected' ? t('premium.labelNotFound')
            : res.error === 'login_required' ? t('premium.loginRequired')
              : t('premium.aiUnavailable'),
        );
        return;
      }
      onScanned(etikettAlsLebensmittel(res, t('premium.labelDefaultName')), res.fehlend || []);
    } catch {
      setFehler(t('premium.aiUnavailable'));
    } finally {
      setLaedt(false);
    }
  }

  return (
    <div className="p-4 pt-16 pb-24">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onClose} className="p-2 -ms-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <ArrowLeft className="w-5 h-5 rtl:-scale-x-100" />
        </button>
        <h1 className="text-xl font-bold flex items-center gap-2">
          {t('premium.labelTitle')}
          <Crown className="w-4 h-4 text-primary-500" />
        </h1>
      </div>

      <div className="karte p-5 mb-4">
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{t('premium.labelHint')}</p>
      </div>

      {laedt ? (
        <div className="flex flex-col items-center gap-3 py-12 text-slate-500">
          <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
          <p className="text-sm">{t('premium.labelReading')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => kamera.current?.click()} className="karte p-5 flex flex-col items-center gap-2">
            <Camera className="w-7 h-7 text-primary-500" />
            <span className="text-sm font-medium">{t('premium.takePhoto')}</span>
          </button>
          <button onClick={() => galerie.current?.click()} className="karte p-5 flex flex-col items-center gap-2">
            <ImageIcon className="w-7 h-7 text-primary-500" />
            <span className="text-sm font-medium">{t('premium.choosePhoto')}</span>
          </button>
        </div>
      )}

      {fehler && (
        <div className="mt-4 flex items-start gap-2 p-3 rounded-xl bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 text-sm">
          <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>{fehler}</span>
        </div>
      )}

      <input ref={kamera} type="file" accept="image/*" capture="environment" className="hidden" onChange={auswerten} />
      <input ref={galerie} type="file" accept="image/*" className="hidden" onChange={auswerten} />
    </div>
  );
}
