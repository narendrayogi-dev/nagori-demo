import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from '../screens/Home/HomeScreen';
import CustomBottomTab from '../components/CustomBottomTab';
import WishlistScreen from '../screens/Home/WishlistScreen';
import SearchScreen from '../screens/Home/SearchScreen';
import CollectionScreen from '../screens/Home/CollectionScreen';
import ProfileScreen from '../screens/Home/ProfileScreen';


const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
    screenOptions={{
      headerShown:false
    }}
    tabBar={(props) => <CustomBottomTab {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
<Tab.Screen name="Wishlist" component={WishlistScreen} />
<Tab.Screen name="Search" component={SearchScreen} />
<Tab.Screen name="Collection" component={CollectionScreen} />
<Tab.Screen name="Profile" component={ProfileScreen} />

    </Tab.Navigator>
  )
}

export default BottomTabNavigator