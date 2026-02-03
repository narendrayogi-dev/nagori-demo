import React, { ReactNode } from 'react';
import { View, StatusBar } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { SafeAreaView } from 'react-native-safe-area-context';

interface LayoutWrapperProps {
  children: ReactNode;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <View style={styles.inner}>
          {children}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default LayoutWrapper;

const styles = StyleSheet.create(( theme, rt) => ({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: theme?.colors?.background|| '#fff',
  },
  inner: {
    flex: 1,
  },
}));
