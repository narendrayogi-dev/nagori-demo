import { StyleSheet } from 'react-native-unistyles'
import { myTheme } from './themes/theme.ts'

type AppThemes = {
  name: typeof myTheme
}

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
}

StyleSheet.configure({
  themes: {
    name: myTheme,
  },

  settings: {
    initialTheme:'name'
    // adaptiveThemes: true,

  }
});
