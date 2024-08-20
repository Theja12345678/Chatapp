import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import * as Contacts from 'expo-contacts';
import axios from 'axios';

const HomePageScreen = ({ navigation, route }) => {
  const [profileImage, setProfileImage] = useState('https://example.com/default-profile-image.png');
  const [connectedTime, setConnectedTime] = useState('');
  const friend = route.params?.friend || { name: 'John Doe', phoneNumber: '1234567890', profileImage: '' };
  const startTime = route.params?.startTime || new Date().toISOString();

  useEffect(() => {
    const calculateConnectedTime = () => {
      const now = new Date();
      const timeDiff = now - new Date(startTime);
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      setConnectedTime(`${days} days`);
    };

    calculateConnectedTime();
    setInterval(calculateConnectedTime, 60000); // Update every minute
  }, [startTime]);

  useEffect(() => {
    const fetchProfileImage = async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactByIdAsync(friend.id);
        if (data.imageAvailable) {
          setProfileImage(data.image.uri);
        }
      }
    };

    fetchProfileImage();
  }, [friend]);

  const callFriend = () => {
    if (friend.phoneNumber) {
      Linking.openURL(`tel:${friend.phoneNumber}`);
    }
  };

  const videoCallFriend = () => {
    if (friend.phoneNumber) {
      Linking.openURL(`tel:${friend.phoneNumber}`); // Adjust for video call
    }
  };

  const sendNotification = async () => {
    const token = await messaging().getToken();
    axios.post('http://your-server-url/send-notification', {
      token,
      message: 'You have a new notification!',
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.profileSection}>
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
          <Text style={styles.friendName}>{friend.name}</Text>
        </View>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Text style={styles.settingsText}>Settings</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.connectedTime}>{connectedTime}</Text>
      <Image source={{ uri: profileImage }} style={styles.centerImage} />
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={callFriend} style={styles.iconButton}>
          <Text>Call</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={videoCallFriend} style={styles.iconButton}>
          <Text>Video Call</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={sendNotification} style={styles.iconButton}>
          <Text>Pinch</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.messageButton}
        onPress={() => navigation.navigate('Chat', { friend })}
      >
        <Text style={styles.messageText}>Message</Text>
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
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileSection: {
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  friendName: {
    marginTop: 10,
    fontSize: 18,
  },
  settingsButton: {
    padding: 10,
  },
  settingsText: {
    fontSize: 16,
    color: '#007bff',
  },
  connectedTime: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
  },
  centerImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: 20,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  iconButton: {
    padding: 10,
    alignItems: 'center',
  },
  messageButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default HomePageScreen;
