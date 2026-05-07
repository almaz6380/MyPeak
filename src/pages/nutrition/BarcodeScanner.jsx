import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Html5Qrcode } from 'html5-qrcode';
import { X, ScanBarcode, Loader2, AlertCircle } from 'lucide-react';

export default function BarcodeScanner({ onScanned, onClose }) {
  const { t } = useTranslation();
  const [status, setStatus] = useState('starting'); // starting | scanning | loading | error | notFound
  const [errorMsg, setErrorMsg] = useState('');
  const scannerRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    let scanner = null;

    async function startScanner() {
      try {
        scanner = new Html5Qrcode('barcode-reader');
        scannerRef.current = scanner;

        await scanner.start(
          { facingMode: 'environment' },
          {
            fps: 10,
            qrbox: { width: 280, height: 160 },
            aspectRatio: 1.0,
          },
          handleScanSuccess,
          () => {} // ignore scan failures (no barcode in frame)
        );

        setStatus('scanning');
      } catch (err) {
        console.error('Camera error:', err);
        setStatus('error');
        setErrorMsg(
          err?.toString?.().includes('NotAllowedError')
            ? t('nutrition.cameraPermissionDenied')
            : t('nutrition.cameraError')
        );
      }
    }

    startScanner();

    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(() => {});
        scannerRef.current.clear().catch(() => {});
      }
    };
  }, []);

  async function handleScanSuccess(barcode) {
    // Stop scanning immediately to prevent multiple reads
    if (scannerRef.current) {
      await scannerRef.current.stop().catch(() => {});
    }

    setStatus('loading');

    try {
      const res = await fetch(
        `https://world.openfoodfacts.org/api/v2/product/${barcode}.json`
      );
      const json = await res.json();

      if (json.status === 1 && json.product) {
        const p = json.product;
        const n = p.nutriments || {};

        const food = {
          id: `off_${barcode}`,
          nameDE: p.product_name_de || p.product_name || barcode,
          nameEN: p.product_name_en || p.product_name || barcode,
          brand: p.brands || '',
          servingSize: Math.round(p.serving_quantity) || 100,
          servingUnit: 'g',
          calories: Math.round(n['energy-kcal_100g'] || n['energy-kcal'] || 0),
          protein: Math.round((n.proteins_100g || 0) * 10) / 10,
          carbs: Math.round((n.carbohydrates_100g || 0) * 10) / 10,
          fat: Math.round((n.fat_100g || 0) * 10) / 10,
          fiber: Math.round((n.fiber_100g || 0) * 10) / 10,
          sugar: Math.round((n.sugars_100g || 0) * 10) / 10,
          source: 'openfoodfacts',
          source_id: barcode,
          incomplete: !n['energy-kcal_100g'],
        };

        onScanned(food);
      } else {
        setStatus('notFound');
      }
    } catch {
      setStatus('notFound');
    }
  }

  function handleRetry() {
    setStatus('starting');
    setErrorMsg('');

    const scanner = new Html5Qrcode('barcode-reader');
    scannerRef.current = scanner;

    scanner
      .start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 280, height: 160 }, aspectRatio: 1.0 },
        handleScanSuccess,
        () => {}
      )
      .then(() => setStatus('scanning'))
      .catch((err) => {
        setStatus('error');
        setErrorMsg(err?.toString?.() || t('nutrition.cameraError'));
      });
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header */}
      <div className="relative z-10 flex items-center justify-between px-4 pt-4 pb-2">
        <div className="flex items-center gap-2 text-white">
          <ScanBarcode className="w-5 h-5" />
          <h2 className="text-base font-semibold">{t('nutrition.scanBarcode')}</h2>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Camera View */}
      <div className="flex-1 relative" ref={containerRef}>
        <div id="barcode-reader" className="w-full h-full" />

        {/* Scanning Overlay */}
        {status === 'scanning' && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="relative w-72 h-44">
              {/* Corner decorators */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-3 border-l-3 border-primary-400 rounded-tl-lg" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-3 border-r-3 border-primary-400 rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-3 border-l-3 border-primary-400 rounded-bl-lg" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-3 border-r-3 border-primary-400 rounded-br-lg" />
              {/* Scan line animation */}
              <div className="absolute left-4 right-4 h-0.5 bg-primary-400/80 animate-scan-line" />
            </div>
          </div>
        )}

        {/* Loading State */}
        {status === 'loading' && (
          <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-10 h-10 text-primary-400 animate-spin" />
            <p className="text-white text-sm font-medium">{t('nutrition.lookingUpBarcode')}</p>
          </div>
        )}

        {/* Not Found State */}
        {status === 'notFound' && (
          <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-4 px-8">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-amber-400" />
            </div>
            <p className="text-white text-center font-semibold">{t('nutrition.barcodeNotFound')}</p>
            <p className="text-slate-400 text-center text-sm">{t('nutrition.barcodeNotFoundDesc')}</p>
            <div className="flex gap-3 w-full max-w-xs">
              <button
                onClick={handleRetry}
                className="flex-1 py-3 rounded-xl bg-white/10 text-white font-medium text-sm hover:bg-white/20 transition-colors"
              >
                {t('nutrition.scanAgain')}
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-xl bg-primary-600 text-white font-medium text-sm hover:bg-primary-700 transition-colors"
              >
                {t('nutrition.manualEntry')}
              </button>
            </div>
          </div>
        )}

        {/* Error State */}
        {status === 'error' && (
          <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-4 px-8">
            <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>
            <p className="text-white text-center font-semibold">{t('nutrition.cameraError')}</p>
            <p className="text-slate-400 text-center text-sm">{errorMsg}</p>
            <button
              onClick={onClose}
              className="px-8 py-3 rounded-xl bg-white/10 text-white font-medium text-sm hover:bg-white/20 transition-colors"
            >
              {t('common.back')}
            </button>
          </div>
        )}

        {/* Starting State */}
        {status === 'starting' && (
          <div className="absolute inset-0 bg-black flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 text-primary-400 animate-spin" />
            <p className="text-slate-400 text-sm">{t('nutrition.startingCamera')}</p>
          </div>
        )}
      </div>

      {/* Bottom hint */}
      {status === 'scanning' && (
        <div className="relative z-10 px-6 py-4 text-center">
          <p className="text-slate-400 text-sm">{t('nutrition.scanHint')}</p>
        </div>
      )}
    </div>
  );
}
