import React from 'react';
import { View, Text, Image, ImageSourcePropType, TouchableOpacity, Pressable } from 'react-native';
import { StyleSheet, UnistylesRuntime } from 'react-native-unistyles';
import { FONT_FAMILY, IMAGES } from '../utils/utils';
import { moderateScale } from '../utils/responsive';
import GradientText from './GradientText';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { navigate } from '../utils/navigationUtils';

/* ===================== TYPES ===================== */

type ProductCardProps = {
    image?: ImageSourcePropType | { uri: string };
    name: string;
    price: string;
    originalPrice?: string;
    rating?: number;     // ⭐ 0 - 5
    discount?: number;   // 💸 percentage
};


const ProductCard: React.FC<ProductCardProps> = ({
    image,
    name,
    price,
    originalPrice,
    rating = 0,
    discount = 0,
}) => {
    return (
        <Pressable style={styles.container} onPress={()=>{
            navigate('ProductDetails')
        }}>
            <TouchableOpacity style={styles.wishListContainer}
            >
<MaterialDesignIcons name='heart-outline' size={20} color={"#AA826D"}/>
            </TouchableOpacity>
            <Image
                source={
                    image ?? {
                        uri: 'https://cdn.orra.co.in/media/catalog/product/cache/10238651d5f95594b9023f998383bb67/o/r/org23l44.jpg',
                    }
                }
                style={styles.productImage}
            />

            <View style={styles.productDetails}>
                <Text style={styles.productName} numberOfLines={3}>
                    {name}
                </Text>

                <View style={styles.priceContainer}>
                    <GradientText
                        style={styles.priceText}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {price}
                    </GradientText>

                    {originalPrice && (
                        <GradientText
                            colors={['#CC9B18', '#AB6005', '#AB6005']}
                            style={[styles.priceText, styles.oldPrice]}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        >
                            {originalPrice}
                        </GradientText>
                    )}
                </View>

                {(rating > 0 || discount > 0) && (
                    <View style={styles.ratingContainer}>
                        {/* Rating */}
                        {rating > 0 && (
                            <View style={styles.ratingRow}>
                                <Image source={IMAGES.star} style={styles.starImage} />
                                <Text style={styles.ratingText} numberOfLines={1}>
                                    {rating.toFixed(1)}
                                </Text>
                            </View>
                        )}

                        {rating > 0 && discount > 0 && (
                            <View style={styles.verticalDivider} />
                        )}

                        {discount > 0 && (
                            <Text style={styles.discountText} numberOfLines={1}>
                                {discount}% OFF
                            </Text>
                        )}
                    </View>
                )}
            </View>
        </Pressable>
    );
};

export default ProductCard;


const styles = StyleSheet.create(() => ({
    container: {
        width: UnistylesRuntime.screen.width * 0.45,
        height: moderateScale(180),
        borderRadius: moderateScale(10),
        overflow: 'hidden',
        backgroundColor: '#fff',
        elevation: 3,
    },

    productImage: {
        width: '100%',
        height: '50%',
        resizeMode: 'cover',
    },

    productDetails: {
        padding: moderateScale(6),
    },

    productName: {
        fontSize: moderateScale(14),
        fontFamily: FONT_FAMILY.Medium,
        color: '#000',
    },

    /* ---------- Price ---------- */

    priceContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: moderateScale(6),
        // marginTop: moderateScale(4),
    },

    priceText: {
        fontFamily: FONT_FAMILY.Bold,
        fontSize: moderateScale(13),
    },

    oldPrice: {
        textDecorationLine: 'line-through',
        opacity: 0.5,
    },


    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // alignSelf: '',
        marginTop: moderateScale(6),
        gap: moderateScale(6),
    },

    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(3),
    },

    starImage: {
        width: moderateScale(14),
        height: moderateScale(14),
        resizeMode: 'contain',
    },

    ratingText: {
        fontFamily: FONT_FAMILY.Medium,
        fontSize: moderateScale(12),
        color: '#333',
    },

    verticalDivider: {
        width: 1,
        height: moderateScale(12),
        backgroundColor: '#DDD',
    },

    discountText: {
        fontFamily: FONT_FAMILY.Medium,
        fontSize: moderateScale(12),
        color: '#000',
    },
    wishListContainer:{
        backgroundColor:'#fff', 
        zIndex:1,
        justifyContent:'center', 
        alignItems:'center',
        width:30, 
        top:10, 
        right:10, 
        height:30, 
        borderRadius:99, 
        position:"absolute", 
    }
}));
