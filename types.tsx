import type { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

export type RootStackParamList = {
  HomeScreen: undefined;
  LogInScreen: undefined;
  InvestmentsScreen: undefined;
  AddNewCardScreen:undefined;
  PaymentsScreen:undefined;
  CardsScreen:undefined;
}

export type Props = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>

export enum Theme {
  dark = 'dark',
  light = 'light',
}

export type ThemeContextType = {
  theme: Theme;
  setTheme: (Theme: Theme) => void
}