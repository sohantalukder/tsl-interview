import type { ReactElement } from 'react';
import type { SvgProps } from 'react-native-svg';

import { useMemo } from 'react';
import { z } from 'zod';

import { useTheme } from '@/theme';
import { getIconsContext } from '@/assets/getAssetsContext';
import { IconProps } from '@/types/iconProps.type';

type Properties = {
  /**
   * The path to the icon like 'leftArrow', 'rightArrow', 'upArrow', 'downArrow'
   */
  readonly path: string;
} & IconProps &
  SvgProps;

const icons = getIconsContext();
const EXTENSION = 'tsx';

function IconByVariant({ height, path, width, color, ...props }: Properties) {
  const { variant } = useTheme();

  const iconProperties = { ...props, height, width, fill: color };
  const iconName = `${path.split('')[0].toUpperCase()}${path.substring(1)}`;
  const extendPath = `./${iconName}.icon.${EXTENSION}`;

  const Icon = useMemo(() => {
    try {
      const getDefaultSource = () => {
        const module = icons(`${extendPath}`);
        if (!module) {
          throw new Error(`Icon module not found for path: ${extendPath}`);
        }
        return z
          .object({
            default: z.function().returns(z.custom<ReactElement<SvgProps>>()),
          })
          .parse(module).default;
      };

      if (variant === 'default') {
        return getDefaultSource();
      }

      try {
        const module = icons(`${extendPath}`);
        if (!module) {
          console.warn(
            `Couldn't load the icon: ${path}.${EXTENSION} for the variant ${variant}, Fallback to default`
          );
          return getDefaultSource();
        }

        const fetchedModule = z
          .object({
            default: z.function().returns(z.custom<ReactElement<SvgProps>>()),
          })
          .parse(module);

        return fetchedModule.default;
      } catch (error) {
        console.warn(
          `Couldn't load the icon: ${path}.${EXTENSION} for the variant ${variant}, Fallback to default`,
          error
        );
        return getDefaultSource();
      }
    } catch (error) {
      console.error(`Couldn't load the icon: ${path}.${EXTENSION}`, error);
      throw error;
    }
  }, [variant, path, extendPath]);

  return <Icon {...iconProperties} />;
}

export default IconByVariant;
