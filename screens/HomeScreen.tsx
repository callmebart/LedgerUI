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

  return (

    <View style={styles.container}>
      <SafeAreaView >
        <View style={{ flex: 1, marginTop: 30 }}>
          <NeoumorphicBox>
            <View style={{ flexDirection: 'row', width: windowWidth - 40, height: 70, justifyContent: 'space-between', alignItems: 'center', borderRadius: 20 }}>
              <Text style={styles.title}>Welcome Bart!</Text>
              <TouchableOpacity style={{ marginRight: 20 }}>
                <Ionicons name="menu" size={28} color={Colors.headerTextColor} />
              </TouchableOpacity>
            </View>
          </NeoumorphicBox>
        </View>
        <View style={styles.content}>

          <View style={{ flex: 2.2 }}>
            <NeoumorphicBox>
              <TouchableOpacity onPress={() => console.log("pres")} style={{ width: windowWidth - 40, height: 200, borderRadius: 15 }} activeOpacity={.6}>
                <Card width={200} height={200} />
              </TouchableOpacity>
            </NeoumorphicBox>
          </View>

          <View style={{ flexDirection: 'row', flex: 3, justifyContent: 'space-between', width: windowWidth - 80 }}>
            <NeoumorphicBox>
              <TouchableOpacity onPress={() => console.log("pres1")} style={{ width: 90, height: 90, borderRadius: 20 }} />
            </NeoumorphicBox>
            <NeoumorphicBox>
              <TouchableOpacity onPress={() => console.log("pres2")} style={{ width: 90, height: 90, borderRadius: 20 }} />
            </NeoumorphicBox>
            <NeoumorphicBox>
              <TouchableOpacity onPress={() => console.log("pres3")} style={{ width: 90, height: 90, borderRadius: 20 }} />
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