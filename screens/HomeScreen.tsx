import { StyleSheet, Text, View, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

/*Components*/
import NeoumorphicBox from '../components/NeumorphicBox';
import Card from '../components/Card';


const windowWidth = Dimensions.get('window').width;

export default function HomeScreen() {
  const navigation = useNavigation();

  const boxes = [1, 2, 3]
  const renderBoxes = boxes.map((item,index) => {
    return (
      <NeoumorphicBox>
        <TouchableOpacity key={index} onPress={() => console.log("pres1")} style={{ width: 90, height: 90, borderRadius: 20 }} />
      </NeoumorphicBox>
    )
  })

  return (

    <View style={styles.container}>
      <SafeAreaView >
        <View style={{ flex: 1, marginTop: 30}}>
          <NeoumorphicBox>
            <View style={{ flexDirection: 'row', width: windowWidth - 40, height: 70, justifyContent: 'space-between', alignItems: 'center', borderRadius: 20 }}>
              <Text style={styles.title}>Welcome Bart!</Text>
              <TouchableOpacity style={{ width: 70,height:70, zIndex: 2,justifyContent:'center',alignItems:'center'}} onPress={() => console.log("menu")} >
                <Ionicons name="menu" size={28} color={Colors.headerTextColor} />
              </TouchableOpacity>
            </View>
          </NeoumorphicBox>
        </View>
        <View style={styles.content}>

          <View style={{ flex: 2.1 }}>
            <NeoumorphicBox>
              <TouchableOpacity onPress={() => console.log("pres")} style={{ width: windowWidth - 40, height: 200, borderRadius: 15 }} activeOpacity={.6}>
                <Card width={200} height={200} />
              </TouchableOpacity>
            </NeoumorphicBox>
          </View>

          <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', width: windowWidth - 80 }}>
              {renderBoxes}
          </View>

          <View style={{ flex: 2 }}>
            <NeoumorphicBox>
              <TouchableOpacity onPress={() => console.log("pres")} style={{ width: windowWidth - 40, height: 200, borderRadius: 15,justifyContent:'center',alignItems:'center' }} activeOpacity={.6}>
                <Text>Place for current exopences</Text>
              </TouchableOpacity>
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
    flex: 1,
    width: windowWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
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