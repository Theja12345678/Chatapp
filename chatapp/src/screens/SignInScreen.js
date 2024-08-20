import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      await axios.post('http://192.168.78.131:3000/api/auth/login', { email, password });
      navigation.navigate('Settings');
    } catch (error) {
      console.error('Login Error:', error);
      Alert.alert('Login Error', 'An error occurred during login.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text>Email:</Text>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          onChangeText={setEmail}
          value={email}
          placeholder="Enter your email"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Password:</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          onChangeText={setPassword}
          value={password}
          placeholder="Enter your password"
        />
      </View>
      <Button title="Sign In" onPress={handleSubmit} style={styles.signinButton} />
      <View style={styles.signUpContainer}>
        <Text>Don't have an account?</Text>
        <Button title="Sign Up" onPress={() => navigation.navigate('SignUp')} style={styles.signupButton} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  signUpContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  signinButton: {
    backgroundColor: 'blue',
    color: 'white',
  },
  signupButton: {
    backgroundColor: '#ccc',
    color: 'black',
  },
});

export default SignInScreen;
