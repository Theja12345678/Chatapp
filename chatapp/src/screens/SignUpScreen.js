import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

const SignUpScreen = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    birthday: new Date(),
    phoneNumber: ''
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const navigation = useNavigation();

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || formData.birthday;
    setShowDatePicker(false);
    setFormData({ ...formData, birthday: currentDate });
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://192.168.78.131:3000/api/auth/register', formData);
      navigation.navigate('Settings');
    } catch (error) {
      console.error('Registration Error:', error);
      Alert.alert('Registration Error', 'An error occurred during registration.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text>Email:</Text>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          onChangeText={(value) => handleChange('email', value)}
          value={formData.email}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Password:</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          onChangeText={(value) => handleChange('password', value)}
          value={formData.password}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Birthday:</Text>
        <Button title="Select Birthday" onPress={() => setShowDatePicker(true)} />
        {showDatePicker && (
          <DateTimePicker
            value={formData.birthday}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
      </View>
      <View style={styles.inputContainer}>
        <Text>Phone Number:</Text>
        <TextInput
          style={styles.input}
          keyboardType="phone-pad"
          onChangeText={(value) => handleChange('phoneNumber', value)}
          value={formData.phoneNumber}
        />
      </View>
      <Button title="Sign Up" onPress={handleSubmit} />
      <View style={styles.signInContainer}>
        <Text>Already have an account?</Text>
        <Button title="Sign In" onPress={() => navigation.navigate('SignIn')} />
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
  signInContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default SignUpScreen;
