import React, { useRef, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { Formik } from 'formik';

import CurvedHeader from '../../components/CurvedHeader';
import CustomInput from '../../components/CustomInput';
import AnimatedButton from '../../components/AnimatedCustomButton';

import { FONT_FAMILY, IMAGES } from '../../utils/utils';
import { marginV, moderateScale } from '../../utils/responsive';
import { resetPasswordSchema } from '../../utils/validations';
import { navigate, reset } from '../../utils/navigationUtils';
import AppModal from '../../components/AppModal';

const ResetPassword = () => {
    const { theme } = useUnistyles();

    const passwordRef = useRef<any>(null);
    const confirmPasswordRef = useRef<any>(null);
    const [successModal, setSuccessModal] = useState(false)

    const [loading, setLoading] = useState(false);
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const handleResetPassword = async (values: {
        password: string;
        confirmPassword: string;
    }) => {
        setLoading(true);

        setTimeout(() => {
            console.log('Reset Password Payload:', values);
            setLoading(false);
            setSuccessModal(true)
        }, 2000);
    };

    return (
        <View style={styles.container}>
            <Formik
                initialValues={{
                    password: '',
                    confirmPassword: '',
                }}
                validationSchema={resetPasswordSchema}
                onSubmit={handleResetPassword}
                validateOnBlur
                validateOnChange={false}
            >
                {({
                    handleChange,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                }) => (
                    <KeyboardAwareScrollView
                        extraKeyboardSpace={30}
                        keyboardShouldPersistTaps="always"
                        showsVerticalScrollIndicator={false}
                    >
                        <CurvedHeader>
                            <Image
                                source={IMAGES.resetPass}
                                style={styles.forgotImage}
                                resizeMode="contain"
                            />
                        </CurvedHeader>

                        <View style={styles.textContent}>
                            <Text style={styles.title}>Create New Password</Text>
                        </View>

                        <View style={styles.inputContainer}>
                            <CustomInput
                                ref={passwordRef}
                                label="Password"
                                placeholder="Enter Password"
                                secureTextEntry={secureTextEntry}
                                rightIcon={
                                    secureTextEntry ? IMAGES.eyeClose : IMAGES.eyeOpen
                                }
                                onRightIconPress={() =>
                                    setSecureTextEntry(prev => !prev)
                                }
                                value={values.password}
                                onChangeText={handleChange('password')}
                                errorText={
                                    touched.password && errors.password
                                        ? errors.password
                                        : ''
                                }
                                returnKeyType="next"
                                onSubmitEditing={() =>
                                    confirmPasswordRef.current?.focus()
                                }
                            />

                            <CustomInput
                                ref={confirmPasswordRef}
                                label="Confirm Password"
                                placeholder="Confirm Password"
                                secureTextEntry={secureTextEntry}
                                rightIcon={
                                    secureTextEntry ? IMAGES.eyeClose : IMAGES.eyeOpen
                                }
                                onRightIconPress={() =>
                                    setSecureTextEntry(prev => !prev)
                                }
                                value={values.confirmPassword}
                                onChangeText={handleChange('confirmPassword')}
                                errorText={
                                    touched.confirmPassword && errors.confirmPassword
                                        ? errors.confirmPassword
                                        : ''
                                }
                                returnKeyType="done"
                                onSubmitEditing={handleSubmit}
                            />
                        </View>

                        <AnimatedButton
                            title="Reset Password"
                            onPress={handleSubmit}
                            loading={loading}
                            disabled={loading}
                        />

                        <AppModal visible={successModal} onClose={() => {
                            setSuccessModal(false)
                            reset('Login')
                        }}>
                            <Image source={IMAGES.successIcon} style={styles.succesIcon} />
                            <Text style={styles.successTitle}>Password Changed</Text>
                            <Text style={styles.successSubTitle}>You can now use your new password to login to your account.</Text>
                            <AnimatedButton title='Login' onPress={() => {
                                setSuccessModal(false)
                                reset('Login')
                            }} containerStyle={{
                                ...marginV(3)
                            }} />
                        </AppModal>
                    </KeyboardAwareScrollView>
                )}
            </Formik>
        </View>
    );
};

export default ResetPassword;


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
    forgotImage: {
        width: 180,
        height: 180,
        alignSelf: 'center',
        marginTop: moderateScale(30)
    },
    succesIcon: {
        width: 60,
        height: 60,
        alignSelf: 'center',
        resizeMode: 'contain'
    },
    successTitle: {
        textAlign: 'center',
        fontFamily: FONT_FAMILY.Bold,
        fontSize: moderateScale(20),
        marginTop: moderateScale(10),
    },
    successSubTitle: {
        textAlign: 'center',
        fontFamily: FONT_FAMILY.Medium,
        color: theme?.colors?.textSecondary,
        fontSize: moderateScale(14),
        // marginVertical:moderateScale(10), 
    }

}));
