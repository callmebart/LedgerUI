import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, ListRenderItem, VirtualizedList } from 'react-native';
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
import Card from '../components/Card';

/*REDUX TOOLKIT*/
import { useSelector, useDispatch } from 'react-redux';
import { selectAllCards } from '../features/cards/cardsSlice';
import { selectUserCards } from '../features/cards/cardsSlice';
import { RootState } from '../features/store';
import { creditCardType } from '../features/cards/types';



const windowWidth = Dimensions.get("window").width


export default function CardsScreen() {
    const navigation = useNavigation()
    const { theme, setTheme } = useTheme()

    const dispatch = useDispatch()
    const cards = useSelector<RootState>(state => selectUserCards(state, 0))

    const renderCards: ListRenderItem<creditCardType> = ({ item }) => {
        return (
            <View style={{ width:windowWidth, height:235,marginLeft:20,marginTop:15}}>
                <NeoumorphicBox>
                    <View style={{ width: windowWidth - 40, height: 200, borderRadius: 15, }} >
                        <Card width={200} height={200} cardInfo={item}/>
                    </View>
                </NeoumorphicBox>
            </View>
        )
    }
    return (
        <View style={[styles.container, themeMode[theme]]}>
            <View style={styles.header}>
                <NeoumorphicBox>
                    <View style={{ width: windowWidth - 40, height: 70, borderRadius: 20, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.title}>Cards</Text>
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
                <VirtualizedList
                    data={cards}
                    getItem={(data, index) => data[index]}
                    getItemCount={data => data.length}
                    renderItem={renderCards}
                    style={{width:windowWidth}}
                />
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
        width: windowWidth,
    },
    h2Title: {
        color: Colors.basicTextGrey,
        fontSize: 16,
        fontWeight: 'bold',
        paddingHorizontal: 10,
        paddingTop: 10,
    },
});