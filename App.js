import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import GradesScreen from './screens/GradesScreen';
import StudentsScreen from './screens/StudentsScreen';
import AddStudent from './screens/AddStudent';
import ShowGrades from './screens/ShowGrades';
import EditStudent from './screens/EditStudent';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddGrades" component={GradesScreen} />
        <Stack.Screen name="ShowGrades" component={ShowGrades} />
        <Stack.Screen name="AddStudent" component={AddStudent} />
        <Stack.Screen name="EditStudent" component={EditStudent} />
        <Stack.Screen name="Students" component={StudentsScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
