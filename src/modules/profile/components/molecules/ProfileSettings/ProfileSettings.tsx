import React from 'react';
import { View, Alert } from 'react-native';
import { Text, Switch, Button } from '@/shared/components/atoms';
import { useTheme } from '@/theme';
import ProfileSection from '../ProfileSection/ProfileSection';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@/navigation/type';
import routes from '@/navigation/routes';

const ProfileSettings: React.FC = () => {
  const { gutters, layout, variant, changeTheme } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const handleThemeToggle = (isDark: boolean) => {
    changeTheme(isDark ? 'dark' : 'default');
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          navigation.reset({
            index: 0,
            routes: [{ name: routes.login }],
          });
        },
      },
    ]);
  };

  return (
    <ProfileSection title="Settings">
      <View
        style={[
          layout.row,
          layout.justifyBetween,
          layout.itemsCenter,
          gutters.paddingVertical_16,
          gutters.marginBottom_16,
        ]}
      >
        <Text
          variant="body1"
          color="default"
          weight="regular"
        >
          Dark Mode
        </Text>
        <Switch
          value={variant === 'dark'}
          onPress={handleThemeToggle}
          name="theme-toggle"
        />
      </View>

      <Button
        variant="error"
        text="Logout"
        onPress={handleLogout}
      />
    </ProfileSection>
  );
};

export default ProfileSettings;
