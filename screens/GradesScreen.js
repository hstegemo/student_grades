import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { db } from '../firebaseConfig';
import { jsonEval } from '@firebase/util'

const GradesScreen = () => {
    // Storing student data
    const [userDoc, setUserDoc] = useState("");
    // update text
    const [text, setText] = useState("");

    // Crud functions
    const Create = () => {
        const myDoc = doc(db, "MyCollection", "MyDocument");
        
        // Your document goes here
        const docData = {
            "classId": "IKT205",
            "fName": "Helge",
            "lName": "Stegemoen",
            "DOB": "05/19/1971",
            "className": "Application Development",
            "Score": 98,
            "Grade": "F"
        }
        
        setDoc(myDoc, docData)
        // Handling promises
        .then(() => {
            alert("document.created")
        })
        .catch((error) => {
            alert(error.message);
        })

    }

    const Read = () => {
        const myDoc = doc(db, "MyCollection", "MyDocument");
        
        getDoc(myDoc)
        // Handling promises
        .then((snapshot) => {
            if(snapshot.exists){
                setUserDoc(snapshot.data())
                console.log(snapshot.id)
            } else {
                alert("No doc found");
            }
        })
        .catch(error => {
            alert(error.message);
        })
    }
  
    const Update = () => {
        const myDoc = doc(db, "MyCollection", "MyDocument");

        setDoc(myDoc, value, { merge: merge })
            // Handling promises
            .then(() => {
                alert("Updated successfully");
                setText("");
            })
            .catch(error => {
                alert(error.message);
            })
    }

    const Delete = () => {
        const myDoc = doc(db, "Students", "CWaTPHH7Vu8zGjV44vVm");

        setDoc(myDoc, value, {merge: merge})
            // Handling promises
            then(() => {
                alert("Updated successfully");
                setText("");
            })
            .catch(error => alert(error.messge)
            )
    }

    return (
    <View>
      <Button title="Create new doc" onPress={Create}></Button>
      <Button title="Read Doc" onPress={Read}></Button>
      {
          userDoc != null && 
          <Text>Bio: {userDoc.fName}</Text>
      }
      <TextInput
        style={{
            width: '95%',
            fontSize: 18,
            padding: 12,
            borderColor: 'gray',
            borderWidth: 0.2,
            borderRadius: 10,
            marginVertical: 20
          }} placeholder="Type Here" onChangeText={(text) => {setText(text) }} value={text}></TextInput>
      <Button title="Update Doc" onPress={() => {
          Update({
              "bio": text
          }, true)
      }} disabled={text == ""}></Button>
      <Button title="Delete Doc" onPress={Delete}></Button>
    </View>
  )
}

export default GradesScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});