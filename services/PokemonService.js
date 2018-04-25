import pokemons from '../assets/data/pokemons.json';
import _ from 'lodash'

export default class PokemonService {

    constructor() {
        this.pokemonList = _.orderBy(_.uniqBy(pokemons, 'id'), 'id')
    }

    byId(id) {
        for (var i in this.pokemonList) {
            if (this.pokemonList[i].id == id) {
                return this.pokemonList[i];
            }
        }
        return null;
    }

    search(keyword) {
        var result = [];
        for (var i in this.pokemonList) {
            if (this.pokemonList[i].name.toLowerCase().indexOf( keyword ) !== -1) {
                result.push(Object.assign({}, this.pokemonList[i]));
            }
        }
        return _.orderBy(result,'id');
    }

    until(index) {
        return _.orderBy(this.pokemonList.slice(0, index), 'id')
    }
}