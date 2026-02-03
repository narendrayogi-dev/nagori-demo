import React, { ReactNode, useEffect, useRef } from 'react';
import {
  Modal,
  View,
  Animated,
  Pressable,
  StyleSheet,
} from 'react-native';
import { useUnistyles } from 'react-native-unistyles';

type AppModalProps = {
  visible: boolean;
  children: ReactNode;
  onClose?: () => void;
  dismissOnBackdrop?: boolean;
};

const AppModal = ({
  visible,
  children,
  onClose,
  dismissOnBackdrop = true,
}: AppModalProps) => {
  const { theme } = useUnistyles();

  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      opacity.setValue(0);
      scale.setValue(0.95);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Modal
      transparent
      animationType="none"
    statusBarTranslucent
      onRequestClose={onClose}
    >
      <Pressable
        style={styles.backdrop}
        onPress={dismissOnBackdrop ? onClose : undefined}
      >
        <Animated.View
          style={[
            styles.modalContainer,
            {
              backgroundColor: theme.colors.background,
              opacity,
              transform: [{ scale }],
            },
          ]}
        >
          {children}
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

export default AppModal;

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: '100%',
    // alignSelf:'center', 
    // justifyContent:'center',
    borderRadius: 16,
    padding: 20,
    elevation: 10,
  },
});
