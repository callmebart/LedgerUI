import * as React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

/*types for navigation definition*/
import { RootStackParamList } from '../types';
/*Screens*/
import HomeScreen from '../screens/HomeScreen';
import LogInScreen from '../screens/LogInScreen';

/*THEME */
import { ThemeContext } from '../hooks/ThemeProvider';
import { Theme } from '../types'

export default function Navigation() {

    const [theme,setTheme] = React.useState(Theme.light)

    return (
        <ThemeContext.Provider value={{theme,setTheme}}>
        <NavigationContainer>
            <RootStackNavigator />
        </NavigationContainer>
        </ThemeContext.Provider>
    );
}

const Stack = createNativeStackNavigator<RootStackParamList>()
function RootStackNavigator() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="LogInScreen" component={LogInScreen} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />

        </Stack.Navigator>
    )
}