import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated } from 'react-native';

const HamburgerMenu = ({ navigation, toggleMenu }) => {
  return (
    <Animated.View style={styles.menuContainer}>
      <TouchableOpacity onPress={toggleMenu} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>×</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.menuItemsContainer}>
        <TouchableOpacity 
          style={styles.menuItemContainer} 
          onPress={() => { toggleMenu(); navigation.navigate('MainScreen'); }}
        >
          <Text style={styles.menuItem}>New Case</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.menuItemContainer} 
          onPress={() => { toggleMenu(); navigation.navigate('Profile'); }}
        >
          <Text style={styles.menuItem}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity 
  style={styles.menuItemContainer} 
  onPress={() => { 
    toggleMenu(); 
    navigation.navigate('History', { email: 'example@example.com' }); // Adjust email as needed
  }}
>
  <Text style={styles.menuItem}>History</Text>
</TouchableOpacity>
        <TouchableOpacity 
          style={styles.menuItemContainer} 
          onPress={() => { toggleMenu(); navigation.navigate('About'); }}
        >
          <Text style={styles.menuItem}>About</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.menuItemContainer} 
          onPress={() => { toggleMenu(); navigation.navigate('Help'); }}
        >
          <Text style={styles.menuItem}>Help</Text>
        </TouchableOpacity>
        {/* Add more menu items as needed */}
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '80%',
    height: '100%',
    backgroundColor: '#ddd',
    padding: 20,
    zIndex: 10,
    elevation: 10,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 11,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  closeButtonText: {
    color: 'black',
    fontSize: 50,
    fontWeight: 'bold',
  },
  menuItemsContainer: {
    paddingVertical: 20,
  },
  menuItemContainer: {
    marginVertical: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  menuItem: {
    fontSize: 20,
    padding: 15,
    backgroundColor: 'white',
    color: 'black',
    textAlign: 'center',
    fontWeight: '500',
    borderRadius: 0,
  },
  menuItemText: {
    color: '#6c757d',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default HamburgerMenu;
