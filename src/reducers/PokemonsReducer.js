import {
    FETCH_POKEMONS_SUCCEEDED,
    FETCH_POKEMON_SUCCEEDED,
    FIND_POKEMON_BY_NAME,
    FETCH_PAGE,
    FIND_POKEMON_BY_TYPES
} from "../actions/types";

export const initialState = {
    pokemonsList: [],
    searchList: [],
    isSearching: false,
    isSearchingByTypes: false,
    isLoaded: false,
    pokemonsListDetailed: {},
    currentPage: 1,
    typesList: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_POKEMONS_SUCCEEDED:
            const types = [];
            action.payload.map( item => {

                return item.data.types.map( typeObj => {
                    const name = typeObj.type.name;
                    if(types.indexOf(name) === -1) {
                        types.push(name);
                    }
                });
            });

            return {
                ...state,
                pokemonsList: action.payload,
                isSearching: false,
                isLoaded: true,
                typesList: [ ...state.typesList, ...types ]
            };
        case FIND_POKEMON_BY_NAME:
            const searchList = state.pokemonsList;
            const pokemons = searchList.filter( item => {
                return item.data.name.indexOf(action.payload) !== -1;
            });

            const isSearching = action.payload.length > 0;

            return {
                ...state,
                searchList: pokemons,
                isSearching,
                currentPage: 1
            };
        case FETCH_PAGE:
            return {
                ...state,
                currentPage: action.payload
            };
        case FIND_POKEMON_BY_TYPES:
            const typesList = action.payload;

            const pokemonsTyped = state.pokemonsList.filter( item => {
                let hasType = false;
                item.data.types.map( typeObj => {
                    if( typesList.indexOf(typeObj.type.name) !== -1 ) {
                        hasType = true;
                    }
                });

                return hasType;
            });

            const isSearchingByTypes = typesList.length > 0;

            return {
                ...state,
                searchList: pokemonsTyped,
                isSearchingByTypes,
                currentPage: 1
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