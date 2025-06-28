import { ScrollView, View } from 'react-native';
import React from 'react';
import { SafeScreen } from '@/shared/components/templates';
import { TextInput, Button, Text, IconByVariant } from '@/shared/components/atoms';
import { ClickableText, PasswordInput } from '@/shared/components/molecules';
import RememberMe from './components/RememberMe';
import layout from '@/theme/layout';
import { useTheme } from '@/theme';
import useLogin from './hooks/useLogin';

const LoginIndex = () => {
  const { gutters } = useTheme();
  const { isLoading, handleLogin, handleChange, credentials, handleRememberMe, handleSkip } = useLogin();
  return (
    <SafeScreen>
      <ClickableText
        style={[gutters.paddingHorizontal_20, layout.fullWidth, layout.itemsEnd]}
        onPress={handleSkip}
      >
        Skip
      </ClickableText>
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
          label="Username"
          required
          defaultValue={credentials.username}
          onChangeText={(text) => handleChange('username', text)}
        />
        <PasswordInput
          label="Password"
          required
          defaultValue={credentials.password}
          onChangeText={(text) => handleChange('password', text)}
        />
        <RememberMe callback={handleRememberMe} />
        <Button
          text="Login"
          onPress={handleLogin}
          isLoading={isLoading}
        />
      </ScrollView>
    </SafeScreen>
  );
};

export default LoginIndex;
