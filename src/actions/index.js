import {
    FETCH_POKEMON,
    FETCH_POKEMONS
} from "./types";

export function fetchPokemons() {
    return {
        type: FETCH_POKEMONS
    };
}

export function fetchPokemonById(id) {
    return {
        type: FETCH_POKEMON,
        payload: id
    };
}
