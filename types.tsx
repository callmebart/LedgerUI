declare global {
    namespace ReactNavigation {
      interface RootParamList extends RootStackParamList {}
    }
  }

export type RootStackParamList = {
    HomeScreen: undefined;
    LogInScreen: undefined;
}