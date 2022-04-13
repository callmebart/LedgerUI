import { View, Text, Dimensions, StyleSheet } from 'react-native'
import React, { SVGProps } from 'react'
import Svg, { Path } from 'react-native-svg'
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, {
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withSpring
} from 'react-native-reanimated';

import { getYForX, parse, ReText, round } from "react-native-redash";
import Colors from '../constants/Colors';
import { ThemeContext, useTheme } from '../hooks/ThemeProvider';
import { themeMode } from '../constants/themeMode';

const windowWidth = Dimensions.get("window").width

export default function AnimatedLineChart() {

    const { theme, setTheme } = useTheme()

    const path = `M321 63.3519C305.62 52.5095 300.659 48.4436 
    295.202 51.8319C289.744 55.2202 284.042 58.9566 278.333 63.3519C272.624 67.7473 
    266.954 49.444 262.953 45.0554C258.953 40.6669 256.008 45.0554 251.047 45.0554C246.085 
    45.0554 242.116 3.04128 230.705 2.36365C219.295 1.68602 218.798 87.7472 208.38 92.4907C197.961
     97.2343 192.504 49.7989 184.07 47.0884C175.636 44.3778 171.103 57.3195 162.24 58.6084C153.377 59.8973 
     146.364 1.68597 139.419 1.00837C132.473 0.330783 122.054 40.9894 118.085 44.3777C114.116 47.766 104.69 
     43.7002 95.7597 41.6672C86.8295 39.6343 88.814 47.766 83.8527 51.05C78.8915 54.334 76.907 66.0625 72.938 
     65.2806C68.969 64.4987 67.4806 63.3519 67.4806 63.3519C61.5271 59.286 54.0853 89.7802 49.6202 
     94.5237C45.155 99.2672 44.4125 96.0944 41.186 99.2672C33.4361 104.295 34.2403 106.721 23.8217 
     110.787C13.4031 114.853 14.4202 59.6997 1 26.0813`
    const parsedPath = parse(path)

    const x = useSharedValue(0);
    const y = useSharedValue(0);

    const shredPrice = useSharedValue(60)

    const price = useDerivedValue(() => {
        return `$ ${round((115 - shredPrice.value) * 100,2).toString()}`
    })

    const priceOfAth = useDerivedValue(() => {
        return ` ${round((((115-shredPrice.value)*100)/115),2).toString()} %`
    })

    const gestureHandler = useAnimatedGestureHandler<
        PanGestureHandlerGestureEvent,
        { startX: number, startY: number | any }
    >({
        onStart: (_, ctx) => {
            ctx.startX = x.value;
            ctx.startY = y.value;
        },
        onActive: (event, ctx) => {
            x.value = ctx.startX + event.translationX;
            y.value = ctx.startY + getYForX(parsedPath, x.value);
            shredPrice.value = y.value
        },
        onEnd: (_) => {
            x.value = withSpring(0);
            y.value = withSpring(0);
            shredPrice.value = 60
        },
    });

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: x.value - 15,
                },
                {
                    translateY: y.value - 15,
                },
            ],
        };
    });

    return (
        <View style={{ marginTop: 40,alignItems:'center' }}>
            <View style={[StyleSheet.absoluteFill,{marginLeft:10}]}>
                <Svg width={windowWidth - 60} height={115} >
                    <Path d={path} stroke={Colors[theme].pathLineColor} strokeWidth={3} />
                </Svg>
            </View>

            <View style={StyleSheet.absoluteFill}>
                <PanGestureHandler onGestureEvent={gestureHandler}>
                    <Animated.View style={[styles.pointer, animatedStyle]}>
                        <View style={styles.innerPointer} />
                    </Animated.View>
                </PanGestureHandler>
            </View>
            <View style={{ width: windowWidth - 60, marginTop: 130, alignItems: 'center', flexDirection: 'row',justifyContent:'space-between' }}>
                <View style={{alignItems:'center',flexDirection: 'row'}}>
                    <Text style={styles.text}>Portfolio value : </Text>
                    <ReText style={styles.text} text={price} />
                </View>
                <View style={{alignItems:'center'}}>
                    <Text style={{...styles.text}}>Price of ATH</Text>
                    <ReText style={{...styles.text,color:'#ff675c'}} text={priceOfAth} />
                </View>
            </View >

        </View>


    );
}

const styles = StyleSheet.create({
    pointer: {
        marginLeft:10,
        width: 30, height: 30,
        borderRadius: 15,
        backgroundColor: 'rgb(127,132,169)',
        opacity: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerPointer: {
        width: 12, height: 12,
        borderRadius: 10,
        backgroundColor: 'rgb(276,143,140)',
    },
    text: {
        color: Colors.basicTextGrey,
        fontSize: 16,
        fontWeight: 'bold',
    },
});



/* <Svg width={windowWidth - 40} height="100">
                  <Path d={path} stroke="black" strokeWidth={2} />
              </Svg> */