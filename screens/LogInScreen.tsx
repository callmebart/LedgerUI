import { StyleSheet, Text, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

/*components*/
import ButtonNeu from '../components/ButtonNeu';
/*Constants */
import Colors from '../constants/Colors'

export default function LogInScreen() {
  const navigation = useNavigation();

  const logoURL = require('../assets/logo.png')

  return (
    <View style={styles.container}>
      <Image source={logoURL} style={styles.logo}/>
      <ButtonNeu size={[160, 25]} distance={28} text={"LET'S GO"} onPress={() => navigation.navigate("HomeScreen")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
  logo:{
    aspectRatio: 1, 
    resizeMode: 'contain',
  },
});