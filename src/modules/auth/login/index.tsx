import { ScrollView, View } from 'react-native';
import React from 'react';
import { SafeScreen } from '@/shared/components/templates';
import { TextInput, Button, Text, IconByVariant } from '@/shared/components/atoms';
import { PasswordInput } from '@/shared/components/molecules';
import RememberMe from './components/RememberMe';
import layout from '@/theme/layout';
import { useTheme } from '@/theme';

const LoginIndex = () => {
  const { gutters } = useTheme();
  return (
    <SafeScreen>
      <ScrollView
        contentContainerStyle={[layout.flex_1, gutters.paddingHorizontal_20, gutters.gap_16, gutters.paddingTop_80]}
      >
        <View style={[layout.itemsCenter, layout.justifyCenter, gutters.marginBottom_20]}>
          <IconByVariant path="shop" />
        </View>
        <Text
          variant="heading1"
          weight="bold"
        >
          Login
        </Text>
        <Text
          variant="body1"
          weight="semibold"
          style={gutters.marginBottom_40}
        >
          Welcome back! Please enter your details to login
        </Text>
        <TextInput
          label="Email"
          required
        />
        <PasswordInput
          label="Password"
          required
        />
        <RememberMe callback={() => {}} />
        <Button
          text="Login"
          onPress={() => {}}
        />
      </ScrollView>
    </SafeScreen>
  );
};

export default LoginIndex;
