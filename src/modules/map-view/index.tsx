import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Config from 'react-native-config';
import { useLocation } from '@/shared/hooks';
import { useTheme } from '@/theme';
import { Text } from '@/shared/components/atoms';
import { staticFontStyles } from '@/theme/fonts';

const MapViewIndex: React.FC = () => {
  const { location, loading, error, hasPermission, refreshLocation, getCurrentLocation } = useLocation(true, false);
  const { colors, layout, gutters, borders } = useTheme();

  if (loading) {
    return (
      <View style={[layout.flex_1, layout.justifyCenter, layout.itemsCenter, { backgroundColor: colors.background }]}>
        <Text
          variant="heading3"
          color="default"
          weight="bold"
        >
          Loading Map...
        </Text>
        <Text
          variant="body2"
          color="secondary"
          style={gutters.marginTop_8}
        >
          Getting your current location
        </Text>
      </View>
    );
  }

  if (!Config.GOOGLE_MAPS_API_KEY || Config.GOOGLE_MAPS_API_KEY === 'YOUR_GOOGLE_MAPS_API_KEY_HERE') {
    return (
      <View
        style={[
          layout.flex_1,
          layout.justifyCenter,
          layout.itemsCenter,
          gutters.padding_20,
          { backgroundColor: colors.background },
        ]}
      >
        <Text
          variant="heading2"
          color="error"
          weight="bold"
          style={gutters.marginBottom_16}
        >
          Google Maps API Key Missing
        </Text>
        <Text
          variant="body1"
          style={[gutters.marginBottom_16, staticFontStyles.alignCenter]}
        >
          Please add your Google Maps API key to the .env file:
        </Text>
        <View style={[{ backgroundColor: colors.gray9 }, gutters.padding_8, borders.rounded_4]}>
          <Text variant="body3">GOOGLE_MAPS_API_KEY=your_actual_api_key_here</Text>
        </View>
      </View>
    );
  }

  if (!hasPermission) {
    return (
      <View
        style={[
          layout.flex_1,
          layout.justifyCenter,
          layout.itemsCenter,
          gutters.padding_20,
          { backgroundColor: colors.background },
        ]}
      >
        <Text
          variant="heading2"
          color="error"
          weight="bold"
          style={gutters.marginBottom_16}
        >
          Location Permission Required
        </Text>
        <Text
          variant="body1"
          color="secondary"
          style={[gutters.marginBottom_16, staticFontStyles.alignCenter]}
        >
          This app needs location permission to show your position on the map.
        </Text>
        <TouchableOpacity
          style={[
            { backgroundColor: colors.primary },
            gutters.paddingHorizontal_24,
            gutters.paddingVertical_12,
            borders.rounded_8,
            gutters.marginTop_16,
          ]}
          onPress={getCurrentLocation}
        >
          <Text
            variant="body1"
            color="white"
            weight="bold"
          >
            Grant Permission
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={layout.flex_1}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={layout.flex_1}
        region={location || undefined}
        showsUserLocation={true}
        showsMyLocationButton={true}
        followsUserLocation={false}
        showsCompass={true}
        showsScale={true}
        loadingEnabled={true}
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Your Location"
            description="You are here"
            pinColor={colors.error}
          />
        )}
      </MapView>

      <View
        style={[
          layout.absolute,
          layout.bottom_10,
          layout.left_10,
          layout.right_10,
          { backgroundColor: colors.background },
          gutters.padding_16,
          borders.rounded_8,
          styles.shadow,
        ]}
      >
        <Text
          variant="heading3"
          weight="bold"
          style={gutters.marginBottom_8}
        >
          Current Location
        </Text>
        {location && (
          <View>
            <Text
              variant="body2"
              style={gutters.marginBottom_4}
            >
              Latitude: {location.latitude.toFixed(6)}
            </Text>
            <Text
              variant="body2"
              style={gutters.marginBottom_4}
            >
              Longitude: {location.longitude.toFixed(6)}
            </Text>
          </View>
        )}
        {error && (
          <Text
            variant="body2"
            color="error"
            style={gutters.marginBottom_4}
          >
            Error: {error.message}
          </Text>
        )}
        <TouchableOpacity
          style={[
            { backgroundColor: colors.success },
            gutters.paddingHorizontal_16,
            gutters.paddingVertical_8,
            borders.rounded_8,
            gutters.marginTop_12,
            layout.alignSelfStart,
          ]}
          onPress={refreshLocation}
        >
          <Text
            variant="body2"
            color="white"
            weight="bold"
          >
            Refresh Location
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default MapViewIndex;
