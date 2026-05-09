import { createContext, useContext, useRef, useCallback } from 'react';

const CameraContext = createContext(null);

// Global camera permission + stream management
// Requests permission once per session, reuses for subsequent scanner opens
export function CameraProvider({ children }) {
  const streamRef = useRef(null);
  const permissionGranted = useRef(false);

  const requestCamera = useCallback(async () => {
    // If we already have a live stream, return it
    if (streamRef.current) {
      const tracks = streamRef.current.getTracks();
      if (tracks.length > 0 && tracks[0].readyState === 'live') {
        return streamRef.current;
      }
    }

    // Request camera permission + stream
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      streamRef.current = stream;
      permissionGranted.current = true;
      return stream;
    } catch (err) {
      permissionGranted.current = false;
      throw err;
    }
  }, []);

  const releaseCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  }, []);

  const hasPermission = useCallback(() => permissionGranted.current, []);

  return (
    <CameraContext.Provider value={{ requestCamera, releaseCamera, hasPermission }}>
      {children}
    </CameraContext.Provider>
  );
}

export function useCamera() {
  return useContext(CameraContext);
}
