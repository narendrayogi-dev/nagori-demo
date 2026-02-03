import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/Home/HomeScreen';
import BottomTabNavigator from './BottomTabNavigator';
import ProductListing from '../screens/Home/ProductListing';
import ProductDetails from '../screens/Home/ProductDetails';


const Stack =createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
    screenOptions={{
        headerShown:false
    }}
    >
        <Stack.Screen name='MyTabs' component={BottomTabNavigator}/>
        <Stack.Screen name='Home' component={HomeScreen}/>
        <Stack.Screen name='ProductListing' component={ProductListing}/>
        <Stack.Screen name='ProductDetails' component={ProductDetails}/>
    </Stack.Navigator>
  )
}

export default AppNavigator