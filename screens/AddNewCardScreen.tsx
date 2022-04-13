import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
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

const windowWidth = Dimensions.get("window").width

export default function AddNewCard() {
    const navigation = useNavigation()
    const { theme, setTheme } = useTheme()

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
        fontSize: 16,
        fontWeight: 'bold',
        paddingHorizontal: 10,
        paddingTop: 10,
    },
});