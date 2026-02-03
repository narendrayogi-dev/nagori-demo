import { useSafeAreaInsets } from 'react-native-safe-area-context';

/**
 * Global safe-area inset hook
 * Use this in screens, headers, tab bars, modals
 */
export const useInsets = () => {
  const insets = useSafeAreaInsets();

  return {
    top: insets.top,
    bottom: insets.bottom,
    left: insets.left,
    right: insets.right,
  };
};
