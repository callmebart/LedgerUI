import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
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

export default function AddNewCardScreen() {
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const [cardNumber, setCardNumber] = useState<any>('1234 1234 1234 1234 ')
    const [cardType, setCardType] = useState<any>('visa')
    const [cardBalance, setcardBalance] = useState<any>('100.00')
    const [cardCVV, setcardCVV] = useState<any>('222')
    const [cardExpirationDateMonth, setcardExpirationDateMonth] = useState<any>('03')
    const [cardExpirationDateYear, setcardExpirationDateYear] = useState<any>('27')
    const [cardHodlerName, setCardHodlerName] = useState<any>('Bart')

    const { theme, setTheme } = useTheme()
    const [gradient1Color, setGradient1Color] = useState(Colors.light.cardGradientColor1)
    const [gradient2Color, setGradient2Color] = useState(Colors.light.cardGradientColor2)
    const [gradient3Color, setGradient3Color] = useState(Colors.light.cardGradientColor3)
    const [textInputColor, setTextInputColor] = useState(Colors.light.textInputColor)

    useEffect(() => {
        if (theme == 'light') {
            setGradient1Color(Colors.light.cardGradientColor1)
            setGradient2Color(Colors.light.cardGradientColor2)
            setGradient3Color(Colors.light.cardGradientColor3)
            setTextInputColor(Colors.light.textInputColor)
        } else {
            setGradient1Color(Colors.dark.cardGradientColor1)
            setGradient2Color(Colors.dark.cardGradientColor2)
            setGradient3Color(Colors.dark.cardGradientColor3)
            setTextInputColor(Colors.dark.backgroundColor)
        }
    }, [theme])

    const addCreditCard = async () => {
        const cardExpirationDate = `${cardExpirationDateMonth}/${cardExpirationDateYear}`;
        dispatch(cardAdded({
            id: 0,
            cardType: cardType,
            cardBalance: cardBalance,
            cardNumber: cardNumber,
            cardCVV: cardCVV,
            cardExpirationDate: cardExpirationDate,
            cardHodlerName: cardHodlerName,
            userId: 0,
        }))

        Alert.alert(
            "Card has been added to your wallet",
            "Do You want to add more cards ?",
            [
                {
                    text: "Cancel",
                    onPress: () => navigation.goBack(),
                    style: "cancel"
                },
                { text: "Yes", onPress: () => console.log("OK Pressed") }
            ]
        )
    }

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
                            <View style={{ width: windowWidth - 40, height: 300, borderRadius: 15, justifyContent: 'space-evenly' }}>
                                <View>
                                    <Text style={styles.h2Title}>Place Card Number</Text>
                                    <TextInput
                                        style={{ ...styles.textInputCard, backgroundColor: textInputColor }}
                                        placeholder={"1234 1234 1234 1234"}
                                        placeholderTextColor={'#9f9f9f'}
                                        onChange={setCardNumber}
                                    />
                                </View>

                                <View style={{ justifyContent: 'space-evenly', flexDirection: 'row' }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.h2Title}>Expiration Date</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <TextInput
                                                style={{ ...styles.textInputCardDate, backgroundColor: textInputColor }}
                                                placeholder={"00"}
                                                placeholderTextColor={'#9f9f9f'}
                                                onChange={setcardExpirationDateMonth}
                                            />
                                            <TextInput
                                                style={{ ...styles.textInputCardDate, backgroundColor: textInputColor }}
                                                placeholder={"00"}
                                                placeholderTextColor={'#9f9f9f'}
                                                onChange={setcardExpirationDateYear}
                                            />
                                        </View>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.h2Title}>CVV</Text>
                                        <TextInput
                                            style={{ ...styles.textInputCardCVV, backgroundColor: textInputColor }}
                                            placeholder={"123"}
                                            placeholderTextColor={'#9f9f9f'}
                                            onChange={setcardCVV}
                                        />
                                    </View>
                                </View>

                                <View>
                                    <Text style={styles.h2Title}>Place Card Hodler Name</Text>
                                    <TextInput
                                        style={{ ...styles.textInputCard, backgroundColor: textInputColor }}
                                        placeholder={"John Doe"}
                                        placeholderTextColor={'#9f9f9f'}
                                        onChange={setCardHodlerName}
                                    />
                                </View>

                                <View style={{ width: windowWidth - 40, alignItems: 'center' }}>
                                    <TouchableOpacity style={styles.addCardButton} onPress={() => addCreditCard()} activeOpacity={.7}>
                                        <LinearGradient
                                            colors={[gradient1Color, gradient2Color, gradient3Color]}
                                            style={styles.addCardButtonGradient}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 1 }}
                                        >
                                            <Text style={{ color: 'white', fontSize: 13, fontWeight: 'bold' }}>Add New Card</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
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
        fontSize: 12,
        fontWeight: 'bold',
        paddingHorizontal: 10,
    },
    gradient: {
        flex: 1,
        borderRadius: 15,
        justifyContent: 'space-evenly',
    },
    textInputCard: {
        width: windowWidth - 60,
        height: 30,
        marginTop: 8,
        borderRadius: 7,
        alignSelf: 'center',
        paddingLeft: 10,
        color: Colors.basicTextGrey,
        opacity: 1,
        elevation: 1,
    },
    textInputCardDate: {
        flex: 1,
        marginHorizontal: 10,
        height: 30,
        marginTop: 8,
        borderRadius: 7,
        textAlign: 'center',
        color: Colors.basicTextGrey,
        elevation: 1
    },
    textInputCardCVV: {
        flex: 1,
        marginHorizontal: 10,
        height: 30,
        marginTop: 8,
        borderRadius: 7,
        textAlign: 'center',
        color: Colors.basicTextGrey,
        elevation: 1
    },
    addCardButton: {
        width: windowWidth - 60,
        height: 40,
        borderRadius: 7,
    },
    addCardButtonGradient: {
        flex: 1,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },


});