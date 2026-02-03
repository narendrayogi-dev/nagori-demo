import { View, Text } from 'react-native'
import React from 'react'
import CurvedHeader from '../../components/CurvedHeader'
import { StyleSheet, UnistylesRuntime, useUnistyles } from 'react-native-unistyles'
import GradientBox from '../../components/Home/GradientBox'
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons'

const ProductDetails = () => {
    const {theme} = useUnistyles()
  return (
   <View>
    <CurvedHeader height={UnistylesRuntime.screen.height * 0.4}>
         <GradientBox
                style={styles.backButton}
                // hitSlop={10}
                onPress={()=>{}}
            >
                <MaterialDesignIcons
                    name="chevron-left"
                    size={25}
                    color={theme.colors.textInverse}
                />

            </GradientBox>
    </CurvedHeader>
   </View>
  )
}

export default ProductDetails

const styles = StyleSheet.create((theme, rt)=>({
    
}))