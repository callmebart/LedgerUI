import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Dimensions, TouchableOpacity, Switch, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as NavigationBar from 'expo-navigation-bar';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  cancelAnimation
} from 'react-native-reanimated';

/*Themes and colors*/
import Colors from '../constants/Colors';
import { themeMode } from '../constants/themeMode';
import { ThemeContext, useTheme } from '../hooks/ThemeProvider';
import { Theme } from '../types';

/*Icons*/
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

/*Components*/
import NeoumorphicBox from '../components/NeumorphicBox';
import Card from '../components/Card';
import BezierLineChart from '../components/BezierLineChart';


const windowWidth = Dimensions.get('window').width;

export default function HomeScreen() {
  const navigation = useNavigation();

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const { theme, setTheme } = useTheme()
  const setNavigationBarColor = async (value: Theme) => {
    const color = await NavigationBar.setBackgroundColorAsync(themeMode[value].backgroundColor);
  }


  useEffect(() => {
    if (isEnabled) {
      setTheme(Theme.dark)
      setNavigationBarColor(Theme.dark)
    }
    else {
      setTheme(Theme.light)
      setNavigationBarColor(Theme.light)
    }

  }, [isEnabled])

  //RENDERING BUTTONS 
  const boxes: any[] = [
    { iconName: "add", screen: 'AddNewCardScreen' },
    { iconName: "payment", screen: 'PaymentsScreen' },
    { iconName: "piggy-bank", screen: "InvestmentsScreen" },
  ]
  const renderBoxes = boxes.map((item, index) => {
    const color = '#9f9f9f'
    return (
      <View key={index}>
        <NeoumorphicBox>
          <TouchableOpacity onPress={() => navigation.navigate(item.screen)} style={{ width: 90, height: 90, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }} >
            {
              item.iconName == "piggy-bank"
                ? <FontAwesome5 name="piggy-bank" size={28} color={color} />
                : <MaterialIcons name={item.iconName} size={30} color={color} />
            }
          </TouchableOpacity>
        </NeoumorphicBox>
      </View>
    )
  })

  //HEADER PROPERTIES SHEET ANIMATION
  const menuHeight = useSharedValue(70);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      height: menuHeight.value
    }
  })

  const animatedIndex = useSharedValue(0)
  const animatedIndexStyle = useAnimatedStyle(() => {
    return {
      zIndex: animatedIndex.value,
      opacity: animatedIndex.value,
      transform: [{ scale: animatedIndex.value }],
      display: animatedIndex.value == 0 ? 'none' : 'flex'
    }
  })



  //HEADER ICON ANIMATION
  const rotateIcon = useSharedValue(0)
  const animatedIcon = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: '' + rotateIcon.value + 'deg' }]
    }
  })


  const animateMenu = () => {

    rotateIcon.value === 180 && menuHeight.value === 295
      ? rotateIcon.value = withTiming(0, { duration: 400 })
      : rotateIcon.value = rotateIcon.value = withTiming(180, { duration: 400 })

    menuHeight.value === 295
      ? menuHeight.value = withTiming(70, { duration: 300 })
      : menuHeight.value = withTiming(295, { duration: 300 })

    animatedIndex.value === 0
      ? animatedIndex.value = withTiming(1, { duration: 300 })
      : animatedIndex.value = 0
  }


  return (
    <View style={[styles.container, themeMode[theme]]}>
      <SafeAreaView >
        <View style={{ flex: 1, marginTop: 30 }}>

          <Animated.View style={[styles.header, animatedStyles, themeMode[theme]]}>
            <NeoumorphicBox>
              <View style={{ width: windowWidth - 40, height: 70, borderRadius: 20, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.title}>Welcome Bart!</Text>
                <TouchableOpacity style={{ width: 100, height: 70, zIndex: 2, justifyContent: 'center', alignItems: 'center' }}
                  onPress={() => { menuHeight.value === 295 || menuHeight.value === 70 ? animateMenu() : {} }}
                >
                  <Animated.View style={[animatedIcon]}>
                    <MaterialIcons name="keyboard-arrow-down" size={40} color={Colors.headerTextColor} />
                  </Animated.View>

                </TouchableOpacity>
              </View>
            </NeoumorphicBox>
            <Animated.View style={[animatedIndexStyle]}>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                <Text style={{ color: '#9f9f9f' }}>Dark theme </Text>
                <Switch
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={"#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
              </View>

            </Animated.View>

          </Animated.View>

        </View>
        <View style={styles.content}>

          <View style={{ flex: 2.1 }}>
            <NeoumorphicBox>
              <TouchableOpacity onPress={() => navigation.navigate('CardsScreen')} style={{ width: windowWidth - 40, height: 200, borderRadius: 15 }} activeOpacity={.6}>
                <Card width={200} height={200} />
              </TouchableOpacity>
            </NeoumorphicBox>
          </View>

          <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', width: windowWidth - 80 }}>
            {renderBoxes}
          </View>

          <View style={{ flex: 2 }}>
            <NeoumorphicBox>
              <View style={{ width: windowWidth - 40, height: 200, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
                <BezierLineChart />
              </View>
            </NeoumorphicBox>
          </View>
        </View>

      </SafeAreaView >
    </View >

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    zIndex: 20,
    justifyContent: 'space-between',
    opacity: 0.99,
    width: windowWidth - 40,
    borderRadius: 20,
  },
  content: {
    flex: 6,
    width: windowWidth - 40,
    flexDirection: 'column',
  },
  title: {
    fontSize: 22,
    marginLeft: 20,
    fontWeight: 'bold',
    color: Colors.headerTextColor,
  },
});