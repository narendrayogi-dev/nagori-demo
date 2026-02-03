import { View, Text, FlatList } from 'react-native'
import React, { useCallback } from 'react'
import { StyleSheet } from 'react-native-unistyles'
import Header from './CustomHeader'
import { FlashList } from "@shopify/flash-list";


const MyCart = () => {



    const renderCartItem= useCallback(({item})=>{
    (
        <Text>hey</Text>
    )

    }, [])


  return (
    <View style={styles.container}>
      <Header title='My Cart' hasTitleCenter/>
      <FlashList data={[1,2, 3]} renderItem={renderCartItem}/>
    </View>
  )
}

export default MyCart

const styles = StyleSheet.create((theme, rt)=>({
    container:{
        flex:1, 
        backgroundColor:theme?.colors?.background
    }
}))