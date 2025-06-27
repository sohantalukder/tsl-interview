import { useTheme } from '@/theme';
import { IconProps } from '@/types/iconProps.type';
import React from 'react';
import Svg, { Path } from 'react-native-svg';

const HomeIcon: React.FC<IconProps> = ({ fill, height = 24, width = 24 }) => {
  const { colors } = useTheme();
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      preserveAspectRatio="xMidYMid meet"
    >
      <Path
        fill="none"
        stroke={fill ?? colors.text}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M19.633 7.11l-6.474-4.02a2.23 2.23 0 00-2.362 0L4.324 7.133A2.23 2.23 0 003.31 9.362l1.67 10.027a2.23 2.23 0 002.228 1.86h9.582a2.23 2.23 0 002.229-1.86l1.67-10.027a2.23 2.23 0 00-1.058-2.251M8.636 16.459h6.685"
      />
    </Svg>
  );
};

export default HomeIcon;
