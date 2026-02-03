import React from 'react';
import {
    View,
    Image,
    FlatList,
    ImageSourcePropType,
    Dimensions,
    ListRenderItem,
} from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

const { width } = Dimensions.get('window');

/* ===================== TYPES ===================== */

type ProductImage = ImageSourcePropType | ImageSourcePropType[];

type ProductImageCarouselProps = {
    data?: ProductImage;
};

/* ===================== COMPONENT ===================== */

const ProductImageCarousel: React.FC<ProductImageCarouselProps> = ({
    data,
}) => {
    const images = React.useMemo<ImageSourcePropType[]>(() => {
        if (!data) return [];
        return Array.isArray(data) ? data : [data];
    }, [data]);

    const [activeIndex, setActiveIndex] = React.useState(0);

    /* ---------- SINGLE IMAGE ---------- */
    if (images.length <= 1) {
        return <Image source={images[0]} style={styles.image} />;
    }

    /* ---------- OPTIMIZED RENDER ITEM ---------- */
    const renderItem = React.useCallback<ListRenderItem<ImageSourcePropType>>(
        ({ item }) => (
            <Image
                source={item}
                style={styles.image}
                resizeMode="contain"
            />
        ),
        []
    );

    /* ---------- PAGINATION (LIMITED DOTS) ---------- */
    const MAX_DOTS = 5;

    const getVisibleDots = () => {
        if (images.length <= MAX_DOTS) return images;

        const start = Math.max(
            0,
            activeIndex - Math.floor(MAX_DOTS / 2)
        );
        return images.slice(start, start + MAX_DOTS);
    };

    return (
        <View>
            <FlatList
                data={images}
                horizontal
                pagingEnabled
                keyExtractor={(_, i) => i.toString()}
                renderItem={renderItem}
                showsHorizontalScrollIndicator={false}
                initialNumToRender={1}
                maxToRenderPerBatch={2}
                windowSize={3}
                removeClippedSubviews
                getItemLayout={(_, index) => ({
                    length: width,
                    offset: width * index,
                    index,
                })}

                onMomentumScrollEnd={(e) => {
                    const index = Math.round(
                        e.nativeEvent.contentOffset.x / width
                    );
                    setActiveIndex(index);
                }}
            />
            <View style={styles.pagination}>
                {getVisibleDots().map((_, index) => {
                    const realIndex =
                        images.length <= MAX_DOTS
                            ? index
                            : index + Math.max(0, activeIndex - 2);

                    return (
                        <View
                            key={realIndex}
                            style={[
                                styles.dot,
                                realIndex === activeIndex && styles.activeDot,
                            ]}
                        />
                    );
                })}
            </View>
        </View>
    );
};

export default ProductImageCarousel;
const styles = StyleSheet.create(theme => ({
    image: {
        width,
        height: 230,
        alignSelf: 'center',
    },

    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: -8,
    },

    dot: {
        width: 12,
        height: 3,
        borderRadius: 3,
        backgroundColor: '#000000',
        marginHorizontal: 4,
    },

    activeDot: {
        backgroundColor: theme?.colors?.primary ?? '#000',
    },
}));
