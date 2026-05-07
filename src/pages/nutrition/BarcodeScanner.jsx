import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { X, ScanBarcode, Loader2, AlertCircle } from 'lucide-react';

const BARCODE_FORMATS = [
  Html5QrcodeSupportedFormats.EAN_13,
  Html5QrcodeSupportedFormats.EAN_8,
  Html5QrcodeSupportedFormats.UPC_A,
  Html5QrcodeSupportedFormats.UPC_E,
  Html5QrcodeSupportedFormats.CODE_128,
  Html5QrcodeSupportedFormats.CODE_39,
];

export default function BarcodeScanner({ onScanned, onClose }) {
  const { t } = useTranslation();
  const [status, setStatus] = useState('starting');
  const [errorMsg, setErrorMsg] = useState('');
  const scannerRef = useRef(null);
  const isProcessingRef = useRef(false);
  const isMountedRef = useRef(true);

  const stopScanner = useCallback(async () => {
    const scanner = scannerRef.current;
    if (!scanner) return;
    try {
      const state = scanner.getState();
      if (state === 2) { // SCANNING
        await scanner.stop();
      }
    } catch {
      // ignore
    }
    try {
      scanner.clear();
    } catch {
      // ignore
    }
    scannerRef.current = null;
  }, []);

  const lookupBarcode = useCallback(async (barcode) => {
    if (!isMountedRef.current) return;
    setStatus('loading');

    try {
      const res = await fetch(
        `https://world.openfoodfacts.org/api/v2/product/${barcode}.json`
      );
      const json = await res.json();

      if (!isMountedRef.current) return;

      if (json.status === 1 && json.product) {
        const p = json.product;
        const n = p.nutriments || {};

        onScanned({
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
        });
      } else {
        setStatus('notFound');
      }
    } catch {
      if (isMountedRef.current) setStatus('notFound');
    }
  }, [onScanned]);

  const startScanner = useCallback(async () => {
    // Clean up any existing scanner first
    await stopScanner();

    if (!isMountedRef.current) return;
    setStatus('starting');
    isProcessingRef.current = false;

    try {
      const scanner = new Html5Qrcode('barcode-reader', {
        formatsToSupport: BARCODE_FORMATS,
        verbose: false,
      });
      scannerRef.current = scanner;

      // Get available cameras and pick the back camera
      const cameras = await Html5Qrcode.getCameras();
      if (!cameras || cameras.length === 0) {
        throw new Error('NoCameraFound');
      }

      // Prefer back/environment camera
      const backCamera = cameras.find(
        (c) => c.label.toLowerCase().includes('back') || c.label.toLowerCase().includes('rear') || c.label.toLowerCase().includes('environment')
      );
      const cameraId = backCamera ? backCamera.id : cameras[cameras.length - 1].id;

      await scanner.start(
        cameraId,
        {
          fps: 15,
          qrbox: (viewfinderWidth, viewfinderHeight) => {
            // Use 80% of width, aspect ratio ~2:1 for barcodes
            const w = Math.min(Math.floor(viewfinderWidth * 0.85), 350);
            const h = Math.min(Math.floor(w * 0.45), Math.floor(viewfinderHeight * 0.3));
            return { width: w, height: h };
          },
          disableFlip: false,
        },
        (decodedText) => {
          // Prevent multiple triggers
          if (isProcessingRef.current) return;
          isProcessingRef.current = true;

          // Stop scanner, then look up
          stopScanner().then(() => lookupBarcode(decodedText));
        },
        () => {} // ignore scan failures
      );

      if (isMountedRef.current) setStatus('scanning');
    } catch (err) {
      console.error('Scanner error:', err);
      if (!isMountedRef.current) return;

      const errStr = err?.toString?.() || '';
      if (errStr.includes('NotAllowedError') || errStr.includes('Permission')) {
        setStatus('error');
        setErrorMsg(t('nutrition.cameraPermissionDenied'));
      } else if (errStr.includes('NoCameraFound') || errStr.includes('NotFoundError')) {
        setStatus('error');
        setErrorMsg(t('nutrition.noCameraFound'));
      } else {
        setStatus('error');
        setErrorMsg(t('nutrition.cameraError'));
      }
    }
  }, [stopScanner, lookupBarcode, t]);

  useEffect(() => {
    isMountedRef.current = true;

    // Small delay to let the DOM render the container
    const timer = setTimeout(() => startScanner(), 100);

    return () => {
      isMountedRef.current = false;
      clearTimeout(timer);
      stopScanner();
    };
  }, []);

  function handleRetry() {
    startScanner();
  }

  function handleClose() {
    stopScanner().then(() => onClose());
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header */}
      <div className="relative z-10 flex items-center justify-between px-4 pt-4 pb-2" style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}>
        <div className="flex items-center gap-2 text-white">
          <ScanBarcode className="w-5 h-5" />
          <h2 className="text-base font-semibold">{t('nutrition.scanBarcode')}</h2>
        </div>
        <button
          onClick={handleClose}
          className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Camera View */}
      <div className="flex-1 relative overflow-hidden">
        <div id="barcode-reader" className="absolute inset-0" />

        {/* Scanning Overlay */}
        {status === 'scanning' && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            {/* Darkened edges */}
            <div className="absolute inset-0 bg-black/40" />
            {/* Clear center window */}
            <div className="relative z-10 w-[85%] max-w-[350px] aspect-[2.2/1]">
              {/* Cut-out effect */}
              <div className="absolute -inset-[2000px] bg-black/40" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }} />
              <div className="relative w-full h-full bg-transparent rounded-2xl" style={{ boxShadow: '0 0 0 2000px rgba(0,0,0,0.45)' }}>
                {/* Corner decorators */}
                <div className="absolute -top-0.5 -left-0.5 w-10 h-10 border-t-[3px] border-l-[3px] border-primary-400 rounded-tl-xl" />
                <div className="absolute -top-0.5 -right-0.5 w-10 h-10 border-t-[3px] border-r-[3px] border-primary-400 rounded-tr-xl" />
                <div className="absolute -bottom-0.5 -left-0.5 w-10 h-10 border-b-[3px] border-l-[3px] border-primary-400 rounded-bl-xl" />
                <div className="absolute -bottom-0.5 -right-0.5 w-10 h-10 border-b-[3px] border-r-[3px] border-primary-400 rounded-br-xl" />
                {/* Scan line */}
                <div className="absolute left-3 right-3 h-0.5 bg-primary-400 shadow-[0_0_8px_rgba(129,140,248,0.6)] animate-scan-line" />
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {status === 'loading' && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-3 z-20">
            <Loader2 className="w-10 h-10 text-primary-400 animate-spin" />
            <p className="text-white text-sm font-medium">{t('nutrition.lookingUpBarcode')}</p>
          </div>
        )}

        {/* Not Found State */}
        {status === 'notFound' && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-4 px-8 z-20">
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
                onClick={handleClose}
                className="flex-1 py-3 rounded-xl bg-primary-600 text-white font-medium text-sm hover:bg-primary-700 transition-colors"
              >
                {t('nutrition.manualEntry')}
              </button>
            </div>
          </div>
        )}

        {/* Error State */}
        {status === 'error' && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-4 px-8 z-20">
            <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>
            <p className="text-white text-center font-semibold">{t('nutrition.cameraError')}</p>
            <p className="text-slate-400 text-center text-sm">{errorMsg}</p>
            <button
              onClick={handleClose}
              className="px-8 py-3 rounded-xl bg-white/10 text-white font-medium text-sm hover:bg-white/20 transition-colors"
            >
              {t('common.back')}
            </button>
          </div>
        )}

        {/* Starting State */}
        {status === 'starting' && (
          <div className="absolute inset-0 bg-black flex flex-col items-center justify-center gap-3 z-20">
            <Loader2 className="w-8 h-8 text-primary-400 animate-spin" />
            <p className="text-slate-400 text-sm">{t('nutrition.startingCamera')}</p>
          </div>
        )}
      </div>

      {/* Bottom hint */}
      {status === 'scanning' && (
        <div className="relative z-10 px-6 py-4 text-center" style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
          <p className="text-slate-400 text-sm">{t('nutrition.scanHint')}</p>
        </div>
      )}
    </div>
  );
}
