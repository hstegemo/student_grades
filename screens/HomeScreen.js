import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebaseConfig'
import { useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const HomeScreen = () => {

  const stack = createNativeStackNavigator();
  
  const navigation = useNavigation();

  const handleSignOut = () => {
    signOut(auth) 
    .then(() => {
      navigation.replace("Login")
    })
    .catch(error => alert(error.message))
  }

  const GradesScreenRedir = () => {
    navigation.replace("AddGrades")
  }

  const addStudentRedir = () => {
    navigation.replace("AddStudent")
  }

  const ShowGradesRedir = () => {
    navigation.replace("ShowGrades");
  }

  const StudentsScreenRedir = () => {
    navigation.replace("Students");
  }

  const EditStudentRedir = () => {
    //navigation.replace("EditStudent")
    navigation.navigate('EditStudent', {
      paramKey: 'CWaTPHH7Vu8zGjV44vVm',
    })
  }

  return (
    <View>
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
          onPress={StudentsScreenRedir}
          style={styles.button}>
            <Text styles={styles.buttonText}>Students</Text>

        </TouchableOpacity>

        <TouchableOpacity
          onPress={EditStudentRedir}
          style={styles.button}>
            <Text styles={styles.buttonText}>Edit one student</Text>

        </TouchableOpacity>
    </View>
  )
}

export default HomeScreen

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