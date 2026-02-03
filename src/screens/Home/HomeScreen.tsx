import React, { useCallback, useMemo, useState } from 'react';
import {
    Alert,
    FlatList,
    Image,
    ListRenderItem,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import CustomHeader from '../../components/CustomHeader';
import { FONT_FAMILY, IMAGES } from '../../utils/utils';
import AppCarousel from '../../components/Home/Carousel';
import GradientText from '../../components/GradientText';
import { moderateScale, scale } from '../../utils/responsive';
import GradientBox from '../../components/Home/GradientBox';
import { UnistylesRuntime, useUnistyles } from 'react-native-unistyles';
import LinearGradient from 'react-native-linear-gradient';
import ProductCard from '../../components/ProductCard';
import { navigate } from '../../utils/navigationUtils';

const banners = [
    { id: 1, image: IMAGES.banner1 },
    { id: 2, image: IMAGES.banner1 },
    { id: 3, image: IMAGES.banner1 },
];


type CategoryItem = {
    id: number;
    name: string;
    image: string;
};
type jwellaryFocousedDataItem = {
    id: number;
    name: string;
    image: string;
}

const data: CategoryItem[] = [
    {
        id: 1,
        name: 'Earrings',
        image:
            'https://png.pngtree.com/thumb_back/fh260/background/20250224/pngtree-indian-jewellery-gold-image_16901904.jpg',
    }
    ,
    {
        id: 2,
        name: 'Necklace',
        image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlwHqcih-hK9JrU-4unSf8j5IdgZ6-XuggCQ&s',
    },
    {
        id: 3,
        name: 'Kada',
        image:
            'https://cdn2.shopclues.com/images1/thumbnails/96519/320/320/143388497-96519560-1548260767.jpg',
    },
    {
        id: 4,
        name: 'Ring',
        image:
            'https://cdn.orra.co.in/media/catalog/product/cache/10238651d5f95594b9023f998383bb67/o/r/org23l44.jpg',
    },
    {
        id: 5,
        name: 'Bangles',
        image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgnHHP3uLKqOkBhDbhSSadE-P8mJ4UOX_x9A&s',
    },
];



const jwellaryFocousedData: jwellaryFocousedDataItem[] = [
    {
        id: 1,
        name: 'New Arrival Products',
        image:
            'https://png.pngtree.com/thumb_back/fh260/background/20250224/pngtree-indian-jewellery-gold-image_16901904.jpg',
    },
    {
        id: 2,
        name: 'Best Selling Products',
        image:
            'https://cdn.orra.co.in/media/catalog/product/cache/10238651d5f95594b9023f998383bb67/o/r/org23l44.jpg',
    },
    {
        id: 3,
        name: 'New Arrival Products',
        image:
            'https://png.pngtree.com/thumb_back/fh260/background/20250224/pngtree-indian-jewellery-gold-image_16901904.jpg',
    },
    {
        id: 4,
        name: 'Best Selling Products',
        image:
            'https://cdn.orra.co.in/media/catalog/product/cache/10238651d5f95594b9023f998383bb67/o/r/org23l44.jpg',
    },

]



const HomeScreen = () => {
    const [category, setCategory] = useState<'male' | 'female'>('male');
const {theme} = useUnistyles()
    const isMale = category === 'male';
    const isFemale = category === 'female';







    const handleCategoryPress = (categoryId: string, categoryName: string) => {
        if (!categoryId) {
            Alert.alert('Category Not Found')
            return
        }
        navigate('ProductListing', {
            categoryId, 
            categoryName
        })
    }

    const renderCategory = useCallback<ListRenderItem<CategoryItem>>(
        ({ item }) => {
            return (
                <TouchableOpacity style={{
                    alignItems: 'center',

                }}
                    onPress={() => handleCategoryPress(String(item?.id), item?.name)}
                >
                    <View style={styles.categoryContainer}>
                        <Image source={{ uri: item?.image }} style={styles.categoryImage} />
                    </View>
                    <Text style={styles.categoryTitle1}>{item.name}</Text>
                </TouchableOpacity>
            );
        },
        []
    );
    const renderFocousedCard = useCallback<ListRenderItem<CategoryItem>>(
        ({ item }) => {
            return (
                <View style={styles.focusedCard}>
                    <View style={styles.focusedImageWrapper}>
                        <Image
                            source={{ uri: item.image }}
                            style={styles.focusedCardImage}
                        />
                    </View>

                    {/* overlay for readability */}
                    <View style={styles.focusedOverlay} />

                    <Text style={styles.focusedCardText}>
                        {item.name}
                    </Text>
                    <LinearGradient
                        style={styles.gradientBox}
                        colors={theme?.colors?.GOLD_GRADIENT}
                    >
                        <TouchableOpacity>

                            <Text style={styles.viewAllText}>View</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            );
        },
        []
    );




    return (
        <View style={styles.container}>
            <CustomHeader
                title="Nagauri Sringar"
                renderLeft={
                    <Image source={IMAGES.nagori} style={styles.appIcon} />
                }
                renderRight={
                    <View style={styles.rightContainer}>
                        <TouchableOpacity>
                            <Image source={IMAGES.bell} style={styles.rightIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={IMAGES.cart} style={styles.rightIcon} />
                        </TouchableOpacity>
                    </View>
                }
            />

            <ScrollView>
                <AppCarousel data={banners} />


                <View style={styles.categorySection}>
                    <View style={styles.categoryHeader}>
                        <GradientText colors={theme?.colors?.GOLD_GRADIENT} style={styles.categoryTitle}>
                            Category
                        </GradientText>

                        <View style={styles.categoryFilterRow}>
                            {/* MEN */}
                            <GradientBox
                                style={styles.categoryChip}
                                colors={isMale ? theme?.colors?.GOLD_GRADIENT : ['transparent', 'transparent']}
                                onPress={() => setCategory('male')}
                            >
                                <Text
                                    style={[
                                        styles.categoryText,
                                        { color: isMale ? '#fff' : '#000' },
                                    ]}
                                >
                                    Men
                                </Text>
                            </GradientBox>
                            <Text style={styles.separator}>|</Text>
                            <GradientBox
                                style={styles.categoryChip}
                                colors={isFemale ? theme?.colors?.GOLD_GRADIENT : ['transparent', 'transparent']}
                                onPress={() => setCategory('female')}
                            >
                                <Text
                                    style={[
                                        styles.categoryText,
                                        { color: isFemale ? '#fff' : '#000' },
                                    ]}
                                >
                                    Women
                                </Text>
                            </GradientBox>
                        </View>

                    </View>
                    <FlatList contentContainerStyle={{ gap: 15, paddingHorizontal: moderateScale(10) }} horizontal data={data} renderItem={renderCategory} />
                </View>
                <FlatList
                    data={jwellaryFocousedData}
                    renderItem={renderFocousedCard}
                    numColumns={2}
                    columnWrapperStyle={{
                        justifyContent: 'space-between',
                        // gap:10, 
                        margin: 8,
                    }}
                    style={{
                        marginTop: 20
                    }}
                    contentContainerStyle={{
                        // paddingHorizontal: 10,
                        paddingTop: 5,
                    }}
                    nestedScrollEnabled={false}
                    scrollEnabled={false}
                />
                <AppCarousel data={banners} isReverseFooter={true} autoPlay={false} />


                <View style={styles.categoryHeader}>
                    <GradientText colors={theme?.colors?.GOLD_GRADIENT} style={styles.categoryTitle}>
                        Trendy Jewellery
                    </GradientText>
                    <GradientText colors={theme?.colors?.GOLD_GRADIENT} style={[styles.categoryTitle, {
                        textDecorationLine: "underline",
                    }]}>
                        View All
                    </GradientText>


                </View>


                <FlatList
                    data={jwellaryFocousedData}
                    renderItem={() => (
                        <ProductCard
                            name="5 Gram Gold Earrings"
                            price="₹54,000000"
                            originalPrice="₹58,050"
                            rating={4.7}
                            discount={20}
                        />
                    )}
                    numColumns={2}
                    columnWrapperStyle={{
                        justifyContent: 'space-between',
                        margin: 8,
                    }}

                    contentContainerStyle={{
                    }}
                    nestedScrollEnabled={false}
                    scrollEnabled={false}
                />
                <AppCarousel data={banners} isReverseFooter={true} autoPlay={false} />


                <View style={styles.categoryHeader}>
                    <GradientText colors={theme?.colors?.GOLD_GRADIENT} style={styles.categoryTitle}>
                        For Kids
                    </GradientText>
                    <GradientText colors={theme?.colors?.GOLD_GRADIENT} style={[styles.categoryTitle, {
                        textDecorationLine: "underline",
                    }]}>
                        View All
                    </GradientText>
                </View>


                <FlatList
                    data={jwellaryFocousedData}
                    renderItem={() => (
                        <ProductCard
                            name="5 Gram Gold Earrings"
                            price="₹54,000000"
                            originalPrice="₹58,050"
                            rating={4.7}
                            discount={20}
                        />
                    )}
                    numColumns={2}
                    columnWrapperStyle={{
                        justifyContent: 'space-between',
                        margin: 8,
                    }}

                    contentContainerStyle={{
                    }}
                    nestedScrollEnabled={false}
                    scrollEnabled={false}
                />

            </ScrollView>


        </View>
    );
};

export default HomeScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7F3E9"
    },
    appIcon: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },

    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
        gap: 20,
    },

    rightIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },

    categorySection: {
        // marginTop: 10,
    },

    categoryHeader: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    categoryTitle: {
        fontFamily: FONT_FAMILY.Medium,
        fontSize: moderateScale(20),
    },

    categoryFilterRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },

    categoryChip: {
        paddingHorizontal: 14,
        borderRadius: 30,
    },

    categoryText: {
        fontFamily: FONT_FAMILY.Medium,
        fontSize: moderateScale(16),
    },

    separator: {
        fontSize: 18,
        opacity: 0.4,
    },

    //category

    categoryContainer: {
        borderWidth: 2,
        borderColor: "#AF6807",
        borderTopLeftRadius: 99,
        borderTopRightRadius: 99,
        height: 100,
        width: 80,
        overflow: "hidden",
    },
    categoryImage: {
        // position:"absolute",
        // top:1, 
        // right:3, 
        //  height: 100,
        // width: 80,
        width: "100%",
        height: '100%',
        resizeMode: 'cover',
        borderTopLeftRadius: 99,
        borderTopRightRadius: 99,
        // borderBottomLeftRadius:8, 
        // borderBottomRightRadius:8, 
    },
    categoryTitle1: {
        fontFamily: FONT_FAMILY.Light,
        fontSize: scale(15),
        marginTop: scale(3)
    },

    //focoused

    focusedCard: {
        width: UnistylesRuntime.screen.width * 0.46,
        height: 150,
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 14,

        // Shadow (iOS)
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 8,

        // Shadow (Android)
        elevation: 6,
    },

    focusedImageWrapper: {
        flex: 1,
    },

    focusedCardImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },

    focusedOverlay: {
        position: 'absolute',
        // bottom: 0,
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.45)',
    },

    focusedCardText: {
        position: 'absolute',
        bottom: 12,
        left: 12,
        top: 12,
        color: '#fff',
        fontSize: 16,
        width: 100,
        fontFamily: FONT_FAMILY.MograRegular,
        letterSpacing: 0.3,
    },
    gradientBox: {
        width: moderateScale(80),
        position: "absolute",
        left: 10,
        bottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start',
        borderRadius: moderateScale(30),
        minHeight: 25,
    },
    viewAllText: {
        color: "#ffffff",
        fontFamily: FONT_FAMILY.Medium,
    }

});
