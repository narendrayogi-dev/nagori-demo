import { View, Text, Image } from 'react-native'
import React from 'react'
import LayoutWrapper from '../components/_layoutWrapper'
import { StyleSheet, UnistylesRuntime } from 'react-native-unistyles'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useInsets } from '../hooks/useInsets'
import { IMAGES } from '../utils/utils'
import { moderateScale } from '../utils/responsive'
import LottieView from 'lottie-react-native';


const Splash = () => {
    const { top } = useInsets();
    return (
        <View style={[styles.container, {
            paddingTop: top 
        }]}>
         <Image source={IMAGES.splashWave} style={styles.splashWave}/>
         <Image source={IMAGES.logo} style={styles.logo}/>
         <LottieView source={require('../assets/Spinner.json')} autoPlay style={styles.spinner}/>
        </View>
    )
}

export default Splash

export const styles = StyleSheet.create((theme, rt) => ({
    container: {
        flex: 1,
        backgroundColor: "#020000", 
        justifyContent:'center', 
        alignItems:'center'
        // position:'relative',
    }, 
    splashWave:{
        position:'absolute',
        width:UnistylesRuntime.screen.width, 
        resizeMode:'contain',
        top:30, 
        // backgroundColor:'red', 
        height:300
        // zIndex:
    }, 
    logo:{
        width:moderateScale(250), 
        height:moderateScale(250) , 
        resizeMode:'contain'
    }, 
    spinner:{
        width:60, 
        height:60, 
        position:'absolute', 
        bottom:50,
    }

}))