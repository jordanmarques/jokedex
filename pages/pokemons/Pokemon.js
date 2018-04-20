import React from 'react';
import {StyleSheet, Text, Image, View} from 'react-native';
import PokemonService from './PokemonService'

export default class Pokemon extends React.Component {

    constructor(props) {
        super(props);
        this.pokemonService = new PokemonService();
        this.state = {
            pokemon: this.pokemonService.byId(this.props.id),
        };
    }

    render() {
        if (!this.state.pokemon) {
            return (
                <View>
                    <Text>Loading..</Text>
                </View>
            )
        } else {
            return (
                <View style={styles.card}>
                    <View style={styles.cardBody}>
                        <Text style={styles.text}>#{this.state.pokemon.number}</Text>

                        <Image
                            source={{uri: this.state.pokemon.ThumbnailImage}}
                            style={styles.image}
                        />
                        <Text style={styles.name}>{this.state.pokemon.name}</Text>
                    </View>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    text: {
        padding: 10,
        fontSize: 18
    },
    card: {
        margin: 10,
        borderStyle: 'solid',
        borderBottomWidth: 1
    },
    cardBody: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        margin: 10,
        width: 100,
        height: 100
    },
    name: {
        fontWeight: 'bold'
    }
});