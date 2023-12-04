import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import Video from 'react-native-video';
import {useNavigation} from '@react-navigation/native';

const WelcomeScreen = () => {
  const navigation = useNavigation();

  const goToLogin = () => {
    navigation.navigate('LoginScreen'); // Replace 'LoginScreen' with your login screen name
  };

  return (
    <View style={styles.container}>
      <Video
        source={require('../../assets/video/pokemon.mp4')} // Replace with your video file path
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
        repeat={true}
      />
      <View style={styles.overlay}>
        {/* Your content over the video */}
        <Text style={styles.title}>Welcome PokemonXYZ</Text>
        <TouchableOpacity style={styles.button} onPress={goToLogin}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust overlay opacity as needed
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'gray',
    marginBottom: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
});

export default WelcomeScreen;
