import { StyleSheet,Text, View ,Button } from 'react-native';
import {useNavigation} from '@react-navigation/native';


export default function HomeScreen() {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <Button title="go" onPress={()=>navigation.navigate("LogInScreen")}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});