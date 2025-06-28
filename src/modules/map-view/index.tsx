import React, { useEffect, useCallback, useState } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import MapView from 'react-native-maps';
import { useTheme } from '@/theme';
import { useLocation } from '@/services/location/useLocation.hook';
import LocationMarker from './components/LocationMarker';
import LoadingOverlay from './components/LoadingOverlay';
import ErrorMessage from './components/ErrorMessage';
import type { MapRegion } from '@/types/location';

const DEFAULT_REGION: MapRegion = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const MapViewIndex: React.FC = () => {
  const { colors } = useTheme();
  const [mapRegion, setMapRegion] = useState<MapRegion>(DEFAULT_REGION);
  const [showError, setShowError] = useState(false);

  const { currentLocation, isLoading, error, permissionStatus, requestPermissions, refetch } = useLocation({
    watchPosition: true,
    autoRequestPermissions: true,
  });

  // Update map region when location is found
  useEffect(() => {
    if (currentLocation) {
      setMapRegion({
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  }, [currentLocation]);

  // Show error when location fails
  useEffect(() => {
    if (error) {
      setShowError(true);
    }
  }, [error]);

  const handleRetryLocation = useCallback(async () => {
    setShowError(false);

    if (!permissionStatus.granted) {
      await requestPermissions();
    }

    await refetch();
  }, [permissionStatus.granted, requestPermissions, refetch]);

  const handleDismissError = useCallback(() => {
    setShowError(false);
  }, []);

  const handleMyLocationPress = useCallback(async () => {
    if (currentLocation) {
      setMapRegion({
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    } else {
      await handleRetryLocation();
    }
  }, [currentLocation, handleRetryLocation]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    mapContainer: {
      flex: 1,
    },
    map: {
      flex: 1,
    },
    myLocationButton: {
      position: 'absolute',
      bottom: 30,
      right: 20,
      backgroundColor: colors.background,
      borderRadius: 25,
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
      zIndex: 1000,
    },
    myLocationButtonText: {
      fontSize: 20,
      color: colors.primary,
    },
    permissionContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    permissionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 12,
      textAlign: 'center',
    },
    permissionMessage: {
      fontSize: 14,
      color: colors.gray3,
      marginBottom: 24,
      textAlign: 'center',
      lineHeight: 20,
    },
    permissionButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 8,
    },
    permissionButtonText: {
      color: colors.white,
      fontSize: 16,
      fontWeight: '600',
    },
  });

  // Show permission request screen if permissions are denied
  if (!permissionStatus.granted && permissionStatus.status === 'denied') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionTitle}>Location Permission Required</Text>
          <Text style={styles.permissionMessage}>
            To show your location on the map, please grant location permissions. This allows the app to display your
            current position with accuracy information.
          </Text>
          <TouchableOpacity
            style={styles.permissionButton}
            onPress={requestPermissions}
          >
            <Text style={styles.permissionButtonText}>Grant Permission</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          region={mapRegion}
          showsUserLocation={false}
          showsMyLocationButton={false}
          showsCompass={true}
          showsScale={true}
          loadingEnabled={true}
          onRegionChangeComplete={setMapRegion}
        >
          {currentLocation && (
            <LocationMarker
              location={currentLocation}
              title="Your Current Location"
              description={`Accuracy: ±${Math.round(currentLocation.accuracy)}m`}
            />
          )}
        </MapView>

        <TouchableOpacity
          style={styles.myLocationButton}
          onPress={handleMyLocationPress}
        >
          <Text style={styles.myLocationButtonText}>📍</Text>
        </TouchableOpacity>

        <LoadingOverlay
          visible={isLoading}
          message="Getting your location..."
        />

        {error && showError && (
          <ErrorMessage
            error={error}
            onRetry={handleRetryLocation}
            onDismiss={handleDismissError}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default MapViewIndex;
