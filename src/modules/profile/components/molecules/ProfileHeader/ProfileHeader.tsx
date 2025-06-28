import React from 'react';
import { View } from 'react-native';
import { Text, Image } from '@/shared/components/atoms';
import { useTheme } from '@/theme';
import rs from '@/shared/utilities/responsiveSize';
import { IUser } from '@/modules/profile/types';

interface Props {
  profile: IUser;
}

const ProfileHeader: React.FC<Props> = ({ profile }) => {
  const { gutters, borders, layout } = useTheme();
  const { image, firstName, phone, lastName, email } = profile;
  return (
    <View style={[layout.row, layout.itemsCenter, gutters.marginBottom_24, gutters.gap_16]}>
      <Image
        source={{ uri: image }}
        style={[
          borders.rounded_100,
          borders.w_2,
          borders.primary,
          {
            width: rs(85),
            height: rs(85),
          },
        ]}
        resizeMode="cover"
      />

      <View style={gutters.gap_4}>
        <Text
          variant="heading2"
          color="default"
          weight="bold"
        >
          {`${firstName} ${lastName}`}
        </Text>

        <Text
          variant="body1"
          color="secondary"
          weight="medium"
        >
          {email}
        </Text>
        <Text
          variant="body1"
          color="secondary"
          weight="medium"
        >
          {phone}
        </Text>
      </View>
    </View>
  );
};

export default ProfileHeader;
