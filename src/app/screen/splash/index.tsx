import {StyleSheet, Text, View} from 'react-native';

const Splash = () => {
  return (
    <View style={style.container}>
      <Text style={style.txt}>index</Text>
    </View>
  );
};

export default Splash;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  txt: {
    fontSize: 20,
    color: 'black',
  },
});
