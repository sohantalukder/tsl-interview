import { Pressable, View } from 'react-native';
import React, { useCallback } from 'react';
import { IconByVariant, Image, Text, TextInput } from '@/shared/components/atoms';
import rs from '@/shared/utilities/responsiveSize';
import layout from '@/theme/layout';
import { useTheme } from '@/theme';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@/navigation/type';
import routes from '@/navigation/routes';

const Header = () => {
  const { gutters, colors } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const handleNavigate = useCallback(() => {
    navigation.navigate(routes.profile);
  }, [navigation]);
  return (
    <View style={gutters.gap_16}>
      <Pressable
        style={[layout.row, layout.itemsCenter, gutters.gap_10]}
        onPress={handleNavigate}
        android_ripple={{ color: colors.gray8 }}
      >
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
