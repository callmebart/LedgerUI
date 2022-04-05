import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

/*types for navigation definition*/
import { RootStackParamList } from '../types';
/*Screens*/
import HomeScreen from '../screens/HomeScreen';
import LogInScreen from '../screens/LogInScreen';


export default function Navigation() {
    return (
        <NavigationContainer>
            <RootStackNavigator />
        </NavigationContainer>
    );
}

const Stack = createNativeStackNavigator<RootStackParamList>()
function RootStackNavigator() {
    return (
        <Stack.Navigator  screenOptions={{
            headerShown: false
          }}>
            <Stack.Screen name="LogInScreen" component={LogInScreen} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />

        </Stack.Navigator>
    )
}