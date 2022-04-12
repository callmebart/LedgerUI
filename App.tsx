import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as NavigationBar from 'expo-navigation-bar';
import useCachedResources from './hooks/useCachedResources';

/*Constants */
import Colors from './constants/Colors';
/*Navigation*/
import Navigation from './navigation/Navigation';


export default function App() {

  const isLoadingComplete = useCachedResources();
  const setNavigationBarColor = async () => {
    const color = await NavigationBar.setBackgroundColorAsync(Colors.background);
  }

  useEffect(() => {
    setNavigationBarColor()
      .catch(console.error)
  }, [])

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation />
        <StatusBar />
      </SafeAreaProvider>
    );
  }

}
