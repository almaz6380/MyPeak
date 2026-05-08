import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Html5QrcodeScanner, Html5QrcodeScanType, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { X, ScanBarcode, Loader2, AlertCircle } from 'lucide-react';

export default function BarcodeScanner({ onScanned, onClose }) {
  const { t } = useTranslation();
  const [status, setStatus] = useState('starting');
  const [errorMsg, setErrorMsg] = useState('');
  const scannerRef = useRef(null);
  const isProcessingRef = useRef(false);
  const isMountedRef = useRef(true);

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

  useEffect(() => {
    isMountedRef.current = true;

    // Html5QrcodeScanner handles everything: camera permission, video rendering, scanning
    const scanner = new Html5QrcodeScanner(
      'barcode-reader',
      {
        fps: 15,
        qrbox: { width: 280, height: 120 },
        rememberLastUsedCamera: true,
        supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
        showTorchButtonIfSupported: false,
        showZoomSliderIfSupported: true,
        defaultZoomValueIfSupported: 1,
        // Use native BarcodeDetector API when available (much faster)
        experimentalFeatures: {
          useBarCodeDetectorIfSupported: true,
        },
        // No format restriction — scan ALL barcode types
      },
      /* verbose= */ false
    );

    scannerRef.current = scanner;

    scanner.render(
      // Success callback
      (decodedText) => {
        if (isProcessingRef.current) return;
        isProcessingRef.current = true;

        // Clear scanner UI before looking up
        try { scanner.clear(); } catch { /* ignore */ }
        scannerRef.current = null;

        lookupBarcode(decodedText);
      },
      // Error callback (per-frame, ignore)
      () => {}
    );

    // Once rendering starts, mark as scanning
    // Small delay to let the scanner initialize
    const timer = setTimeout(() => {
      if (isMountedRef.current) setStatus('scanning');
    }, 1500);

    return () => {
      isMountedRef.current = false;
      clearTimeout(timer);
      try { scanner.clear(); } catch { /* ignore */ }
      scannerRef.current = null;
    };
  }, [lookupBarcode]);

  function handleRetry() {
    isProcessingRef.current = false;
    setStatus('starting');

    // Re-create scanner
    const scanner = new Html5QrcodeScanner(
      'barcode-reader',
      {
        fps: 15,
        qrbox: { width: 280, height: 120 },
        rememberLastUsedCamera: true,
        supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
        showTorchButtonIfSupported: false,
        showZoomSliderIfSupported: true,
        defaultZoomValueIfSupported: 1,
        experimentalFeatures: { useBarCodeDetectorIfSupported: true },
      },
      false
    );
    scannerRef.current = scanner;

    scanner.render(
      (decodedText) => {
        if (isProcessingRef.current) return;
        isProcessingRef.current = true;
        try { scanner.clear(); } catch { /* ignore */ }
        scannerRef.current = null;
        lookupBarcode(decodedText);
      },
      () => {}
    );

    setTimeout(() => {
      if (isMountedRef.current) setStatus('scanning');
    }, 1500);
  }

  function handleClose() {
    try { scannerRef.current?.clear(); } catch { /* ignore */ }
    scannerRef.current = null;
    onClose();
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

      {/* Camera — html5-qrcode renders everything here */}
      <div className="flex-1 relative overflow-hidden bg-black">
        <div id="barcode-reader" className="w-full h-full" />

        {/* Loading overlay */}
        {status === 'loading' && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-3 z-20">
            <Loader2 className="w-10 h-10 text-primary-400 animate-spin" />
            <p className="text-white text-sm font-medium">{t('nutrition.lookingUpBarcode')}</p>
          </div>
        )}

        {/* Not Found */}
        {status === 'notFound' && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-4 px-8 z-20">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-amber-400" />
            </div>
            <p className="text-white text-center font-semibold">{t('nutrition.barcodeNotFound')}</p>
            <p className="text-slate-400 text-center text-sm">{t('nutrition.barcodeNotFoundDesc')}</p>
            <div className="flex gap-3 w-full max-w-xs">
              <button onClick={handleRetry} className="flex-1 py-3 rounded-xl bg-white/10 text-white font-medium text-sm hover:bg-white/20 transition-colors">
                {t('nutrition.scanAgain')}
              </button>
              <button onClick={handleClose} className="flex-1 py-3 rounded-xl bg-primary-600 text-white font-medium text-sm hover:bg-primary-700 transition-colors">
                {t('nutrition.manualEntry')}
              </button>
            </div>
          </div>
        )}

        {/* Error */}
        {status === 'error' && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-4 px-8 z-20">
            <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>
            <p className="text-white text-center font-semibold">{t('nutrition.cameraError')}</p>
            <p className="text-slate-400 text-center text-sm">{errorMsg}</p>
            <button onClick={handleClose} className="px-8 py-3 rounded-xl bg-white/10 text-white font-medium text-sm hover:bg-white/20 transition-colors">
              {t('common.back')}
            </button>
          </div>
        )}
      </div>

      {/* Bottom hint */}
      {status === 'scanning' && (
        <div className="relative z-10 px-6 py-3 text-center" style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}>
          <p className="text-slate-400 text-sm">{t('nutrition.scanHint')}</p>
        </div>
      )}
    </div>
  );
}
