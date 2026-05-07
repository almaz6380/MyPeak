import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { X, ScanBarcode, Loader2, AlertCircle } from 'lucide-react';

export default function BarcodeScanner({ onScanned, onClose }) {
  const { t } = useTranslation();
  const [status, setStatus] = useState('starting');
  const [errorMsg, setErrorMsg] = useState('');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const animFrameRef = useRef(null);
  const isProcessingRef = useRef(false);
  const isMountedRef = useRef(true);
  const barcodeDetectorRef = useRef(null);

  const stopCamera = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
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

  const startCamera = useCallback(async () => {
    stopCamera();
    if (!isMountedRef.current) return;
    setStatus('starting');
    isProcessingRef.current = false;

    try {
      // Request camera — browser remembers permission for the origin
      // Using facingMode constraint directly (no getCameras() call = no extra permission prompt)
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: 'environment' },
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          // Request no zoom (wide angle)
          zoom: { ideal: 1.0 },
          focusMode: { ideal: 'continuous' },
        },
        audio: false,
      });

      if (!isMountedRef.current) {
        stream.getTracks().forEach((t) => t.stop());
        return;
      }

      streamRef.current = stream;

      // Apply zoom=1 via track constraints if supported
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        try {
          const capabilities = videoTrack.getCapabilities?.();
          if (capabilities?.zoom) {
            await videoTrack.applyConstraints({ advanced: [{ zoom: capabilities.zoom.min }] });
          }
        } catch {
          // zoom constraint not supported — fine
        }
      }

      const video = videoRef.current;
      if (!video) return;
      video.srcObject = stream;
      await video.play();

      // Initialize BarcodeDetector (native API, available in Chrome/Edge/Safari 17+)
      // Falls back to html5-qrcode if not available
      if ('BarcodeDetector' in window) {
        const formats = await BarcodeDetector.getSupportedFormats();
        const wantedFormats = ['ean_13', 'ean_8', 'upc_a', 'upc_e', 'code_128', 'code_39']
          .filter((f) => formats.includes(f));
        if (wantedFormats.length > 0) {
          barcodeDetectorRef.current = new BarcodeDetector({ formats: wantedFormats });
        }
      }

      // If no native BarcodeDetector, load html5-qrcode as fallback
      if (!barcodeDetectorRef.current) {
        const { Html5Qrcode, Html5QrcodeSupportedFormats } = await import('html5-qrcode');
        // We'll use the canvas-based decode method instead
        barcodeDetectorRef.current = {
          _html5qr: new Html5Qrcode('barcode-fallback-reader', {
            formatsToSupport: [
              Html5QrcodeSupportedFormats.EAN_13,
              Html5QrcodeSupportedFormats.EAN_8,
              Html5QrcodeSupportedFormats.UPC_A,
              Html5QrcodeSupportedFormats.UPC_E,
              Html5QrcodeSupportedFormats.CODE_128,
              Html5QrcodeSupportedFormats.CODE_39,
            ],
            verbose: false,
          }),
          async detect(source) {
            // html5-qrcode scanFile expects a File, we'll use canvas approach
            const canvas = document.createElement('canvas');
            canvas.width = source.videoWidth || source.width;
            canvas.height = source.videoHeight || source.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(source, 0, 0);
            try {
              const blob = await new Promise((r) => canvas.toBlob(r, 'image/jpeg', 0.8));
              const file = new File([blob], 'frame.jpg', { type: 'image/jpeg' });
              const text = await this._html5qr.scanFile(file, false);
              return [{ rawValue: text }];
            } catch {
              return [];
            }
          },
        };
      }

      if (isMountedRef.current) {
        setStatus('scanning');
        scanLoop();
      }
    } catch (err) {
      console.error('Camera error:', err);
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
  }, [stopCamera, t]);

  function scanLoop() {
    if (!isMountedRef.current || isProcessingRef.current) return;

    const video = videoRef.current;
    const detector = barcodeDetectorRef.current;
    if (!video || !detector || video.readyState < 2) {
      animFrameRef.current = requestAnimationFrame(scanLoop);
      return;
    }

    detector
      .detect(video)
      .then((barcodes) => {
        if (!isMountedRef.current || isProcessingRef.current) return;
        if (barcodes && barcodes.length > 0) {
          const code = barcodes[0].rawValue;
          if (code) {
            isProcessingRef.current = true;
            stopCamera();
            lookupBarcode(code);
            return;
          }
        }
        // Continue scanning
        animFrameRef.current = requestAnimationFrame(scanLoop);
      })
      .catch(() => {
        if (isMountedRef.current && !isProcessingRef.current) {
          animFrameRef.current = requestAnimationFrame(scanLoop);
        }
      });
  }

  useEffect(() => {
    isMountedRef.current = true;
    const timer = setTimeout(() => startCamera(), 50);
    return () => {
      isMountedRef.current = false;
      clearTimeout(timer);
      stopCamera();
    };
  }, []);

  function handleRetry() {
    isProcessingRef.current = false;
    startCamera();
  }

  function handleClose() {
    stopCamera();
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Hidden fallback container for html5-qrcode */}
      <div id="barcode-fallback-reader" className="hidden" />

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
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          playsInline
          muted
          autoPlay
        />

        {/* Scanning Overlay */}
        {status === 'scanning' && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="relative z-10 w-[85%] max-w-[340px] aspect-[2.2/1]">
              <div className="relative w-full h-full rounded-2xl" style={{ boxShadow: '0 0 0 2000px rgba(0,0,0,0.5)' }}>
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
