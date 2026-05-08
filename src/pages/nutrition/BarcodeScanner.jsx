import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { X, ScanBarcode, Loader2, AlertCircle, ZoomOut, ZoomIn } from 'lucide-react';

const FORMATS = [
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
  const [zoomLevel, setZoomLevel] = useState(1);
  const [zoomRange, setZoomRange] = useState(null);
  const scannerRef = useRef(null);
  const isProcessingRef = useRef(false);
  const isMountedRef = useRef(true);

  const stopScanner = useCallback(async () => {
    const scanner = scannerRef.current;
    if (!scanner) return;
    try {
      const state = scanner.getState();
      if (state === 2) await scanner.stop();
    } catch { /* ignore */ }
    try { scanner.clear(); } catch { /* ignore */ }
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
    await stopScanner();
    if (!isMountedRef.current) return;
    setStatus('starting');
    isProcessingRef.current = false;

    try {
      const scanner = new Html5Qrcode('barcode-reader', {
        formatsToSupport: FORMATS,
        verbose: false,
      });
      scannerRef.current = scanner;

      // Use facingMode directly — this skips getCameras() and avoids extra permission prompts
      await scanner.start(
        { facingMode: 'environment' },
        {
          fps: 15,
          qrbox: (vw, vh) => {
            const w = Math.min(Math.floor(vw * 0.85), 340);
            const h = Math.min(Math.floor(w * 0.45), Math.floor(vh * 0.3));
            return { width: Math.max(w, 200), height: Math.max(h, 80) };
          },
          aspectRatio: window.innerHeight / window.innerWidth,
          disableFlip: false,
        },
        (decodedText) => {
          if (isProcessingRef.current) return;
          isProcessingRef.current = true;
          stopScanner().then(() => lookupBarcode(decodedText));
        },
        () => {} // ignore per-frame failures
      );

      if (!isMountedRef.current) return;

      // Try to set zoom to minimum after scanner started
      // Access the video track from the scanner's internal video element
      try {
        const videoEl = document.querySelector('#barcode-reader video');
        const track = videoEl?.srcObject?.getVideoTracks()?.[0];
        if (track) {
          const caps = track.getCapabilities?.();
          if (caps?.zoom) {
            await track.applyConstraints({ advanced: [{ zoom: caps.zoom.min }] });
            setZoomLevel(caps.zoom.min);
            setZoomRange({ min: caps.zoom.min, max: caps.zoom.max, step: caps.zoom.step || 0.1 });
          }
        }
      } catch { /* zoom not supported */ }

      setStatus('scanning');
    } catch (err) {
      console.error('Scanner error:', err);
      if (!isMountedRef.current) return;
      const errStr = err?.toString?.() || '';
      if (errStr.includes('NotAllowedError') || errStr.includes('Permission')) {
        setStatus('error');
        setErrorMsg(t('nutrition.cameraPermissionDenied'));
      } else {
        setStatus('error');
        setErrorMsg(t('nutrition.cameraError'));
      }
    }
  }, [stopScanner, lookupBarcode, t]);

  function adjustZoom(delta) {
    try {
      const videoEl = document.querySelector('#barcode-reader video');
      const track = videoEl?.srcObject?.getVideoTracks()?.[0];
      if (!track || !zoomRange) return;
      const newZoom = Math.max(zoomRange.min, Math.min(zoomRange.max, zoomLevel + delta));
      track.applyConstraints({ advanced: [{ zoom: newZoom }] });
      setZoomLevel(newZoom);
    } catch { /* ignore */ }
  }

  useEffect(() => {
    isMountedRef.current = true;
    const timer = setTimeout(() => startScanner(), 100);
    return () => {
      isMountedRef.current = false;
      clearTimeout(timer);
      stopScanner();
    };
  }, []);

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
        <button onClick={handleClose} className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Camera View — html5-qrcode renders its own video here */}
      <div className="flex-1 relative overflow-hidden">
        <div id="barcode-reader" className="absolute inset-0" />

        {/* Zoom Controls */}
        {status === 'scanning' && zoomRange && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 bg-black/60 backdrop-blur-sm rounded-full px-4 py-2">
            <button onClick={() => adjustZoom(-0.5)} className="p-1.5 text-white/70 hover:text-white transition-colors">
              <ZoomOut className="w-5 h-5" />
            </button>
            <span className="text-white text-xs font-medium min-w-[3rem] text-center">
              {zoomLevel.toFixed(1)}x
            </span>
            <button onClick={() => adjustZoom(0.5)} className="p-1.5 text-white/70 hover:text-white transition-colors">
              <ZoomIn className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Loading */}
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
              <button onClick={() => { isProcessingRef.current = false; startScanner(); }} className="flex-1 py-3 rounded-xl bg-white/10 text-white font-medium text-sm hover:bg-white/20 transition-colors">
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

        {/* Starting */}
        {status === 'starting' && (
          <div className="absolute inset-0 bg-black flex flex-col items-center justify-center gap-3 z-20">
            <Loader2 className="w-8 h-8 text-primary-400 animate-spin" />
            <p className="text-slate-400 text-sm">{t('nutrition.startingCamera')}</p>
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
