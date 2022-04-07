import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { Shadow } from 'react-native-shadow-2';
import { Fontisto } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;
export default function Card() {

    const SIZE:[width: number, height: number]=[windowWidth - 70, 150]
    const DISTANCE:number = 28

    return (
            <TouchableOpacity onPress={()=>console.log("Press2")} style={{ width: windowWidth - 40, height: 200 }}>
                <Shadow
                    distance={DISTANCE}
                    size={SIZE}
                    startColor={'white'}
                    containerViewStyle={{ marginVertical: 20 }}
                    offset={[0, -40]}
                    radius={1}>
                </Shadow>
                <LinearGradient
                    colors={['#9e91ff', '#db99e8', '#e3b2ed']}
                    style={{ ...styles.gradient }}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <Fontisto name="visa" size={30} color="white"  style={{position:'absolute',right:30}}/>
                    <View style={{ marginLeft: 30 }}>
                        <Text style={{ color: 'white', fontSize: 22,fontFamily:'Inconsolata' }}>Balance</Text>
                        <Text style={{ color: 'white', fontSize: 40, marginLeft: 10,fontFamily:'Inconsolata' }}>320.00 $</Text>
                    </View>
                    <View style={{ marginLeft: 30 }}>
                        <Text style={{ color: 'white', fontSize: 25,fontFamily:'Inconsolata-Bold' }}>1337 1234 4000 1234</Text>
                        <Text style={{ color: 'white', fontSize: 17,fontFamily:'Inconsolata' }}>07/30</Text>
                    </View>
                </LinearGradient>
                <Shadow
                    distance={DISTANCE}
                    size={SIZE}
                    startColor={'#00000050'}
                    containerViewStyle={{ marginVertical: 20 }}
                    offset={[25, -180]}
                    radius={1}>
                </Shadow>
            </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    gradient: {
        zIndex: 10,
        borderRadius: 20,
        borderLeftWidth:1,
        borderTopWidth:1,

        borderColor:'white',
        justifyContent: 'space-evenly',
        width: windowWidth - 40,
        height: 200,
        marginTop: -220
    },
});