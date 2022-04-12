import { StyleSheet } from "react-native"
import Colors from "./Colors"

export const themeMode: any = StyleSheet.create({
    light: {
        backgroundColor: Colors.light.backgroundColor,
        //color:'black'
    },
    dark: {
        backgroundColor: Colors.dark.backgroundColor,
        //color:'rgba(255, 255, 255,0.3)'
    },
})