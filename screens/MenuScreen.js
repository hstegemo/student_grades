import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebaseConfig'
import { useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import GradesChartScreen from './GradesChart'

const MenuScreen = () => {

  const stack = createNativeStackNavigator();
  
  const navigation = useNavigation();

  const handleSignOut = () => {
    signOut(auth) 
    .then(() => {
      navigation.replace("Login")
    })
    .catch(error => alert(error.message))
  }

  const addStudentRedir = () => {
    navigation.replace("AddStudent")
  }

  const ShowGradesRedir = () => {
    navigation.replace("ShowGrades");
  }

  const GradesChartScreenRedir = () => {
    navigation.replace("GradesChart");
  }

  const StudentsScreenRedir = () => {
    navigation.replace("Students");
  }

  return (
    <View>
      <TouchableOpacity
          onPress={handleSignOut}
          style={styles.button}>
            <Text styles={styles.buttonText}>Sign Out</Text>

        </TouchableOpacity>
        <TouchableOpacity
          onPress={addStudentRedir}
          style={styles.button}>
            <Text styles={styles.buttonText}>Create student</Text>

        </TouchableOpacity>
        <TouchableOpacity
          onPress={ShowGradesRedir}
          style={styles.button}>
            <Text styles={styles.buttonText}>Grades list</Text>

        </TouchableOpacity>

        <TouchableOpacity
          onPress={GradesChartScreenRedir}
          style={styles.button}>
            <Text styles={styles.buttonText}>Grades chart</Text>

        </TouchableOpacity>


        <TouchableOpacity
          onPress={StudentsScreenRedir}
          style={styles.button}>
            <Text styles={styles.buttonText}>Students</Text>

        </TouchableOpacity>
    </View>
  )
}

export default MenuScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonOutline: {
      backgroundColor: 'white',
      marginTop: 5,
      borderColor: '#0782F9',
      borderWidth: 2,
  },
  buttonText: {
      color: 'white',
      fontWeight: '700',
      fontSize: 16,
  },
})