import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { Text } from '@/shared/components/atoms';
import { useTheme } from '@/theme';

interface Props {
  label: string;
  value: string | number;
  style?: StyleProp<ViewStyle>;
}

const ProfileItem: React.FC<Props> = ({ label, value, style }) => {
  const { gutters, layout } = useTheme();

  return (
    <View style={style}>
      <View style={[layout.row, layout.justifyBetween, layout.itemsCenter, gutters.paddingVertical_8]}>
        <Text
          variant="body1"
          color="secondary"
          weight="regular"
        >
          {label}
        </Text>
        <Text
          variant="body1"
          weight="medium"
        >
          {value}
        </Text>
      </View>
    </View>
  );
};

export default ProfileItem;
