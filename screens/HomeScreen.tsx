import { StyleSheet, Text, View, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

/*Components*/
import NeoumorphicBox from '../components/NeoumorphicBox';
import Card from '../components/Card';

const windowWidth = Dimensions.get('window').width;

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <NeoumorphicBox>
          <View style={{ flexDirection: 'row', width: windowWidth - 40, height: 70, justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={styles.title}>Welcome Bart!</Text>
            <TouchableOpacity style={{ marginRight: 20 }}>
              <Ionicons name="menu" size={28} color={Colors.headerTextColor} />
            </TouchableOpacity>
          </View>
        </NeoumorphicBox>
      </View>
      <View style={styles.content}>
        
          <Card/>
        

      </View>
    </SafeAreaView >
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

  },
  title: {
    fontSize: 22,
    marginLeft: 20,
    fontWeight: 'bold',
    color: Colors.headerTextColor,
  },
});