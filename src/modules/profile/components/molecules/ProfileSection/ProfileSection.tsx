import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { Text } from '@/shared/components/atoms';
import { useTheme } from '@/theme';

interface Props {
  title: string;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const ProfileSection: React.FC<Props> = ({ title, children, style }) => {
  const { gutters } = useTheme();

  return (
    <View style={[gutters.marginBottom_32, style]}>
      <Text
        variant="heading3"
        color="default"
        weight="bold"
        style={gutters.marginBottom_8}
      >
        {title}
      </Text>
      {children}
    </View>
  );
};

export default ProfileSection;
