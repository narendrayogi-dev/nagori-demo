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
import { forgotPasswordSchema, loginSchema } from '../../utils/validations';
import AnimatedText from '../../components/AnimatedText';
import { Divider } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { navigate } from '../../utils/navigationUtils';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ForgotPassword = () => {
  const { theme } = useUnistyles();

  const mobileRef = useRef<any>(null);
  const formikRef = useRef<any>(null);
  const navigation = useNavigation<NavigationProp>();

  const [loading, setLoading] = useState(false);

  const handleLogin = async (values: any) => {
    setLoading(true);

    setTimeout(() => {
      try {
        // 🔐 API CALL HERE
        console.log('Login Payload:', values);
      } finally {
        setLoading(false);
      }
    }, 3000)
  };

  return (
    <View style={styles.container}>
      <Formik
        innerRef={formikRef}
        initialValues={{ mobileNumber: '' }}
        validationSchema={forgotPasswordSchema}
        onSubmit={()=>{
            navigate('Verification')
        }}
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
                source={IMAGES.forogotPass}
                style={styles.forgotImage}
                resizeMode="contain"
              />
            </CurvedHeader>

            <View style={styles.textContent}>
              <Text style={styles.title}>Forgot Your Password</Text>
              {/* <Text style={styles.subTitle}>It’s great to see you again.</Text> */}
            </View>

            <View style={styles.inputContainer}>
              <CustomInput
                ref={mobileRef}
                label="Mobile"
                placeholder="Enter Your Number"
                value={values.mobileNumber}
                onChangeText={handleChange('mobileNumber')}
                errorText={touched.mobileNumber && errors.mobileNumber || ''}
                returnKeyType="done"
                maxLength={10}
                keyboardType={'number-pad'}
                onSubmitEditing={() => handleSubmit()}
              />
            </View>

            <AnimatedButton
              title="Send"
              onPress={handleSubmit}
              loading={loading}
              disabled={loading}
            />
          
          </KeyboardAwareScrollView>
        )}
      </Formik>
    </View>
  );
};

export default ForgotPassword;

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
    // textTransform: "uppercase",
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
forgotImage:{
    width:180, 
    height:180, 
    alignSelf:'center', 
    marginTop:moderateScale(30)
}

}));
