import React from "react";
import {StyleSheet, Text, Image, View} from 'react-native';
import PokemonService from "../../services/PokemonService";

export default class PokemonDetail extends React.PureComponent {

    render() {
        return (
            <View>

                <View style={styles.head}>
                    <Image
                        source={{uri: this.props.pokemon.ThumbnailImage}}
                        style={styles.image}
                    />
                </View>

                <View style={styles.row}>
                    <View style={styles.element} elevation={7}>
                        <View style={styles.elementHead}>
                            <Text style={{fontWeight: 'bold'}}>Types</Text>
                        </View>
                        <View style={styles.elementBody}>
                            {this.renderTypes(this.props.pokemon.type)}
                        </View>
                    </View>

                    <View style={styles.element} elevation={7}>
                        <View style={styles.elementHead}>
                            <Text style={{fontWeight: 'bold'}}>Weakness</Text>
                        </View>
                        <View style={styles.elementBody}>
                            {this.renderTypes(this.props.pokemon.weakness)}
                        </View>
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.element} elevation={7}>
                        <View style={styles.row}>
                            {this.renderEvolutions()}
                        </View>
                    </View>
                </View>

            </View>
        )
    }

    renderEvolutions() {
        if (this.props.pokemon.evolutionChain) {
            const evolutions = this.buildEvolutions([], {evolves_to: [this.props.pokemon.evolutionChain.chain]});
            if (evolutions.length > 1) {
                return evolutions
            }
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

    renderTypes(types) {
        var result = [];
        for (i in types) {
            const type = types[i].toLowerCase()
            result.push(
                <Text style={StyleSheet.flatten([styles.badge, {backgroundColor: this.getColorForType(type)}])}
                      key={i}>{type}</Text>
            )
        }
        return result
    }

    extractId(url) {
        const rx = /https:\/\/pokeapi\.co\/api\/v2\/pokemon-species\/(.*)\//;
        const arr = rx.exec(url);
        return arr[1];
    }

    getColorForType(type) {
        const typesColor = {
            normal: "#b3966e",
            fighting: "#ff6462",
            flying: "#828cc9",
            poison: "#b464a3",
            ground: "#e7b465",
            rock: "#aaa063",
            bug: "#95ab3c",
            ghost: "#836e95",
            steel: "#8cb4be",
            fire: "#fc7851",
            water: "#4fc8db",
            grass: "#76c85b",
            electric: "#fbc622",
            psychic: "#fd658c",
            ice: "#6edcd3",
            dragon: "#5b63ac",
            dark: "#5a504f",
            fairy: "#fe78aa"

        };
        return typesColor[type]
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
    },
    evolutionImage: {
        width: 60,
        height: 60
    },
    evolveItem: {
        alignItems: 'center',
        marginLeft: 5,
        marginRight: 5
    },
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
    elementHead: {
        flexDirection: 'column',
        alignItems: 'center',
        flexGrow: 1,
        flexShrink: 0,
    },
    elementBody: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        flexGrow: 1,
        flexShrink: 0,
    },
    types: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    badge: {
        padding: 5,
        margin: 5,
        backgroundColor: 'green',
        color: 'white',
        fontWeight: 'bold',
        borderRadius: 2
    }
});