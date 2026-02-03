import React, { useEffect } from 'react';
import { TextProps, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from 'react-native-reanimated';

interface AnimatedTextProps extends TextProps {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  from?: {
    opacity?: number;
    translateY?: number;
    scale?: number;
  };
  onPress?: () => void;
  pressScale?: number;
}

const AnimatedText = ({
  children,
  style,
  duration = 400,
  delay = 0,
  from = { opacity: 0, translateY: 10, scale: 1 },
  onPress,
  pressScale = 0.95,
  ...props
}: AnimatedTextProps) => {
  const opacity = useSharedValue(from.opacity ?? 0);
  const translateY = useSharedValue(from.translateY ?? 0);
  const scale = useSharedValue(from.scale ?? 1);

  // Press interaction scale
  const pressScaleValue = useSharedValue(1);

  useEffect(() => {
    opacity.value = withDelay(delay, withTiming(1, { duration }));
    translateY.value = withDelay(delay, withTiming(0, { duration }));
    scale.value = withDelay(delay, withTiming(1, { duration }));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateY: translateY.value },
      { scale: scale.value * pressScaleValue.value },
    ],
  }));

  const onPressIn = () => {
    pressScaleValue.value = withTiming(pressScale, { duration: 100 });
  };

  const onPressOut = () => {
    pressScaleValue.value = withTiming(1, { duration: 100 });
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      disabled={!onPress}
    >
      <Animated.Text style={[style, animatedStyle]} {...props}>
        {children}
      </Animated.Text>
    </Pressable>
  );
};

export default AnimatedText;
