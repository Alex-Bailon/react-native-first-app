import React from 'react';
import { ImageBackground, StyleSheet, View, Image, Text, Button, TouchableOpacity } from 'react-native';

function WelcomeScreen(props) {
  return (
    <View
      style={styles.background}
    >
      <View style={styles.logoContainer}>
        <Image source={require('../assets/icon.png')} style={styles.logo} />
        <Text style={styles.taglineText}>My First Expo App</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => console.log('Login')}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => console.log('Register')}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  logoContainer: {
    position: 'absolute',
    top: 70,
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  },  
  tagline: {
    paddingTop: 20,
  },
  taglineText: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
    paddingTop: 10,
  },
  buttonContainer: {
    padding: 20,
    width: '100%',
  },
  button: {
    backgroundColor: '#fc5c65',
    color: 'white',
    width: '100%',
    height: 70,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
})

export default WelcomeScreen;
