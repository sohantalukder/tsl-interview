import { Pressable, View } from 'react-native';
import React, { useCallback } from 'react';
import { Image, Text } from '@/shared/components/atoms';
import rs from '@/shared/utilities/responsiveSize';
import layout from '@/theme/layout';
import { useTheme } from '@/theme';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@/navigation/type';
import routes from '@/navigation/routes';
import { useAppSelector } from '@/state/hooks';
import { selectUser } from '@/state/slices/authSlice';

const Header = () => {
  const { gutters, colors } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const user = useAppSelector(selectUser);
  const handleNavigate = useCallback(() => {
    navigation.navigate(routes.profile);
  }, [navigation]);
  const fullName = user ? `${user?.firstName} ${user?.lastName}` : 'Guest User';
  return (
    <View style={gutters.gap_16}>
      <Pressable
        style={[layout.row, layout.itemsCenter, gutters.gap_10]}
        onPress={handleNavigate}
        android_ripple={{ color: colors.gray8 }}
      >
        <Image
          source={{ uri: user?.image }}
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
          <Text weight="bold">{fullName} 👋</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Header;
