import { View, Text, Dimensions } from 'react-native'
import React ,{useState,useEffect}from 'react'

import {
  LineChart,
} from "react-native-chart-kit";

import Colors from '../constants/Colors';
import { ThemeContext, useTheme } from '../hooks/ThemeProvider';
import { Theme } from '../types';

export default function BezierLinrChart() {

  const { theme, setTheme } = useTheme()
  const [gradient1Color, setGradient1Color] = useState(Colors.light.neuGradientFirstColor)
  const [gradient2Color,setGradient2Color] = useState(Colors.light.neuGradientSecondColor)

  const [pathLineColor,setPathLineColor] = useState(Colors.light.pathLineColor)
 // const [shadow1,setShadow1] = useState(Colors.light.shadow1)
  //const [shadow2,setShadow2] = useState(Colors.light.shadow2)

  useEffect(() => {
      if (theme == 'light') {
          setGradient1Color(Colors.light.neuGradientFirstColor)
          setGradient2Color(Colors.light.neuGradientSecondColor)
          setPathLineColor(Colors.light.pathLineColor)

      }else{
          setGradient1Color(Colors.dark.neuGradientFirstColor)
          setGradient2Color(Colors.dark.neuGradientSecondColor)
          setPathLineColor(Colors.dark.pathLineColor)
  
      }
  }, [theme])



  return (
    <View>
      <LineChart
        data={{
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [
            {
              data: [
                78.9154453641313,
                55.801418107319066,
                38.87651924368301,
                55.26893894458558,
                85.56881030053083,
                34.90820912436362
              ]
            }
          ]
        }}
        width={Dimensions.get("window").width - 40} // from react-native

        // chart desc 
        height={200}
        yAxisLabel="$"
        //yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1

        //dashed lines on the chart 
        withVerticalLines={false}
        withHorizontalLines={false}

        onDataPointClick={({value, dataset, getColor})=>console.log(value)} //value of the dot 
        
        chartConfig={{
        
          backgroundGradientFrom: gradient1Color,
          backgroundGradientTo:gradient2Color,
          decimalPlaces: 2, // optional, defaults to 2dp
          fillShadowGradientFrom:'#d024ff',
          fillShadowGradientTo:'white',

          color: () => pathLineColor, //line path color 
          labelColor: () => pathLineColor,

          style: {
            borderRadius: 15
          },
          propsForDots: {
            r: "5",
            strokeWidth: "3",
            stroke: "#bfa8ff",
            
          }
        }}
        bezier
        style={{
          borderRadius: 15,
          justifyContent:'center',
          alignItems:'center',
        }}
      />
    </View>
  )
}