import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import { StackActions } from '@react-navigation/native';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://192.168.61.144:4000/login', { email, password });
    
            if (response.data.success) {
                navigation.dispatch(StackActions.replace('Main', { email })); // Pass email here
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Login error:", error.response ? error.response.data : error.message);
            alert('Error logging in: ' + (error.response ? error.response.data.message : error.message));
        }
    };
    

    const handleForgotPassword = () => {
        navigation.navigate('ForgotPassword');
    };

    const handleSignUp = () => {
        navigation.navigate('SignUp');
    };

    return (
        <View style={styles.container}>
            <Image source={require('./assets/autologo.png')} style={styles.logo} />
            <Text style={styles.appName}>Auto CaseX</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder="Email"
                    placeholderTextColor="#003f5c"
                    onChangeText={text => setEmail(text)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    secureTextEntry
                    style={styles.inputText}
                    placeholder="Password"
                    placeholderTextColor="#003f5c"
                    onChangeText={text => setPassword(text)}
                />
            </View>
            <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
                <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleForgotPassword}>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSignUp}>
                <Text style={styles.signUp}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2a2a2a',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    logo: {
        width: 150,
        height: 200,
        marginBottom: 20,
    },
    appName: {
        fontWeight: 'bold',
        fontSize: 30,
        color: '#f8f8ff',
        marginBottom: 40,
    },
    inputView: {
        width: '100%',
        backgroundColor: '#465881',
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    inputText: {
        height: 50,
        color: 'white',
    },
    loginBtn: {
        width: '100%',
        backgroundColor: '#00ff7f',
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    loginText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    forgotPassword: {
        color: 'white',
        marginTop: 10,
    },
    signUp: {
        color: '#f6b93b',
        marginTop: 20,
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default Login;
