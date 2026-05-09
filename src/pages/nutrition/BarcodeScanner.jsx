import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Quagga from '@ericblade/quagga2';
import { X, ScanBarcode, Loader2, AlertCircle, Plus, Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { lookupCommunityProduct, addCommunityProduct } from '../../data/communityProducts';

export default function BarcodeScanner({ onScanned, onClose }) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const lang = t('common.back') === 'Zurück' ? 'de' : 'en';
  const [status, setStatus] = useState('starting'); // starting | scanning | loading | notFound | addProduct | error
  const [errorMsg, setErrorMsg] = useState('');
  const [scannedBarcode, setScannedBarcode] = useState(null);
  const isProcessingRef = useRef(false);
  const isMountedRef = useRef(true);
  const quaggaRunningRef = useRef(false);

  // Add Product form state
  const [productName, setProductName] = useState('');
  const [productBrand, setProductBrand] = useState('');
  const [productCalories, setProductCalories] = useState('');
  const [productProtein, setProductProtein] = useState('');
  const [productCarbs, setProductCarbs] = useState('');
  const [productFat, setProductFat] = useState('');

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
    setScannedBarcode(barcode);

    try {
      // 1. Check community products first (our DB)
      const community = await lookupCommunityProduct(barcode);
      if (community) {
        onScanned({
          id: `community_${barcode}`,
          nameDE: community.name,
          nameEN: community.name,
          brand: community.brand || '',
          servingSize: 100,
          servingUnit: 'g',
          calories: community.calories,
          protein: community.protein,
          carbs: community.carbs,
          fat: community.fat,
          source: 'community',
          source_id: barcode,
        });
        return;
      }

      // 2. Check Open Food Facts
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

    const container = document.getElementById('scanner-container');
    if (container) container.querySelectorAll('video, canvas').forEach((el) => el.remove());

    setStatus('starting');
    isProcessingRef.current = false;

    Quagga.init(
      {
        inputStream: { name: 'Live', type: 'LiveStream', target: '#scanner-container', constraints: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } } },
        decoder: { readers: ['ean_reader', 'ean_8_reader', 'upc_reader', 'upc_e_reader', 'code_128_reader', 'code_39_reader'], multiple: false },
        locate: true,
        frequency: 15,
      },
      (err) => {
        if (err) {
          if (!isMountedRef.current) return;
          setStatus('error');
          setErrorMsg(t('nutrition.cameraError'));
          return;
        }
        if (!isMountedRef.current) return;
        Quagga.start();
        quaggaRunningRef.current = true;
        setStatus('scanning');
        const video = document.querySelector('#scanner-container video');
        if (video) { video.style.width = '100%'; video.style.height = '100%'; video.style.objectFit = 'cover'; }
      }
    );

    let lastCode = '';
    let confirmCount = 0;
    Quagga.onDetected((result) => {
      if (isProcessingRef.current || !isMountedRef.current) return;
      const code = result?.codeResult?.code;
      if (!code) return;
      if (code === lastCode) confirmCount++;
      else { lastCode = code; confirmCount = 1; }
      if (confirmCount >= 2) {
        isProcessingRef.current = true;
        stopQuagga();
        lookupBarcode(code);
      }
    });
  }, [stopQuagga, lookupBarcode, t]);

  async function handleAddProduct() {
    if (!productName.trim() || !scannedBarcode) return;

    const product = {
      barcode: scannedBarcode,
      name: productName.trim(),
      brand: productBrand.trim() || null,
      calories: parseFloat(productCalories) || 0,
      protein: parseFloat(productProtein) || 0,
      carbs: parseFloat(productCarbs) || 0,
      fat: parseFloat(productFat) || 0,
    };

    // Save to community DB
    await addCommunityProduct(user?.id, product);

    // Return to caller as scanned food
    onScanned({
      id: `community_${scannedBarcode}`,
      nameDE: product.name,
      nameEN: product.name,
      brand: product.brand || '',
      servingSize: 100,
      servingUnit: 'g',
      calories: product.calories,
      protein: product.protein,
      carbs: product.carbs,
      fat: product.fat,
      source: 'community',
      source_id: scannedBarcode,
    });
  }

  useEffect(() => {
    isMountedRef.current = true;
    const timer = setTimeout(startScanner, 100);
    return () => { isMountedRef.current = false; clearTimeout(timer); stopQuagga(); };
  }, []);

  function handleClose() { stopQuagga(); onClose(); }

  // ── ADD PRODUCT FORM ──
  if (status === 'addProduct') {
    return (
      <div className="fixed inset-0 bg-black z-50 flex flex-col">
        <div className="relative z-10 flex items-center justify-between px-4 pt-4 pb-2" style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}>
          <div className="flex items-center gap-2 text-white">
            <Plus className="w-5 h-5" />
            <h2 className="text-base font-semibold">{lang === 'de' ? 'Produkt hinzufügen' : 'Add Product'}</h2>
          </div>
          <button onClick={() => setStatus('notFound')} className="p-2 rounded-xl bg-white/10 text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <p className="text-xs text-slate-400 mb-4">Barcode: <span className="font-mono text-primary-400">{scannedBarcode}</span></p>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-slate-400 mb-1 block">{lang === 'de' ? 'Produktname' : 'Product Name'} *</label>
              <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder={lang === 'de' ? 'z.B. Protein Riegel' : 'e.g. Protein Bar'}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary-400" />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-400 mb-1 block">{lang === 'de' ? 'Marke' : 'Brand'}</label>
              <input type="text" value={productBrand} onChange={(e) => setProductBrand(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary-400" />
            </div>

            <p className="text-xs font-medium text-slate-400 mt-2">{lang === 'de' ? 'Nährwerte pro 100g' : 'Nutrition per 100g'}</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] text-slate-500 mb-0.5 block">kcal</label>
                <input type="number" inputMode="decimal" value={productCalories} onChange={(e) => setProductCalories(e.target.value)} placeholder="0"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white text-center focus:outline-none focus:ring-2 focus:ring-primary-400" />
              </div>
              <div>
                <label className="text-[10px] text-slate-500 mb-0.5 block">{lang === 'de' ? 'Protein (g)' : 'Protein (g)'}</label>
                <input type="number" inputMode="decimal" value={productProtein} onChange={(e) => setProductProtein(e.target.value)} placeholder="0"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white text-center focus:outline-none focus:ring-2 focus:ring-primary-400" />
              </div>
              <div>
                <label className="text-[10px] text-slate-500 mb-0.5 block">{lang === 'de' ? 'Kohlenhydrate (g)' : 'Carbs (g)'}</label>
                <input type="number" inputMode="decimal" value={productCarbs} onChange={(e) => setProductCarbs(e.target.value)} placeholder="0"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white text-center focus:outline-none focus:ring-2 focus:ring-primary-400" />
              </div>
              <div>
                <label className="text-[10px] text-slate-500 mb-0.5 block">{lang === 'de' ? 'Fett (g)' : 'Fat (g)'}</label>
                <input type="number" inputMode="decimal" value={productFat} onChange={(e) => setProductFat(e.target.value)} placeholder="0"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white text-center focus:outline-none focus:ring-2 focus:ring-primary-400" />
              </div>
            </div>
          </div>

          <p className="text-[10px] text-slate-500 mt-3 leading-relaxed">
            {lang === 'de'
              ? 'Dieses Produkt wird der MyPeak-Community zur Verfügung gestellt. Andere User können es dann ebenfalls per Barcode finden.'
              : 'This product will be shared with the MyPeak community. Other users will be able to find it by barcode too.'}
          </p>

          <button onClick={handleAddProduct} disabled={!productName.trim()}
            className="w-full mt-4 py-3 rounded-xl bg-primary-500 hover:bg-primary-600 disabled:bg-slate-700 disabled:text-slate-500 text-white font-semibold flex items-center justify-center gap-2 transition-colors">
            <Check className="w-5 h-5" />
            {lang === 'de' ? 'Produkt speichern' : 'Save Product'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      <div className="relative z-10 flex items-center justify-between px-4 pt-4 pb-2" style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}>
        <div className="flex items-center gap-2 text-white">
          <ScanBarcode className="w-5 h-5" />
          <h2 className="text-base font-semibold">{t('nutrition.scanBarcode')}</h2>
        </div>
        <button onClick={handleClose} className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 relative overflow-hidden">
        <div id="scanner-container" className="absolute inset-0" />

        {status === 'scanning' && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10">
            <div className="relative w-[85%] max-w-[340px] aspect-[2.2/1]">
              <div className="relative w-full h-full rounded-2xl" style={{ boxShadow: '0 0 0 2000px rgba(0,0,0,0.45)' }}>
                <div className="absolute -top-0.5 -left-0.5 w-10 h-10 border-t-[3px] border-l-[3px] border-primary-400 rounded-tl-xl" />
                <div className="absolute -top-0.5 -right-0.5 w-10 h-10 border-t-[3px] border-r-[3px] border-primary-400 rounded-tr-xl" />
                <div className="absolute -bottom-0.5 -left-0.5 w-10 h-10 border-b-[3px] border-l-[3px] border-primary-400 rounded-bl-xl" />
                <div className="absolute -bottom-0.5 -right-0.5 w-10 h-10 border-b-[3px] border-r-[3px] border-primary-400 rounded-br-xl" />
                <div className="absolute left-3 right-3 h-0.5 bg-primary-400 shadow-[0_0_8px_rgba(251,191,36,0.6)] animate-scan-line" />
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
            <div className="flex flex-col gap-2 w-full max-w-xs">
              <button onClick={() => setStatus('addProduct')} className="w-full py-3 rounded-xl bg-primary-500 text-white font-medium text-sm flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" />
                {lang === 'de' ? 'Produkt selbst hinzufügen' : 'Add product manually'}
              </button>
              <button onClick={() => { isProcessingRef.current = false; startScanner(); }} className="w-full py-3 rounded-xl bg-white/10 text-white font-medium text-sm">
                {t('nutrition.scanAgain')}
              </button>
              <button onClick={handleClose} className="w-full py-3 rounded-xl bg-white/5 text-slate-400 font-medium text-sm">
                {t('common.back')}
              </button>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-4 px-8 z-20">
            <AlertCircle className="w-8 h-8 text-red-400" />
            <p className="text-white text-center font-semibold">{t('nutrition.cameraError')}</p>
            <button onClick={handleClose} className="px-8 py-3 rounded-xl bg-white/10 text-white font-medium text-sm">{t('common.back')}</button>
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
