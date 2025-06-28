import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Marker, Callout } from 'react-native-maps';
import { useTheme } from '@/theme';
import type { LocationData } from '@/types/location';

interface LocationMarkerProps {
  location: LocationData;
  title?: string;
  description?: string;
}

const LocationMarker: React.FC<LocationMarkerProps> = ({ location, title = 'Your Location', description }) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    markerContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    markerDot: {
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: colors.primary,
      borderWidth: 3,
      borderColor: colors.white,
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
    },
    markerPulse: {
      position: 'absolute',
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.primary,
      opacity: 0.3,
    },
    calloutContainer: {
      backgroundColor: colors.background,
      borderRadius: 8,
      padding: 12,
      minWidth: 200,
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
    },
    calloutTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 4,
    },
    calloutDescription: {
      fontSize: 14,
      color: colors.gray3,
      marginBottom: 8,
    },
    calloutInfo: {
      fontSize: 12,
      color: colors.gray5,
      lineHeight: 16,
    },
  });

  const formatAccuracy = (accuracy: number) => {
    if (accuracy < 1000) {
      return `${Math.round(accuracy)}m accuracy`;
    }
    return `${(accuracy / 1000).toFixed(1)}km accuracy`;
  };

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };

  return (
    <Marker
      coordinate={{
        latitude: location.latitude,
        longitude: location.longitude,
      }}
      anchor={{ x: 0.5, y: 0.5 }}
    >
      <View style={styles.markerContainer}>
        <View style={styles.markerPulse} />
        <View style={styles.markerDot} />
      </View>

      <Callout tooltip={false}>
        <View style={styles.calloutContainer}>
          <Text style={styles.calloutTitle}>{title}</Text>
          {description && <Text style={styles.calloutDescription}>{description}</Text>}
          <Text style={styles.calloutInfo}>
            {`Lat: ${location.latitude.toFixed(6)}\nLng: ${location.longitude.toFixed(6)}\n${formatAccuracy(
              location.accuracy
            )}\nUpdated: ${formatTimestamp(location.timestamp)}`}
          </Text>
        </View>
      </Callout>
    </Marker>
  );
};

export default LocationMarker;
