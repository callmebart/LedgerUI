import { StyleSheet, Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

/*components*/
 import ButtonNeu from '../components/ButtonNeu';

export default function LogInScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In Screen</Text>
      <Button title="go" onPress={() => navigation.navigate("HomeScreen")} />

      <ButtonNeu />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
   backgroundColor:'#EFEEEE',
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