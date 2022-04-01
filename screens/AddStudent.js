import { StyleSheet, Button, Text, TextInput, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { doc, setDoc } from 'firebase/firestore'; 
import { db } from '../firebaseConfig'
import { useNavigation } from '@react-navigation/native'



const AddStudent = () => {
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [dob, setDob] = useState("");

    const navigation = useNavigation();
    const HomeScreenRedir = () => {
        navigation.replace("Home");
    }
    
    const [text, setText] = useState("");

    const CreateStudent = () => {

        var RandomNumber = Math.floor(Math.random() * 100) + 1 / 456;
        var customId = fname + "." + lname + "." + (RandomNumber * 3.14).toFixed(4);
        const myDoc = doc(db, "Students", customId)
        
        // Your document goes here
        const docData = {
            "fName": fname,
            "lName": lname,
            "DOB": dob,
            "MGMT329Score": -0.1,
            "MGMT450Score": -0.1,
        }

        const EditStudentRedir = (studentid) => {
            navigation.navigate('EditStudent', {
              paramKey: studentid
            })
          }
        
        setDoc(myDoc, docData)
        // Handling promises
        .then(() => {
            EditStudentRedir(customId);
        })
        .catch((error) => {
            alert(error.message);
        })
    }

        return (
            <View style={styles.container}>
                   <TouchableOpacity
                onPress={HomeScreenRedir}
                style={styles.button}>
                <Text styles={styles.buttonText}>Home</Text>
            </TouchableOpacity>
                <TextInput placeholder="First Name" onChangeText={(text) => setFname(text)}>{fname}</TextInput>
                <TextInput placeholder="Last Name" onChangeText={(text) => setLname(text)}></TextInput>
                <TextInput placeholder="Date of Birth" onChangeText={(text) => setDob(text)}></TextInput>
                <Button style={styles.button} title='Add Student' onPress={() => {
                    CreateStudent({
                        "fName": fname,
                        "lName": lname,
                        "DOB": dob,
                        "MGMT329Score": -1,
                        "MGMT450Score": -1,
                    }, true)
                }} disabled={fname == "" || lname == "" || dob == ""}></Button>
            </View>
          );
}

export default AddStudent

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