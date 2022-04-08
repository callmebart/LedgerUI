import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Shadow } from 'react-native-shadow-2';
import { LinearGradient } from 'expo-linear-gradient';

import Colors from '../constants/Colors';


type Props = {
    children: JSX.Element,
}

const NeoumorphicSquare = ({ children }: Props) => {

    const DISTANCE: number = 28
    const WIDTH = children.props.style.width
    const HEIGHT = children.props.style.height
    const SIZE: [width: number, height: number] = [WIDTH - 40, HEIGHT - 40]
    const RADIUS = children.props.style.borderRadius


    return (
        <Shadow
            size={SIZE}
            startColor={'white'}
            distance={DISTANCE}
            offset={[10, 10]}
            radius={2}
        >
            <Shadow
                size={SIZE}
                startColor={'#00000040'}
                distance={DISTANCE}
                offset={[DISTANCE + 2, DISTANCE + 2]}
                radius={2}
            >
                <LinearGradient
                    colors={['rgb(229,229,234)', 'white']}
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