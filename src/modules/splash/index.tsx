import { Loader } from '@/shared/components/atoms';
import { SafeScreen } from '@/shared/components/templates';

import { useTheme } from '@/theme';

import AnimatedLogo from './components/AnimatedLogo';
import useSplash from './hooks/useSplash';
const SplashIndex = () => {
  const { gutters } = useTheme();
  const { isLoading } = useSplash();
  return (
    <SafeScreen>
      <AnimatedLogo />
      {isLoading ? <Loader style={gutters.marginBottom_40} /> : null}
    </SafeScreen>
  );
};

export default SplashIndex;
