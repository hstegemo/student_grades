import { KeyboardAvoidingView, StyleSheet, Text,TextInput, View, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { auth } from "../firebaseConfig.js"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if(user){
        navigation.replace("Home");
      }
    })
    return unsubscribe;
  }, []);

  const handleSignup = () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user
      console.log("Added user: ", user.email)
    })
    .catch(error => alert(error.message))
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password) 
    .then(userCredential => {
      const user = userCedential.user
      console.log("Logged in with: ", user.email)
    })
    .catch(error => alert(error.message));

  }

  return (
    <KeyboardAvoidingView>
      <View>
        <TextInput 
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>
      <View>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignup}
          style={styles.button}>
            <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )

}


export default LoginScreen

const styles = StyleSheet.create({
  container: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
  }, 
  inputContainer: {
      width: '80%'
  },
  input: {
      backgroundColor: 'white',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 5,
  },
  buttonContainer: {
      width: '60%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
  },
  button: {
      backgroundColor: '#0782F9',
      width: '100%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
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
  buttonOutlineText: {
      color: '#0782F9',
      fontWeight: '700',
      fontSize: 16,
  }
})