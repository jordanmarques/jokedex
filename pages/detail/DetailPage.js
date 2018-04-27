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
        this.enrichPokemon(this.state.pokemon.id)
    }

    render() {
        return (
            <PokemonDetail pokemon={this.state.pokemon}/>
        )
    }

    enrichPokemon(id) {
        this.fetchAdditionalInformations(id);
        this.fetchEvolutionChain(id)
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

    fetchEvolutionChain(id) {
        fetch("https://pokeapi.co/api/v2/pokemon-species/" + id + "/")
            .then((response) => response.json())
            .then((responseJson) => {
                fetch(responseJson.evolution_chain.url)
                    .then((response) => response.json())
                    .then((responseJson) => {
                        this.setState(prevState => ({
                            pokemon: {
                                ...prevState.pokemon,
                                evolutionChain: responseJson
                            }
                        }))
                    })
            })
    }
}


