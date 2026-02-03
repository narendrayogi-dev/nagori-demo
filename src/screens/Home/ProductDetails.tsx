import { View, Text, Image, ScrollView, FlatList } from 'react-native'
import React from 'react'
import CurvedHeader from '../../components/CurvedHeader'
import { StyleSheet, UnistylesRuntime, useUnistyles } from 'react-native-unistyles'
import GradientBox from '../../components/Home/GradientBox'
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons'
import GradientText from '../../components/GradientText'
import { FONT_FAMILY, IMAGES } from '../../utils/utils'
import { moderateScale, scale } from '../../utils/responsive'
import { goBack } from '../../utils/navigationUtils'
import ProductImageCarousel from '../../components/ProductImageCarousel'
import IncrementCounter from '../../components/IncrementCounter'
import ProductDescriptionTabs from '../../components/Product/ProductDescriptionTabs'
import AnimatedButton from '../../components/AnimatedCustomButton'
import ProductCard from '../../components/ProductCard'
import WishlistHeart from '../../components/WishlistHeart'

const ProductDetails = () => {
    const { theme } = useUnistyles()
    return (
        <ScrollView style={styles.container}>
            <CurvedHeader height={UnistylesRuntime.screen.height * 0.4}>
                <View style={styles.headerRow}>
                    <GradientBox
                        style={styles.backButton}
                        // hitSlop={10}
                        onPress={() => {
                            goBack()
                        }}
                    >
                        <MaterialDesignIcons
                            name="chevron-left"
                            size={25}
                            color={theme.colors.textInverse}
                        />

                    </GradientBox>
                    <GradientText style={styles.gradientText}>Woman Ring</GradientText>
                    <View style={styles.rightContainer}>
                       <WishlistHeart isActive={false} productId='123'  onToggle={()=>{}} onSync={()=>{
                        
                       }}/>
                        <View style={styles.iconWrapper}>
                            <MaterialDesignIcons name='share-circle' color={"#fff"} size={22} />
                        </View>
                    </View>
                </View>

                <ProductImageCarousel data={[IMAGES.ring, IMAGES.ring, IMAGES.ring, IMAGES.ring, IMAGES.ring, IMAGES.ring, IMAGES.ring, IMAGES.ring, IMAGES.ring, IMAGES.ring, IMAGES.ring, IMAGES.ring, IMAGES.ring, IMAGES.ring,]} />

                <Text style={styles.availabilityText}>in stock</Text>
            </CurvedHeader>
            <View style={styles.productDetails}>
                <View style={styles.priceConatiner}>
                    <Text>20% Off</Text>
                    <View style={styles.ratingContainer}>
                        <Image source={IMAGES.star} style={{
                            width: 18,
                            height: 18,
                            resizeMode: 'contain'
                        }} />
                        <Image source={IMAGES.star} style={{
                            width: 18,
                            height: 18,
                            resizeMode: 'contain'
                        }} />
                        <Image source={IMAGES.star} style={{
                            width: 18,
                            height: 18,
                            resizeMode: 'contain'
                        }} />
                    </View>
                </View>
                <Text style={styles.productName}>5 Gram Gold Ring</Text>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <View>
                        <View style={[styles.priceConatiner, {
                            justifyContent: 'flex-start',
                            gap: 10,
                        }]}>
                            <GradientText
                                style={styles.priceText}
                                numberOfLines={1}
                                ellipsizeMode="tail"
                            >
                                ₹100
                            </GradientText>

                            {/* {originalPrice && ( */}
                            <GradientText
                                colors={['#CC9B18', '#AB6005', '#AB6005']}
                                style={[styles.priceText, styles.oldPrice]}
                                numberOfLines={1}
                                ellipsizeMode="tail"
                            >
                                ₹{1000}
                            </GradientText>
                            {/* )} */}
                        </View>
                        <Text style={styles.skuText}>SKU: ER-8521</Text>
                    </View>
                    <IncrementCounter />

                </View>

            </View>


            <ProductDescriptionTabs />

            <AnimatedButton title='Add to cart' leftIcon={IMAGES.cart} />

            <GradientText style={styles.relatedProductText}>Related Products</GradientText>

             <FlatList
                data={[1, 2, 4]}
                renderItem={(props) => (<ProductCard {...props}
                    name="5 Gram Gold Earrings"
                    price="₹54,000000"
                    originalPrice="₹58,050"
                    rating={4.7}
                    discount={20}

                />)}
                numColumns={2}
                columnWrapperStyle={{
                    justifyContent: 'space-between',
                    margin: 8,
                }}
                contentContainerStyle={{
                }}
            />

        </ScrollView>
    )
}

export default ProductDetails

const styles = StyleSheet.create((theme, rt) => ({
    container: {
        flex: 1,
        backgroundColor: theme?.colors?.background
    },
    headerRow: {
        flexDirection: 'row',

        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#CC9B18',
        padding: 3,
        borderRadius: 4,
        alignSelf: 'flex-start'
    },
    iconWrapper: {
        backgroundColor: "#000",
        borderRadius: moderateScale(99),
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,


    },
    rightContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    gradientText: {
        fontFamily: FONT_FAMILY.Bold,
        fontSize: moderateScale(23)
    },
    availabilityText: {
        color: theme?.colors?.success,
        fontFamily: FONT_FAMILY.Bold,
        textTransform: 'uppercase',
        position: 'absolute',
        top: moderateScale(70),
        right: scale(20)
    },
    ratingContainer: {
        flexDirection: "row",
        gap: 3,
        alignItems: 'center'

    },
    priceConatiner: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center'
    },
    productDetails: {
        paddingHorizontal: 10,

    },
    productName: {
        fontFamily: FONT_FAMILY.Bold,
        fontSize: scale(20)
    },
    priceText: {
        fontFamily: FONT_FAMILY.Bold,
        fontSize: moderateScale(20),
    },

    oldPrice: {
        textDecorationLine: 'line-through',
        opacity: 0.5,
        fontSize: moderateScale(15)
    },
    skuText: {
        fontFamily: FONT_FAMILY.Medium,
        fontSize: moderateScale(14)
    },
    productDesContainer: {

    }, 
    relatedProductText:{
        marginLeft:8, 
        marginTop:moderateScale(15),
        fontFamily:FONT_FAMILY.Medium, 
        fontSize:moderateScale(20)
    }
}))