import { useEffect, useState, useCallback, useRef } from 'react';
import locationService from './location.service';
import type { LocationServiceState } from '@/types/location';

interface UseLocationOptions {
  watchPosition?: boolean;
  autoRequestPermissions?: boolean;
}

interface UseLocationReturn extends LocationServiceState {
  requestPermissions: () => Promise<void>;
  getCurrentLocation: () => Promise<void>;
  startWatching: () => Promise<void>;
  stopWatching: () => void;
  clearLocation: () => void;
  refetch: () => Promise<void>;
}

export const useLocation = (options: UseLocationOptions = {}): UseLocationReturn => {
  const { watchPosition = false, autoRequestPermissions = true } = options;

  const [state, setState] = useState<LocationServiceState>(locationService.getState());
  const unsubscribeRef = useRef<(() => void) | null>(null);
  const isInitializedRef = useRef(false);

  // Subscribe to service state changes
  useEffect(() => {
    unsubscribeRef.current = locationService.subscribe(setState);

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, []);

  // Auto-initialize on mount
  useEffect(() => {
    const initialize = async () => {
      if (isInitializedRef.current) return;
      isInitializedRef.current = true;

      if (autoRequestPermissions) {
        await locationService.requestPermissions();
      }

      if (watchPosition) {
        await locationService.startWatchingLocation();
      }
    };

    initialize();

    return () => {
      if (watchPosition) {
        locationService.stopWatchingLocation();
      }
    };
  }, [autoRequestPermissions, watchPosition]);

  // Memoized action functions
  const requestPermissions = useCallback(async () => {
    await locationService.requestPermissions();
  }, []);

  const getCurrentLocation = useCallback(async () => {
    await locationService.getCurrentLocation();
  }, []);

  const startWatching = useCallback(async () => {
    await locationService.startWatchingLocation();
  }, []);

  const stopWatching = useCallback(() => {
    locationService.stopWatchingLocation();
  }, []);

  const clearLocation = useCallback(() => {
    locationService.clearLocation();
  }, []);

  const refetch = useCallback(async () => {
    if (watchPosition) {
      await locationService.startWatchingLocation();
    } else {
      await locationService.getCurrentLocation();
    }
  }, [watchPosition]);

  return {
    ...state,
    requestPermissions,
    getCurrentLocation,
    startWatching,
    stopWatching,
    clearLocation,
    refetch,
  };
};

export default useLocation;
