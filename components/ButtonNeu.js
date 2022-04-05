import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Shadow } from 'react-native-shadow-2';
import { LinearGradient } from 'expo-linear-gradient';


/*Button dimmensions*/
const WIDTH = 200;
const HEIGHT = 70;
const RADIUS = 20;

const ButtonNeu = (props) => {

  const SIZE = props.size
  const DISTANCE = props.distance
  const TEXT = props.text
  

  return (
    <TouchableOpacity onPress={props.onPress} style={styles.container} activeOpacity={.7}>
      <Shadow
        distance={DISTANCE}
        size={SIZE}
        startColor={'white'}
        containerViewStyle={{ marginVertical: 20 }}
        offset={[-10, 60]}
        radius={1}>
      </Shadow>
      <LinearGradient
        colors={['rgb(229,229,234)', 'white']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={{ color: 'rgb(199,199,204)', fontWeight: 'bold', fontSize: 18 }}>{TEXT}</Text>
      </LinearGradient>
      <Shadow
        distance={DISTANCE}
        size={SIZE}
        startColor={'#00000050'}
        containerViewStyle={{ marginVertical: 20 }}
        offset={[10, -60]}
        radius={1}>
      </Shadow>
    </TouchableOpacity>
  )
}

export default ButtonNeu

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center', alignItems: 'center'
  },
  gradient: {
    zIndex: 10,
    width: WIDTH,
    height: HEIGHT,
    borderRadius: RADIUS,
    justifyContent: 'center',
    alignItems: 'center'
  },
});