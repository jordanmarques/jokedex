import React from 'react';
import {FlatList, StyleSheet, TextInput, TouchableHighlight, View} from 'react-native';
import {Icon} from 'react-native-elements'
import Pokemon from './Pokemon.js';
import PokemonService from "./PokemonService";

export default class PokemonsPage extends React.Component {

    static get NUMBER_OF_POKEMONS_IN_DEFAULT_LIST() {
        return 9
    }

    constructor(props) {
        super(props);

        this.pokemonService = new PokemonService();
        this.state = {
            list: this.pokemonService.until(PokemonsPage.NUMBER_OF_POKEMONS_IN_DEFAULT_LIST),
            showButton: true
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.searchSection}>
                    <Icon style={styles.searchIcon} name='search'/>
                    <TextInput
                        style={styles.searchInput}
                        onChangeText={(text) => this.search(text)}
                    />
                </View>
                {this.renderList()}
            </View>
        );
    }

    renderList() {
        if (this.state.list.length > 0) {
            return (
                <FlatList
                    data={this.state.list}
                    renderItem={({item}) => {
                        return (
                            <TouchableHighlight  onPress={() => {this.props.navigation.navigate('Detail', item)}}>
                                <Pokemon pokemon={item}/>
                            </TouchableHighlight>
                        )
                    }}
                    keyExtractor={(item, index) => index + ""}
                />
            )
        }
    }

    search(keyword) {
        if (!keyword || keyword.length < 2) {
            const result = this.pokemonService.until(PokemonsPage.NUMBER_OF_POKEMONS_IN_DEFAULT_LIST)
            this.setState({list: result})
        } else {
            const result = this.pokemonService.search(keyword)
            this.setState({list: result})
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20
    },
    searchIcon: {
        margin: 30
    },
    searchSection: {
        marginTop: 20,
        flexDirection: 'row',
        paddingBottom: 10,
    },
    searchInput: {
        flex: 1,
        paddingBottom: 5,
        paddingLeft: 5
    }
});