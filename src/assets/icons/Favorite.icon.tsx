import { useTheme } from '@/theme';
import { IconProps } from '@/types/iconProps.type';
import React from 'react';
import Svg, { Path } from 'react-native-svg';

const FavoriteIcon: React.FC<IconProps> = ({ fill, height = 24, width = 24 }) => {
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
        strokeWidth={2}
        d="M4.45 13.908l6.953 6.531c.24.225.36.338.5.366a.5.5 0 00.193 0c.142-.028.261-.14.5-.366l6.953-6.53a5.243 5.203 0 00.549-6.983l-.31-.399c-1.968-2.536-5.918-2.111-7.301.787a.54.54 0 01-.974 0C10.13 4.416 6.18 3.99 4.212 6.527l-.31.4a5.203 5.203 0 00.549 6.981z"
      />
    </Svg>
  );
};

export default FavoriteIcon;
