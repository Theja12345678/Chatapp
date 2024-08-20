import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

const SettingsScreen = () => {
  const [selectedVersion, setSelectedVersion] = useState(null);
  const navigation = useNavigation();

  const handleVersionChange = (version) => {
    setSelectedVersion(version);
    if (version === 'version1') {
      navigation.navigate('Version1'); 
    } else {
      Alert.alert('Coming Soon');
    }
  };

  const handleSettingsIconClick = () => {
    navigation.navigate('PersonalInfo');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerLeft} onPress={() => navigation.navigate('SignUp')}>
          <FontAwesome name="arrow-left" style={styles.headerIcon} />
          <Text style={styles.headerTitle}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerRight} onPress={handleSettingsIconClick}>
          <FontAwesome name="cog" style={styles.headerIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.versionChangeHeader}>Version Change</Text>
        <View style={styles.versionList}>
          {[1, 2, 3, 4, 5].map((version) => (
            <View key={`version${version}`} style={styles.versionItem}>
              <TouchableOpacity
                style={[
                  styles.versionContent,
                  selectedVersion === `version${version}` && styles.active,
                ]}
                onPress={() => handleVersionChange(`version${version}`)}
              >
                <Text style={styles.versionLabel}>Version {version}</Text>
                <View style={styles.checkbox}>
                  {selectedVersion === `version${version}` && (
                    <FontAwesome name="check" style={styles.checkboxIcon} />
                  )}
                </View>
              </TouchableOpacity>
              <Text style={styles.versionText}>
                {version === 1 ? 'ONE' : 'Coming Soon'}
              </Text>
              <View style={styles.versionDivider} />
            </View>
          ))}
        </View>
      </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    marginLeft: 10,
    fontSize: 24,
    color: 'rgb(27, 44, 237)',
  },
  headerRight: {},
  headerIcon: {
    fontSize: 24,
    color: 'rgb(27, 44, 237)',
  },
  content: {
    flex: 1,
  },
  versionChangeHeader: {
    fontSize: 20,
    color: 'rgb(27, 44, 237)',
    backgroundColor: '#b1adadea',
    padding: 10,
    borderRadius: 5,
  },
  versionList: {
    marginTop: 20,
  },
  versionItem: {
    marginBottom: 10,
  },
  versionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 30,
  },
  active: {
    borderColor: 'blue',
    backgroundColor: '#e0f7ff',
  },
  versionLabel: {
    fontSize: 18,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxIcon: {
    fontSize: 14,
    color: 'blue',
  },
  versionText: {
    fontSize: 14,
    marginLeft: 20,
    color: '#555',
  },
  versionDivider: {
    borderBottomWidth: 1,
    borderBottomColor: 'blue',
    marginTop: 5,
  },
});

export default SettingsScreen;
