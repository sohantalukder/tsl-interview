export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface LocationData extends Coordinates {
  accuracy: number;
  altitude?: number;
  altitudeAccuracy?: number;
  heading?: number;
  speed?: number;
  timestamp: number;
}

export interface LocationError {
  code: number;
  message: string;
}

export interface LocationPermissionStatus {
  granted: boolean;
  status: 'granted' | 'denied' | 'blocked' | 'unknown';
}

export interface MapRegion extends Coordinates {
  latitudeDelta: number;
  longitudeDelta: number;
}

export interface LocationServiceState {
  currentLocation: LocationData | null;
  isLoading: boolean;
  error: LocationError | null;
  permissionStatus: LocationPermissionStatus;
}
