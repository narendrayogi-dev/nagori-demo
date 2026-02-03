import React, { useCallback, useEffect } from 'react';
import { Pressable, View } from 'react-native';
import debounce from 'lodash.debounce';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { StyleSheet } from 'react-native-unistyles';

type Props = {
  productId: string;
  isActive: boolean;
  onToggle: (id: string) => void;       // UI toggle
  onSync?: (id: string) => void;        // API call
};

const WishlistHeart: React.FC<Props> = ({
  productId,
  isActive,
  onToggle,
  onSync,
}) => {
  const debouncedSync = useCallback(
    debounce((id: string) => {
      onSync?.(id);
    }, 500),
    [onSync]
  );

  useEffect(() => {
    return () => {
      debouncedSync.cancel();
    };
  }, []);

  const handlePress = () => {
    onToggle(productId);
    debouncedSync(productId);
  };

  return (
    <Pressable onPress={handlePress} hitSlop={8}>
      <View style={styles.iconWrapper}>
        <MaterialDesignIcons
          name={isActive ? 'heart' : 'heart-outline'}
          color="#fff"
          size={22}
        />
      </View>
    </Pressable>
  );
};

export default WishlistHeart;
const styles =  StyleSheet.create((theme, rt)=>({
    iconWrapper: {
    width: 28,
    height: 28,
    borderRadius: 18,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
