import React from "react";
import {View, Text} from 'react-native';

export default class PokemonDetailPage extends React.Component {

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;

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
                <Text>{this.state.pokemon.name}</Text>
            </View>
        )
    }

}