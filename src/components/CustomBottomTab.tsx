import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';
import { FONT_FAMILY } from '../utils/utils';

/* ===================== ICON MAP ===================== */

const ICONS: Record<string, any> = {
    Home: require('../assets/images/BottomTabs/home.png'),
    Wishlist: require('../assets/images/BottomTabs/favourite.png'),
    Search: require('../assets/images/BottomTabs/search.png'),
    Collection: require('../assets/images/BottomTabs/collection.png'),
    Profile: require('../assets/images/BottomTabs/profile.png'),
};

const ACTIVE_ICONS: Record<string, any> = {
    Home: require('../assets/images/BottomTabs/homeActive.png'),
    Wishlist: require('../assets/images/BottomTabs/favouriteActive.png'),
    Search: require('../assets/images/BottomTabs/searchActive.png'),
    Collection: require('../assets/images/BottomTabs/collectionActive.png'),
    Profile: require('../assets/images/BottomTabs/profileActive.png'),
};


const CustomBottomTab: React.FC<BottomTabBarProps> = ({
    state,
    descriptors,
    navigation,
}) => {
    const insets = useSafeAreaInsets();

    return (
        <View
            style={[
                styles.container,
                {
                    paddingBottom: insets.bottom,
                    paddingVertical: 10,

                },

            ]}
        >
            {state.routes.map((route, index) => {
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const options = descriptors[route.key]?.options;

                let label: string;

                if (typeof options?.tabBarLabel === 'string') {
                    label = options.tabBarLabel;
                } else if (typeof options?.title === 'string') {
                    label = options.title;
                } else {
                    label = route.name;
                }


                return (
                    <TouchableOpacity
                        key={route.key}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        onPress={onPress}
                        style={styles.tabItem}
                        activeOpacity={0.8}
                    >
                        <Image
                            source={
                                isFocused
                                    ? ACTIVE_ICONS[route.name]
                                    : ICONS[route.name]
                            }
                            style={styles.icon}
                        />

                        <Text
                            style={[
                                styles.label,
                                isFocused && styles.activeLabel,
                            ]}
                        >
                            {label ?? ''}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

export default CustomBottomTab;


const styles = StyleSheet.create(theme => ({
    container: {
        flexDirection: 'row',
        backgroundColor: theme?.colors?.bottomTabBackground ?? '#fff',
        borderTopWidth: 3,
        borderTopColor: '#CC9B18',
    },

    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
    },

    icon: {
        width: 22,
        height: 22,
        resizeMode: 'contain',
    },

    label: {
        fontSize: 11,
        marginTop: 2,
        fontFamily: FONT_FAMILY.Regular,
        color: '#fff',
    },

    activeLabel: {
        color: theme?.colors?.primary ?? '#000',
        fontFamily: FONT_FAMILY.Bold
    },
}));
