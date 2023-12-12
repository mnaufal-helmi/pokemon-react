import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from './app/screen/splash';
import HomePokemon from './app/screen/homePokemon';
import LoginScreen from './app/screen/loginScreen';
import SearchPokemon from './app/screen/searchPokemon';
import DetailPokemonScreen from './app/screen/detailPokemon';
// import SearchPokemon from './app/screen/searchPokemon';

const Stack = createNativeStackNavigator();

function AppNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HomePokemon"
        component={HomePokemon}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SearchPokemon"
        component={SearchPokemon}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="DetailPokemon"
        component={DetailPokemonScreen}
        options={{headerShown: true}}
      />
    </Stack.Navigator>
  );
}

export default AppNavigation;
