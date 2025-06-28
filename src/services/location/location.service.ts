import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid, Platform } from 'react-native';
import type { LocationData, LocationError, LocationPermissionStatus, LocationServiceState } from '@/types/location';

class LocationService {
  private static instance: LocationService;
  private state: LocationServiceState;
  private watchId: number | null = null;
  private listeners: Array<(state: LocationServiceState) => void> = [];

  private constructor() {
    this.state = {
      currentLocation: null,
      isLoading: false,
      error: null,
      permissionStatus: { granted: false, status: 'unknown' },
    };
  }

  public static getInstance(): LocationService {
    if (!LocationService.instance) {
      LocationService.instance = new LocationService();
    }
    return LocationService.instance;
  }

  // Subscribe to state changes
  public subscribe(listener: (state: LocationServiceState) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  // Get current state
  public getState(): LocationServiceState {
    return { ...this.state };
  }

  // Update state and notify listeners
  private updateState(updates: Partial<LocationServiceState>): void {
    this.state = { ...this.state, ...updates };
    this.listeners.forEach((listener) => listener(this.state));
  }

  // Request location permissions
  public async requestPermissions(): Promise<LocationPermissionStatus> {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
          title: 'Location Permission',
          message: 'This app needs access to location to show your position on the map.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        });

        const permissionStatus: LocationPermissionStatus = {
          granted: granted === PermissionsAndroid.RESULTS.GRANTED,
          status:
            granted === PermissionsAndroid.RESULTS.GRANTED
              ? 'granted'
              : granted === PermissionsAndroid.RESULTS.DENIED
              ? 'denied'
              : 'blocked',
        };

        this.updateState({ permissionStatus });
        return permissionStatus;
      } else {
        // For iOS, we'll handle permission requests through the geolocation API
        const permissionStatus: LocationPermissionStatus = { granted: true, status: 'granted' };
        this.updateState({ permissionStatus });
        return permissionStatus;
      }
    } catch (error) {
      const permissionStatus: LocationPermissionStatus = { granted: false, status: 'denied' };
      this.updateState({ permissionStatus });
      return permissionStatus;
    }
  }

  // Get current location once
  public async getCurrentLocation(): Promise<LocationData | null> {
    return new Promise((resolve) => {
      this.updateState({ isLoading: true, error: null });

      Geolocation.getCurrentPosition(
        (position) => {
          const locationData: LocationData = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            altitude: position.coords.altitude ?? undefined,
            altitudeAccuracy: position.coords.altitudeAccuracy ?? undefined,
            heading: position.coords.heading ?? undefined,
            speed: position.coords.speed ?? undefined,
            timestamp: position.timestamp,
          };

          this.updateState({
            currentLocation: locationData,
            isLoading: false,
            error: null,
          });

          resolve(locationData);
        },
        (error) => {
          const locationError: LocationError = {
            code: error.code,
            message: this.getErrorMessage(error.code),
          };

          this.updateState({
            isLoading: false,
            error: locationError,
          });

          resolve(null);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        }
      );
    });
  }

  // Start watching location changes
  public async startWatchingLocation(): Promise<void> {
    if (this.watchId !== null) {
      this.stopWatchingLocation();
    }

    this.updateState({ isLoading: true, error: null });

    this.watchId = Geolocation.watchPosition(
      (position) => {
        const locationData: LocationData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          altitude: position.coords.altitude ?? undefined,
          altitudeAccuracy: position.coords.altitudeAccuracy ?? undefined,
          heading: position.coords.heading ?? undefined,
          speed: position.coords.speed ?? undefined,
          timestamp: position.timestamp,
        };

        this.updateState({
          currentLocation: locationData,
          isLoading: false,
          error: null,
        });
      },
      (error) => {
        const locationError: LocationError = {
          code: error.code,
          message: this.getErrorMessage(error.code),
        };

        this.updateState({
          isLoading: false,
          error: locationError,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 10, // Update when user moves 10 meters
      }
    );
  }

  // Stop watching location changes
  public stopWatchingLocation(): void {
    if (this.watchId !== null) {
      Geolocation.clearWatch(this.watchId);
      this.watchId = null;
    }
  }

  // Clear location data
  public clearLocation(): void {
    this.updateState({
      currentLocation: null,
      error: null,
      isLoading: false,
    });
  }

  // Get human-readable error messages
  private getErrorMessage(code: number): string {
    switch (code) {
      case 1:
        return 'Location access denied. Please enable location permissions in your device settings.';
      case 2:
        return "Location unavailable. Please check your device's location services.";
      case 3:
        return 'Location request timed out. Please try again.';
      default:
        return 'An unknown location error occurred. Please try again.';
    }
  }

  // Cleanup resources
  public cleanup(): void {
    this.stopWatchingLocation();
    this.listeners = [];
  }
}

const locationService = LocationService.getInstance();
export default locationService;
