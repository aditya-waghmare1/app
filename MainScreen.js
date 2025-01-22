import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Alert, Linking, ScrollView, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import HamburgerMenu from './HamburgerMenu';

const MainScreen = ({ navigation, route }) => {
  const { email } = route.params; // Receive email from route params
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [dateTime, setDateTime] = useState(null);
  const [address, setAddress] = useState('');
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isImageClicked, setIsImageClicked] = useState(false);

  useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
      const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();

      if (cameraStatus !== 'granted' || locationStatus !== 'granted') {
        Alert.alert('Error', 'Camera and location permissions are required');
      }
    })();
  }, []);

  const fetchImageDescription = async (uri) => {
    const formData = new FormData();
    formData.append('image', {
      uri,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });

    try {
      const response = await fetch("http://192.168.61.144:3000/describe", {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      const description = result.description || 'No description available.';
      const currentDateTime = new Date().toLocaleString();

      // Update the prompt with additional information
      const promptText = `
        My name is ${email} and today 
        DateTime: ${currentDateTime}
        Address: ${address}
        Location: ${latitude}, ${longitude}
        Description: ${description}
      `;

      setPrompt(promptText);
    } catch (error) {
      console.error('Error fetching image description:', error);
      Alert.alert('Error', 'Failed to get image description');
    }
  };

  const handleCameraLaunch = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const uri = result.assets[0].uri;
        const { latitude, longitude } = location.coords;
        const currentDateTime = new Date();

        setLatitude(latitude);
        setLongitude(longitude);
        setDateTime(currentDateTime);

        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
          .then(response => response.json())
          .then(data => {
            setAddress(data.display_name);
          })
          .catch(error => {
            console.error('Error fetching address:', error);
          });

        setPhoto(uri);
        setIsImageClicked(true);

        fetchImageDescription(uri);
      } else {
        console.log('User cancelled image picker');
      }
    } catch (error) {
      console.error('Error taking photo:', error);
    }
  };

  const openMaps = () => {
    if (latitude !== null && longitude !== null && dateTime !== null) {
      const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
      Linking.openURL(url);
    } else {
      Alert.alert('Error', 'Location data not available');
    }
  };

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const generateContent = async () => {
    try {
      const response = await fetch("https://hir-puce.vercel.app/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt })
      });
      const result = await response.json();
      setOutput(result.text);  // Update output with generated content
    } catch (error) {
      console.error('Error generating content:', error);
    }
  };
  const submitContent = async () => {
    try {
        const response = await fetch("http://192.168.103.144:4000/submit", {  // Use the correct server URL
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, output })  // Include email and output
        });
        const result = await response.json();
        if (result.success) {
            Alert.alert('Success', 'Content submitted successfully');
        } else {
            Alert.alert('Error', 'Failed to submit content');
        }
    } catch (error) {
        console.error('Error submitting content:', error);
        Alert.alert('Error', 'Error submitting content');
    }
};


 

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
        <Text style={styles.menuButtonText}>☰</Text>
      </TouchableOpacity>
      
      {isMenuVisible && <HamburgerMenu toggleMenu={toggleMenu} navigation={navigation} />}
      
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.emailText}>Email: {email}</Text>

        {photo && (
          <View style={styles.photoContainer}>
            <Text style={styles.photoLabel}>Photo:</Text>
            <Image source={{ uri: photo }} style={styles.photo} />
            {latitude !== null && longitude !== null && dateTime !== null && (
              <View style={styles.locationAndButtonContainer}>
                <View style={styles.locationContainer}>
                  <Text style={styles.locationText}>DateTime: {dateTime.toLocaleString()}</Text>
                  <Text style={styles.locationText}>Address: {address}</Text>
                </View>
                <View style={styles.mapsButtonContainer}>
                  <TouchableOpacity onPress={openMaps} style={styles.mapsButton}>
                    <Image source={require('./assets/map.png')} style={styles.mapIcon} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        )}
        {!isImageClicked && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleCameraLaunch} style={styles.buttonContainer}>
              <Image source={require('./assets/camera.gif')} style={styles.gifButton} />
            </TouchableOpacity>
          </View>
        )}
        <Button
          title="Generate"
          onPress={generateContent}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Description is here Automatically(Auto Case X)"
          value={prompt}  // Display description from image or user input
          onChangeText={setPrompt}
        />
        {output && (
          <Text style={styles.output}>
            {output}  // Display result from generate button click
          </Text>
        )}
        <Button
          title="Submit"
          onPress={submitContent}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
   
    backgroundColor: '#ddd',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    width: '100%',
    marginTop:20,
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    backgroundColor: '#ddd',
    backgroundColor: '#F9FAFB',
    borderRadius: 18,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  photoContainer: {
    alignItems: 'center',
    marginTop: 40,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom:20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  photoLabel: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
  },
  photo: {
    width: 330,
    height: 250,
    borderRadius: 10,
    marginVertical: 10,
  },
  locationAndButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
  },
  locationContainer: {
    flex: 1,
  },
  locationText: {
    fontSize: 12,
    marginVertical: 2,
  },
  mapsButtonContainer: {
    marginLeft: 10,
  },
  mapsButton: {
    padding: 10,
  },
  mapIcon: {
    width: 60,
    height: 60,
  },
  output: {
    marginTop: 20,
    fontSize: 16,
  },
  menuButton: {
    padding: 0,
    position: 'absolute',
    
    top: 0,
    left: 20,
    zIndex: 10,
  },
  menuButtonText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom:20
  },
  gifButton: {
    width: 100,
    height: 100,
  }
});

export default MainScreen;
