import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const ForgotPassword = ({ navigation }) => {
  const [mobileNumber, setMobileNumber] = useState('');

  const handleSubmit = () => {
    if (mobileNumber.length !== 10) {
      Alert.alert('Error', 'Mobile number must be 10 digits');
      return;
    }

    // Navigate to OTP verification screen and pass the mobile number as parameter
    navigation.navigate('OTPVerification', { mobileNumber });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Forgot Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Mobile Number"
        keyboardType="numeric"
        value={mobileNumber}
        onChangeText={text => setMobileNumber(text)}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fb5b5a',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    backgroundColor: '#465881',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    paddingHorizontal: 20,
    color: 'white',
  },
  submitButton: {
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ForgotPassword;
