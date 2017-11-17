import {
    FETCH_POKEMONS_SUCCEEDED,
    FETCH_POKEMON_SUCCEEDED
} from "../actions/types";

export const initialState = {
    pokemonsList: [],
    pokemonsListDetailed: {},
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_POKEMONS_SUCCEEDED:
            return {
                ...state,
                pokemonsList: action.payload
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