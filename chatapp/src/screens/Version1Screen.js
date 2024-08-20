import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Linking, Modal } from 'react-native';
import * as Contacts from 'expo-contacts';
import Communications from 'react-native-communications';
import { useNavigation } from '@react-navigation/native';

const Version1Screen = () => {
  const [contacts, setContacts] = useState([]);
  const [pendingInvites, setPendingInvites] = useState([]);
  const [addedFriends, setAddedFriends] = useState([]);
  const [permission, setPermission] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      setPermission(status);
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
          setContacts(data);
        }
      } else {
        Alert.alert('Permission to access contacts was denied');
      }
    })();
  }, []);

  const inviteContact = (contact, method) => {
    setPendingInvites((prev) => [...prev, contact]);
    const message = `Hi ${contact.name}, I would like to invite you to join our app!`;

    switch (method) {
      case 'WhatsApp':
        const whatsAppURL = `whatsapp://send?text=${encodeURIComponent(message)}`;
        Linking.openURL(whatsAppURL).catch(() => {
          Alert.alert('WhatsApp not installed');
        });
        break;
      case 'SMS':
        if (contact.phoneNumbers && contact.phoneNumbers.length > 0) {
          const phoneNumber = contact.phoneNumbers[0].number;
          Communications.text(phoneNumber, message);
        }
        break;
      case 'Email':
        Communications.email([contact.emailAddresses ? contact.emailAddresses[0].email : ''], null, null, 'Invitation', message);
        break;
      default:
        Alert.alert(`Invite sent to ${contact.name}`);
    }

    setModalVisible(false);

    // Simulate accepting invite after a delay (for demonstration purposes)
    setTimeout(() => {
      setAddedFriends((prev) => [...prev, contact]);
      setPendingInvites((prev) => prev.filter((c) => c.id !== contact.id));
    }, 5000); // Change this to the appropriate delay or wait for real confirmation
  };

  const openInviteOptions = (contact) => {
    setSelectedContact(contact);
    setModalVisible(true);
  };

  const navigateToHomepage = (friend) => {
    const profileImage = "https://yourprofileimageurl.com/profile.jpg"; // Replace with the current user's profile image URL
    const chatStartTime = new Date(); // Replace with the actual start time of the chat
    navigation.navigate('Homepage', { friend, profileImage, chatStartTime });
  };

  const renderContactItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigateToHomepage(item)} style={styles.contactItem}>
      <Text style={styles.contactName}>{item.name}</Text>
      {item.phoneNumbers && item.phoneNumbers.map((phone, index) => (
        <View key={index} style={styles.phoneNumberContainer}>
          <Text style={styles.phoneNumber}>{phone.number}</Text>
          <TouchableOpacity
            style={styles.inviteButton}
            onPress={() => openInviteOptions(item)}
          >
            <Text style={styles.inviteButtonText}>Invite</Text>
          </TouchableOpacity>
        </View>
      ))}
    </TouchableOpacity>
  );

  const renderAddedFriendItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigateToHomepage(item)} style={styles.addedFriendItem}>
      <Text style={styles.addedFriendName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select friend for Version1</Text>
      <View style={styles.addedFriendsContainer}>
        <Text style={styles.subHeader}>Added Friends</Text>
        <FlatList
          data={addedFriends}
          keyExtractor={(item) => item.id}
          renderItem={renderAddedFriendItem}
          horizontal
        />
      </View>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={renderContactItem}
      />
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Invite {selectedContact?.name}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => inviteContact(selectedContact, 'WhatsApp')}
            >
              <Text style={styles.modalButtonText}>WhatsApp</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => inviteContact(selectedContact, 'SMS')}
            >
              <Text style={styles.modalButtonText}>SMS</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => inviteContact(selectedContact, 'Email')}
            >
              <Text style={styles.modalButtonText}>Email</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  subHeader: {
    fontSize: 20,
    marginBottom: 10,
  },
  addedFriendsContainer: {
    marginBottom: 20,
  },
  addedFriendItem: {
    marginRight: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  addedFriendName: {
    fontSize: 18,
  },
  contactItem: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  contactName: {
    fontSize: 18,
    marginBottom: 10,
  },
  phoneNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  phoneNumber: {
    fontSize: 16,
  },
  inviteButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    marginLeft: 5,
  },
  inviteButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  modalButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalCloseButton: {
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
    backgroundColor: '#aaa',
  },
  modalCloseButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Version1Screen;
