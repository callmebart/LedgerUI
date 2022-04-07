
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import * as NavigationBar from 'expo-navigation-bar';
import * as Font from 'expo-font';


export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
   
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();
        NavigationBar.setVisibilityAsync("hidden");
        // Load fonts
        await Font.loadAsync({
          'Inconsolata': require('../assets/fonts/Inconsolata.ttf'),
          'Inconsolata-Bold': require('../assets/fonts/Inconsolata-Bold.ttf'),
          'CREDC': require('../assets/fonts/CREDC.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        NavigationBar.setVisibilityAsync("visible");
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
