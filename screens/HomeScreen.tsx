import { useEffect, useRef } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Dimensions, TouchableOpacity, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as NavigationBar from 'expo-navigation-bar';

/*Themes and colors*/
import Colors from '../constants/Colors';

/*Icons*/
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

/*Components*/
import NeoumorphicBox from '../components/NeumorphicBox';
import Card from '../components/Card';
import BezierLineChart from '../components/BezierLineChart';

import { TapGestureHandler, PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,

} from 'react-native-reanimated';
import { useState } from 'react';


import { ThemeContext, useTheme } from '../hooks/ThemeProvider';
import { Theme } from '../types';

const windowWidth = Dimensions.get('window').width;

export default function HomeScreen() {
  const navigation = useNavigation();

  //rendering buttons for :
  //adding new card 
  //make new transaction
  //take a look at current investments
  const boxes: any[] = [
    "add",
    "payment",
    "piggy-bank"
  ]
  const renderBoxes = boxes.map((item, index) => {
    //const color = theme == 'light' ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.25)"
    const color = '#9f9f9f'
    return (
      <NeoumorphicBox>
        <TouchableOpacity key={index} onPress={() => console.log({ item })} style={{ width: 90, height: 90, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }} >
          {
            item == 'piggy-bank'
              ? <FontAwesome5 name="piggy-bank" size={28} color={color} />
              : <MaterialIcons name={item} size={30} color={color} />
          }
        </TouchableOpacity>
      </NeoumorphicBox>
    )
  })

  //header menu animation
  const menuHeight = useSharedValue(70);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      height: menuHeight.value
    }
  })

  const rotateIcon = useSharedValue(0)
  const animatedIcon = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: '' + rotateIcon.value + 'deg' }]
    }
  })

  const animatedIndex = useSharedValue(0)
  const animatedIndexStyle = useAnimatedStyle(() => {
    return {
      zIndex: animatedIndex.value,
      opacity: animatedIndex.value
    }
  })



  const animateMenu = () => {
    rotateIcon.value === 180 && menuHeight.value === 295
      ? rotateIcon.value = withTiming(0, { duration: 500 })
      : rotateIcon.value = rotateIcon.value = withTiming(180, { duration: 500 })

    menuHeight.value === 295 ? menuHeight.value = withSpring(70) : menuHeight.value = withSpring(295)

    animatedIndex.value === 0
      ? animatedIndex.value = withTiming(1, { duration: 300 })
      : animatedIndex.value = 0
  }

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const { theme, setTheme } = useTheme()
  const setNavigationBarColor = async (value:Theme) => {
    const color = await NavigationBar.setBackgroundColorAsync(themeMode[value].backgroundColor);
  }


  useEffect(() => {
    if (isEnabled){
      setTheme(Theme.dark)
      setNavigationBarColor(Theme.dark)
    }     
    else{
      setTheme(Theme.light)
      setNavigationBarColor(Theme.light)
    } 

  }, [isEnabled])

  const themeMode: any = StyleSheet.create({
    light: {
      backgroundColor: Colors.light.backgroundColor
    },
    dark: {
      backgroundColor: Colors.dark.backgroundColor,
    },
  })

  return (
    <View style={[styles.container, themeMode[theme]]}>
      <SafeAreaView >
        <View style={{ flex: 1, marginTop: 30 }}>

          <Animated.View style={[styles.header, animatedStyles, themeMode[theme]]}>
            <NeoumorphicBox>
              <View style={{ width: windowWidth - 40, height: 70, borderRadius: 20, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.title}>Welcome Bart!</Text>
                <TouchableOpacity style={{ width: 100, height: 70, zIndex: 2, justifyContent: 'center', alignItems: 'center' }}
                  onPress={() => animateMenu()}
                >
                  <Animated.View style={[animatedIcon]}>
                    <MaterialIcons name="keyboard-arrow-down" size={40} color={Colors.headerTextColor} />
                  </Animated.View>

                </TouchableOpacity>
              </View>
            </NeoumorphicBox>
            <Animated.View style={[animatedIndexStyle]}>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                <Text>Dark theme </Text>
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
              <TouchableOpacity onPress={() => console.log("credit card")} style={{ width: windowWidth - 40, height: 200, borderRadius: 15 }} activeOpacity={.6}>
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