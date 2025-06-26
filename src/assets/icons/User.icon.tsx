import { useTheme } from '@/theme';
import { IconProps } from '@/types/iconProps.type';
import React from 'react';
import Svg, { Circle, G, Path } from 'react-native-svg';

const UserIcon: React.FC<IconProps> = ({ height = 24, width = 24, fill }) => {
  const { colors } = useTheme();
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      preserveAspectRatio="xMidYMid meet"
    >
      <G
        fill="none"
        stroke={fill ?? colors.text}
        strokeWidth={1.5}
      >
        <Circle
          cx={12}
          cy={6}
          r={4}
        />
        <Path d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5z" />
      </G>
    </Svg>
  );
};

export default UserIcon;
