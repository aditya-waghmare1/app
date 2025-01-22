import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const Help = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Help & Support</Text>
      <Text style={styles.text}>
        If you need assistance or have any questions, please contact our support team. 
        You can reach out to us through the following methods:
      </Text>
      <Text style={styles.text}>
        1. **Email Support:** support@example.com
      </Text>
      <Text style={styles.text}>
        2. **Phone Support:** +1 (123) 456-7890
      </Text>
      <Text style={styles.text}>
        3. **Live Chat:** Available on our website during business hours.
      </Text>
      <Text style={styles.text}>
        For common issues and FAQs, please visit our website's help center.
      </Text>
    </ScrollView>
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
    fontWeight: 'bold',
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    lineHeight: 24,
  },
});

export default Help;
