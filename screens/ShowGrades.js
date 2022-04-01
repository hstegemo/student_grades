import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { db } from '../firebaseConfig';
import { collection, doc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import { DataTable } from 'react-native-paper';

const ShowGrades = () => {
    const [newName, setNewName] = useState("");
    const [newAge, setNewAge] = useState(0);
    const [students, setStudents] = useState([]);
    const [grades, setGrades]= useState([]);
    const usersCollectionRef = collection(db, "Students");


    const navigation = useNavigation();
    const HomeScreenRedir = () => {
      navigation.replace("Home");
      }
  

        useEffect(() => {
            const getStudents = async () => {
              const data = await getDocs(usersCollectionRef);
              setStudents(data.docs.map((doc)=> ({ ...doc.data(), id: doc.id })));
            }; 
            
            getStudents();
          } ,[]);

    return (
        <View>
            <TouchableOpacity
                onPress={HomeScreenRedir}
                style={styles.button}>
                <Text styles={styles.buttonText}>Go Home</Text>
            </TouchableOpacity>
            <View>
                        <DataTable>
                            <DataTable.Header>
                            <DataTable.Title>classId</DataTable.Title>
                            <DataTable.Title>fName</DataTable.Title>
                            <DataTable.Title>lName</DataTable.Title>
                            <DataTable.Title>Score</DataTable.Title>
                            <DataTable.Title>Grade</DataTable.Title>
                            </DataTable.Header>
                            
            {students.filter(student => student.MGMT329Score >= 0).map((student) => {
                let student329grade='';

                if(student.MGMT329Score > 0 && student.MGMT329Score < 50) {student329grade='F'}
                else if(student.MGMT329Score >= 50 && student.MGMT329Score < 60) {student329grade='E'}
                else if(student.MGMT329Score >= 60 && student.MGMT329Score < 70) {student329grade='D'}
                else if(student.MGMT329Score >= 70 && student.MGMT329Score < 80) {student329grade='C'}
                else if(student.MGMT329Score >= 80 && student.MGMT329Score < 90) {student329grade='B'}
                else {student329grade='A'}

                return (
                <DataTable.Row>
                                <DataTable.Cell>329</DataTable.Cell>
                                <DataTable.Cell>{student.fName}</DataTable.Cell>
                                <DataTable.Cell>{student.lName}</DataTable.Cell>
                                <DataTable.Cell>{student329grade}</DataTable.Cell>
                                <DataTable.Cell>{student.MGMT329Score}</DataTable.Cell>
                            </DataTable.Row>
                );
            })}
            {students.filter(student => student.MGMT450Score > 0).map((student) => {
                let student450grade='';
                if(student.MGMT450Score > 0 && student.MGMT450Score < 50) {student450grade='F'}
                else if(student.MGMT450Score >= 50 && student.MGMT450Score < 60) {student450grade='E'}
                else if(student.MGMT450Score >= 60 && student.MGMT450Score < 70) {student450grade='D'}
                else if(student.MGMT450Score >= 70 && student.MGMT450Score < 80) {student450grade='C'}
                else if(student.MGMT450Score >= 80 && student.MGMT450Score < 90) {student450grade='B'}
                else {student450grade='A'}
                return (
                    <DataTable.Row>
                                <DataTable.Cell>450</DataTable.Cell>
                                <DataTable.Cell>{student.fName}</DataTable.Cell>
                                <DataTable.Cell>{student.lName}</DataTable.Cell>
                                <DataTable.Cell>{student.MGMT450Score}</DataTable.Cell>
                                <DataTable.Cell>{student450grade}</DataTable.Cell>
                            </DataTable.Row>
                );
            })}
            </DataTable>
            </View>
            
        </View>
    );
}

export default ShowGrades

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