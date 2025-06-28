import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme } from '@/theme';

interface LoadingOverlayProps {
  message?: string;
  visible: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ message = 'Getting your location...', visible }) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    container: {
      backgroundColor: colors.background,
      borderRadius: 12,
      padding: 24,
      alignItems: 'center',
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 10,
      minWidth: 200,
    },
    spinner: {
      marginBottom: 16,
    },
    message: {
      fontSize: 14,
      color: colors.text,
      textAlign: 'center',
      fontWeight: '500',
    },
  });

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <ActivityIndicator
          size="large"
          color={colors.primary}
          style={styles.spinner}
        />
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
};

export default LoadingOverlay;
