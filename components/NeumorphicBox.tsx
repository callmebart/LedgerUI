import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Shadow } from 'react-native-shadow-2';
import { LinearGradient } from 'expo-linear-gradient';

import Colors from '../constants/Colors';
import { ThemeContext, useTheme } from '../hooks/ThemeProvider';
import { Theme } from '../types';


type Props = {
    children: JSX.Element,
}

const NeoumorphicSquare = ({ children }: Props) => {

    const { theme, setTheme } = useTheme()
    const [gradient1Color, setGradient1Color] = useState(Colors.light.neuGradientFirstColor)
    const [gradient2Color,setGradient2Color] = useState(Colors.light.neuGradientSecondColor)

    const [shadow1,setShadow1] = useState(Colors.light.shadow1)
    const [shadow2,setShadow2] = useState(Colors.light.shadow2)

    useEffect(() => {
        if (theme == 'light') {
            setGradient1Color(Colors.light.neuGradientFirstColor)
            setGradient2Color(Colors.light.neuGradientSecondColor)
            setShadow1(Colors.light.shadow1)
            setShadow2(Colors.light.shadow2)
        }else{
            setGradient1Color(Colors.dark.neuGradientFirstColor)
            setGradient2Color(Colors.dark.neuGradientSecondColor)
            setShadow1(Colors.dark.shadow1)
            setShadow2(Colors.dark.shadow2)
        }
    }, [theme])

    const DISTANCE: number = 28
    const WIDTH = children.props.style.width
    const HEIGHT = children.props.style.height
    const SIZE: [width: number, height: number] = [WIDTH - 40, HEIGHT - 40]
    const RADIUS = children.props.style.borderRadius


    return (
        <Shadow
            size={SIZE}
            startColor={shadow1}
            distance={DISTANCE}
            offset={[10, 10]}
            radius={2}
        >
            <Shadow
                size={SIZE}
                startColor={shadow2}
                distance={DISTANCE}
                offset={[DISTANCE + 2, DISTANCE + 2]}
                radius={2}
            >
                <LinearGradient
                    colors={[gradient1Color,gradient2Color]}
                    style={{ ...styles.gradient, width: WIDTH, height: HEIGHT, borderRadius: RADIUS }}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    {children}
                </LinearGradient>
            </Shadow>
        </Shadow>
    )
}

export default NeoumorphicSquare

const styles = StyleSheet.create({
    gradient: {
        borderRadius: 20,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
});