import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Dimensions, TouchableOpacity, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
    GestureHandlerRootView,
} from 'react-native-gesture-handler';



/*charts custom */
import AnimatedLineChart from '../components/AnimatedLineChart';


/*Colors / THEME*/
import Colors from '../constants/Colors';
import { ThemeContext, useTheme } from '../hooks/ThemeProvider';
import { themeMode } from '../constants/themeMode';

/*Components*/
import NeoumorphicBox from '../components/NeumorphicBox';

const windowWidth = Dimensions.get('window').width

export default function InvestmentsScreen() {

    const navigation = useNavigation();
    const { theme, setTheme } = useTheme()



    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={[styles.container, themeMode[theme]]}>
                <View style={styles.header}>
                    <NeoumorphicBox>
                        <View style={{ width: windowWidth - 40, height: 70, borderRadius: 20, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.title}>Investments</Text>
                        </View>
                    </NeoumorphicBox>
                </View>
                <View style={styles.content}>
                    <Text style={styles.h2Title}>Total portfolio value</Text>
                    <AnimatedLineChart />
                </View>
            </SafeAreaView>
        </GestureHandlerRootView>
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
        backgroundColor:'yellow'
    },
    h2Title: {
        color: Colors.basicTextGrey,
        fontSize: 16,
        fontWeight: 'bold'
    },
});