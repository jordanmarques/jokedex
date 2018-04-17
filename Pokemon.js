import React from 'react';
import { StyleSheet, Text, AppRegistry, Image, View } from 'react-native';

export default class Pokemon extends React.Component {

    constructor(props) {
        super(props)
        this.fetchPokemon()
        this.state = {
            name: ""
        }
    }

    render() {
        return (
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Text>{this.state.name}</Text>
                </View>
                <View style={styles.cardBody}>
                    <Text style={styles.text}>#{this.props.id}</Text>
                    <Image
                        source={{ uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + this.props.id + ".png" }}
                        style={styles.image}
                        />
                </View>
            </View>
        )
    }

    fetchPokemon() {
        const url = "https://pokeapi.co/api/v2/pokemon/" + this.props.id + "/"
        fetch(url)
            .then((response) => response.json())
            .then(json => {
                console.log(json.name)
                this.setState({ name: this.capitalizeFirstLetter(json.name) })
            })
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
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
    cardHeader: {
        alignItems: 'center'
    },
    cardBody: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100
    }
})