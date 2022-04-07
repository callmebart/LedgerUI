import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Shadow } from 'react-native-shadow-2';
import { LinearGradient } from 'expo-linear-gradient';

import Colors from '../constants/Colors';


const RADIUS = 20;

type Props = {
    children: JSX.Element,
}

const NeoumorphicBox = ({ children }:Props) => {

    const WIDTH = children.props.style.width
    const HEIGHT = children.props.style.height
    const SIZE:[width: number, height: number] = [WIDTH-40, 25]
    const DISTANCE = 28

    return (
        <View style={styles.container}>
            <Shadow
                distance={DISTANCE}
                size={SIZE}
                startColor={'white'}
                containerViewStyle={{ marginVertical: 20 }}
                offset={[-10,60]}
                radius={1}>
            </Shadow>
            <LinearGradient
                colors={['rgb(229,229,234)', 'white']}
                style={styles.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                {children}
            </LinearGradient>
            <Shadow
                distance={DISTANCE}
                size={SIZE}
                startColor={'#00000050'}  
                containerViewStyle={{ marginVertical: 20 }}             
                offset={[10, -60]}
                radius={1}>
            </Shadow>
        </View>
    )
}

export default NeoumorphicBox

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:-30,
    },
    gradient: {
        zIndex: 10,
        borderRadius: RADIUS,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontSize: 22,
        marginLeft: 20,
        fontWeight: 'bold',
        color: Colors.headerTextColor,
    },
});