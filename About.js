import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const About = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>About Us</Text>
      <Text style={styles.text}>
        Welcome to our application! We are dedicated to providing the best service and 
        experience for our users. Our app is designed to make your life easier and more 
        organized.
      </Text>
      <Text style={styles.text}>
        **Mission:** Our mission is to simplify and enhance the way you manage your tasks 
        and activities. We strive to offer intuitive solutions that meet your needs.
      </Text>
      <Text style={styles.text}>
        **Vision:** We aim to be the leading provider of innovative solutions that 
        revolutionize the way you interact with technology.
      </Text>
      <Text style={styles.text}>
        **Contact Information:** For more information, visit our website or contact us 
        via email.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    lineHeight: 24,
  },
});

export default About;
