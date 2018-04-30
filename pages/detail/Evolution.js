import React from "react";
import {Image, StyleSheet, View} from "react-native";
import PokemonService from "../../services/PokemonService";
import Text from "react-native-elements/src/text/Text";

export default class Evolution extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: props.pokemonId
        };

        this.fetchEvolutionChain(this.state.id)
    }

    render() {
        return (

            <View style={styles.element} elevation={7}>
                <View style={styles.row}>
                    {this.renderEvolutions()}
                </View>
            </View>
        )
    }

    renderEvolutions() {
        if (this.state.evolutionChain) {
            const evolutions = this.buildEvolutions([], {evolves_to: [this.state.evolutionChain.chain]});
            if (evolutions.length > 1) {
                return evolutions
            }
        } else {
            return (
                <View>
                    <Image source={require("../../assets/images/loader.gif")}/>
                </View>
            )
        }
    }

    buildEvolutions(views, evolution) {

        if (!evolution.evolves_to || evolution.evolves_to.length === 0) {
            return views
        }

        for (var i in evolution.evolves_to) {

            const id = this.extractId(evolution.evolves_to[i].species.url);
            const name = evolution.evolves_to[i].species.name;
            const minLevel = evolution.evolves_to[i].evolution_details[0] ? evolution.evolves_to[i].evolution_details[0].min_level : " ";
            const up = minLevel ? minLevel : "special";

            views.push(
                <View key={id} style={styles.evolveItem}>
                    <Image
                        source={{uri: PokemonService.getInstance().byId(id).ThumbnailImage}}
                        style={styles.evolutionImage}
                    />
                    <Text style={{fontWeight: 'bold'}}>{name}</Text>
                    <Text>{up}</Text>
                </View>
            );
        }

        return this.buildEvolutions(views, evolution.evolves_to[0])
    }

    fetchEvolutionChain(id) {
        fetch("https://pokeapi.co/api/v2/pokemon-species/" + id + "/")
            .then((response) => response.json())
            .then((responseJson) => {
                fetch(responseJson.evolution_chain.url)
                    .then((response) => response.json())
                    .then((responseJson) => {
                        this.setState({evolutionChain: responseJson})
                    })
            })
    }

    extractId(url) {
        const rx = /https:\/\/pokeapi\.co\/api\/v2\/pokemon-species\/(.*)\//;
        const arr = rx.exec(url);
        return arr[1];
    }
}
const styles = StyleSheet.create({
    element: {
        flex: 1,
        margin: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderColor: 'red',
        borderStyle: 'solid',
        backgroundColor: '#f0f0f5'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    evolveItem: {
        alignItems: 'center',
        marginLeft: 5,
        marginRight: 5
    },
    evolutionImage: {
        width: 60,
        height: 60
    }
});
