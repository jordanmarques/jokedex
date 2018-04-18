import React from 'react';
import { StyleSheet, Text, AppRegistry, Image, View } from 'react-native';

export default class Pokemon extends React.Component {

    constructor(props) {
        super(props)
        this.fetchName()
        this.state = {
            name: ""
        }
    }

    render() {
        return (
            <View style={styles.card}>
                <View style={styles.cardBody}>
                    <Text style={styles.text}>#{this.props.id}</Text>
                    <Image
                        source={{ uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + this.props.id + ".png" }}
                        style={styles.image}
                        />
                    <Text style={styles.name}>{this.state.name}</Text>
                </View>
            </View>
        )
    }

    fetchName() {
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
})