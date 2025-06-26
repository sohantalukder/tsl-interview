import { Text } from '@/shared/components/atoms';
import { useTheme } from '@/theme';
import {
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
  TextProps,
  Pressable,
} from 'react-native';
import { TextColor } from '@/shared/components/atoms/text/Text';
import { TypographySize } from '@/theme/types/fonts';

type Properties = TextProps & {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  textColor?: TextColor;
  variant?: TypographySize;
  textStyle?: StyleProp<TextStyle>;
};

const ClickableText: React.FC<Properties> = ({
  onPress,
  style,
  textColor = 'default',
  variant = 'body3',
  textStyle,
  children,
}) => {
  const { layout, gutters, colors } = useTheme();

  return (
    <Pressable
      android_ripple={{ color: colors.text }}
      onPress={onPress}
    >
      <View style={[layout.itemsCenter, gutters.padding_4, style]}>
        <Text
          variant={variant}
          color={textColor}
          weight="semibold"
          style={textStyle}
        >
          {children}
        </Text>
      </View>
    </Pressable>
  );
};

export default ClickableText;
