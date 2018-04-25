import React from 'react';
import {StyleSheet, Text, Image, View} from 'react-native';

export default class ListItem extends React.PureComponent {

    render() {
        if (!this.props.pokemon) {
            return (
                <View>
                    <Text>Loading..</Text>
                </View>
            )
        } else {
            return (
                <View>
                    <View style={styles.cardBody}>
                        <Text style={styles.text}>#{this.props.pokemon.number}</Text>

                        <Image
                            source={{uri: this.props.pokemon.ThumbnailImage}}
                            style={styles.image}
                        />
                        <Text style={styles.name}>{this.props.pokemon.name}</Text>
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