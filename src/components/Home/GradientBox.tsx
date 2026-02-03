import React, { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Pressable } from 'react-native';

type GradientBoxProps = {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  colors?: string[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  onPress?: () => void;
  disabled?: boolean;
};

const DEFAULT_COLORS = ['#C99616', '#B96B09', '#C99616'];

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const GradientBox: React.FC<GradientBoxProps> = ({
  children,
  style,
  colors = DEFAULT_COLORS,
  start = { x: 0, y: 0 },
  end = { x: 0, y: 1 },
  onPress,
  disabled = false,
}) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <AnimatedPressable
      disabled={disabled}
      onPress={onPress}
      onPressIn={() => {
        scale.value = withTiming(0.96);
        opacity.value = withTiming(0.85, { duration: 120 });
      }}
      onPressOut={() => {
        scale.value = withTiming(1);
        opacity.value = withTiming(1, { duration: 120 });
      }}
      style={animatedStyle}
    >
      <LinearGradient
        colors={colors}
        start={start}
        end={end}
        style={style}
      >
        {children}
      </LinearGradient>
    </AnimatedPressable>
  );
};

export default GradientBox;
