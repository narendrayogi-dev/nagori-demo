import React from 'react';
import {
  Text,
  View,
  TouchableWithoutFeedback,
  Image,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet } from 'react-native-unistyles';
import { moderateScale, fontSize } from '../utils/responsive';
import { FONT_FAMILY } from '../utils/utils';

const AnimatedLinearGradient =
  Animated.createAnimatedComponent(LinearGradient);

interface AnimatedButtonProps {
  title?: string;
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: any;
  rightIcon?: any;
  iconStyle?: any;
  textStyle?: any;
  containerStyle?: any;
  height?: number;
  width?: number | string;
  indicatorColor?: string;
  indicatorSize?: number | 'small' | 'large';
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  title = 'Press here',
  onPress = () => {},
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  iconStyle,
  textStyle,
  containerStyle,
  height = moderateScale(48),
  width = '90%',
  indicatorColor = '#fff',
  indicatorSize = 'small',
}) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handlePressIn = () => {
    scale.value = withTiming(0.96, { duration: 120 });
    opacity.value = withTiming(0.85, { duration: 120 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 120 });
    opacity.value = withTiming(1, { duration: 120 });

    setTimeout(() => {
      Keyboard.dismiss();
      onPress?.();
    }, 150);
  };

  return (
    <TouchableWithoutFeedback
      disabled={disabled || loading}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <AnimatedLinearGradient
        colors={['#CC9B18', '#AB6005']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[
          styles.buttonContainer,
          { height, width },
          animatedStyle,
          containerStyle,
          disabled && { opacity: 0.6 },
        ]}
      >
        {loading ? (
          <ActivityIndicator color={indicatorColor} size={indicatorSize} />
        ) : (
          <View style={styles.content}>
            {leftIcon && (
              <Image
                source={leftIcon}
                style={[
                  styles.icon,
                  iconStyle,
                  { marginRight: moderateScale(6) },
                ]}
              />
            )}

            <Text style={[styles.title, textStyle]}>{title}</Text>

            {rightIcon && (
              <Image
                source={rightIcon}
                style={[
                  styles.icon,
                  iconStyle,
                  { marginLeft: moderateScale(6) },
                ]}
              />
            )}
          </View>
        )}
      </AnimatedLinearGradient>
    </TouchableWithoutFeedback>
  );
};

export default AnimatedButton;
const styles = StyleSheet.create(() => ({
  buttonContainer: {
    borderRadius: moderateScale(100),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: moderateScale(8),
  },

  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontFamily: FONT_FAMILY.Bold,
    fontSize: fontSize(16),
    color: '#fff',
    // textTransform:"uppercase",
    textAlign:'center',
  },

  icon: {
    width: moderateScale(20),
    height: moderateScale(20),
    resizeMode: 'contain',
  },
}));
