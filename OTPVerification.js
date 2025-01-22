import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const OTPVerification = ({ route, navigation }) => {
  const { email, otp: originalOtp } = route.params;
  const [otp, setOtp] = useState('');

  const handleVerify = () => {
    if (otp === originalOtp.toString()) {
      Alert.alert('Success', 'OTP verified successfully');
      // Proceed to the next screen or complete the sign-up process
      navigation.navigate('Home'); // Replace with the actual next screen
    } else {
      Alert.alert('Error', 'Invalid OTP. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Verify OTP</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Enter OTP"
          placeholderTextColor="#003f5c"
          keyboardType="numeric"
          onChangeText={text => setOtp(text)}
          value={otp}
        />
      </View>
      <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
        <Text style={styles.verifyButtonText}>Verify OTP</Text>
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
  inputView: {
    width: '80%',
    backgroundColor: '#465881',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  inputText: {
    flex: 1,
    height: 50,
    color: 'white',
  },
  verifyButton: {
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OTPVerification;
