import { View, FlatList } from 'react-native';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { STORAGE_KEYS } from '../utils/storageKeys';
import { setIsFirstTime } from '../features/appSlice';
import OnBoardingItem from '../components/OnBoardingItem';
import { onboardingData } from '../utils/onboardingData';

const Onboarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const dispatch = useDispatch();

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: any[] }) => {
      if (viewableItems?.length > 0 && viewableItems[0]?.index != null) {
        setCurrentIndex(viewableItems[0].index);
      }
    }
  ).current;

  const viewConfig = {
    viewAreaCoveragePercentThreshold: 50,
  };

  const scrollToIndex = (index: number) => {
    if (index < 0 || index >= onboardingData.length) return;

    flatListRef.current?.scrollToIndex({
      index,
      animated: true,
    });
  };

  const finishOnboarding = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.IS_FIRST_TIME, 'false');
      dispatch(setIsFirstTime(false));
    } catch (error) {
      console.error('Failed to finish onboarding:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewConfig}
        renderItem={({ item, index }) => (
          <OnBoardingItem
            item={item}
            index={index}
            totalSlides={onboardingData.length}
            currentIndex={currentIndex}
            onSkip={finishOnboarding}
            onGetStarted={finishOnboarding}
            onNext={() => scrollToIndex(index + 1)}
            onPrev={() => scrollToIndex(index - 1)}
          />
        )}
      />
    </View>
  );
};

export default Onboarding;
