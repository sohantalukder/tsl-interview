import React, { memo, useMemo, useCallback } from 'react';
import { View, Pressable } from 'react-native';

import { useTheme } from '@/theme';
import { Text, IconByVariant, Loader } from '@/shared/components/atoms';
import { buttonStyles } from './styles/button.styles';
import { ButtonProps } from './types/type';

const Button: React.FC<ButtonProps> = memo(
  ({
    activityColor,
    bgColor,
    borderRadius = 8,
    disabled,
    icon,
    iconPosition = 'left',
    isLoading,
    onPress = () => {},
    rippleColor,
    textColor,
    textStyle = {},
    text = '',
    variant = 'primary',
    wrapStyle,
  }) => {
    const { colors } = useTheme();

    const styles = useMemo(
      () => buttonStyles({ bgColor, borderRadius, colors }),
      [borderRadius, bgColor, colors]
    );

    const handlePress = useCallback(() => {
      if (!isLoading) onPress();
    }, [isLoading, onPress]);

    const loaderColor = useMemo(() => {
      if (activityColor) return activityColor;
      return variant === 'outline' ? colors.text : colors.white;
    }, [activityColor, variant, colors.text, colors.white]);

    const renderIcon = (position: 'left' | 'right') => {
      if (iconPosition !== position) return null;
      return typeof icon === 'string' ? <IconByVariant path={icon} /> : icon;
    };

    return (
      <Pressable
        disabled={disabled || isLoading}
        onPress={handlePress}
        android_ripple={{ color: rippleColor ?? colors.text }}
        style={[styles.container, styles[variant] ?? {}, wrapStyle]}
      >
        {isLoading ? (
          <Loader color={loaderColor} />
        ) : (
          <View style={styles.iconGap}>
            {renderIcon('left')}
            {text && (
              <Text
                numberOfLines={1}
                variant="body1"
                weight="medium"
                style={[
                  {
                    color: textColor ?? styles[variant]?.color ?? colors.text,
                  },
                  textStyle,
                ]}
              >
                {text}
              </Text>
            )}
            {renderIcon('right')}
          </View>
        )}
      </Pressable>
    );
  }
);

export default Button;
