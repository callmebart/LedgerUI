import { StyleSheet, Text, View, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
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
  withDelay,
  cancelAnimation,
  Easing,
  withRepeat,
  withSequence,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';
import { useState } from 'react';



const windowWidth = Dimensions.get('window').width;

export default function HomeScreen() {
  const navigation = useNavigation();



  const boxes = [
    "add",
    'payment',
    'piggy-bank'
  ]
  const renderBoxes = boxes.map((item, index) => {
    return (
      <NeoumorphicBox>
        <TouchableOpacity key={index} onPress={() => console.log({ item })} style={{ width: 90, height: 90, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }} >
          {
            item == 'piggy-bank' ?
              <FontAwesome5 name="piggy-bank" size={28} color="rgba(0,0,0,0.3)" />
              : <MaterialIcons name={item} size={30} color="rgba(0,0,0,0.3)" />
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
  
  const animateMenu = () => {
    rotateIcon.value == 180
      ? rotateIcon.value = withTiming(0, { duration: 500 })
      : rotateIcon.value = rotateIcon.value = withTiming(180, { duration: 500 })

    menuHeight.value == 295 ? menuHeight.value = withSpring(70) : menuHeight.value = withSpring(295)
  }

  return (

    <View style={styles.container}>
      <SafeAreaView >
        <View style={{ flex: 1, marginTop: 30 }}>

          <Animated.View style={[styles.header, animatedStyles]}>
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
    backgroundColor: Colors.background
  },
  header: {
    zIndex: 20,
    backgroundColor: Colors.background,
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