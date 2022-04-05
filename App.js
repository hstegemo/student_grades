import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import MenuScreen from './screens/MenuScreen';
import StudentsScreen from './screens/StudentsScreen';
import AddStudent from './screens/AddStudent';
import ShowGrades from './screens/ShowGrades';
import EditStudent from './screens/EditStudent';
import DeleteStudent from './screens/DeleteStudent';
import GradesChartScreen from './screens/GradesChart';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="ShowGrades" component={ShowGrades} />
        <Stack.Screen name="GradesChart" component={GradesChartScreen} />
        <Stack.Screen name="AddStudent" component={AddStudent} />
        <Stack.Screen name="EditStudent" component={EditStudent} />
        <Stack.Screen name="DeleteStudent" component={DeleteStudent} />
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
