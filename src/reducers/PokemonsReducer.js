import {
    FETCH_POKEMONS_SUCCEEDED,
    FETCH_POKEMON_SUCCEEDED,
    FIND_POKEMON_BY_NAME,
    FETCH_PAGE
} from "../actions/types";

export const initialState = {
    pokemonsList: [],
    searchList: [],
    isSearching: false,
    isLoaded: false,
    pokemonsListDetailed: {},
    currentPage: 1
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_POKEMONS_SUCCEEDED:
            return {
                ...state,
                pokemonsList: action.payload,
                isSearching: false,
                isLoaded: true
            };
            break;
        case FIND_POKEMON_BY_NAME:
            const pokemons = state.pokemonsList.filter( item => {
                return item.data.name.indexOf(action.payload) !== -1;
            });

            const isSearching = action.payload.length > 0;

            return {
                ...state,
                searchList: pokemons,
                isSearching,
                currentPage: 1
            };
            break;
        case FETCH_PAGE:
            return {
                ...state,
                currentPage: action.payload
            };

        case FETCH_POKEMON_SUCCEEDED:
            const pokemonsListDetailed = state.pokemonsListDetailed;
            pokemonsListDetailed[action.payload.id] = action.payload;

            return {
                ...state,
                pokemonsListDetailed
            };
    }

    return state;
}