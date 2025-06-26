import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  withDelay,
  useDerivedValue,
  Easing,
} from 'react-native-reanimated';
import { useTheme } from '@/theme';
import { IconByVariant } from '@/shared/components/atoms';
const AnimatedLogo = () => {
  const { gutters, layout } = useTheme();
  const progress = useSharedValue(0);
  // Derived animations
  const scale = useDerivedValue(() =>
    withSequence(
      withTiming(1.2, { duration: 1000, easing: Easing.out(Easing.cubic) }),
      withTiming(0.95, { duration: 300 }),
      withTiming(1.05, { duration: 300 }),
      withTiming(1.0, { duration: 300 })
    )
  );

  const rotation = useDerivedValue(() => withTiming(0, { duration: 1250, easing: Easing.out(Easing.ease) }));

  const opacity = useDerivedValue(() => withTiming(1, { duration: 1000, easing: Easing.in(Easing.ease) }));

  // Start the animation
  useEffect(() => {
    progress.value = withDelay(100, withTiming(1, { duration: 2500 }));
  }, [progress]);

  // Animated styles
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { rotate: `${rotation.value * 30}deg` }],
    opacity: opacity.value,
  }));
  return (
    <View style={[layout.flex_1, layout.justifyCenter, layout.itemsCenter, gutters.marginBottom_80]}>
      <Animated.View style={animatedStyle}>
        <IconByVariant path="shop" />
      </Animated.View>
    </View>
  );
};

export default AnimatedLogo;
