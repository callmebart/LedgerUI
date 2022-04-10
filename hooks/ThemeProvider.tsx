import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { ThemeContextType,Theme } from "../types";
import Colors from "../constants/Colors";

import * as NavigationBar from 'expo-navigation-bar';

export const ThemeContext = React.createContext<ThemeContextType>({ theme: Theme.dark, setTheme: theme => console.warn('no theme provider')});

export const useTheme = () =>useContext(ThemeContext)



  