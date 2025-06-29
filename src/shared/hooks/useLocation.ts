import { useState, useEffect, useCallback, useRef } from 'react';
import LocationService, { LocationRegion, LocationCoordinates, LocationError } from '../../services/LocationService';

export interface UseLocationResult {
  location: LocationRegion | null;
  loading: boolean;
  error: LocationError | null;
  hasPermission: boolean;
  getCurrentLocation: () => Promise<void>;
  refreshLocation: () => void;
  startWatching: () => void;
  stopWatching: () => void;
  isWatching: boolean;
}

export const useLocation = (autoFetch: boolean = true, watchLocation: boolean = false): UseLocationResult => {
  const [location, setLocation] = useState<LocationRegion | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<LocationError | null>(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [isWatching, setIsWatching] = useState(false);
  const watchIdRef = useRef<number | null>(null);

  const getCurrentLocation = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      // Check permission first
      const permissionGranted = await LocationService.checkLocationPermission();
      setHasPermission(permissionGranted);

      if (!permissionGranted) {
        setLoading(false);
        return;
      }

      // Get current location
      const locationRegion = await LocationService.getCurrentLocationRegion();
      setLocation(locationRegion);
    } catch (err) {
      const locationError = err as LocationError;
      setError(locationError);
      LocationService.showLocationError(locationError);

      // Set default location as fallback
      const defaultLocation = LocationService.getDefaultLocation();
      setLocation(defaultLocation);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshLocation = useCallback(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  const startWatching = useCallback(() => {
    if (watchIdRef.current !== null) {
      return; // Already watching
    }

    if (!hasPermission) {
      console.warn('Cannot start watching location: permission not granted');
      return;
    }

    setIsWatching(true);
    watchIdRef.current = LocationService.watchLocation(
      (coordinates: LocationCoordinates) => {
        setLocation((prevLocation) => ({
          ...coordinates,
          latitudeDelta: prevLocation?.latitudeDelta || 0.015,
          longitudeDelta: prevLocation?.longitudeDelta || 0.0121,
        }));
        setError(null);
      },
      (watchError: LocationError) => {
        setError(watchError);
        LocationService.showLocationError(watchError);
      }
    );
  }, [hasPermission]);

  const stopWatching = useCallback(() => {
    if (watchIdRef.current !== null) {
      LocationService.clearLocationWatch(watchIdRef.current);
      watchIdRef.current = null;
      setIsWatching(false);
    }
  }, []);

  // Initialize location on mount
  useEffect(() => {
    if (autoFetch) {
      getCurrentLocation();
    }
  }, [autoFetch, getCurrentLocation]);

  // Start watching if requested
  useEffect(() => {
    if (watchLocation && hasPermission && !isWatching) {
      startWatching();
    }

    return () => {
      if (watchLocation) {
        stopWatching();
      }
    };
  }, [watchLocation, hasPermission, isWatching, startWatching, stopWatching]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopWatching();
    };
  }, [stopWatching]);

  return {
    location,
    loading,
    error,
    hasPermission,
    getCurrentLocation,
    refreshLocation,
    startWatching,
    stopWatching,
    isWatching,
  };
};
