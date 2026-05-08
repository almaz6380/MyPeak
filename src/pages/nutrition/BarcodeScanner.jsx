import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Quagga from '@ericblade/quagga2';
import { X, ScanBarcode, Loader2, AlertCircle } from 'lucide-react';

export default function BarcodeScanner({ onScanned, onClose }) {
  const { t } = useTranslation();
  const [status, setStatus] = useState('starting');
  const [errorMsg, setErrorMsg] = useState('');
  const isProcessingRef = useRef(false);
  const isMountedRef = useRef(true);
  const quaggaRunningRef = useRef(false);

  const stopQuagga = useCallback(() => {
    if (quaggaRunningRef.current) {
      Quagga.offDetected();
      Quagga.stop();
      quaggaRunningRef.current = false;
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

  const startScanner = useCallback(() => {
    stopQuagga();
    if (!isMountedRef.current) return;

    // Clear any leftover DOM from previous runs
    const container = document.getElementById('scanner-container');
    if (container) {
      container.querySelectorAll('video, canvas').forEach((el) => el.remove());
    }

    setStatus('starting');
    isProcessingRef.current = false;

    Quagga.init(
      {
        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          target: '#scanner-container',
          constraints: {
            facingMode: 'environment',
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        },
        decoder: {
          readers: [
            'ean_reader',
            'ean_8_reader',
            'upc_reader',
            'upc_e_reader',
            'code_128_reader',
            'code_39_reader',
          ],
          multiple: false,
        },
        locate: true,
        frequency: 15,
      },
      (err) => {
        if (err) {
          console.error('Quagga init error:', err);
          if (!isMountedRef.current) return;
          setStatus('error');
          const s = err?.toString?.() || '';
          setErrorMsg(
            s.includes('NotAllowedError') || s.includes('Permission')
              ? t('nutrition.cameraPermissionDenied')
              : t('nutrition.cameraError')
          );
          return;
        }

        if (!isMountedRef.current) return;

        Quagga.start();
        quaggaRunningRef.current = true;
        setStatus('scanning');

        // Style the video element Quagga creates
        const video = document.querySelector('#scanner-container video');
        if (video) {
          video.style.width = '100%';
          video.style.height = '100%';
          video.style.objectFit = 'cover';
        }
        const canvas = document.querySelector('#scanner-container canvas');
        if (canvas) {
          canvas.style.position = 'absolute';
          canvas.style.top = '0';
          canvas.style.left = '0';
          canvas.style.width = '100%';
          canvas.style.height = '100%';
        }
      }
    );

    // Use a confidence check: require the same barcode detected 2x consecutively
    let lastCode = '';
    let confirmCount = 0;

    Quagga.onDetected((result) => {
      if (isProcessingRef.current || !isMountedRef.current) return;

      const code = result?.codeResult?.code;
      if (!code) return;

      // Confidence check — require 2 consecutive identical reads
      if (code === lastCode) {
        confirmCount++;
      } else {
        lastCode = code;
        confirmCount = 1;
      }

      if (confirmCount >= 2) {
        isProcessingRef.current = true;
        stopQuagga();
        lookupBarcode(code);
      }
    });
  }, [stopQuagga, lookupBarcode, t]);

  useEffect(() => {
    isMountedRef.current = true;
    const timer = setTimeout(startScanner, 100);
    return () => {
      isMountedRef.current = false;
      clearTimeout(timer);
      stopQuagga();
    };
  }, []);

  function handleClose() {
    stopQuagga();
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

      {/* Camera */}
      <div className="flex-1 relative overflow-hidden">
        <div id="scanner-container" className="absolute inset-0" />

        {/* Scan overlay */}
        {status === 'scanning' && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10">
            <div className="relative w-[85%] max-w-[340px] aspect-[2.2/1]">
              <div className="relative w-full h-full rounded-2xl" style={{ boxShadow: '0 0 0 2000px rgba(0,0,0,0.45)' }}>
                <div className="absolute -top-0.5 -left-0.5 w-10 h-10 border-t-[3px] border-l-[3px] border-primary-400 rounded-tl-xl" />
                <div className="absolute -top-0.5 -right-0.5 w-10 h-10 border-t-[3px] border-r-[3px] border-primary-400 rounded-tr-xl" />
                <div className="absolute -bottom-0.5 -left-0.5 w-10 h-10 border-b-[3px] border-l-[3px] border-primary-400 rounded-bl-xl" />
                <div className="absolute -bottom-0.5 -right-0.5 w-10 h-10 border-b-[3px] border-r-[3px] border-primary-400 rounded-br-xl" />
                <div className="absolute left-3 right-3 h-0.5 bg-primary-400 shadow-[0_0_8px_rgba(129,140,248,0.6)] animate-scan-line" />
              </div>
            </div>
          </div>
        )}

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
