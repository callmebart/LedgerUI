import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Shadow } from 'react-native-shadow-2';
import { LinearGradient } from 'expo-linear-gradient';

const ButtonNeu = () => {
  // const color =props.color 
  // const radius = props.radius
  // const width  = props.width 
  // const height = props.height 
  // const distance = props.distance 

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Shadow
        distance={25}
        size={[160, 25]}
        startColor={'white'}
        containerViewStyle={{ marginVertical: 20 }}
        offset={[-10, 60]}
        radius={1}>


      </Shadow>
      <LinearGradient
        colors={['#ede5ff', 'white']}
        style={{ zIndex: 10, width: 200, height: 70, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={{color:'#dce0e8',fontWeight:'bold',fontSize:18}}>CLICK ME</Text>
      </LinearGradient>
      <Shadow
        distance={25}
        size={[160, 25]}
        startColor={'#00000050'}
        containerViewStyle={{ marginVertical: 20 }}
        offset={[10, -60]}
        radius={1}>
      </Shadow>
    </View>
  )
}

export default ButtonNeu

const styles = StyleSheet.create({

});