import {
    FETCH_POKEMON,
    FETCH_POKEMONS,
    FIND_POKEMON_BY_NAME,
    FETCH_PAGE,
    FIND_POKEMON_BY_TYPES
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

export function findPokemonByName(name) {
    return {
        type: FIND_POKEMON_BY_NAME,
        payload: name
    };
}

export function fetchByPage(pageNumber) {
    return {
        type: FETCH_PAGE,
        payload: pageNumber
    };
}

export function fetchAllTypes() {
    return {
        type: FETCH_ALL_TYPES
    };
}

export function findPokemonByTypes(types) {
    return {
        type: FIND_POKEMON_BY_TYPES,
        payload: types
    };
}