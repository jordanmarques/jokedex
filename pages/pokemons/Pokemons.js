import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import Pokemon from './Pokemon.js';
import Header from "../header/Header.js";

export default class Pokemons extends React.Component {

    static navigationOptions = {
        header: <Header/>,
    };

    state = {
        showList: false,
        pokemonsIds: this.generateIds()
    };

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.pokemonsIds}
                    renderItem={({item}) => <Pokemon id={item.key}/>}
                />
            </View>
        );
    }

    generateIds() {
        return Array.from(Array(151))
            .map((v, i) => {
                return {key: String(i + 1)}
            })
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    }
});