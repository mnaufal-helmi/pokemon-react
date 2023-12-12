import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import * as Progress from 'react-native-progress';

const window = Dimensions.get('window');

const DetailPokemonScreen = ({route}) => {
  const {id, name, image, stats, abilities} = route.params;

  const statsData = [
    {
      name: 'HP',
      value: stats.hp / 100,
      color: '#4CAF50',
      unfilledColor: '#CEDEBD',
    },
    {
      name: 'Attack',
      value: stats.attack / 100,
      color: '#FF1E00',
      unfilledColor: '#FF9A8C',
    },
    {
      name: 'Defense',
      value: stats.defense / 100,
      color: '#FFA33C',
      unfilledColor: '#FFCF96',
    },
    {
      name: 'Speed',
      value: stats.speed / 100,
      color: '#64C9CF',
      unfilledColor: '#B0DEFF',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.viewName}>
        <Text>{name}</Text>
        <Text> #{id}</Text>
      </View>
      <View style={{borderWidth: 1}}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View style={styles.rightSection}>
            <Image source={{uri: image}} style={styles.pokemonImage} />
          </View>
          {/* end of section right */}
          <View style={styles.leftSection}>
            <View style={styles.statsContainer}>
              {statsData.map((stat, index) => (
                <View key={index} style={styles.statContainer}>
                  <Text style={styles.statName}>{stat.name}:</Text>
                  <Progress.Bar
                    progress={stat.value}
                    color={stat.color}
                    unfilledColor={stat.unfilledColor}
                    style={styles.progressBar}
                    width={window.height * 0.22}
                  />
                </View>
              ))}
            </View>

            {/* end of section left */}
          </View>
        </View>

        <View style={styles.elementContainer}>
          {abilities.map((ability, index) => (
            <TouchableOpacity key={index} style={styles.btnElement}>
              <Text>
                {/* {ability.ability && ability.ability.name
                  ? ability.ability.name
                  : 'Unknown'} */}
                {ability}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderWidth: 1,
    margin: 20,
  },
  viewName: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  leftSection: {
    flex: 1,
    marginRight: 10,
  },
  rightSection: {
    flex: 1,
    // marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
  },
  statsContainer: {
    marginTop: 10,
  },
  statContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  statName: {
    marginRight: 10,
    alignSelf: 'flex-start',
    marginBottom: 1,
  },
  progressBar: {
    borderRadius: 5,
  },
  pokemonImage: {
    width: 160,
    height: 160,
    resizeMode: 'cover',
  },
  elementContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    // borderWidth: 1,
    width: window.width * 0.9,
  },
  btnElement: {
    height: 40,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 30,
    marginBottom: 10,
    // marginHorizontal: 10,
  },
  abilitiesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  ability: {
    fontSize: 16,
    marginTop: 5,
  },
  detailsContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    margin: 10,
  },
});

export default DetailPokemonScreen;
