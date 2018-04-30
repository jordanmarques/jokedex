import React from "react";
import {StyleSheet, Image, View} from 'react-native';
import Element from "./Element";
import Evolution from "./Evolution";

export default class PokemonDetail extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            pokemon: props.pokemon
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
                    <Element types={this.state.pokemon.type} title={'Types'}/>
                    <Element types={this.state.pokemon.weakness} title={'Weakness'}/>
                </View>

                <View style={styles.row}>
                    <Evolution pokemon={this.state.pokemon}/>
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
                        web: responseJson
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