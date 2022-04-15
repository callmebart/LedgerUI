import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { Fontisto } from '@expo/vector-icons';

/*Colors / THEME*/
import Colors from '../constants/Colors';
import { ThemeContext, useTheme } from '../hooks/ThemeProvider';
import { Theme } from '../types';
import { creditCardType } from '../features/cards/types';
import { RootState } from '../features/store';

const windowWidth = Dimensions.get('window').width;

type Props = {
    width: number,
    height: number,
    cardInfo:Object | any
}

export default function Card(props: Props) {
    
    //Card from prps
    const card = props.cardInfo

    const { theme, setTheme } = useTheme()
    const [gradient1Color, setGradient1Color] = useState(Colors.light.cardGradientColor1)
    const [gradient2Color, setGradient2Color] = useState(Colors.light.cardGradientColor2)
    const [gradient3Color, setGradient3Color] = useState(Colors.light.cardGradientColor3)

    useEffect(() => {
        if (theme == 'light') {
            setGradient1Color(Colors.light.cardGradientColor1)
            setGradient2Color(Colors.light.cardGradientColor2)
            setGradient3Color(Colors.light.cardGradientColor3)
        } else {
            setGradient1Color(Colors.dark.cardGradientColor1)
            setGradient2Color(Colors.dark.cardGradientColor2)
            setGradient3Color(Colors.dark.cardGradientColor3)
        }
    }, [theme])

    return (
        <LinearGradient
            colors={[gradient1Color, gradient2Color, gradient3Color]}
            style={{ ...styles.gradient }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <Fontisto name="visa" size={30} color="white" style={{ position: 'absolute', right: 35 }} />
            <View style={{ marginLeft: 30 }}>
                <Text style={{ color: 'white', fontSize: 22, fontFamily: 'Inconsolata' }}>Balance</Text>
                <Text style={{ color: 'white', fontSize: 22, marginLeft: 10, fontFamily: 'CREDC', marginTop: 20 }}>{card.cardBalance}$</Text>
            </View>
            <View style={{ marginLeft: 30 }}>
                <Text style={{ color: 'white', fontSize: 22, fontFamily: 'Inconsolata-Bold' }}>{card.cardNumber}</Text>
                <Text style={{ color: 'white', fontSize: 17, fontFamily: 'Inconsolata' }}>{card.cardExpirationDate}</Text>
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