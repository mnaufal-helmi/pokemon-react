import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Pokemon from './Pokemon';

const SearchPokemon = () => {
  return (
    <View style={{flex: 1}}>
      <View style={style.Header}>
        <View style={style.wrapper}>
          <View style={style.viewTxt}>
            <Text style={style.txt}>Who are you looking for? </Text>
          </View>
          <View style={style.logoHeader}></View>
        </View>
      </View>
      <Pokemon />
    </View>
  );
};

export default SearchPokemon;

const style = StyleSheet.create({
  Header: {
    height: 200,
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    flexDirection: 'row',
    marginHorizontal: 30,
  },
  imgBall: {
    height: 150,
    width: 150,
    position: 'absolute',
    left: 60,
    bottom: 30,
  },
  viewTxt: {
    height: 100,
    width: '65%',
    // borderWidth: 1,
  },
  txt: {
    color: 'gray',
    // fontWeight: 'bold',
    fontSize: 35,
    fontWeight: 'bold',
    fontStyle: 'italic',
    alignItems: 'center',
  },
  logoHeader: {
    // height: 100,
    width: '25%',
  },
});
