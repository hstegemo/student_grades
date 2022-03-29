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
        const myDoc = doc(db, "Students", "" + fname + "." + lname + "." + dob) // tester litt med custom id
        
        // Your document goes here
        const docData = {
            "fName": fname,
            "lName": lname,
            "DOB": dob
        }
        
        setDoc(myDoc, docData)
        // Handling promises
        .then(() => {
            alert("document.created. fname=" + fname + ",lname=" + lname + "dob=" + dob)
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
                <TextInput placeholder="fName" value={fname} onChangeText={(text) => setFname(text)}></TextInput>
                <TextInput placeholder="lName" value={lname} onChangeText={(text) => setLname(text)}></TextInput>
                <TextInput placeholder="DOB" value={dob} onChangeText={(text) => setDob(text)}></TextInput>
                <TouchableOpacity
                    onPress={CreateStudent}
                >
                    <Text>Add Student</Text>

                </TouchableOpacity>
                <Button title='Add Student' onPress={() => {
                    Create({
                        "bio": text
                    }, true)
                }} disabled={text == ""}></Button>
            </View>
          );
}

export default AddStudent

const styles = StyleSheet.create({})