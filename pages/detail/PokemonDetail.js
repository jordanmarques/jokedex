import React from "react";
import {StyleSheet, Image, View} from 'react-native';
import Elements from "./Elements";
import Evolution from "./Evolution";
import Stats from "./Stats";

export default class PokemonDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pokemon: props.pokemon,
            enrichingPokemon: true
        };
        this.enrichPokemon(this.state.pokemon.id)
    }

    render() {
        return (
            <View>

                <View style={styles.head}>
                    <Image
                        source={{uri: this.state.pokemon.ThumbnailImage}}
                        style={styles.image}
                    />
                </View>

                <View style={styles.row}>
                    <Elements types={this.state.pokemon.type} title={'Types'}/>
                    <Elements types={this.state.pokemon.weakness} title={'Weakness'}/>
                </View>

                <View style={styles.row}>
                    <Stats stats={this.state.pokemon.stats}/>
                </View>

                <View style={styles.row}>
                    <Evolution pokemonId={this.state.pokemon.id}/>
                </View>

            </View>
        )
    }

    enrichPokemon(id) {
        this.fetchAdditionalInformations(id);
    }

    fetchAdditionalInformations(id) {
        fetch("https://pokeapi.co/api/v2/pokemon/" + id + "/")
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState(prevState => ({
                    pokemon: {
                        ...prevState.pokemon,
                        stats: responseJson.stats
                    }
                }))
            })
    }
}

const styles = StyleSheet.create({
    head: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    column: {
        flexDirection: 'column',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    image: {
        flex: 1,
        width: 200,
        height: 200
    }
});