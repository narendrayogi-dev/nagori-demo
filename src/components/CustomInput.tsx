import React, { forwardRef } from 'react';
import { View, TextInput, Image, TouchableOpacity, Text } from 'react-native';
import Animated, { FadeIn, FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';
import { moderateScale, fontSize,  scale } from '../utils/responsive';
import { FONT_FAMILY } from '../utils/utils';

interface Props {
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  secureTextEntry?: boolean;
  keyboardType?: any;
  maxLength?: number;
  leftIcon?: any;
  rightIcon?: any;
  onRightIconPress?: () => void;
  errorText?: string;
  containerStyle?: object;
  inputStyle?: object;
  labelStyle?: object;
  returnKeyType?:string;
  placeholderTextColor?:string, 
  multiline?:boolean, 
      onSubmitEditing?:()=>void; 

}

const CustomInput = forwardRef<TextInput, Props>(
  (
    {
      label = '',
      placeholder,
      value,
      onChangeText,
      autoCapitalize = 'none',
      secureTextEntry = false,
      keyboardType = 'default',
      maxLength = 50,
      leftIcon,
      rightIcon,
      onRightIconPress,
      errorText = '',
      containerStyle,
      inputStyle,
      labelStyle,
      placeholderTextColor,
      multiline,
      returnKeyType="",
      onSubmitEditing, 
      ...props
    },
    ref
  ) => {

    const hasLeft = !!leftIcon;
    const hasRight = !!rightIcon;

    return (
      <View style={{ marginBottom: scale(10) }}>

        {/* Label */}
        {label ? (
          <Text style={[styles.label, labelStyle]}>{label}</Text>
        ) : null}

        {/* Input container */}
        <View
          style={[
            styles.container,
            errorText && { borderColor: 'red' },
            containerStyle,
          ]}
        >

          {/* LEFT ICON */}
          {hasLeft && (
            <View style={styles.leftIconWrapper}>
              <Image source={leftIcon} style={styles.icon} />
            </View>
          )}

          {/* TEXT INPUT */}
          <TextInput
            ref={ref}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor ?? '#9F9F9F'}
            value={value}
            onChangeText={onChangeText}
            autoCapitalize={autoCapitalize}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            maxLength={maxLength}
            onSubmitEditing={onSubmitEditing}
            multiline={multiline}
            style={[
              styles.input,
              inputStyle,
              {
                color: value ? '#000' : '#666',
                fontFamily: FONT_FAMILY.Regular,
                fontSize: fontSize(14),
              },
            ]}
            {...props}
          />

          {/* RIGHT ICON */}
          {hasRight && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onRightIconPress}
              style={styles.rightIconWrapper}
            >
              <Image source={rightIcon} style={styles.icon} />
            </TouchableOpacity>
          )}
        </View>

        {/* ERROR TEXT */}
        {errorText ? (
          <Animated.Text
            entering={FadeIn.duration(300)}
            exiting={FadeOutDown.duration(300)}
            style={styles.errorText}
          >
            {errorText}
          </Animated.Text>
        ) : null}

      </View>
    );
  }
);

export default CustomInput;

const styles = StyleSheet.create((theme) => ({
  container: {
    width: '100%',
    height: scale(50),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.inputBg ?? '#FFFFFF',
    borderRadius: moderateScale(4),
    // paddingHorizontal: moderateScale(14),
   
  },

  label: {
    marginLeft: moderateScale(0),
    marginBottom: moderateScale(4),
    fontFamily: FONT_FAMILY.Medium,
    fontSize: fontSize(14),
    color: theme.colors.textPrimary,
  },

  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal:moderateScale(10), 
    
  },

  leftIconWrapper: {
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  rightIconWrapper: {
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    width: moderateScale(20),
    height: moderateScale(20),
    resizeMode: 'contain',
  },

  errorText: {
    // marginLeft: moderateScale(13),
    marginTop: moderateScale(4),
    color: theme.colors.danger ?? 'red',
    fontSize: fontSize(12),
    fontFamily: FONT_FAMILY.Regular,
  },
}));
