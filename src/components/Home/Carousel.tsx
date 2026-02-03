import React, { useRef, useState } from 'react';
import { View, Image, Dimensions, Text, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { StyleSheet } from 'react-native-unistyles';
import LinearGradient from 'react-native-linear-gradient';
import { FONT_FAMILY } from '../../utils/utils';
import { moderateScale, scale } from '../../utils/responsive';

const { width } = Dimensions.get('window');

type CarouselItem = {
  id: string | number;
  image: any;
};

type AppCarouselProps = {
  data: CarouselItem[];
  autoPlay?: boolean;
  isReverseFooter?: boolean;
};

const AppCarousel: React.FC<AppCarouselProps> = ({
  data,
  autoPlay = true,
  isReverseFooter = false,
}) => {
  const carouselRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View>
      <Carousel
        ref={carouselRef}
        width={width}
        height={width * 0.55}
        data={data}
        autoPlay={autoPlay}
        autoPlayInterval={1000}
        scrollAnimationDuration={800}
        pagingEnabled
        snapEnabled
        // overscrollEnabled={true}
        loop
        onSnapToItem={index => setActiveIndex(index)}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            {/* Title */}
            <Text style={styles.paginationTitle}>
              Gold jewellery For Women & Men
            </Text>

            {/* Shop Now Button */}
            <LinearGradient
              colors={['#C99616', '#B96B09', '#C99616']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={[
                styles.shopNowGradient,
                isReverseFooter
                  ? { left: 10, right: undefined }
                  : { right: 10, left: undefined },
              ]}
            >
              <TouchableOpacity
                style={styles.shopNowButton}
                activeOpacity={0.85}
              >
                <Text style={styles.shopNowText}>Shop Now</Text>
              </TouchableOpacity>
            </LinearGradient>

            {/* Image */}
            <Image source={item.image} style={styles.image} />
          </View>
        )}
      />

      {/* Pagination Dots */}
      <View
        style={[
          styles.pagination,
          isReverseFooter
            ? { right: 10, left: undefined }
            : { left: 10, right: undefined },
        ]}
      >
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              activeIndex === index && styles.activeDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default AppCarousel;


const styles = StyleSheet.create(theme => ({
  slide: {
    flex: 1,
    overflow: 'hidden',
  },

  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
  },

  dot: {
    width: 12,
    height: 3,
    borderRadius: 4,
    backgroundColor: '#FFFFFF8F',
    marginHorizontal: 4,
  },

  activeDot: {
    backgroundColor: theme?.colors?.primary,
  },

  paginationTitle: {
    position: 'absolute',
    zIndex: 99,
    top: 10,
    left: 10,
    color: '#ffffff',
    fontFamily: FONT_FAMILY.Medium,
    fontSize: scale(21),
  },

  shopNowGradient: {
    position: 'absolute',
    zIndex: 99,
    bottom: 10,
    height: 30,
    paddingHorizontal: 22,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },

  shopNowButton: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  shopNowText: {
    color: '#fff',
    fontSize: moderateScale(14),
    fontFamily: FONT_FAMILY.Bold,
    letterSpacing: 0.5,
  },
}));
