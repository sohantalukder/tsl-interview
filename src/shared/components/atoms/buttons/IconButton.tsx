import rs from '@/shared/utilities/responsiveSize';
import React from 'react';
import { Pressable, View } from 'react-native';

import { useTheme } from '@/theme';

import { IconByVariant } from '@/shared/components/atoms';
import { iconButtonStyles } from './styles/button.styles';
import { IconButtonProps } from './types/type';

const IconButton = React.memo(
  ({
    bgColor,
    borderRadius = rs(500),
    disabled,
    icon,
    onPress,
    style,
    size = 'medium',
    iconColor,
    iconSize,
  }: IconButtonProps) => {
    const { colors } = useTheme();
    return (
      <Pressable
        disabled={disabled}
        onPress={onPress}
        android_ripple={{ color:  colors.text }}  
        testID="icon-button"
      >
        <View
          style={[
            iconButtonStyles.container,
            iconButtonStyles[size],
            {
              backgroundColor: bgColor ?? colors.transparent,
              borderRadius,
            },
            style,
          ]}
        >
          {typeof icon === 'string' ? (
            <IconByVariant
              color={iconColor}
              height={iconSize}
              width={iconSize}
              path={icon}
            />
          ) : (
            icon
          )}
        </View>
      </Pressable>
    );
  }
);

export default IconButton;
