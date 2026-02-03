import { UnistylesRuntime } from 'react-native-unistyles';

// BASE guideline dimensions (adjust if needed)
const guidelineBaseWidth = 375;   // iPhone 11 width
const guidelineBaseHeight = 812;  // iPhone 11 height

/**
 * Horizontal scale (based on device width)
 */
export const scale = (size: number): number => {
  return (UnistylesRuntime.screen.width / guidelineBaseWidth) * size;
};

/**
 * Vertical scale (based on device height)
 */
export const verticalScale = (size: number): number => {
  return (UnistylesRuntime.screen.height / guidelineBaseHeight) * size;
};

/**
 * Balanced scale (recommended for most UI sizes)
 */
export const moderateScale = (size: number, factor: number = 0.5): number => {
  const scaled = scale(size);
  return size + (scaled - size) * factor;
};

/**
 * Responsive font size
 */
export const fontSize = (size: number): number => {
  return moderateScale(size, 0.45);
};

/**
 * Responsive spacing (padding, margin, etc.)
 */
export const spacing = (value: number): number => {
  return moderateScale(value * 8, 0.3);
};

/**
 * Responsive padding helper
 */
export const padding = (value: number) => ({
  padding: spacing(value),
});

/**
 * Responsive margin helper
 */
export const margin = (value: number) => ({
  margin: spacing(value),
});

/**
 * Responsive padding (sides)
 */
export const paddingH = (value: number) => ({
  paddingHorizontal: spacing(value),
});
export const paddingV = (value: number) => ({
  paddingVertical: spacing(value),
});

/**
 * Responsive margin (sides)
 */
export const marginH = (value: number) => ({
  marginHorizontal: spacing(value),
});
export const marginV = (value: number) => ({
  marginVertical: spacing(value),
});
