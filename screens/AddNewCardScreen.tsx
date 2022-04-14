import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

/*Colors/THEME */
import Colors from '../constants/Colors';
import { ThemeContext, useTheme } from '../hooks/ThemeProvider';
import { themeMode } from '../constants/themeMode';

/*Icons*/
import { MaterialIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

/*Components*/
import NeoumorphicBox from '../components/NeumorphicBox';
import Card from '../components/Card';

/*REDUX TOOLKIT*/
import { useSelector, useDispatch } from 'react-redux';
import { cardAdded } from '../features/cards/cardsSlice';

const windowWidth = Dimensions.get("window").width

export default function AddNewCard() {
    const navigation = useNavigation()

    const [cardNumber, setCardNumber] = useState('')


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
        <View style={[styles.container, themeMode[theme]]}>
            <View style={styles.header}>
                <NeoumorphicBox>
                    <View style={{ width: windowWidth - 40, height: 70, borderRadius: 20, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.title}>Add new card </Text>
                        <TouchableOpacity style={{ width: 100, height: 70, zIndex: 2, justifyContent: 'center', alignItems: 'center' }}
                            onPress={() => navigation.goBack()}
                        >
                            <MaterialIcons name="keyboard-arrow-down" size={40} color={Colors.headerTextColor} style={{
                                transform: [{
                                    rotateZ: `${90}deg`
                                }]
                            }} />
                        </TouchableOpacity>
                    </View>
                </NeoumorphicBox>
            </View>
            <View style={styles.content}>
                <View style={{ flex: 1 }}>
                    <NeoumorphicBox>
                        <TouchableOpacity style={{ width: windowWidth - 40, height: 200, borderRadius: 15 }} activeOpacity={.6}>
                            <LinearGradient
                                colors={[gradient1Color, gradient2Color, gradient3Color]}
                                style={{ ...styles.gradient }}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                            >
                                <Fontisto name="visa" size={30} color="white" style={{ position: 'absolute', right: 30 }} />

                                <View style={{ marginLeft: 30, marginTop: 50 }}>
                                    <Text style={{ color: 'white', fontSize: 22, fontFamily: 'Inconsolata' }}>1234 1234 1234 1234</Text>
                                </View>
                                <View style={{ marginLeft: 30, flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View>
                                        <Text style={{ color: 'white', fontSize: 15, fontFamily: 'Inconsolata' }}>CARD HODLER</Text>
                                        <Text style={{ color: 'white', fontSize: 15, fontFamily: 'Inconsolata' }}>XYZ XYZ</Text>
                                    </View>
                                    <View style={{ marginRight: 30, alignItems: 'center' }}>
                                        <Text style={{ color: 'white', fontSize: 15, fontFamily: 'Inconsolata' }}>EXPIRES</Text>
                                        <Text style={{ color: 'white', fontSize: 15, fontFamily: 'Inconsolata' }}>07/30</Text>
                                    </View>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                    </NeoumorphicBox>
                </View>
                <KeyboardAvoidingView
                    behavior={"padding"}
                    style={{ flex: 1.4 }}
                    keyboardVerticalOffset={170}
                >
                    <View style={{ flex: 1.4 }}>
                        <NeoumorphicBox>
                            <View style={{ width: windowWidth - 40, height: 300, borderRadius: 15 }}>
                                <View>
                                    <Text style={styles.h2Title}>Place Card Number</Text>
                                    <TextInput
                                        style={styles.textInputCard}
                                        placeholder={"1234 1234 1234 1234"}
                                        placeholderTextColor={'#9f9f9f'}
                                    />
                                </View>

                                <View style={{ justifyContent: 'space-evenly', flexDirection: 'row' }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.h2Title}>Expiration Date</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <TextInput
                                                style={styles.textInputCardDate}
                                                placeholder={"00"}
                                                placeholderTextColor={'#9f9f9f'}
                                            />
                                            <TextInput
                                                style={styles.textInputCardDate}
                                                placeholder={"00"}
                                                placeholderTextColor={'#9f9f9f'}
                                            />
                                        </View>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.h2Title}>CVV</Text>
                                        <TextInput
                                            style={styles.textInputCardCVV}
                                            placeholder={"123"}
                                            placeholderTextColor={'#9f9f9f'}
                                        />
                                    </View>
                                </View>

                                <View>
                                    <Text style={styles.h2Title}>Place Card Hodler Name</Text>
                                    <TextInput
                                        style={styles.textInputCard}
                                        placeholder={"John Doe"}
                                        placeholderTextColor={'#9f9f9f'}
                                    />
                                </View>
                            </View>
                        </NeoumorphicBox>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        marginLeft: 20,
        fontWeight: 'bold',
        color: Colors.headerTextColor,
    },
    header: {
        height: 100,
        marginTop: 30,
        width: windowWidth - 40,
    },
    content: {
        flex: 1,
        width: windowWidth - 40,
    },
    h2Title: {
        color: Colors.basicTextGrey,
        fontSize: 14,
        fontWeight: 'bold',
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    gradient: {
        flex: 1,
        borderRadius: 15,
        justifyContent: 'space-evenly',
    },
    textInputCard: {
        width: windowWidth - 60,
        height: 40,
        marginTop: 10,
        borderRadius: 15,
        backgroundColor: 'rgba(0,0,0,0.1)',
        alignSelf: 'center',
        paddingLeft: 10,
        color: Colors.basicTextGrey,
    },
    textInputCardDate: {
        flex: 1,
        marginHorizontal: 10,
        height: 40,
        marginTop: 10,
        borderRadius: 15,
        backgroundColor: 'rgba(0,0,0,0.1)',
        textAlign: 'center',
        color: Colors.basicTextGrey,
    },
    textInputCardCVV: {
        flex: 1,
        marginHorizontal: 10,
        height: 40,
        marginTop: 10,
        borderRadius: 15,
        backgroundColor: 'rgba(0,0,0,0.1)',
        textAlign: 'center',
        color: Colors.basicTextGrey,

    }

});