import { StyleSheet, Text, Button, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { db } from '../firebaseConfig';
import { collection, doc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import { DataTable } from 'react-native-paper';

const StudentsScreen = (sid) => {
    const [newName, setNewName] = useState("");
    const [newAge, setNewAge] = useState(0);
    const [students, setStudents] = useState([]);
    const [grades, setGrades]= useState([]);
    const usersCollectionRef = collection(db, "Students");
    const userCollectionRef = doc(db, "Students", "CWaTPHH7Vu8zGjV44vVm");


    const navigation = useNavigation();

    const MenuScreenRedir = () => {
        navigation.replace("Menu");
    }

    const EditStudentRedir = (studentid) => {
        navigation.navigate('EditStudent', {
          paramKey: studentid
        })
      }

      const DeleteStudentRedir = (studentid) => {
        navigation.navigate('DeleteStudent', {
          paramKey: studentid
        })
      }

    useEffect(() => {
        const getStudents = async () => {
            const data = await getDocs(usersCollectionRef);
            //console.log(data);
            setStudents(data.docs.map((doc)=> ({ ...doc.data(), id: doc.id }))); // now users are added to the db
            // users are added, but not displayed before I push the refresh button (update is next)
        }; 
        
        getStudents();
        } ,[]);

    return (
        <ScrollView>
            <TouchableOpacity
                onPress={MenuScreenRedir}
                style={styles.button}>
                <Text styles={styles.buttonText}>Menu</Text>
            </TouchableOpacity>
            <View>
                        <DataTable>
                            <DataTable.Header>
                            <DataTable.Title>fName</DataTable.Title>
                            <DataTable.Title>lName</DataTable.Title>
                            <DataTable.Title>DOB</DataTable.Title>
                            <DataTable.Title></DataTable.Title>
                            <DataTable.Title></DataTable.Title>
                            </DataTable.Header>

              {students.sort((a, b) => a.fName + a.lName > b.fName + b.lName).map((student) => {
                  const myStudent = student;
                  return (
                  <DataTable.Row>
                                  <DataTable.Cell>{student.fName}</DataTable.Cell>
                                  <DataTable.Cell>{student.lName}</DataTable.Cell>
                                  <DataTable.Cell>{student.DOB}</DataTable.Cell>
                                  <DataTable.Cell><Button title="Edit" onPress={() => EditStudentRedir(student.id)}></Button></DataTable.Cell>
                                  <DataTable.Cell><Button title="Delete" onPress={() => DeleteStudentRedir(student.id)}></Button></DataTable.Cell>
                              </DataTable.Row>
                  );
              })}
              </DataTable>
              </View>
              
          </ScrollView>
    );
}

export default StudentsScreen

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