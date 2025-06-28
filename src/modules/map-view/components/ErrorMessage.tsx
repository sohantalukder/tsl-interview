import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@/theme';
import type { LocationError } from '@/types/location';

interface ErrorMessageProps {
  error: LocationError;
  onRetry?: () => void;
  onDismiss?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error, onRetry, onDismiss }) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: 60,
      left: 16,
      right: 16,
      backgroundColor: colors.background,
      borderRadius: 12,
      padding: 16,
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
      zIndex: 1000,
      borderLeftWidth: 4,
      borderLeftColor: colors.error,
    },
    title: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.error,
      marginBottom: 8,
    },
    message: {
      fontSize: 14,
      color: colors.text,
      lineHeight: 20,
      marginBottom: 16,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: 12,
    },
    button: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
      minWidth: 80,
      alignItems: 'center',
    },
    retryButton: {
      backgroundColor: colors.primary,
    },
    dismissButton: {
      backgroundColor: colors.gray7,
    },
    retryButtonText: {
      color: colors.white,
      fontSize: 14,
      fontWeight: '600',
    },
    dismissButtonText: {
      color: colors.text,
      fontSize: 14,
      fontWeight: '500',
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Location Error</Text>
      <Text style={styles.message}>{error.message}</Text>

      <View style={styles.buttonContainer}>
        {onDismiss && (
          <TouchableOpacity
            style={[styles.button, styles.dismissButton]}
            onPress={onDismiss}
          >
            <Text style={styles.dismissButtonText}>Dismiss</Text>
          </TouchableOpacity>
        )}

        {onRetry && (
          <TouchableOpacity
            style={[styles.button, styles.retryButton]}
            onPress={onRetry}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ErrorMessage;
