import React, { ReactNode, useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleProp,
    ViewStyle,
    TextStyle,
    ImageStyle,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';

import { moderateScale } from '../utils/responsive';
import { FONT_FAMILY, IMAGES } from '../utils/utils';
import { navigationRef } from '../utils/navigationUtils';
import GradientText from './GradientText';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GradientBox from './Home/GradientBox';


/* ---------------- TYPES ---------------- */

export type HeaderProps = {
    title?: string;

    onBackPress?: () => void;
    showBackButton?: boolean;

    leftText?: string;
    renderLeft?: ReactNode;

    rightIcon?: any;
    rightText?: string;
    onRightPress?: () => void;
    renderRight?: ReactNode;

    containerStyle?: StyleProp<ViewStyle>;
    titleStyle?: StyleProp<TextStyle>;
    rightIconStyle?: StyleProp<ImageStyle>;
    hasTitleCenter?: boolean
};


const Header: React.FC<HeaderProps> = ({
    title = '',
    onBackPress,
    showBackButton,

    leftText,
    renderLeft,

    rightIcon,
    rightText,
    onRightPress,
    renderRight,

    containerStyle,
    titleStyle,
    rightIconStyle,
    hasTitleCenter
}) => {
    const { theme } = useUnistyles();
    const isFocused = useIsFocused();
    const inset = useSafeAreaInsets();

    const [canGoBack, setCanGoBack] = useState(false);

    useEffect(() => {
        if (!isFocused) return;

        if (typeof showBackButton === 'boolean') {
            setCanGoBack(showBackButton);
        } else {
            setCanGoBack(
                navigationRef.isReady() && navigationRef.canGoBack()
            );
        }
    }, [isFocused, showBackButton]);


    const renderLeftSection = () => {
        if (renderLeft) return renderLeft;

        if (!canGoBack) return <View style={styles.sideSpacer} />;

        return (
            <GradientBox
                style={styles.backButton}
                // hitSlop={10}
                onPress={
                    onBackPress ??
                    (() => {
                        if (navigationRef.canGoBack()) {
                            navigationRef.goBack();
                        }
                    })
                }
            >
                <MaterialDesignIcons
                    name="chevron-left"
                    size={25}
                    color={theme.colors.textInverse}
                />

                {leftText ? (
                    <Text style={styles.sideText}>{leftText}</Text>
                ) : null}
            </GradientBox>
        );
    };


    const renderRightSection = () => {
        if (renderRight) return renderRight;

        if (!rightIcon && !rightText) {
            return <View style={styles.sideSpacer} />;
        }

        return (
            <TouchableOpacity
                style={styles.rightButton}
                onPress={onRightPress}
                hitSlop={10}
            >
                {rightText && (
                    <Text style={styles.sideText}>{rightText}</Text>
                )}
                {rightIcon && (
                    <Image
                        source={rightIcon}
                        style={[styles.icon, rightIconStyle]}
                        resizeMode="contain"
                    />
                )}
            </TouchableOpacity>
        );
    };

    return (
        <View style={[styles.container, containerStyle, {
            paddingTop: inset?.top + 10
        }]}>
            <LinearGradient colors={['#C99616', '#B96B09', '#C99616']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }} style={styles.border} />
            <View style={styles.leftContainer}>
                {renderLeftSection()}
                {
                    !hasTitleCenter && (
                        <GradientText
                            colors={['#C99616', '#B96B09', '#C99616']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }}
                            numberOfLines={1}
                            style={[styles.title, titleStyle]}
                        >
                            {title}
                        </GradientText>
                    )
                }

            </View>
            {
                hasTitleCenter && (
                    <GradientText
                        colors={['#C99616', '#B96B09', '#C99616']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        numberOfLines={1}
                        style={[styles.title, titleStyle]}
                    >
                        {title}
                    </GradientText>
                )
            }

            {/* RIGHT */}
            {renderRightSection()}
        </View>
    );

};

export default Header;

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create(theme => ({
    container: {
        backgroundColor: "#000",
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        paddingVertical: 12,
        paddingBottom: 20,
        // height:80, 
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginLeft: 8,
    },


    sideSpacer: {
        width: 40,
    },

    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#CC9B18',
        padding: 3,
        borderRadius: 4,
    },

    rightButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 6,

    },

    icon: {
        width: 26,
        height: 26,
        tintColor: theme.colors.primary,
    },

    sideText: {
        marginLeft: 6,
        fontSize: moderateScale(14),
        color: theme.colors.textPrimary,
        fontFamily: FONT_FAMILY.Medium,
    },

    title: {
        fontSize: moderateScale(22),
        fontFamily: FONT_FAMILY.Bold,
        textAlign: 'left',
    },
    border: {
        width: '100%',
        height: 3,
        position: 'absolute',
        bottom: 0,
    }
}));
