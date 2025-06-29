import { ScrollView, View, KeyboardAvoidingView, Platform } from 'react-native';
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
      <KeyboardAvoidingView
        style={layout.flex_1}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={[
            layout.flexGrow_1,
            gutters.paddingHorizontal_20,
            gutters.gap_16,
            gutters.paddingTop_80,
            gutters.paddingBottom_40,
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
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
            autoCapitalize="none"
            returnKeyType="next"
            blurOnSubmit={false}
          />
          <PasswordInput
            label="Password"
            required
            defaultValue={credentials.password}
            onChangeText={(text) => handleChange('password', text)}
            returnKeyType="done"
            onSubmitEditing={handleLogin}
          />
          <RememberMe callback={handleRememberMe} />
          <Button
            text="Login"
            onPress={handleLogin}
            isLoading={isLoading}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeScreen>
  );
};

export default LoginIndex;
