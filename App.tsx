import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigation from './src/AppNavigation';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide(); // Hide the splash screen on app load
    }, 100);
  }, []);

  return (
    <NavigationContainer>
      <AppNavigation />
    </NavigationContainer>
  );
};
export default App;
