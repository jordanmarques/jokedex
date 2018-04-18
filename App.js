import React from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View, Button, YellowBox, Image } from 'react-native';
import Pokemon from './Pokemon.js';
import uuidv1 from 'uuid/v1';

//should be removed after react fix
YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
]);

export default class App extends React.Component {

  state = {
    showList: false,
    pokemonsIds: this.generateIds()
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <View style={styles.alignVertically}>
            <Image style={styles.pokeball} source={require('./assets/images/pokeball.png')}/>
            <Text style={styles.title}>Jokedex</Text>
          </View>
        </View>

        <FlatList
          data={this.state.pokemonsIds}
          renderItem={({item}) => <Pokemon id={item.key}></Pokemon>}
          />
      </View>
    );
  }

  generateIds() {
    const ids = Array.from(Array(13))
      .map((v, i) => { return { key: String(i + 1) } })
    return ids
  }
}



const styles = StyleSheet.create({
  alignVertically: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#f72a2a',
  },
  container: {
    flex: 1,
    paddingTop: 22
  },
  item: {
    alignItems: 'center',
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  title: {
    margin: 10,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  },
  pokeball: {
    height: 30,
    width: 30
  }
})