import React, { useRef, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { StyleSheet, UnistylesRuntime, useUnistyles } from 'react-native-unistyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { Formik } from 'formik';

import CurvedHeader from '../../components/CurvedHeader';
import CustomInput from '../../components/CustomInput';
import AnimatedButton from '../../components/AnimatedCustomButton';

import { useInsets } from '../../hooks/useInsets';
import { FONT_FAMILY, IMAGES, RootStackParamList } from '../../utils/utils';
import { moderateScale } from '../../utils/responsive';
import { loginSchema } from '../../utils/validations';
import AnimatedText from '../../components/AnimatedText';
import { Divider } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { navigate } from '../../utils/navigationUtils';
import { useDispatch } from 'react-redux';
import { skipLogin } from '../../features/authSlice';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Login = () => {
  const { theme } = useUnistyles();

  const emailRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);
  const formikRef = useRef<any>(null);
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch();

  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values: any) => {
    setLoading(true);

    setTimeout(() => {
      try {
        // 🔐 API CALL HERE
        console.log('Login Payload:', values);

        dispatch(skipLogin())
      } finally {
        setLoading(false);
      }
    }, 3000)
  };

  return (
    <View style={styles.container}>
      <Formik
        innerRef={formikRef}
        initialValues={{ email: '', password: '' }}
        validationSchema={loginSchema}
        onSubmit={handleLogin}
        validateOnBlur
        validateOnChange={false}
      >
        {({
          handleChange,
          handleSubmit,
          values,
          errors,
          touched,
          isValid,
        }) => (
          <KeyboardAwareScrollView
            extraKeyboardSpace={30}
            keyboardShouldPersistTaps='always'
            showsVerticalScrollIndicator={false}
          >
            <CurvedHeader>
              <Image
                source={IMAGES.logo}
                style={theme?.components?.authImage}
                resizeMode="contain"
              />
            </CurvedHeader>

            <View style={styles.textContent}>
              <Text style={styles.title}>Login to your account</Text>
              <Text style={styles.subTitle}>It’s great to see you again.</Text>
            </View>

            <View style={styles.inputContainer}>
              <CustomInput
                ref={emailRef}
                label="Email"
                placeholder="Enter Your Email Address"
                value={values.email}
                onChangeText={handleChange('email')}
                keyboardType={'email-address'}
                errorText={touched.email && errors.email || ''}
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current?.focus()}
              />

              <CustomInput
                ref={passwordRef}
                label="Password"
                placeholder="Enter Password"
                secureTextEntry={secureTextEntry}
                rightIcon={secureTextEntry ? IMAGES.eyeClose : IMAGES.eyeOpen}
                onRightIconPress={() =>
                  setSecureTextEntry(prev => !prev)
                }
                value={values.password}
                onChangeText={handleChange('password')}
                errorText={
                  touched.password && errors.password || ''
                }
                returnKeyType="done"
                onSubmitEditing={handleSubmit}
              />
              <AnimatedText onPress={() => {
                navigate('ForgotPassword')
              }}
                style={styles.forgotPasswordText}
              >
                Forgot Password?
              </AnimatedText>
            </View>

            <AnimatedButton
              title="Login Account"
              onPress={handleSubmit}
              loading={loading}
              disabled={loading}
            />
            <View style={styles.flexRow}>
              <View style={styles.divider} />
              <Text accessibilityRole="text" style={styles.loginwithText}> Or Login With </Text>
              <View style={styles.divider} />
            </View>
            <View style={styles.flexRow}>
              {/* Google */}
              <TouchableOpacity
                activeOpacity={0.85}
                style={[styles.socialBtn, styles.googleBtn]}
                accessibilityRole="button"
                accessibilityLabel="Login with Apple"
              >
                <View style={styles.iconWrapper}>
                  <Image source={IMAGES.googleIcon} style={styles.socialIcon} />
                </View>
                <Text style={styles.authText}>Apple</Text>
              </TouchableOpacity>

              {/* Apple */}
              <TouchableOpacity
                activeOpacity={0.85}
                style={[styles.socialBtn, styles.appleBtn]}
                accessibilityRole="button"
                accessibilityLabel="Login with Google"
              >
                <View style={styles.iconWrapper}>
                  <Image source={IMAGES.appleIcon} style={styles.socialIcon} />
                </View>
                <Text style={styles.authText}>Google</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.flexRow, {
              gap: 2
            }]}>
              <Text style={{
                textAlign: 'center',
                fontFamily: FONT_FAMILY.Regular,
                // marginBottom: 20,

              }}>Don't have an account?
              </Text>
              <AnimatedText onPress={() => {
                navigation?.navigate('Register')
              }} style={{ fontFamily: FONT_FAMILY.Bold, color: "#B26C09" }}>Signup</AnimatedText>
            </View>
          </KeyboardAwareScrollView>
        )}
      </Formik>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  textContent: {
    alignSelf: 'center',
  },
  title: {
    fontFamily: FONT_FAMILY.Bold,
    fontSize: moderateScale(22),
    textTransform: "uppercase",
    textAlign: 'center',

  },
  subTitle: {
    fontFamily: FONT_FAMILY.Regular,
    fontSize: moderateScale(14),
    textAlign: 'center',
    textTransform: "uppercase"
  },
  inputContainer: {
    padding: 10,
    paddingHorizontal: 15,
  },
  forgotPasswordText: {
    textAlign: 'right',
    alignSelf: "flex-end",
    fontSize: moderateScale(16),
    fontFamily: FONT_FAMILY.Regular

  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: "center",
    paddingHorizontal: moderateScale(20),
    marginVertical: 10,
    alignItems: 'center',
    gap: 10,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  loginwithText: {
    fontFamily: FONT_FAMILY.Regular,
    fontSize: moderateScale(14),

  },
  socialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent:'space-between',
    backgroundColor: 'red',
    padding: moderateScale(5),
    borderRadius: moderateScale(20),
    minWidth: 140
  },
  socialIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain'
  },
  authText: {
    fontFamily: FONT_FAMILY.Medium,
    fontSize: moderateScale(16),
    textAlign: 'center',
    color: theme?.colors?.textInverse
  },
  googleBtn: {
    backgroundColor: '#000',
  },

  appleBtn: {
    backgroundColor: '#4E229C',
  },

  iconWrapper: {
    backgroundColor: '#fff',
    borderRadius: 99,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },


}));
