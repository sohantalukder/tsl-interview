import { Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

export interface LocationCoordinates {
  latitude: number;
  longitude: number;
}

export interface LocationRegion extends LocationCoordinates {
  latitudeDelta: number;
  longitudeDelta: number;
}

export interface LocationError {
  code: number;
  message: string;
}

export class LocationService {
  private static instance: LocationService;

  public static getInstance(): LocationService {
    if (!LocationService.instance) {
      LocationService.instance = new LocationService();
    }
    return LocationService.instance;
  }

  /**
   * Check location permission by attempting to get current position
   * This relies on native permission handling configured in platform files
   */
  public async checkLocationPermission(): Promise<boolean> {
    return new Promise((resolve) => {
      Geolocation.getCurrentPosition(
        () => {
          // If we get a position, permission is granted
          resolve(true);
        },
        (error) => {
          // Check if error is permission-related
          if (error.code === 1) {
            // PERMISSION_DENIED
            resolve(false);
          } else {
            // For other errors (timeout, unavailable), assume permission is granted
            // but location services might be disabled or unavailable
            resolve(true);
          }
        },
        {
          enableHighAccuracy: false,
          timeout: 5000,
          maximumAge: 60000,
        }
      );
    });
  }

  /**
   * Get current location coordinates
   */
  public getCurrentLocation(): Promise<LocationCoordinates> {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        (error) => {
          console.log('Location error:', error);
          reject({
            code: error.code,
            message: error.message,
          } as LocationError);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        }
      );
    });
  }

  /**
   * Get current location as a region for MapView
   */
  public async getCurrentLocationRegion(
    latitudeDelta: number = 0.015,
    longitudeDelta: number = 0.0121
  ): Promise<LocationRegion> {
    const coordinates = await this.getCurrentLocation();
    return {
      ...coordinates,
      latitudeDelta,
      longitudeDelta,
    };
  }

  /**
   * Get default location (San Francisco) as fallback
   */
  public getDefaultLocation(): LocationRegion {
    return {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    };
  }

  /**
   * Watch location changes
   */
  public watchLocation(
    onLocationChange: (location: LocationCoordinates) => void,
    onError: (error: LocationError) => void
  ): number {
    return Geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        onLocationChange({ latitude, longitude });
      },
      (error) => {
        onError({
          code: error.code,
          message: error.message,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 10, // Update only when moved 10 meters
      }
    );
  }

  /**
   * Clear location watch
   */
  public clearLocationWatch(watchId: number): void {
    Geolocation.clearWatch(watchId);
  }

  /**
   * Show location error alert
   */
  public showLocationError(error: LocationError): void {
    let message = 'Unable to get your current location. Please check your location settings.';

    switch (error.code) {
      case 1: // PERMISSION_DENIED
        message = 'Location permission was denied. Please enable location permission in your device settings.';
        break;
      case 2: // POSITION_UNAVAILABLE
        message = 'Location is currently unavailable. Please try again later.';
        break;
      case 3: // TIMEOUT
        message = 'Location request timed out. Please try again.';
        break;
    }

    Alert.alert('Location Error', message);
  }
}

export default LocationService.getInstance();
