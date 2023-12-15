import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import * as Progress from 'react-native-progress';

const window = Dimensions.get('window');

const DetailPokemonScreen = ({route}) => {
  const {id, name, image, stats, abilities, colors, height, weight} =
    route.params;

  const getFirstParagraph = text => {
    const paragraphs = text.split('\n\n'); // Split text into paragraphs
    return paragraphs[0]; // Return the first paragraph
  };

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
      <ScrollView>
        <View style={styles.wrapperPokemon}>
          <View style={styles.wrapperHeader}>
            <View style={styles.viewName}>
              <Text style={styles.viewTxtId}> #{id}</Text>
              <Text style={[styles.viewTxtName, {color: colors.index}]}>
                {name}
              </Text>
            </View>

            {/* button */}
            <View style={styles.elementContainer}>
              {abilities.map((ability, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    height: 25,
                    width: 80,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: 10,
                    marginTop: 25,
                    marginHorizontal: 10,
                    backgroundColor: colors[index],
                  }}>
                  <Text style={styles.txtElement}>{ability.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.wrapperSection}>
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
                      width={window.height * 0.18}
                    />
                  </View>
                ))}
              </View>
            </View>
            {/* end of section left */}

            <View style={styles.rightSection}>
              <Image source={{uri: image}} style={styles.pokemonImage} />
            </View>
          </View>
        </View>
        {/* End Of Secgtion 1  */}

        <View style={styles.wrapperBreeding}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 22,
              color: 'brown',
              fontWeight: 'bold',
            }}>
            Breeding
          </Text>
          <View>
            <View
              style={{
                height: window.height * 0.15,
                flexDirection: 'row',
                alignItems: 'center',
                // justifyContent: 'space-around',
              }}>
              <View style={styles.heightBreeding}>
                <Text style={styles.titleTxt}>Height</Text>
                <Text style={styles.txtBreeding}>{height}</Text>
              </View>
              <View style={styles.weightBreeding}>
                <Text style={styles.titleTxt}>Weight</Text>
                <Text style={styles.txtBreeding}>{weight}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Section 3 */}

        <View style={styles.wrapperAboutPokemon}>
          <View style={{height: '35%', width: '100%'}}>
            <Text style={styles.txtAboutPokemon}>About : {name}</Text>
            {abilities.map((ability, index) => (
              <View key={index}>
                {ability.effects.map((effect, idx) => (
                  <Text key={idx} style={styles.txtDescription}>
                    {getFirstParagraph(effect)}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderWidth: 1,
    margin: 20,
    // overflow: 'visible',
  },
  wrapperSection: {
    flexDirection: 'row',
    marginTop: 15,
    marginHorizontal: 10,
    maxHeight: window.height * 0.2,
    height: window.height * 0.2,
  },
  wrapperBreeding: {
    borderWidth: 1,
    width: '100%',
    borderColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
    marginVertical: 10,
    height: window.height * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperPokemon: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
    shadowOffset: {width: 10, height: 10},
    shadowRadius: 20,
    shadowColor: 'gray',
    shadowOpacity: 0.8,
    // elevation: 2,
    height: window.height * 0.4,
  },
  wrapperHeader: {
    flexDirection: 'row',
  },
  wrapperAboutPokemon: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
    shadowOffset: {width: 10, height: 10},
    shadowRadius: 20,
    shadowColor: 'gray',
    shadowOpacity: 0.8,
    height: window.height * 0.4,
    marginVertical: 10,
  },
  viewName: {
    // flexDirection: 'row',
    width: '35%',
    // justifyContent: 'space-between',
    marginVertical: 10,
  },
  leftSection: {
    flex: 1,
    // marginRight: 10,
  },
  txtBreeding: {
    color: 'brown',
    fontWeight: 'bold',
  },
  rightSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '70%',
    width: '60%',
  },
  statsContainer: {
    // marginTop: 10,
  },
  titleTxt: {
    color: 'gray',
  },
  statContainer: {
    alignItems: 'flex-start',
    width: '50%',
    marginBottom: 10,
  },
  statName: {
    marginRight: 10,
    alignSelf: 'flex-start',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  progressBar: {
    borderRadius: 5,
  },
  pokemonImage: {
    width: 220,
    height: 220,
    resizeMode: 'cover',
    // borderWidth: 1,
  },
  elementContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    // justifyContent: 'space-around',
    // borderWidth: 1,
    width: '65%',
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
  viewTxtName: {
    fontSize: 27,
    marginLeft: 10,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  viewTxtId: {
    color: 'gray',
    fontSize: 20,
    marginLeft: 10,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  heightBreeding: {
    height: 60,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    marginRight: 10,
    borderRadius: 15,
    borderColor: 'rgba(0, 0, 0, 0.2)',
  },
  weightBreeding: {
    height: 60,
    width: 120,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    borderColor: 'rgba(0, 0, 0, 0.2)',
  },
  txtDescription: {
    fontSize: 15,
    fontFamily: '',
    maxWidth: '100%',
    textAlign: 'justify',
    marginHorizontal: 10,
    color: 'maroon',
    textTransform: 'capitalize',
  },
  txtElement: {
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
  txtAboutPokemon: {
    fontSize: 20,
    color: 'maroon',
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 10,
    maxHeight: window.height * 0.9,
  },
});

export default DetailPokemonScreen;
