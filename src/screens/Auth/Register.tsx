import React, { useRef, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import CurvedHeader from '../../components/CurvedHeader';
import CustomInput from '../../components/CustomInput';
import AnimatedButton from '../../components/AnimatedCustomButton';
import AnimatedText from '../../components/AnimatedText';

import { FONT_FAMILY, IMAGES, RootStackParamList } from '../../utils/utils';
import { moderateScale } from '../../utils/responsive';
import { registerSchema } from '../../utils/validations';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Register = () => {
  const { theme } = useUnistyles();
  const navigation = useNavigation<NavigationProp>();

  const nameRef = useRef<any>(null);
  const emailRef = useRef<any>(null);
  const mobileRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);

  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (values: any) => {
    setLoading(true);

    try {
      console.log('REGISTER PAYLOAD 👉', values);
      // 🔐 API CALL HERE
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          name: '',
          email: '',
          mobileNumber: '',
          password: '',
        }}
        validationSchema={registerSchema}
        onSubmit={handleRegister}
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
            keyboardShouldPersistTaps="always"
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
              <Text style={styles.title}>Create an account</Text>
              <Text style={styles.subTitle}>Let’s create your account.</Text>
            </View>

            <View style={styles.inputContainer}>
              <CustomInput
                ref={nameRef}
                label="Name"
                placeholder="Enter Your Name"
                value={values.name}
                onChangeText={handleChange('name')}
                errorText={touched.name && errors.name || ''}
                returnKeyType="next"
                onSubmitEditing={() => emailRef.current?.focus()}
              />

              <CustomInput
                ref={emailRef}
                label="Email"
                placeholder="Enter Your Email Address"
                keyboardType="email-address"
                value={values.email}
                onChangeText={handleChange('email')}
                errorText={touched.email && errors.email || ''}
                returnKeyType="next"
                onSubmitEditing={() => mobileRef.current?.focus()}
              />

              <CustomInput
                ref={mobileRef}
                label="Mobile Number"
                placeholder="Enter Mobile Number"
                keyboardType="number-pad"
                value={values.mobileNumber}
                onChangeText={handleChange('mobileNumber')}
                errorText={touched.mobileNumber && errors.mobileNumber || ''}
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current?.focus()}
              />

              <CustomInput
                ref={passwordRef}
                label="Password"
                placeholder="Enter Password"
                secureTextEntry={secureTextEntry}
                rightIcon={secureTextEntry ? IMAGES.eyeClose : IMAGES.eyeOpen}
                onRightIconPress={() => setSecureTextEntry(p => !p)}
                value={values.password}
                onChangeText={handleChange('password')}
                errorText={touched.password && errors.password || ''}
                returnKeyType="done"
                onSubmitEditing={handleSubmit}
              />
            </View>

            <AnimatedButton
              title="Create Account"
              onPress={handleSubmit}
              loading={loading}
              disabled={!isValid || loading}
            />

            <View style={styles.flexRow}>
              <Text style={{ fontFamily: FONT_FAMILY.Regular }}>
                Already have an account?
              </Text>
              <AnimatedText
                onPress={() => navigation.navigate('Login')}
                style={{
                  fontFamily: FONT_FAMILY.Bold,
                  color: '#B26C09',
                }}
              >
                Login
              </AnimatedText>
            </View>
          </KeyboardAwareScrollView>
        )}
      </Formik>
    </View>
  );
};

export default Register;


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
        paddingHorizontal:15,
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
