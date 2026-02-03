export const IMAGES = {
  splashWave:require('../assets/images/splashWave.png'),
  logo:require('../assets/images/logo.png'), 
  onboarding1:require('../assets/images/image1.png'), 
  onboarding2:require('../assets/images/image2.png'), 
  onboarding3:require('../assets/images/image3.png'), 
  onboardingArrow:require('../assets/images/onboardingArrow.png'), 
  styleArrow:require('../assets/images/styleArrow.png'), 
  onBoardBtn:require('../assets/images/onBoardBtn.png'), 
  eyeOpen:require('../assets/images/eyeOpen.png'), 
  eyeClose:require('../assets/images/hide.png'), 
  googleIcon:require('../assets/images/google.png'), 
  appleIcon:require('../assets/images/apple.png'), 
  forogotPass:require('../assets/images/forogotPass.png'), 
  verification:require('../assets/images/resetPass.png'), 
  resetPass:require('../assets/images/verification.png'), 
  successIcon:require('../assets/images/successIcon.png'), 
  nagori:require('../assets/images/nagori.png'), 
  bell:require('../assets/images/notification-bell.png'), 
  cart:require('../assets/images/cart.png'), 
  banner1:require('../assets/images/banner1.png'), 
  dummy:require('../assets/images/dummy/dumy1.png'), 
  star:require('../assets/images/star.png'), 
  sort:require('../assets/images/sort.png'), 
  filter:require('../assets/images/filter1.png'), 
};

export const FONT_FAMILY = {
  Thin: 'Gordita-Thin',
  Light: 'Gordita-Light',
  Regular: 'Gordita-Regular',
  Medium: 'Gordita-Medium',
  SemiBold: 'Gordita-SemiBold',
  Bold: 'Gordita-Bold',
  ExtraBold: 'Gordita-ExtraBold',
  Black: 'Gordita-Black',
  MograRegular:'Mogra-Regular'
};


interface verificationPasswordParams {
  email: string;
  from: 'register' | 'forgot';
}
interface resetPasswodParams {
  email: string;
}

interface medicineDetailsParams {
  medicineId: string;
  name: string;
  brandName: string;
}
interface feedBackParams {
  medicineId: string;
}
interface DisclaimerParams {
  medicineId: string;
}

interface PorductListingParams{
  categoryId:string, 
  categoryName:string
}
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  VerificationPassword: verificationPasswordParams;
  ResetPassword: resetPasswodParams;
  Home: undefined;
  ProductListing:PorductListingParams;
  ProductDetails:undefined
};
