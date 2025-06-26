import { useTheme } from '@/theme';
import { IconProps } from '@/types/iconProps.type';
import React from 'react';
import Svg, { Path } from 'react-native-svg';

const TimeIcon: React.FC<IconProps> = ({ fill, height = 20, width = 20 }) => {
  const { colors } = useTheme();
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 512 512"
      preserveAspectRatio="xMidYMid meet"
    >
      <Path
        fill="none"
        stroke={fill ?? colors.gray1}
        strokeMiterlimit={10}
        strokeWidth={32}
        d="M256 64C150 64 64 150 64 256s86 192 192 192 192-86 192-192S362 64 256 64z"
      />
      <Path
        fill="none"
        stroke={fill ?? colors.gray1}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M256 128v144h96"
      />
    </Svg>
  );
};

export default TimeIcon;
