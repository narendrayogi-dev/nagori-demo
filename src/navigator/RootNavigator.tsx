import { StatusBar, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { RootState } from '../store/store';
import { STORAGE_KEYS } from '../utils/storageKeys';
import { setIsFirstTime } from '../features/appSlice';
import Splash from '../screens/Splash';
import Onboarding from '../screens/Onboarding';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';

const Center = ({ label }: { label: string }) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text style={{ fontSize: 20 }}>{label}</Text>
  </View>
);

const RootNavigator = () => {
  const dispatch = useDispatch();

  const { isAuthenticated, isGuest } = useSelector(
    (state: RootState) => state.auth
  );

  const { isFirstTime } = useSelector(
    (state: RootState) => state.app
  );

  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const checkFirstTime = async () => {
      const value = await AsyncStorage.getItem(STORAGE_KEYS.IS_FIRST_TIME);
      dispatch(setIsFirstTime(value === null));
    };

    checkFirstTime();
  }, [dispatch]);

  /* 🔹 Splash */
  if (showSplash || isFirstTime === null) {
    return <Splash/>;
  }

  if (isFirstTime) {
    return <Onboarding/>;
  }

  /* 🔹 Auth vs App */
  const canEnterApp = isAuthenticated || isGuest;

  return canEnterApp ? (
   <AppNavigator/>
  ) : (
    <AuthNavigator/>
  );
};

export default RootNavigator;
