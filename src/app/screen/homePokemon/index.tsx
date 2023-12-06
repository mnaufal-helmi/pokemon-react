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
} from 'react-native';
import Swiper from 'react-native-swiper';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';

const HomePokemon = () => {
  const [pokemonDatas, setPokemonDatas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=10`,
        );
        const results = response.data.results;
        const pokemonDatas = await Promise.all(
          results.map(async pokemon => {
            const details = await axios.get(pokemon.url);
            return {
              id: details.data.id,
              name: details.data.name,
              image: details.data.sprites.front_default,
              abilities: details.data.abilities.map(
                ability => ability.ability.name,
              ),
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
        <View style={styles.slide}>
          <Image
            style={styles.slideImage}
            source={require('../../assets/png/image1.png')}
          />
        </View>
        <View style={styles.slide}>
          <Image
            style={styles.slideImage}
            source={require('../../assets/png/image2.png')}
          />
        </View>
        <View style={styles.slide}>
          <Image
            style={styles.slideImage}
            source={require('../../assets/png/image3.png')}
          />
        </View>
        {/* Add more slides as needed */}
      </Swiper>

      <View style={styles.cardTitle}>
        <Text style={styles.subCardTitle}>This is our pokemons</Text>
        <TouchableOpacity>
          <Text style={styles.btnTxt}> See All </Text>
        </TouchableOpacity>
      </View>

      <View style={{backgroundColor: 'rgba(0, 0, 0, 0.1)'}}>
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
                    <LinearGradient
                      colors={['white', 'cyan', 'white']}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        height: 30,
                        padding: 5,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                      }}>
                      <Text style={styles.txtItemName}>{item.name}</Text>
                      <Text style={styles.txtItemName}>#{item.id}</Text>
                    </LinearGradient>
                    <ImageBackground
                      source={{uri: item.image}}
                      resizeMode="contain"
                      style={{flex: 1}}></ImageBackground>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginHorizontal: 10,
                      marginVertical: 5,
                    }}>
                    {item.abilities.map((ability, index) => (
                      <TouchableOpacity key={index} style={styles.viewBtn}>
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
      <View style={{flex: 1}}></View>

      <View style={{flex: 1}}></View>
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
    height: 200,
    width: 150,
    borderWidth: 1,
    margin: 10,
    borderColor: 'cyan',
    borderRadius: 20,
  },
  borderImage: {
    flex: 1,
    // width: '100%',
    // backgroundColor: 'red',
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
  btnTxt: {
    color: 'black',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  txtItemName: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontWeight: 'bold',
    fontSize: 15,
    marginHorizontal: 5,
  },
  viewBtn: {
    height: 27,
    width: 57,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'cyan',
  },
  txtBtn: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default HomePokemon;
