import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { db } from '../firebaseConfig';
import { collection, doc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import {
    LineChart
  } from "react-native-chart-kit";
  import { Dimensions } from "react-native";
  const screenWidth = Dimensions.get("window").width;

const GradesChartScreen = () => {
    const [students, setStudents] = useState([]);

    const usersCollectionRef = collection(db, "Students");
    const navigation = useNavigation();
    const MenuScreenRedir = () => { navigation.replace("Menu"); }

        useEffect(() => {
            const getStudents = async () => {
              const data = await getDocs(usersCollectionRef);
              setStudents(data.docs.map((doc)=> ({ ...doc.data(), id: doc.id })));
            }; 
            
            getStudents();
          } ,[]);

          const valid329Students = []
          const valid329Scores = []
          students.filter(s => s.MGMT329Score >= 0).forEach(stud => {
                valid329Scores.push(parseInt(stud.MGMT329Score));
                valid329Students.push(stud.fName.charAt(0) + ". " + stud.lName.charAt(0));

          })

          const valid450Students = []
          const valid450Scores = []
          const sampleScores = [20, 50, 30, 90, 25, 34, 100]
          let i = 0;
          students.filter(s => s.MGMT450Score >= 0).forEach(stud => {
                valid450Scores.push(parseInt(stud.MGMT450Score));
                valid450Students.push(stud.fName.charAt(0) + ". " + stud.lName.charAt(0));
          })

    //alert(valid450Students.length != 0 ? valid450Students : ['Eric', 'Tim', 'John']);
    return (
        <View>
        <TouchableOpacity
            onPress={MenuScreenRedir}
            style={styles.button}>
            <Text styles={styles.buttonText}>Menu</Text>
        </TouchableOpacity>
      
<Text>MGMT450 Scores</Text>
      <LineChart
        data={{
          labels: valid450Students.length != 0 ? valid450Students : ['none'],
          datasets: [
            {
              data: valid450Scores.length != 0 ? valid450Scores : [0]
            }
          ]
        }}
        width={Dimensions.get("window").width} // from react-native
        height={220}
        yAxisLabel=""
        yAxisSuffix="%"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />

<Text>MGMT329 Scores</Text>
      <LineChart
        data={{
          labels: valid329Students.length != 0 ? valid329Students : ['none'],
          datasets: [
            {
              data: valid329Scores.length != 0 ? valid329Scores : [0]
            }
          ]
        }}
        width={Dimensions.get("window").width} // from react-native
        height={220}
        yAxisLabel=""
        yAxisSuffix="%"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
      
    </View>
    );
}

export default GradesChartScreen

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
