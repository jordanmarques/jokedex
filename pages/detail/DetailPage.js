import React from "react";
import {View, Text, StyleSheet, Image} from 'react-native';

export default class DetailPage extends React.Component {

    static navigationOptions = ({navigation}) => {
        const {params} = navigation.state;

        return {
            headerTitle: params ? params.name : '???',
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            pokemon: this.props.navigation.state.params
        };
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
                <View style={styles.body}>
                    <View style={styles.element} elevation={7}>
                        <View style={styles.elementHead}>
                            <Text style={{fontWeight:'bold'}}>Types</Text>
                        </View>
                        <View style={styles.elementBody}>
                            {this.renderTypes(this.state.pokemon.type)}
                        </View>
                    </View>
                    <View style={styles.element} elevation={7}>
                        <View style={styles.elementHead}>
                            <Text style={{fontWeight:'bold'}}>Weakness</Text>
                        </View>
                        <View style={styles.elementBody}>
                            {this.renderTypes(this.state.pokemon.weakness)}
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    renderTypes(types){
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
    body: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        flex: 1,
        width: 200,
        height: 200
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
        flexWrap:'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        flexGrow: 1,
        flexShrink: 0,
    },
    types: {
        flexWrap:'wrap',
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
