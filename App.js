import React from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View, Button, YellowBox } from 'react-native';
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
        {this.renderList()}
      </View>
    );
  }

  renderList() {
    return <FlatList
      data={this.state.pokemonsIds}
      renderItem={({item}) => <Pokemon id={item.key}></Pokemon>}
      />
  }

  generateIds() {
    const ids = Array.from(Array(13))
      .map((v, i) => { return { key: String(i + 1) } })
    return ids
  }
}



const styles = StyleSheet.create({
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
})