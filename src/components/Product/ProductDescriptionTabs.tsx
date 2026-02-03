import React from 'react';
import { View, Text, Pressable, LayoutChangeEvent } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';
import { FONT_FAMILY } from '../../utils/utils';
import { moderateScale } from '../../utils/responsive';

const TABS = ['Description', 'Other Specification'] as const;
type TabType = (typeof TABS)[number];

const ProductDescriptionTabs = () => {
  const [activeTab, setActiveTab] = React.useState<TabType>('Description');
  const tabWidth = React.useRef(0);

  const translateX = useSharedValue(0);

  const onTabLayout = (e: LayoutChangeEvent) => {
    tabWidth.current = e.nativeEvent.layout.width;
  };

  const onTabPress = (index: number, tab: TabType) => {
    setActiveTab(tab);
    translateX.value = withTiming(index * tabWidth.current, {
      duration: 250,
    });
  };

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View>
      <View style={styles.tabContainer}>
        {TABS.map((tab, index) => (
          <Pressable
            key={tab}
            style={styles.tab}
            onLayout={index === 0 ? onTabLayout : undefined}
            onPress={() => onTabPress(index, tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeText,
              ]}
            >
              {tab}
            </Text>
          </Pressable>
        ))}

        <Animated.View
          style={[
            styles.indicator,
            { width: tabWidth.current },
            indicatorStyle,
          ]}
        />
      </View>

      <View style={styles.content}>
        {activeTab === 'Description' ? (
          <Text style={styles.contentText}>
            This is the product description. High quality gold jewellery.
          </Text>
        ) : (
          <Text style={styles.contentText}>
            Weight: 5g{'\n'}
            Material: Gold{'\n'}
            Purity: 22K
          </Text>
        )}
      </View>
    </View>
  );
};

export default ProductDescriptionTabs;
const styles = StyleSheet.create(theme => ({
  tabContainer: {
    flexDirection: 'row',
    // borderBottomWidth: 3,
    // borderColor: '#E5E5E5',
    position: 'relative',
  },

  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },

  tabText: {
    fontSize: 14,
    color: theme?.colors?.textPrimary,
    fontFamily:FONT_FAMILY.Medium,
  },

  activeText: {
    color: theme?.colors?.primary ?? '#000',
    fontFamily:FONT_FAMILY.Bold,

  },

  indicator: {
    position: 'absolute',
    bottom: 0,
    height: 3,
    backgroundColor: theme?.colors?.primary ?? '#000',
  },

  content: {
    padding: moderateScale(12),
  },
  contentText:{
    fontFamily:FONT_FAMILY.Regular,
    fontSize:moderateScale(14), 
  }
}));
