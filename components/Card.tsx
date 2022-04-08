import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React, { CSSProperties } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { Shadow } from 'react-native-shadow-2';
import { Fontisto } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;

type Props = {
    width: number,
    height: number
}

export default function Card(props: Props) {

    return (
        <LinearGradient
            colors={['#9587fa', '#db99e8', '#e3b2ed']}
            style={{ ...styles.gradient }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <Fontisto name="visa" size={30} color="white" style={{ position: 'absolute', right: 35 }} />
            <View style={{ marginLeft: 30 }}>
                <Text style={{ color: 'white', fontSize: 22, fontFamily: 'Inconsolata' }}>Balance</Text>
                <Text style={{ color: 'white', fontSize: 22, marginLeft: 10, fontFamily: 'CREDC', marginTop: 20 }}>320.00$</Text>
            </View>
            <View style={{ marginLeft: 30 }}>
                <Text style={{ color: 'white', fontSize: 22, fontFamily: 'Inconsolata-Bold' }}>1337 1234 4000 1234</Text>
                <Text style={{ color: 'white', fontSize: 17, fontFamily: 'Inconsolata' }}>07/30</Text>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        borderRadius: 15,
        justifyContent: 'space-evenly',
    },
});