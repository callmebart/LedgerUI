import { View, Text, Dimensions } from 'react-native'
import React from 'react'

import {
  LineChart,
} from "react-native-chart-kit";

export default function BezierLinrChart() {

  //TODO:
  // make on data point click

  return (
    <View>
      <LineChart
        data={{
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100
              ]
            }
          ]
        }}
        width={Dimensions.get("window").width - 40} // from react-native

        // chart desc 
        height={200}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1

        //dashed lines on the chart 
        withVerticalLines={false}
        withHorizontalLines={false}

        onDataPointClick={({value, dataset, getColor})=>console.log(value)} //value of the dot 
        
        chartConfig={{
        
          backgroundGradientFrom: "rgb(229,229,234)",
          backgroundGradientTo: "white",
          decimalPlaces: 2, // optional, defaults to 2dp
          fillShadowGradientFrom:'#db99e8',
          fillShadowGradientTo:'white',

          color: (opacity = 0.5) => `rgba(0, 0, 0, ${opacity})`, //line path color 
          labelColor: (opacity = 0.2) => `rgba(0, 0, 0, ${opacity})`,

          style: {
            borderRadius: 15
          },
          propsForDots: {
            r: "5",
            strokeWidth: "3",
            stroke: "#db99e8",
            
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