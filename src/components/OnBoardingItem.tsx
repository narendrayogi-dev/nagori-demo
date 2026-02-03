import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import React from 'react';
import { StyleSheet, UnistylesRuntime } from 'react-native-unistyles';
import { fontSize, moderateScale } from '../utils/responsive';
import { FONT_FAMILY, IMAGES } from '../utils/utils';
import LinearGradient from 'react-native-linear-gradient';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';

interface OnboardingItemData {
  image: any;
  title: string;
  description: string;
}

interface Props {
  item: OnboardingItemData;
  index: number;
  totalSlides: number;
  currentIndex: number;
  onSkip: () => void;
  onGetStarted: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

const OnBoardingItem = ({
  item,
  index,
  totalSlides,
  currentIndex,
  onSkip,
  onGetStarted,
  onNext,
  onPrev,
}: Props) => {
  const isLast = index === totalSlides - 1;

  const handleRightPress = () => {
    if (isLast) {
      onGetStarted();
    } else {
      onNext?.();
    }
  };

  const handleLeftPress = () => {
    onPrev?.();
  };

  return (
    <View style={styles.container}>
      <Image source={item.image} resizeMode="cover" style={styles.image} />

      <View style={styles.card}>
        <View style={styles.cardContent}>
          {/* DOTS */}
          <View style={styles.dotsContainer}>
            {Array.from({ length: totalSlides }).map((_, i) => (
              <LinearGradient
                key={i}
                colors={
                  currentIndex === i
                    ? ['#CC9B18', '#AB6005']
                    : ['#000', '#000']
                }
                style={[
                  styles.dot,
                  currentIndex === i && styles.activeDot,
                ]}
              />
            ))}
          </View>

          {/* TITLE */}
          <Text style={styles.title}>{item.title}</Text>

          {/* DESCRIPTION */}
          <Text style={styles.description}>{item.description}</Text>

         
        </View>
         {/* ACTION ROW */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              
            }}
          >
            {/* SKIP */}
            {!isLast ? (
              <Pressable onPress={onSkip}>
                <Text style={styles.skipText}>Skip</Text>
              </Pressable>
            ) : (
              <View />
            )}

            {/* NAVIGATION BUTTONS */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 30,
              }}
            >
              {/* PREV */}
              <Pressable onPress={handleLeftPress}>
                <Image
                  source={IMAGES.styleArrow}
                  style={{
                    width: 28,
                    height: 28,
                    resizeMode: 'contain',
                  }}
                />
              </Pressable>

              {/* NEXT / GET STARTED */}
              <Pressable onPress={handleRightPress}>
                <ImageBackground
                  source={IMAGES.onBoardBtn}
                  style={styles.onBoardBtn}
                >
                  <MaterialDesignIcons
                    name="arrow-right"
                    color="#ffffff"
                    size={28}
                  />
                </ImageBackground>
              </Pressable>
            </View>
          </View>
      </View>
    </View>
  );
};

export default OnBoardingItem;

const styles = StyleSheet.create(theme => ({
    container: {
        flex: 1,
        width: UnistylesRuntime.screen.width,
        backgroundColor: '#000',
    },

    image: {
        width: UnistylesRuntime.screen.width,
        resizeMode: 'stretch',
        height: "100%"
    },

    card: {
        // padding: 10,
        backgroundColor: '#fff',
        position: 'absolute',
        minHeight: '40%',
        bottom: 0,
        borderTopLeftRadius: 125,
    },
    cardContent: {
        marginVertical: 20,
        

    },

    title: {
        fontSize: fontSize(20),
        fontFamily: FONT_FAMILY.Bold,
        color: theme.colors.primary,
        textAlign: 'center',
        marginVertical: moderateScale(5)
    },

    description: {
        fontSize: fontSize(14),
        fontFamily: FONT_FAMILY.Medium,
        textAlign: 'center',
        lineHeight: 18,
        color: '#000000',
    },

    highLight: {
        fontFamily: FONT_FAMILY.Bold,
        color: theme.colors.primary,
    },

    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 18,
    },

    dot: {
        width: 15,
        height: 3,
        borderRadius: 3,
        backgroundColor: '#D9D9D9',
        marginHorizontal: 4,
    },

    activeDot: {
        backgroundColor: theme.colors.primary,
    },

    skipText: {
        textAlign: 'center',
        color: theme.colors.textPrimary,
        fontSize: fontSize(14),
        fontFamily: FONT_FAMILY.Bold,
        marginLeft:moderateScale(20)
    },

    cta: {
        backgroundColor: theme.colors.primary,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 8,
    },

    ctaText: {
        color: '#fff',
        fontSize: fontSize(16),
        fontFamily: FONT_FAMILY.Bold,
    },
    onBoardBtn: {
        width: 70,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: "contain"
    }
}));
