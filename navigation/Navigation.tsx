import * as React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


/*types for navigation definition*/
import { RootStackParamList } from '../types';
/*Screens*/
import HomeScreen from '../screens/HomeScreen';
import LogInScreen from '../screens/LogInScreen';
import InvestmentsScreen from '../screens/InvestmentsScreen';
import AddNewCardScreen from '../screens/AddNewCardScreen';
import PaymentsScreen from '../screens/PaymentsScreen';
import CardsScreen from '../screens/CardsScreen';

/*THEME */
import { ThemeContext } from '../hooks/ThemeProvider';
import { Theme } from '../types'


export default function Navigation() {

    const [theme, setTheme] = React.useState(Theme.light)

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
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
            headerShown: false,
            animation: 'slide_from_right',
            gestureEnabled: true,
        }}>
            <Stack.Screen name="LogInScreen" component={LogInScreen} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="InvestmentsScreen" component={InvestmentsScreen} />
            <Stack.Screen name="AddNewCardScreen" component={AddNewCardScreen} />
            <Stack.Screen name="PaymentsScreen" component={PaymentsScreen} />
            <Stack.Screen name="CardsScreen" component={CardsScreen} />

        </Stack.Navigator>
    )
}