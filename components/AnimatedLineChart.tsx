import { View, Text, Dimensions, StyleSheet } from 'react-native'
import React, { SVGProps } from 'react'



import Svg, { Path, Polyline } from 'react-native-svg'
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, {
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from 'react-native-reanimated';

import { getYForX, Vector, parse } from "react-native-redash";

const windowWidth = Dimensions.get("window").width

export default function AnimatedLineChart() {

    const path = `M1 6.50002C1 6.50002 10 25 15 25C20 25 27.5 -3.49998 37 1.50002C46.5 6.50002 58 42.5 63.5 46.5C69 50.5 70.5 46.5 76 46.5C81.5 46.5 85.5 60 91.5 60C97.5 60 98.5 43 105.5 46.5C112.5 50 116.092 36.6801 121.5 37C126.908 37.3199 133 60 138.5 60C144 60 150 37 157.5 33C165 29 165 29 170.5 33C176 37 182 22 189 25C196 28 208.5 60 219 60C229.5 60 235 50 238 42.5C241 35 245.5 49.5 249.5 50C253.5 50.5 255 33 259 33C263 33 261.5 42.5 266.5 42.5C271.5 42.5 279 21 279 21`

    const parsedPath = parse(path)

    const x = useSharedValue(0);
    const y = useSharedValue(0);

    const gestureHandler = useAnimatedGestureHandler({
        onStart: (_, ctx) => {
            ctx.startX = x.value;
            ctx.startY = y.value;
        },
        onActive: (event, ctx) => {
            x.value = ctx.startX + event.translationX;
            y.value = ctx.startY + getYForX(parsedPath, x.value);
        },
        onEnd: (_) => {
            x.value = withSpring(0);
            y.value = withSpring(0);
        },
    });

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: x.value - 10,
                },
                {
                    translateY: y.value - 10,
                },
            ],
        };
    });

    return (
        <View >
            <Svg width={windowWidth - 40} height={100}>
                <Path d={path} stroke="black" strokeWidth={2} />
            </Svg>
            <View style={StyleSheet.absoluteFill}>
                <PanGestureHandler onGestureEvent={gestureHandler}>
                    <Animated.View style={[styles.pointer, animatedStyle]} />
                </PanGestureHandler>
            </View>

        </View>


    );
}

const styles = StyleSheet.create({
    pointer: {
        width: 20, height: 20,
        borderRadius: 10,
        backgroundColor: 'red',

    },
});



/* <Svg width={windowWidth - 40} height="100">
                  <Path d={path} stroke="black" strokeWidth={2} />
              </Svg> */