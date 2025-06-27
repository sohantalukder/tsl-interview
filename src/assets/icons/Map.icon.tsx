import { useTheme } from '@/theme';
import { IconProps } from '@/types/iconProps.type';
import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

const MapIcon: React.FC<IconProps> = ({ fill, height = 20, width = 20 }) => {
  const { colors } = useTheme();
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 14 14"
      preserveAspectRatio="xMidYMid meet"
    >
      <G
        fill="none"
        stroke={fill ?? colors.text}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M13.086 5.69a19 19 0 00-.305-3.502c-.093-.512-.167-1.07-.533-1.439-.104-.105-.225-.176-.357-.164-.487.045-1.009.18-1.38.282-.432.12-.927.363-1.41.594a.98.98 0 01-.67.063L4.913.614C4.301.47 3.361.708 2.783.867c-.362.1-.767.286-1.172.48-.146.07-.27.249-.364.431-.163.315-.23.667-.292 1.016l-.05.278a19.7 19.7 0 000 6.903c.096.533.158 1.131.563 1.49.098.087.21.139.33.116.368-.07.745-.221 1.147-.359.591-.202 1.182-.43 1.73-.58a.9.9 0 01.476 0l1.162.301" />
        <Path d="M5.064 10.636a1 1 0 00-.217-.028V.74q0-.063.007-.125l3.674.92q.157.038.315.023v3.88M13.4 9.731c0 1.983-2.295 3.7-2.542 3.7-.248 0-2.543-1.717-2.543-3.7a2.542 2.542 0 015.085 0m-2.543.051V9.63" />
      </G>
    </Svg>
  );
};

export default MapIcon;
