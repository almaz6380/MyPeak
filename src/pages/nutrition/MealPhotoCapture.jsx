import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Camera, RotateCcw, Sparkles, Loader2 } from 'lucide-react';
import OilLevelPicker from '../../components/OilLevelPicker';
import MealAnalysisResult from './MealAnalysisResult';
import { compressMealPhoto, analyzeMealPhoto, applyOilAdjustment } from '../../data/mealPhotoAnalysis';

export default function MealPhotoCapture({ onClose, onAddItems, language = 'de' }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || language;
  const fileInputRef = useRef(null);

  const [photo, setPhoto] = useState(null); // base64
  const [oilLevel, setOilLevel] = useState('normal');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null); // { items, meal_description_de/en }
  const [error, setError] = useState(null);

  async function handleFileSelect(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const compressed = await compressMealPhoto(file);
      setPhoto(compressed);
      setError(null);
      setResult(null);
    } catch {
      setError(t('nutrition.cameraError'));
    }
  }

  async function handleAnalyze() {
    if (!photo) return;
    setAnalyzing(true);
    setError(null);

    try {
      const data = await analyzeMealPhoto(photo, lang);
      if (data.error === 'no_food_detected') {
        setError('no_food');
        setResult(null);
      } else if (data.items?.length > 0) {
        setResult(data);
      } else {
        setError('no_food');
      }
    } catch (err) {
      setError(err.message || 'unknown');
    } finally {
      setAnalyzing(false);
    }
  }

  function handleRetake() {
    setPhoto(null);
    setResult(null);
    setError(null);
    setOilLevel('normal');
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  function handleAddAll(adjustedItems) {
    onAddItems(adjustedItems);
  }

  // Show results screen
  if (result) {
    return (
      <MealAnalysisResult
        result={result}
        photo={photo}
        oilLevel={oilLevel}
        onOilChange={setOilLevel}
        onAddAll={handleAddAll}
        onRetake={handleRetake}
        onClose={onClose}
        language={lang}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 pt-14">
        <button onClick={onClose} className="p-2 -ml-2 hover:bg-white/10 rounded-xl transition-colors">
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <h1 className="text-lg font-bold text-white">{t('nutrition.mealPhoto')}</h1>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6">
        {!photo ? (
          // Camera capture
          <>
            <div className="w-48 h-48 rounded-3xl border-2 border-dashed border-white/30 flex items-center justify-center">
              <Camera className="w-16 h-16 text-white/40" />
            </div>
            <p className="text-white/60 text-sm text-center max-w-xs">
              {t('nutrition.mealPhotoHint')}
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-2xl font-semibold text-base flex items-center gap-3 transition-colors"
            >
              <Camera className="w-5 h-5" />
              {t('nutrition.takePhoto')}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileSelect}
              className="hidden"
            />
          </>
        ) : (
          // Photo preview + oil selection
          <>
            <div className="w-full max-w-sm aspect-square rounded-2xl overflow-hidden bg-slate-900">
              <img src={photo} alt="Meal" className="w-full h-full object-cover" />
            </div>

            <div className="w-full max-w-sm">
              <OilLevelPicker value={oilLevel} onChange={setOilLevel} />
            </div>

            {error && (
              <div className="w-full max-w-sm text-center">
                <p className="text-red-400 text-sm">
                  {error === 'no_food'
                    ? t('nutrition.noFoodDetected')
                    : error === 'timeout'
                      ? (t('ui.requestTimedOutPleaseTryAgain'))
                      : error === 'image_too_large'
                        ? (t('ui.imageTooLargePleaseUseA'))
                        : error === 'rate_limit'
                          ? (t('ui.tooManyRequestsPleaseWaitA'))
                          : error === 'auth_required'
                            ? (t('ui.photoAnalysisRequiresAnAccountSign'))
                            : error === 'ai_service_unavailable'
                              ? (t('ui.aiServiceUnavailablePleaseTryAgain'))
                              : t('nutrition.aiError')}
                </p>
                {error === 'no_food' && (
                  <p className="text-white/40 text-xs mt-1">{t('nutrition.noFoodDetectedDesc')}</p>
                )}
                {(error === 'timeout' || error === 'ai_service_unavailable' || error === 'rate_limit') && (
                  <button onClick={handleAnalyze} className="mt-2 text-primary-400 text-xs font-medium">
                    {t('ui.tryAgain')}
                  </button>
                )}
              </div>
            )}

            <div className="flex gap-3 w-full max-w-sm">
              <button
                onClick={handleRetake}
                className="flex-1 py-3.5 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-medium text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                {t('nutrition.retakePhoto')}
              </button>
              <button
                onClick={handleAnalyze}
                disabled={analyzing}
                className="flex-1 py-3.5 bg-primary-500 hover:bg-primary-600 disabled:opacity-50 text-white rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
              >
                {analyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {t('nutrition.analyzing')}
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    {t('nutrition.analyzePhoto')}
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
