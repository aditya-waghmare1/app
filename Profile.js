import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';

const Profile = ({ navigation }) => {
  // Sample profile data
  const userProfile = {
    name: 'Aditya Waghmare',
    email: 'aditya@example.com',
    bio: 'Android and Web Developer | Tech Enthusiast',
    profilePicture: 'https://via.placeholder.com/150' // Replace with actual image URL
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: userProfile.profilePicture }} style={styles.profilePicture} />
      <Text style={styles.name}>{userProfile.name}</Text>
      <Text style={styles.email}>{userProfile.email}</Text>
      <Text style={styles.bio}>{userProfile.bio}</Text>
      <Button title="Edit Profile" onPress={() => navigation.navigate('EditProfile')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0'
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  email: {
    fontSize: 18,
    color: '#555',
    marginBottom: 10
  },
  bio: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20
  }
});

export default Profile;
