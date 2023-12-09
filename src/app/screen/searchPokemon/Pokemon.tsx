import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  FlatList,
  TextInput,
} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const Pokemon = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [filteredPokemonData, setFilteredPokemonData] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://pokeapi.co/api/v2/pokemon?limit=100',
        );
        const results = response.data.results;
        const pokemonData = await Promise.all(
          results.map(async pokemon => {
            const details = await axios.get(pokemon.url);
            const stats = details.data.stats.reduce((statsObj, stat) => {
              statsObj[stat.stat.name] = stat.base_stat;
              return statsObj;
            }, {});

            return {
              id: details.data.id,
              name: details.data.name,
              image: details.data.sprites.front_default,
              abilities: details.data.abilities.map(
                ability => ability.ability.name,
                ability => ability.ability.effect,
              ),
              characteristic: characteristics.data.description,
              stats: {
                hp: stats.hp,
                speed: stats.speed,
                attack: stats.attack,
                defense: stats.defense,
              },
            };
          }),
        );

        setPokemonData(pokemonData);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to filter the Pokemon list based on the search text
  const filterPokemon = text => {
    setSearchText(text);
    const filteredPokemon = pokemonData.filter(pokemon =>
      pokemon.name.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredPokemonData(filteredPokemon);
  };

  const displayedPokemonData = searchText ? filteredPokemonData : pokemonData;

  const handlePokemonClick = (id, name, image) => {
    navigation.navigate('DetailPokemon', {id, name, image});
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search Your Pokemon"
        onChangeText={filterPokemon}
        value={searchText}
      />
      {loading ? (
        <ActivityIndicator size={'large'} color={'gray'} />
      ) : (
        <FlatList
          data={displayedPokemonData}
          numColumns={2}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => handlePokemonClick(item.id, item.name, item.image)}
              style={styles.card}>
              <View style={styles.borderImage}>
                <View style={styles.wrapperTxt}>
                  <Text style={styles.txtItem}>{item.name}</Text>
                  <Text style={styles.txtItem}>#{item.id}</Text>
                </View>
                <ImageBackground
                  source={{uri: item.image}}
                  resizeMode="cover"
                  style={{flex: 1}}></ImageBackground>
              </View>
              <View>
                <Text></Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

export default Pokemon;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    width: '90%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  card: {
    height: 250,
    width: 150,
    borderWidth: 1,
    margin: 10,
    padding: 10,
    overflow: 'hidden', // Ensure the borderRadius is applied correctly
    elevation: 4, // Add elevation for shadow (Android)
    shadowColor: '#000', // Add shadow properties (iOS)
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: '#fff',
  },
  borderImage: {
    flex: 1,
    width: '100%',
    overflow: 'hidden',
  },
  wrapperTxt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 30,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  txtItem: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
