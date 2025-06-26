import { Checkbox } from '@/shared/components/atoms';
import { ClickableText } from '@/shared/components/molecules';
import { useTheme } from '@/theme';
import layout from '@/theme/layout';
import { useState } from 'react';
import { View } from 'react-native';

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

export default RememberMe;
