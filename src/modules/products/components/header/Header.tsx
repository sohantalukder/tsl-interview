import { Pressable, View } from 'react-native';
import React from 'react';
import { IconByVariant, Image, Text, TextInput } from '@/shared/components/atoms';
import rs from '@/shared/utilities/responsiveSize';
import layout from '@/theme/layout';
import { useTheme } from '@/theme';

const Header = () => {
  const { gutters } = useTheme();
  return (
    <View style={gutters.gap_16}>
      <Pressable style={[layout.row, layout.itemsCenter, gutters.gap_10]}>
        <Image
          source={{ uri: '' }}
          style={{ width: rs(45), height: rs(45) }}
          resizeMode="contain"
          borderRadius={100}
        />
        <View style={gutters.gap_2}>
          <Text
            variant="body2"
            color="secondary"
          >
            Welcome back,{' '}
          </Text>
          <Text weight="bold">Sohan Talukder 👋</Text>
        </View>
      </Pressable>
      <TextInput
        placeholder="Search Products ..."
        leftIcon={<IconByVariant path="search" />}
      />
    </View>
  );
};

export default Header;
