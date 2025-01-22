import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import SignUp from './SignUp';
import OTPVerification from './OTPVerification'; 
import MainScreen from './MainScreen'; 
import Profile from './Profile'; 
import Help from './Help'; 
import History from './History'; 


import About from './About'; 


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Help" component={Help} />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="History" component={History} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="OTPVerification" component={OTPVerification} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        {/* Other screens */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
