import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, FlatList, ListRenderItem, Image, TextInput,ScrollView } from 'react-native';
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

const windowWidth = Dimensions.get("window").width

export default function PaymentsScreen() {
    const navigation = useNavigation()
    const { theme, setTheme } = useTheme()

    const dispatch = useDispatch()
    
    const users = useSelector(selectAllUsers)
    console.log(users)

    const renderUsers: ListRenderItem<any> = ({ item, index }) => {
        console.log(item)
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

    return (
        <ScrollView style={[themeMode[theme]]} showsVerticalScrollIndicator={false}>
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
                <View style={{marginTop:-15}}>
                    <Text style={styles.h2Title}>Send money to</Text>
                    <FlatList
                        data={users}
                        renderItem={renderUsers}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => 'key'+index}
                    />
                </View>
                <View style={{ justifyContent: 'space-between',marginTop:-10 }}>
                    <Text style={styles.h2Title}>Send Cryptocurrencies</Text>
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
                </View>

                <View style={{justifyContent:'center',marginLeft:20,marginTop:65}}>
                    <NeoumorphicBox>
                        <ScrollView style={{ width: windowWidth-40, height: 230, borderRadius: 20, }}>
                            
                        </ScrollView>
                    </NeoumorphicBox>
                </View>
            </View>
            <View  style={{ width: windowWidth-40, height: 100}}></View>
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
        alignSelf:'center'
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
    textInput: {
        height: 40,
        width: 150,
        textAlign: 'center',
        color: Colors.basicTextGrey,
    },
});