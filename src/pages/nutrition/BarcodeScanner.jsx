import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Html5Qrcode } from 'html5-qrcode';
import { X, ScanBarcode, Loader2, AlertCircle } from 'lucide-react';

export default function BarcodeScanner({ onScanned, onClose }) {
  const { t } = useTranslation();
  const [status, setStatus] = useState('starting');
  const [errorMsg, setErrorMsg] = useState('');
  const scannerRef = useRef(null);
  const nativeLoopRef = useRef(null);
  const isProcessingRef = useRef(false);
  const isMountedRef = useRef(true);

  const cleanup = useCallback(async () => {
    // Stop native scan loop
    if (nativeLoopRef.current) {
      clearInterval(nativeLoopRef.current);
      nativeLoopRef.current = null;
    }
    // Stop html5-qrcode
    const s = scannerRef.current;
    scannerRef.current = null;
    if (!s) return;
    try { await s.stop(); } catch { /* */ }
    try { s.clear(); } catch { /* */ }
  }, []);

  const onBarcodeFound = useCallback((barcode) => {
    if (isProcessingRef.current) return;
    isProcessingRef.current = true;
    cleanup().then(() => lookupBarcode(barcode));
  }, [cleanup]);

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
          source: 'openfoodfacts',
          source_id: barcode,
        });
      } else {
        setStatus('notFound');
      }
    } catch {
      if (isMountedRef.current) setStatus('notFound');
    }
  }, [onScanned]);

  const startScanner = useCallback(async () => {
    await cleanup();
    if (!isMountedRef.current) return;

    const container = document.getElementById('barcode-reader');
    if (container) container.innerHTML = '';

    setStatus('starting');
    isProcessingRef.current = false;

    try {
      const scanner = new Html5Qrcode('barcode-reader', { verbose: false });
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: 'environment' },
        {
          fps: 15,
          qrbox: (vw, vh) => ({
            width: Math.floor(Math.min(vw * 0.9, 400)),
            height: Math.floor(Math.min(vh * 0.25, 180)),
          }),
        },
        // html5-qrcode success callback (ZXing-based, slower but reliable fallback)
        (decodedText) => onBarcodeFound(decodedText),
        () => {}
      );

      if (!isMountedRef.current) return;
      setStatus('scanning');

      // PARALLEL: Start native BarcodeDetector loop on the video element (much faster)
      startNativeScanLoop();

    } catch (err) {
      console.error('Scanner error:', err);
      if (!isMountedRef.current) return;
      setStatus('error');
      const s = err?.toString?.() || '';
      setErrorMsg(
        s.includes('NotAllowedError') || s.includes('Permission')
          ? t('nutrition.cameraPermissionDenied')
          : t('nutrition.cameraError')
      );
    }
  }, [cleanup, onBarcodeFound, t]);

  function startNativeScanLoop() {
    if (!('BarcodeDetector' in window)) return;

    // Check if barcode formats are supported
    BarcodeDetector.getSupportedFormats().then((formats) => {
      const wanted = ['ean_13', 'ean_8', 'upc_a', 'upc_e', 'code_128', 'code_39']
        .filter((f) => formats.includes(f));
      if (wanted.length === 0) return;

      const detector = new BarcodeDetector({ formats: wanted });

      // Scan every 100ms using the video element html5-qrcode created
      nativeLoopRef.current = setInterval(async () => {
        if (isProcessingRef.current || !isMountedRef.current) return;

        const video = document.querySelector('#barcode-reader video');
        if (!video || video.readyState < 2) return;

        try {
          const barcodes = await detector.detect(video);
          if (barcodes.length > 0 && barcodes[0].rawValue) {
            onBarcodeFound(barcodes[0].rawValue);
          }
        } catch {
          // detect can fail if video not ready
        }
      }, 100);
    }).catch(() => {});
  }

  useEffect(() => {
    isMountedRef.current = true;
    const timer = setTimeout(startScanner, 150);
    return () => {
      isMountedRef.current = false;
      clearTimeout(timer);
      cleanup();
    };
  }, []);

  function handleClose() {
    cleanup().then(onClose);
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header */}
      <div className="relative z-10 flex items-center justify-between px-4 pt-4 pb-2" style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}>
        <div className="flex items-center gap-2 text-white">
          <ScanBarcode className="w-5 h-5" />
          <h2 className="text-base font-semibold">{t('nutrition.scanBarcode')}</h2>
        </div>
        <button onClick={handleClose} className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Camera */}
      <div className="flex-1 relative overflow-hidden">
        <div id="barcode-reader" style={{ width: '100%', minHeight: '100%' }} />

        {status === 'loading' && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-3 z-20">
            <Loader2 className="w-10 h-10 text-primary-400 animate-spin" />
            <p className="text-white text-sm font-medium">{t('nutrition.lookingUpBarcode')}</p>
          </div>
        )}

        {status === 'notFound' && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-4 px-8 z-20">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-amber-400" />
            </div>
            <p className="text-white text-center font-semibold">{t('nutrition.barcodeNotFound')}</p>
            <p className="text-slate-400 text-center text-sm">{t('nutrition.barcodeNotFoundDesc')}</p>
            <div className="flex gap-3 w-full max-w-xs">
              <button onClick={() => { isProcessingRef.current = false; startScanner(); }} className="flex-1 py-3 rounded-xl bg-white/10 text-white font-medium text-sm">
                {t('nutrition.scanAgain')}
              </button>
              <button onClick={handleClose} className="flex-1 py-3 rounded-xl bg-primary-600 text-white font-medium text-sm">
                {t('nutrition.manualEntry')}
              </button>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-4 px-8 z-20">
            <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>
            <p className="text-white text-center font-semibold">{t('nutrition.cameraError')}</p>
            <p className="text-slate-400 text-center text-sm">{errorMsg}</p>
            <button onClick={handleClose} className="px-8 py-3 rounded-xl bg-white/10 text-white font-medium text-sm">
              {t('common.back')}
            </button>
          </div>
        )}

        {status === 'starting' && (
          <div className="absolute inset-0 bg-black flex flex-col items-center justify-center gap-3 z-20">
            <Loader2 className="w-8 h-8 text-primary-400 animate-spin" />
            <p className="text-slate-400 text-sm">{t('nutrition.startingCamera')}</p>
          </div>
        )}
      </div>

      {status === 'scanning' && (
        <div className="relative z-10 px-6 py-3 text-center" style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}>
          <p className="text-slate-400 text-sm">{t('nutrition.scanHint')}</p>
        </div>
      )}
    </div>
  );
}
