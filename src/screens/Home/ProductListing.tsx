import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '../../components/CustomHeader';
import { RouteProp, useRoute } from '@react-navigation/native';
import { IMAGES, RootStackParamList } from '../../utils/utils';
import { Text } from 'react-native-svg';
import ProductCard from '../../components/ProductCard';

type ProductListingRouteProp = RouteProp<
    RootStackParamList,
    'ProductListing'
>;

const ProductListing: React.FC = () => {
    const insets = useSafeAreaInsets();
    const route = useRoute<ProductListingRouteProp>();

    const { categoryId, categoryName } = route.params;

    return (
        <View>
            <Header hasTitleCenter title={categoryName} titleStyle={{
                textAlign: 'center'
            }}
                renderRight={
                    <View style={styles.rightContainer}>
                        <TouchableOpacity>
                            <Image source={IMAGES.sort} style={styles.rightIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={IMAGES.filter} style={styles.rightIcon} />
                        </TouchableOpacity>
                    </View>
                }
            />
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
        </View>
    );
};

export default ProductListing;

const styles = StyleSheet.create({
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

});
