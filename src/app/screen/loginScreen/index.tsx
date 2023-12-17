import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: 'YOUR_WEB_CLIENT_ID_FROM_GOOGLE_CONSOLE',
});

const window = Dimensions.get('window');
const LoginScreen = () => {
  const handleGoogleLogin = async () => {
    try {
      // Implement Google login logic here
    } catch (error) {
      console.error('Google login error:', error);
    }
  };

  const onPhoneNumberButtonPress = () => {
    // Implement phone number authentication flow using Firebase
  };

  const navigation = useNavigation();

  return (
    <ParallaxScrollView
      style={{flex: 1}}
      backgroundColor="#fff"
      contentBackgroundColor="#fff"
      parallaxHeaderHeight={250}
      renderForeground={() => (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Image
            source={require('../../assets/png/login.png')}
            style={styles.headerImage}
          />
          <Text style={styles.headerText}>Login Account</Text>
        </View>
      )}>
      <View style={styles.loginContainer}>
        {/* Your existing UI */}
        <TextInput style={styles.input} placeholder="Username" />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
            navigation.navigate('Home');
          }}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        {/* Google Sign-In Button */}
        <View style={styles.wrapperButton}>
          <GoogleSigninButton
            style={styles.googleButton}
            onPress={handleGoogleLogin}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Light}
          />

          <TouchableOpacity
            style={styles.phoneNumberButton}
            onPress={onPhoneNumberButtonPress}>
            <Text style={styles.phoneNumberButtonText}>
              Login with Phone Numbers
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  headerImage: {
    width: '100%',
    height: 190,
    resizeMode: 'cover',
  },
  headerText: {
    fontSize: 35,
    fontWeight: 'bold',
    marginTop: 20,
    color: 'gray',
  },
  loginContainer: {
    padding: 20,
    // backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  loginButton: {
    backgroundColor: '#921224',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  wrapperButton: {
    flexDirection: 'row',
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleButton: {
    width: window.width * 0.45,
    height: window.height * 0.08,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  phoneNumberButton: {
    width: window.width * 0.45,
    height: window.height * 0.075,
    borderWidth: 1,
    borderBottomWidth: 2,
    borderRadius: 5,
    borderBottomColor: 'gray',
    justifyContent: 'center',
    borderColor: 'rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
    elevation: 4,
  },
  phoneNumberButtonText: {
    color: 'gray',
    textAlign: 'center',
    alignSelf: 'center',
    fontWeight: 'bold',
    maxWidth: 100,
    fontFamily: 'sans-serif',
  },
});

export default LoginScreen;
