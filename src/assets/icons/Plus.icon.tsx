import { useTheme } from '@/theme';
import { IconProps } from '@/types/iconProps.type';
import React from 'react';
import Svg, { Path } from 'react-native-svg';

const PlusIcon: React.FC<IconProps> = ({ fill, height = 20, width = 20 }) => {
  const { colors } = useTheme();
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      preserveAspectRatio="xMidYMid meet"
    >
      <Path
        fill={fill ?? colors.text}
        d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
      />
    </Svg>
  );
};

export default PlusIcon;
