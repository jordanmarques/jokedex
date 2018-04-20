import pokemons from '../../assets/data/pokemons.json';

export default class PokemonService {

    constructor() {}

    byId(id) {
        for(var i in pokemons){
            if(pokemons[i].id == id){
                return pokemons[i];
            }
        }
        return null;
    }
}