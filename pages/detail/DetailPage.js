import React from "react";
import PokemonDetail from "./PokemonDetail";

export default class DetailPage extends React.Component {

    static navigationOptions = ({navigation}) => {
        const {params} = navigation.state;

        return {
            headerTitle: params ? params.name : '???',
        }
    };

    constructor(props) {
        super(props);
        const offlinePokemon = this.props.navigation.state.params;
        this.state = {
            pokemon: offlinePokemon
        };
    }

    render() {
        return (
            <PokemonDetail pokemon={this.state.pokemon}/>
        )
    }
}


