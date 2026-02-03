import {
  fontSize,
  moderateScale,
  paddingH,
  paddingV,
} from '../utils/responsive';
import { FONT_FAMILY } from '../utils/utils';

export const myTheme = {
  /* ================= COLORS ================= */
  colors: {
    background: '#F7F3E9',
    surface: '#FFFFFF',
    bottomTabBackground:"#000",

    primary: '#AB6005',
    secondary: '#0E306C',

    textPrimary: '#000000',
    textSecondary: '#808080',
    textInverse: '#FFFFFF',

    buttonBg: '#0B8AAE',

    inputBg: '#FFFFFF',
    inputBorder: '#0A204A33',
    inputErrorBorder: '#F01414',

    success: '#43A729',
    danger: '#F01414',
    warning: '#FFB402',
 GOLD_GRADIENT: ['#C99616', '#B96B09', '#C99616'],
    statusBar: '#0A204A',
  },

  typography: {
    h1: {
      fontFamily: FONT_FAMILY.Bold,
      fontSize: fontSize(24),
    },
    h2: {
      fontFamily: FONT_FAMILY.Bold,
      fontSize: fontSize(20),
    },
    body: {
      fontFamily: FONT_FAMILY.Regular,
      fontSize: fontSize(14),
    },
    caption: {
      fontFamily: FONT_FAMILY.Regular,
      fontSize: fontSize(12),
    },
    label: {
      fontFamily: FONT_FAMILY.Regular,
      fontSize: fontSize(14),
    },
  },

  components: {
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      ...paddingH(4),
    },

    card: {
      backgroundColor: '#FFFFFF',
      borderRadius: moderateScale(16),
      ...paddingH(3),
      ...paddingV(3),
    },

    button: {
      height: moderateScale(48),
      borderRadius: moderateScale(12),
      alignItems: 'center',
      justifyContent: 'center',
    },
    authImage: {
      width: moderateScale(200),
      height: moderateScale(200),
      alignSelf: 'center',
      // borderRadius:999
      // resizeMode:'contain'
    },

    input: {
      height: moderateScale(48),
      borderWidth: 1,
      borderRadius: moderateScale(12),
      ...paddingH(3),
      fontFamily: FONT_FAMILY.Regular,
      fontSize: fontSize(14),
    },

    icon: {
      width: moderateScale(24),
      height: moderateScale(24),
      resizeMode: 'contain',
    },

    errorText: {
      marginTop: moderateScale(4),
      color: '#F01414',
      fontFamily: FONT_FAMILY.Regular,
      fontSize: fontSize(12),
    },
  },
};
