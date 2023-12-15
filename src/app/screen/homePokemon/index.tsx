import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from 'react-native';

const window = Dimensions.get('window');

import Swiper from 'react-native-swiper';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const images = [
  require('../../assets/jpg/background.jpg'),
  require('../../assets/jpg/background1.jpg'),
  require('../../assets/jpg/background2.jpg'),
  require('../../assets/jpg/background3.jpg'),
  require('../../assets/jpg/background4.jpg'),
];

const HomePokemon = () => {
  const [pokemonDatas, setPokemonDatas] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  const getTypeColor = type => {
    switch (type) {
      case 'fire':
        return '#FF8C00'; // Orange
      case 'water':
        return '#6495ED'; // Blue
      case 'grass':
        return '#32CD32'; // Green
      case 'poison':
        return '#D78BFF'; // Purple
      case 'rock':
        return '#3C2317'; // brown
      case 'ice':
        return '#B8E7E1'; // aqua
      case 'flying':
        return '#B4CDE6'; // aqua --
      case 'water':
        return '#2A769A'; // blue
      case 'electric':
        return '#F7CA44'; // yellow

      // Add more cases for other types if needed
      default:
        return '#808080'; // Default gray color
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=20`,
        );
        const results = response.data.results;
        const pokemonDatas = await Promise.all(
          results.map(async pokemon => {
            const details = await axios.get(pokemon.url);
            const types = details.data.types.map(type => type.type.name);
            const typeColors = types.map(type => getTypeColor(type));
            const speciesResponse = await axios.get(details.data.species.url);
            const habitat = speciesResponse.data.habitat.name; // Fetch habitat name

            return {
              id: details.data.id,
              name: details.data.name,
              image: details.data.sprites.front_default,
              abilities: details.data.abilities.map(
                ability => ability.ability.name,
              ),
              colors: typeColors,
              habitat: habitat,
            };
          }),
        );
        setPokemonDatas(pokemonDatas);

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header with image slider */}
      <Swiper autoplay={true} style={styles.sliderContainer}>
        {images.map((imagePath, index) => (
          <View style={styles.slide} key={index}>
            <Image style={styles.slideImage} source={imagePath} />
          </View>
        ))}
        {/* Add more slides as needed */}
      </Swiper>

      <View style={styles.cardTitle}>
        <Text style={styles.subCardTitle}>This is our pokemons</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SearchPokemon');
          }}
          style={styles.searchBtn}>
          <Text style={styles.btnTxt}> See All </Text>
        </TouchableOpacity>
      </View>

      <View style={{backgroundColor: 'rgba(0, 0, 0, 0.05)'}}>
        {loading ? (
          <ActivityIndicator size={'large'} color={'cyan'} />
        ) : (
          <FlatList
            data={pokemonDatas}
            horizontal={true}
            renderItem={({item}) => {
              return (
                <TouchableOpacity style={styles.card}>
                  <View style={styles.borderImage}>
                    <View style={styles.linearGradient}>
                      <Text style={styles.txtItemName}>{item.name}</Text>
                      <Text style={styles.txtItemName}>#{item.id}</Text>
                    </View>
                    <ImageBackground
                      source={{uri: item.image}}
                      resizeMode="contain"
                      style={{flex: 1}}></ImageBackground>
                  </View>
                  <View style={styles.btnView}>
                    {item.abilities.map((ability, index) => (
                      <TouchableOpacity
                        key={index}
                        style={{
                          height: window.height * 0.028,
                          width: window.width * 0.3,
                          borderRadius: 10,
                          borderColor: 'rgba(0, 0, 0, 0.1)',
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginBottom: 5,
                          borderWidth: 1,
                          backgroundColor: item.colors[index],
                        }}>
                        <Text style={styles.txtBtn}>{ability}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>

      <View style={styles.containerHabit}>
        <View style={styles.headerHabit}>
          <Text style={styles.txtHeader}>World Of Pokemon Habit</Text>
        </View>
        <ScrollView>
          <View style={styles.wrapper}>
            {pokemonDatas.map(item => (
              <View key={item.id} style={styles.habitContainer}>
                <TouchableOpacity style={styles.btnHabitat}>
                  <Text style={styles.txtBtnHabitat}>
                    {item.name} = {item.habitat}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sliderContainer: {
    height: 200,
  },
  slide: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  card: {
    height: window.height * 0.3,
    width: window.width * 0.5,
    borderWidth: 1,
    margin: 10,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 20,
    backgroundColor: 'white',
  },
  borderImage: {
    flex: 1,
  },
  cardTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  subCardTitle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 17,
  },
  linearGradient: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  searchBtn: {
    backgroundColor: 'rgba(0, 0, 0, 0.09)',
    height: 25,
    width: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    color: 'black',
    // fontWeight: 'bold',
  },
  btnView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginHorizontal: 5,
    marginVertical: 5,
  },
  txtItemName: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontWeight: 'bold',
    fontSize: 15,
    marginHorizontal: 5,
  },
  txtBtn: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: 13,
    fontWeight: 'bold',
  },
  containerHabit: {
    flex: 1,
    // marginVertical: 10,
    margin: 10,
  },
  wrapper: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    height: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    // height: window.height * 1,
    // width: window.width * 1,
  },
  headerHabit: {
    // backgroundColor: 'rgba(0, 0, 0, 0.2)',
    // height: 100,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  txtHeader: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  habitContainer: {
    // borderWidth: 1,
    // flexDirection: 'row',
    // flexWrap: 'nowrap',
    margin: 10,
  },
  btnHabitat: {
    height: 60,
    width: 130,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    backgroundColor: 'white',
  },
  txtBtnHabitat: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default HomePokemon;
