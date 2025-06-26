import { ScrollView, View } from 'react-native';
import React, { useState } from 'react';
import { SafeScreen } from '@/shared/components/templates';
import { TextInput, Button, Text, Checkbox, IconByVariant } from '@/shared/components/atoms';
import { ClickableText, PasswordInput } from '@/shared/components/molecules';
import layout from '@/theme/layout';
import { useTheme } from '@/theme';
import rs from '@/shared/utilities/responsiveSize';
const RememberMe = ({ callback }: { callback: (isChecked: boolean) => void }) => {
  const { gutters } = useTheme();
  const [isChecked, setIsChecked] = useState(true);
  const handlePress = () => {
    setIsChecked(!isChecked);
    callback(!isChecked);
  };
  return (
    <View style={[layout.row, layout.itemsCenter, gutters.gap_4]}>
      <Checkbox
        checked={isChecked}
        onPress={handlePress}
      />
      <ClickableText onPress={handlePress}>Keep me logged in</ClickableText>
    </View>
  );
};
const LoginIndex = () => {
  const { gutters } = useTheme();
  return (
    <SafeScreen>
      <ScrollView
        contentContainerStyle={[
          layout.flex_1,
          gutters.paddingHorizontal_20,
          gutters.gap_16,
          layout.justifyCenter,
          { marginTop: rs(-20) },
        ]}
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
