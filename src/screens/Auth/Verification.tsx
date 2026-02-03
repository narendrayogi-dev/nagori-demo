import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  AppState,
} from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { Formik } from 'formik';

import CurvedHeader from '../../components/CurvedHeader';
import AnimatedButton from '../../components/AnimatedCustomButton';
import AnimatedText from '../../components/AnimatedText';

import { FONT_FAMILY, IMAGES } from '../../utils/utils';
import { marginV, moderateScale, paddingH } from '../../utils/responsive';
import { forgotPasswordSchema, otpVerificationSchema } from '../../utils/validations';

import { OtpInput } from 'react-native-otp-entry';
import { navigate, reset } from '../../utils/navigationUtils';
import AppModal from '../../components/AppModal';

const OTP_DURATION = 30; // seconds

const Verification = () => {
  const { theme } = useUnistyles();

  const timerRef = useRef<null>(null);
  const expiryRef = useRef<number>(0);

  const [loading, setLoading] = useState(false);
  const [remainingTime, setRemainingTime] = useState(OTP_DURATION);
  const [canResend, setCanResend] = useState(false);

  const startTimer = () => {
    expiryRef.current = Date.now() + OTP_DURATION * 1000;
    setCanResend(false);
    runTimer();
  };

  const runTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      const diff = Math.max(
        0,
        Math.floor((expiryRef.current - Date.now()) / 1000)
      );

      setRemainingTime(diff);

      if (diff === 0) {
        clearInterval(timerRef.current!);
        timerRef.current = null;
        setCanResend(true);
      }
    }, 1000);

  };

  useEffect(() => {
    const sub = AppState.addEventListener('change', () => {
      if (!expiryRef.current) return;

      const diff = Math.max(
        0,
        Math.floor((expiryRef.current - Date.now()) / 1000)
      );

      setRemainingTime(diff);
      if (diff === 0) setCanResend(true);
    });

    return () => {
      sub.remove();
      timerRef.current && clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    startTimer();
  }, []);

  const handleVerify = async (values: { otp: string }) => {
    setLoading(true);
    setTimeout(() => {
      console.log('OTP:', values.otp);
      navigate('ResetPassword')
      setLoading(false);
    }, 2000);
  };

  const handleResend = () => {
    console.log('Resend OTP');
    startTimer();
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ otp: '' }}
        validationSchema={otpVerificationSchema}
        onSubmit={handleVerify}
      >
        {({
          handleSubmit,
          setFieldValue,
          touched,
          errors,
        }) => (
          <KeyboardAwareScrollView
            extraKeyboardSpace={30}
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}
          >
            <CurvedHeader>
              <Image
                source={IMAGES.verification}
                style={styles.forgotImage}
                resizeMode="contain"
              />
            </CurvedHeader>

            <View style={styles.textContent}>
              <Text style={styles.title}>Enter Verification Code</Text>
              <Text style={styles.subTitle}>
                Enter the 4-digit verification code
              </Text>
            </View>

            <View style={styles.inputContainer}>
              <OtpInput
                numberOfDigits={4}
                focusColor={theme.colors.primary}
                onTextChange={text => setFieldValue('otp', text)}
                theme={{
                  pinCodeContainerStyle: {
                    borderWidth: 1,
                    borderColor: theme.colors.textInverse,
                    borderRadius: 6,
                    backgroundColor: "#FFFFFF",
                    width: moderateScale(50),
                    height: moderateScale(55),
                  },
                  containerStyle: {
                    ...paddingH(2)
                  },
                  focusedPinCodeContainerStyle: {
                    borderWidth: 1.5,
                    borderColor: theme.colors.textPrimary,
                  },
                  pinCodeTextStyle: {
                    fontFamily: FONT_FAMILY.Bold,
                    fontSize: moderateScale(20),
                    color: theme.colors.textPrimary,
                  },
                }}
              />

              {touched.otp && errors.otp && (
                <Text style={styles.errorText}>
                  {errors.otp}
                </Text>
              )}

              <View style={styles.resendContainer}>
                {!canResend ? (
                  <Text style={styles.timerText}>
                    Resend code in {remainingTime}s
                  </Text>
                ) : (
                  <TouchableOpacity onPress={handleResend}>
                    <AnimatedText >Resend</AnimatedText>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <AnimatedButton
              title="Continue"
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

export default Verification;

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  forgotImage: {
    width: 180,
    height: 180,
    alignSelf: 'center',
    marginTop: moderateScale(30),
  },
  textContent: {
    alignSelf: 'center',
    marginVertical: 10,
  },
  title: {
    fontFamily: FONT_FAMILY.Bold,
    fontSize: moderateScale(22),
    textAlign: 'center',
  },
  subTitle: {
    fontFamily: FONT_FAMILY.Regular,
    fontSize: moderateScale(14),
    textAlign: 'center',
    color: theme.colors.textSecondary,
  },
  inputContainer: {
    paddingHorizontal: 15,
    marginTop: 20,
  },
  resendContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  timerText: {
    fontFamily: FONT_FAMILY.Regular,
    fontSize: moderateScale(14),
    color: theme.colors.textPrimary,
  },
  errorText: {
    marginTop: 8,
    fontSize: moderateScale(12),
    color: theme.colors.danger,
    textAlign: 'center',
  },

}));
