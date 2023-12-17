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
          'https://pokeapi.co/api/v2/pokemon?limit=100',
        );
        const results = response.data.results;
        const pokemonData = await Promise.all(
          results.map(async pokemon => {
            const details = await axios.get(pokemon.url);
            const types = details.data.types.map(type => type.type.name);
            const typeColors = types.map(type => getTypeColor(type));
            const stats = details.data.stats.reduce((statsObj, stat) => {
              statsObj[stat.stat.name] = stat.base_stat;
              return statsObj;
            }, {});

            const abilities = await Promise.all(
              details.data.abilities.map(async ability => {
                const abilityDetails = await axios.get(ability.ability.url);
                const effectEntries = abilityDetails.data.effect_entries.map(
                  entry => entry.effect,
                );
                return {
                  name: ability.ability.name,
                  effects: effectEntries,
                };
              }),
            );

            return {
              id: details.data.id,
              name: details.data.name,
              image: details.data.sprites.front_default,
              abilities: abilities,
              colors: typeColors,
              height: details.data.height,
              weight: details.data.weight,
              // characteristic: characteristics.data.description,
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

  const handlePokemonClick = (
    id,
    name,
    image,
    stats,
    abilities,
    colors,
    height,
    weight,
  ) => {
    navigation.navigate('DetailPokemon', {
      id,
      name,
      image,
      stats,
      abilities,
      colors,
      height,
      weight,
    });
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
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                handlePokemonClick(
                  item.id,
                  item.name,
                  item.image,
                  item.stats,
                  item.abilities,
                  item.colors,
                  item.height,
                  item.weight,
                )
              }
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
    borderRadius: 20,
    borderColor: 'rgba(0, 0, 0, 0.1)',
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
