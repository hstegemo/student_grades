import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native'
import { db } from '../firebaseConfig';
import { deleteDoc, doc, getDocs, collection, setDoc } from 'firebase/firestore';
import { DataTable } from 'react-native-paper';

const DeleteStudent = ({route}) => {
    // Storing User Data
  const usersCollectionRef = collection(db, "Students");

  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");

  const [taskItems, setTaskItems] = useState([]);

  const [students, setStudents] = useState([]);
  const [myStudent, setMyStudent]= useState("");
  const studentid = route.params.paramKey;

  const navigation = useNavigation();
  const MenuScreenRedir = () => {
    navigation.replace("Menu");
    }

 
  useEffect(() => {
    const getStudents = async () => {
        const data = await getDocs(usersCollectionRef);
        setStudents(data.docs.map((doc)=> ({ ...doc.data(), id: doc.id }))); // now users are added to the db
        // users are added, but not displayed before I push the refresh button (update is next)

        const studentRef = doc(db, "Students", studentid);        
    }; 
    
    getStudents();
    readStudent();
    
    } ,[]);

    function readStudent(){
    getDocs(collection(db, "Students")).then(
        function (notesSnapshot) {
            const notesList = [];
            //alert(JSON.stringify(notesSnapshot.docs[0].data()));
            for (let i = 0; i < notesSnapshot.docs.length; i++) {
            let doc = notesSnapshot.docs[i];
            //alert(JSON.stringify(doc));
    
            let object = doc.data();
            object.id = doc.id;
            //alert(JSON.stringify(object))
            notesList.push(object);
            if(object.id==studentid){
                setMyStudent(object);
                setFName(object.fName);
                setLName(object.lName);
              }
            }
            //alert(JSON.stringify(notesList));
            setTaskItems(notesList);
        },
        function (error) {
            alert(error);
        }
        );
          
    }

  const Delete = () => {
    // MARK: Deleting Doc
    const myDoc = doc(db, "Students", studentid)

    deleteDoc(myDoc)
      // Handling Promises
      .then(() => {
        // MARK: Success
        alert("Deleted Successfully!")
      })
      .catch((error) => {
        // MARK: Failure
        alert(error.message)
      })

      StudentsScreenRedir()

  }

  const StudentsScreenRedir = () => {
    navigation.replace("Students");
  }

  return (
    <View>
      <TouchableOpacity
        onPress={MenuScreenRedir}
        style={styles.button}>
        <Text styles={styles.buttonText}>Menu</Text>
      </TouchableOpacity>
	  <DataTable>
			<DataTable.Row>
        <DataTable.Cell>Confirmation: Delete user {fName} {lName}?</DataTable.Cell>
        
      </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell></DataTable.Cell>
          <DataTable.Cell>
            <Button title='Yes' onPress={Delete}>
            </Button>
          </DataTable.Cell>
          <DataTable.Cell>
            <Button title='No' onPress={StudentsScreenRedir}>

            </Button>
          </DataTable.Cell>
          <DataTable.Cell></DataTable.Cell>
        </DataTable.Row>

		</DataTable>
  </View>    
  );
}

export default DeleteStudent

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