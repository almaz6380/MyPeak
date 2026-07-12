// IndexedDB-basierte Foto-Speicherung für Übungen (lokal auf dem Gerät)

const DB_NAME = 'mypeak_photos';
const STORE_NAME = 'exercise_photos';
const PRODUCT_STORE = 'product_photos';
const PROGRESS_STORE = 'progress_photos';
const DB_VERSION = 3;

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      // contains()-Checks für ALLE Stores — Nutzer kommen von v1 ODER v2,
      // bestehende Übungs-/Produktfotos dürfen nicht verloren gehen
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
      if (!db.objectStoreNames.contains(PRODUCT_STORE)) {
        db.createObjectStore(PRODUCT_STORE);
      }
      if (!db.objectStoreNames.contains(PROGRESS_STORE)) {
        const store = db.createObjectStore(PROGRESS_STORE, { keyPath: 'id' });
        store.createIndex('date', 'date');
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function getExercisePhoto(exerciseId) {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(`photo_${exerciseId}`);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

export async function saveExercisePhoto(exerciseId, base64Data) {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.put(base64Data, `photo_${exerciseId}`);
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => resolve(false);
    });
  } catch {
    return false;
  }
}

export async function deleteExercisePhoto(exerciseId) {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.delete(`photo_${exerciseId}`);
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => resolve(false);
    });
  } catch {
    return false;
  }
}

// ── Product Photos (Barcode-basiert) ────────────────────────

export async function getProductPhoto(barcode) {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(PRODUCT_STORE, 'readonly');
      const store = tx.objectStore(PRODUCT_STORE);
      const req = store.get(`product_${barcode}`);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

export async function saveProductPhoto(barcode, base64Data) {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(PRODUCT_STORE, 'readwrite');
      const store = tx.objectStore(PRODUCT_STORE);
      store.put(base64Data, `product_${barcode}`);
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => resolve(false);
    });
  } catch {
    return false;
  }
}

// ── Fortschritts-Fotos (Timeline, nur lokal — verlassen das Gerät nie) ──

export async function saveProgressPhoto({ date, base64, weightKg = null }) {
  try {
    const db = await openDB();
    const entry = { id: `progress_${Date.now()}`, date, base64, weightKg };
    return new Promise((resolve) => {
      const tx = db.transaction(PROGRESS_STORE, 'readwrite');
      tx.objectStore(PROGRESS_STORE).put(entry);
      tx.oncomplete = () => resolve(entry);
      tx.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

export async function getProgressPhotos() {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(PROGRESS_STORE, 'readonly');
      const req = tx.objectStore(PROGRESS_STORE).getAll();
      // Neueste zuerst
      req.onsuccess = () => resolve((req.result || []).sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id)));
      req.onerror = () => resolve([]);
    });
  } catch {
    return [];
  }
}

export async function deleteProgressPhoto(id) {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(PROGRESS_STORE, 'readwrite');
      tx.objectStore(PROGRESS_STORE).delete(id);
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => resolve(false);
    });
  } catch {
    return false;
  }
}

// Compress image from file input to max ~100KB JPEG
export function compressImage(file, maxWidth = 800, quality = 0.6) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const ratio = Math.min(maxWidth / img.width, maxWidth / img.height, 1);
          canvas.width = img.width * ratio;
          canvas.height = img.height * ratio;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL('image/jpeg', quality));
        } catch (err) {
          reject(new Error('Image compression failed'));
        }
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target.result;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}
