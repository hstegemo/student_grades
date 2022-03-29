import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native'
import { db } from '../firebaseConfig';
import { deleteDoc, doc, getDocs, collection, setDoc } from 'firebase/firestore';
import { DataTable } from 'react-native-paper';

const EditStudent = ({route}) => {
    // Storing User Data
  const usersCollectionRef = collection(db, "Students");
  // Update Text
  const [text, setText] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [DOB, setDOB] = useState("");
  // Classes
  const [MGMT329Score, setMGMT329Score] = useState('');
  const [MGMT329Grade, setMGMT329Grade] = useState('');
  const [MGMT450Score, setMGMT450Score] = useState("");
  const [MGMT450Grade, setMGMT450Grade] = useState("");

  const [taskItems, setTaskItems] = useState([]);

  const [students, setStudents] = useState([]);
  const [myStudent, setMyStudent]= useState("");
  const studentid = route.params.paramKey;

  const navigation = useNavigation();
  const HomeScreenRedir = () => {
    navigation.replace("Home");
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
                setDOB(object.DOB);
                setMGMT329Score(object.MGMT329Score);
                setMGMT450Score(object.MGMT450Score);
                setMGMT329Grade(object.MGMT329Grade);
                setMGMT450Grade(object.MGMT450Grade);
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
    

  const Update = (value, merge) => {
    // MARK: Updating Doc
    const myDoc = doc(db, "Students", studentid);

    // If you set merge true then it will merge with existing doc otherwise it will be a fresh one
    setDoc(myDoc, value, { merge: merge })
      // Handling Promises
      .then(() => {
        // MARK: Success
        alert("Updated Successfully!")
        setText("")
      })
      .catch((error) => {
        // MARK: Failure
        alert(error.message)
      })
  }

  const Delete = () => {
    // MARK: Deleting Doc
    const myDoc = doc(db, "Student", studentid)

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

  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={HomeScreenRedir}
        style={styles.button}>
        <Text styles={styles.buttonText}>Home</Text>
      </TouchableOpacity>
	  <DataTable>
			<DataTable.Row>
        <DataTable.Cell>First Name</DataTable.Cell>
        <DataTable.Cell>
          <TextInput editMode="cell" placeholder="fName" onChangeText={(text) => { setFName(text) }}>{fName}</TextInput>
        </DataTable.Cell>
        <DataTable.Cell>
          <Button title='Edit' onPress={() => {
                Update({
                    "fName": fName,
                  }, true)
                }} disabled={fName == ""}>
          </Button>
        </DataTable.Cell>    
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell>lName</DataTable.Cell>
          <DataTable.Cell>
            <TextInput placeholder='Last Name' onChangeText={(text) => { setLName(text) }}>{lName}</TextInput>
          </DataTable.Cell>
          <DataTable.Cell>
            <Button title='Edit' onPress={() => {
                  Update({
                    "lName": lName,
                  }, true)
                }} disabled={lName == ""}>
            </Button>
          </DataTable.Cell>  
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>DOB</DataTable.Cell>
          <DataTable.Cell>
            <TextInput placeholder='Date of Birth' onChangeText={(text) => { setDOB(text) }}>{DOB}</TextInput>
          </DataTable.Cell>
          <DataTable.Cell>
            <Button title='Edit' onPress={() => {
                Update({
                  "DOB": DOB
                }, true)
              }} disabled={DOB == ""}>
            </Button>
          </DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>329 Score</DataTable.Cell>
            <DataTable.Cell>
              <TextInput placeholder='MGMT329 Score' onChangeText={(text) => { setMGMT329Score(text) }}> {MGMT329Score} </TextInput>
            </DataTable.Cell>
            <DataTable.Cell>
              <Button title='Edit' onPress={() => {
                Update({
                  "MGMT329Score": MGMT329Score
                  }, true)
                }} disabled={MGMT329Score == ""}>
              </Button>   
            </DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>450 Score</DataTable.Cell>
            <DataTable.Cell>
              <TextInput placeholder='MGMT329 Grade' onChangeText={(text) => { setMGMT329Grade(text) }}> {MGMT329Grade} </TextInput>
            </DataTable.Cell>
            <DataTable.Cell>
              <Button title='Edit' onPress={() => {
                Update({
                  "MGMT329Grade": MGMT329Grade
                  }, true)
                }} disabled={MGMT329Grade == ""}>
              </Button>
            </DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>329 Grade</DataTable.Cell>
            <DataTable.Cell>
              <TextInput placeholder='MGMT450 Score' onChangeText={(text) => { setMGMT450Score(text) }}> {MGMT450Score} </TextInput>
            </DataTable.Cell>
            <DataTable.Cell>
              <Button title='Edit' onPress={() => {
                Update({
                "MGMT450Score": MGMT450Score
                }, true)
                }} disabled={MGMT450Score == ""}>
              </Button>
            </DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>450 Grade</DataTable.Cell>
            <DataTable.Cell>
              <TextInput placeholder='MGMT450 Grade' onChangeText={(text) => { setMGMT450Grade(text) }}> {MGMT450Grade} </TextInput>
            </DataTable.Cell>
            <DataTable.Cell>
              <Button title='Edit' onPress={() => {
                Update({
                  "MGMT450Score": MGMT450Grade
                }, true)
                }} disabled={MGMT450Grade == ""}>
              </Button>
            </DataTable.Cell>
          </DataTable.Row>
		</DataTable>
  </View>    
  );
}
    export default EditStudent

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