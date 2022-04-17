import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, FlatList, ListRenderItem, Image, TextInput, ScrollView, Touchable } from 'react-native';
import { useNavigation } from '@react-navigation/native';


/*Colors/THEME */
import Colors from '../constants/Colors';
import { ThemeContext, useTheme } from '../hooks/ThemeProvider';
import { themeMode } from '../constants/themeMode';

/*Icons*/
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

/*Components*/
import NeoumorphicBox from '../components/NeumorphicBox';

/*REDUX TOOLKIT*/
import { useDispatch, useSelector } from 'react-redux';
import { selectAllUsers } from '../features/users/usersSlice';


/*cryptoWallet */
import { useWalletConnect } from '@walletconnect/react-native-dapp';


const windowWidth = Dimensions.get("window").width

export default function PaymentsScreen() {
    const navigation = useNavigation()
    const { theme, setTheme } = useTheme()

    const [textInputColor, setTextInputColor] = useState(Colors.light.textInputColor)
    useEffect(() => {
        if (theme == 'light') {
            setTextInputColor(Colors.light.textInputColor)
        } else {
            setTextInputColor(Colors.dark.backgroundColor)
        }
    }, [theme])

    const dispatch = useDispatch()

    const [scrollEnabled, setScrollEnabled] = useState(true)

    const users = useSelector(selectAllUsers)
    const connector = useWalletConnect()

    const [metamaskConnected, setMetamaskConnected] = useState(false)

    const connectWallet = React.useCallback(() => {
        setScrollEnabled(true)
        return connector.connect();
    }, [connector]);

    const killSession = React.useCallback(() => {
        return connector.killSession();
    }, [connector]);

    const shortenAddress = (address: string) => {
        return `${address.slice(0, 6)}...${address.slice(
            address.length - 4,
            address.length
        )}`;
    }

    const renderUsers: ListRenderItem<any> = ({ item, index }) => {
        return (
            <View key={index} style={{ height: 120 }}>
                {item.iconName
                    ? <View style={{ width: 100, height: 80, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <NeoumorphicBox>
                            <TouchableOpacity style={{ width: 70, height: 70, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                                <MaterialIcons name={'add'} size={30} color={"#9f9f9f"} />
                            </TouchableOpacity>
                        </NeoumorphicBox>
                    </View>

                    : <View style={{ width: 120, height: 80, justifyContent: 'center', alignItems: 'center' }}>
                        <NeoumorphicBox>
                            <TouchableOpacity style={{ width: 90, height: 90, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={item.profileImage} style={{ width: 45, height: 45, borderRadius: 45 / 2, opacity: 0.7 }} />
                                <Text style={{ fontSize: 12, color: '#9f9f9f', opacity: 0.7 }}>{item.userName}</Text>
                            </TouchableOpacity>
                        </NeoumorphicBox>
                    </View>

                }
            </View>

        )
    }

    const trs = [
        {
            id: '#asdfasaskiw92',
            icon: 'spotify',
            name: 'Spotify',
            type: 'Entertaiment',
            price: '5.00'
        },
        {
            id: '#asd2314231rerfa2',
            icon: 'shopify',
            name: 'Shopify',
            type: 'Food',
            price: '25.00'
        },
        {
            id: '#asd23142dsfdsfa2',
            icon: 'hamburger',
            name: 'Uncles Burgers',
            type: 'Food',
            price: '10.00'
        },
        {
            id: '#asd2ggggsfasddsfa2',
            icon: 'football-ball',
            name: 'Fitness sharks',
            type: 'Sport',
            price: '10.00'
        }
    ]
    const renderTransactions: any = trs.map((item: any) => {
        console.log(item.id)
        return (
            <View key={item.id} style={{ width: windowWidth - 40, padding: 10, flexDirection: 'row', justifyContent: 'space-evenly' }}>

                <View style={{ width: 50, height: 50, elevation: 1, backgroundColor: textInputColor, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
                    <FontAwesome5 name={item.icon} size={24} color="#9f9f9f" />
                </View>
                <View style={{ flexDirection: "row", width: windowWidth / 1.5, height: 50, elevation: 1, backgroundColor: textInputColor, borderRadius: 15, justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ marginLeft: 15 }}>
                        <Text style={{ color: '#9f9f9f', fontWeight: 'bold', fontSize: 16 }}>{item.name}</Text>
                        <Text style={{ color: '#9f9f9f', fontSize: 12 }}>{item.type}</Text>
                    </View>
                    <View style={{ marginRight: 15 }}>
                        <Text style={{ color: '#9f9f9f', fontWeight: 'bold', fontSize: 16, }}>- {item.price}$</Text>
                    </View>
                </View>

            </View>
        )
    })

    return (
        <ScrollView style={[themeMode[theme]]} showsVerticalScrollIndicator={false} scrollEnabled={scrollEnabled}>
            <View style={styles.header}>
                <NeoumorphicBox>
                    <View style={{ width: windowWidth - 40, height: 70, borderRadius: 20, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.title}>Payments</Text>
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
                <View style={{ marginTop: -15 }}>
                    <Text style={styles.h2Title}>Send money to</Text>
                    <FlatList
                        data={users}
                        renderItem={renderUsers}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => 'key' + index}
                    />
                </View>
                <View style={{ justifyContent: 'space-between', marginTop: -10 }}>
                    <Text style={styles.h2Title}>Send Cryptocurrencies</Text>
                    {connector.connected ?
                        <View>
                            <View style={{ marginLeft: 20, marginTop: 20, flexDirection: 'row' }}>
                                <View style={{ flex: 1.1 }}>
                                    <NeoumorphicBox>
                                        <TouchableOpacity style={{ width: 90, height: 90, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                                            <MaterialIcons name="qr-code-scanner" size={30} color="#9f9f9f" />
                                        </TouchableOpacity>
                                    </NeoumorphicBox>
                                </View>
                                <View style={{ flex: 2 }}>
                                    <NeoumorphicBox>
                                        <View style={{ width: 200, height: 90, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                                            <TextInput
                                                style={{ ...styles.textInput }}
                                                placeholder={"Place address here"}
                                                placeholderTextColor={'#9f9f9f'}
                                            />
                                        </View>
                                    </NeoumorphicBox>
                                </View>

                            </View>
                            <View style={{ justifyContent: 'center', marginLeft: 20, marginTop: 65 }}>
                                <NeoumorphicBox>
                                    <View style={{ width: windowWidth - 40, height: 180, borderRadius: 20, }}>
                                        <View >
                                            <Text style={styles.h3Title}>Your address: {shortenAddress(connector.accounts[0])}</Text>
                                        </View>
                                        <View>
                                            <Text style={styles.h3Title}>Select asset</Text>
                                            <View style={{ ...styles.transStyle, backgroundColor: textInputColor, justifyContent: 'space-between', flexDirection: 'row' }}>
                                                <Text style={{ color: Colors.headerTextColor, marginTop: 5 }}>Ethereum</Text>
                                                <MaterialIcons name="keyboard-arrow-down" size={30} color={Colors.headerTextColor} style={{ marginRight: 10 }} />
                                            </View>
                                        </View>
                                        <View>
                                            <Text style={styles.h3Title}>Type in amount</Text>
                                            <View style={{ ...styles.transStyle, backgroundColor: textInputColor, alignItems: 'flex-start', justifyContent: 'center' }}>
                                                <Text style={{ color: Colors.headerTextColor }}>0.25 eth</Text>
                                            </View>
                                        </View>
                                    </View>
                                </NeoumorphicBox>
                            </View>

                            <View style={{ marginLeft: 20, marginTop: 60 }}>
                                <NeoumorphicBox>
                                    <TouchableOpacity onPress={() => console.log("TODO: SEND ETH")} style={{ width: windowWidth - 40, height: 50, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                                        <View style={{ flexDirection: 'row', opacity: 0.6, width: windowWidth / 2.5, justifyContent: 'space-evenly', alignItems: 'center' }}>
                                            <MaterialIcons name="transfer-within-a-station" size={24} color="#ff8800" />
                                            <Text style={{ color: '#9f9f9f', fontSize: 13 }}>SEND TRANSACTION</Text>
                                        </View>
                                    </TouchableOpacity>
                                </NeoumorphicBox>
                            </View>
                            <View style={{ marginLeft: 20, marginTop: 60, flexDirection: 'row', width: windowWidth }}>

                                <NeoumorphicBox>
                                    <TouchableOpacity onPress={() => killSession()} style={{ width: windowWidth - 40, height: 50, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                                        <View style={{ flexDirection: 'row', opacity: 0.6, width: windowWidth / 2.5, justifyContent: 'space-evenly' }}>
                                            <FontAwesome5 name="book-dead" size={20} color="#ff8800" />
                                            <Text style={{ color: '#9f9f9f', fontSize: 13 }}>KILL SESSION</Text>
                                        </View>
                                    </TouchableOpacity>
                                </NeoumorphicBox>


                            </View>



                        </View>
                        :
                        <View style={{ marginLeft: 20, marginTop: 20, }}>
                            <NeoumorphicBox>
                                <TouchableOpacity onPress={() => connectWallet()} style={{ width: windowWidth - 40, height: 90, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={require('../assets/images/metamask.png')} style={{ width: windowWidth / 2, height: 30, opacity: 0.6 }} />
                                </TouchableOpacity>
                            </NeoumorphicBox>
                        </View>

                    }
                </View>
                <View style={{ marginTop: 60 }}>
                    <Text style={styles.h2Title}>Recent Transactions</Text>
                    <View style={{ justifyContent: 'center', marginLeft: 20, marginTop: 20 }}>

                        <NeoumorphicBox>
                            <ScrollView style={{ width: windowWidth - 40, height: 230, borderRadius: 20, }}
                                onTouchStart={(ev)=>setScrollEnabled(false)}
                                onMomentumScrollEnd={(e)=>setScrollEnabled(true)}
                                onScrollEndDrag={(e)=>setScrollEnabled(true)}
                            >
                                {renderTransactions}
                            </ScrollView>
                        </NeoumorphicBox>
                    </View>
                </View>
            </View>
            <View style={{ width: windowWidth - 40, height: 50,marginTop:10 }}></View>
        </ScrollView>
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
        alignSelf: 'center'
    },
    content: {
        flex: 1,
        width: windowWidth,
    },
    h2Title: {
        color: Colors.basicTextGrey,
        fontSize: 16,
        fontWeight: 'bold',
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    h3Title: {
        color: Colors.basicTextGrey,
        fontSize: 13,
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    textInput: {
        height: 40,
        width: 150,
        textAlign: 'center',
        color: Colors.basicTextGrey,
    },
    transStyle: {
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
});