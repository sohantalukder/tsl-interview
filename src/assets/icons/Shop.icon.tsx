import { useTheme } from '@/theme';
import { IconProps } from '@/types/iconProps.type';
import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

const ShopIcon: React.FC<IconProps> = ({ height = 120, width = 120 }) => {
  const { colors } = useTheme();
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      preserveAspectRatio="xMidYMid meet"
    >
      <G fill="none">
        <Path
          fill="#f9c23c"
          d="M28.61 30H16.43c-.78 0-1.42-.632-1.42-1.424V15.424c0-.782.63-1.424 1.42-1.424h12.18c.78 0 1.42.632 1.42 1.424v13.162A1.42 1.42 0 0128.61 30"
        />
        <Path
          fill="#ff6723"
          d="M17.563 16.031a.5.5 0 01.5.5v2.684c0 2.035 1.94 3.8 4.484 3.8 2.553 0 4.484-1.764 4.484-3.8V16.53a.5.5 0 011 0v2.684c0 2.721-2.522 4.8-5.484 4.8-2.95 0-5.485-2.078-5.485-4.8V16.53a.5.5 0 01.5-.5"
        />
        <Path
          fill={colors.primary}
          d="M18.13 27.966H3.73c-.95 0-1.73-.77-1.73-1.73V9.726c0-.95.77-1.73 1.73-1.73h14.4c.95 0 1.73.77 1.73 1.73v16.52c0 .95-.77 1.72-1.73 1.72"
        />
        <Path
          fill="#0077b6"
          d="M11.016 2C7.746 2 5 4.375 5 7.425V10.5a.5.5 0 001 0V7.425C6 5.031 8.189 3 11.016 3s5.015 2.031 5.015 4.425V10.5a.5.5 0 001 0V7.425c0-3.05-2.746-5.425-6.015-5.425M2 14.69h17.86v2.33H2zm0 4.49h17.86v2.33H2zm17.86 4.49H2V26h17.86z"
        />
      </G>
    </Svg>
  );
};

export default ShopIcon;
