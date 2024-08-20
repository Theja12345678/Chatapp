import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { UserContext } from '../contexts/UserContext';
import { AntDesign } from '@expo/vector-icons';

const PersonalInfoScreen = () => {
  const { user } = useContext(UserContext);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [personalInfoOpen, setPersonalInfoOpen] = useState(false);

  const togglePersonalInfo = () => {
    setPersonalInfoOpen(!personalInfoOpen);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Personal Information</Text>
      
      <View style={styles.field}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Username:</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Enter your username"
        />
      </View>

      <TouchableOpacity style={styles.sectionHeader} onPress={togglePersonalInfo}>
        <Text style={styles.sectionTitle}>Personal Info</Text>
        <AntDesign name={personalInfoOpen ? 'up' : 'down'} size={24} color="black" />
      </TouchableOpacity>
      {personalInfoOpen && (
        <View style={styles.sectionContent}>
          <Text>Email: {user.email}</Text>
          <Text>Birthday: {user.birthday}</Text>
          <Text>Phone Number: {user.phoneNumber}</Text>
        </View>
      )}

      <TouchableOpacity style={styles.section}>
        <Text style={styles.sectionTitle}>Password & Security</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.section}>
        <Text style={styles.sectionTitle}>How AtmanWorks</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.section}>
        <Text style={styles.sectionTitle}>Support & Feedbacks</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.section}>
        <Text style={styles.sectionTitle}>Support Venma</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#e6e6e6',
    borderRadius: 5,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
  },
  sectionContent: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  section: {
    padding: 10,
    backgroundColor: '#e6e6e6',
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default PersonalInfoScreen;
