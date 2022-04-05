import type { NativeStackScreenProps } from '@react-navigation/native-stack';


declare global {
    namespace ReactNavigation {
      interface RootParamList extends RootStackParamList {}
    }
  }

export type RootStackParamList = {
    HomeScreen: undefined;
    LogInScreen: undefined;
}

export type Props = NativeStackScreenProps<RootStackParamList,'HomeScreen'>