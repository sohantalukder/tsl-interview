import { useTheme } from '@/theme';
import { IconProps } from '@/types/iconProps.type';
import React from 'react';
import Svg, { Path } from 'react-native-svg';

const HomeFillIcon: React.FC<IconProps> = ({ fill, height = 24, width = 24 }) => {
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
        d="M21.205 7.765a2.93 2.93 0 00-1.16-1.28l-6.47-4a3 3 0 00-3.16 0l-6.47 4a3 3 0 00-1.12 1.29 2.9 2.9 0 00-.24 1.7l1.68 10a2.94 2.94 0 001 1.79 3 3 0 001.9.7h9.62a3 3 0 001.94-.7 2.9 2.9 0 001-1.79l1.68-10a3 3 0 00-.2-1.71m-5.86 9.7h-6.69a1 1 0 010-2h6.69a1 1 0 110 2"
      />
    </Svg>
  );
};

export default HomeFillIcon;
