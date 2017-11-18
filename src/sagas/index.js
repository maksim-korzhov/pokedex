import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import {
    FETCH_POKEMONS,
    FETCH_POKEMONS_SUCCEEDED,
    FETCH_POKEMONS_FAILED,
    FETCH_POKEMON,
    FETCH_POKEMON_SUCCEEDED,
    FETCH_POKEMON_FAILED
} from "../actions/types";

const ROOT_URL = `https://pokeapi.co/api/v2`;
const limit = 3;

/*
    get pokemon by id
    @returns an
*/
export function * fetchPokemonByIdAsync(id) {
    try {
        const result = yield call(axios.get, `${ROOT_URL}/pokemon/${id}/`);
        return result;
        //yield put({ type: FETCH_POKEMON_SUCCEEDED, payload: result.data });
    } catch (error) {
        yield put({ type: FETCH_POKEMON_FAILED, payload: error });
    }
}

// pokemons watcher
function * watchFetchPokemonById() {
    yield takeEvery(FETCH_POKEMON, fetchPokemonByIdAsync);
}


/*
    get list of pokemons
    @returns an array of objects: { url, name }
*/
export function * fetchPokemonsAsync() {
    try {
        const request = yield call(axios.get, `${ROOT_URL}/pokemon/`, { params: { limit: 9 } });

        console.log(request.data);

        const allPokemons = [];
        yield* request.data.results.map( function* (pokemonData) {
            // Get pokemon id
            const id = pokemonData.url.match(/pokemon\/(\d+)\//)[1];
            const result = yield* fetchPokemonByIdAsync(id);

            // create array of { id: pokemon }
            const item = {
                id: result.data.id,
                data: result.data
            };
            allPokemons.push(item);
        });

        yield put({ type: FETCH_POKEMONS_SUCCEEDED, payload: allPokemons });
    } catch (error) {
        yield put({ type: FETCH_POKEMONS_FAILED, payload: error });
    }
}

// pokemons watcher
function * watchFetchPokemons() {
    yield takeEvery(FETCH_POKEMONS, fetchPokemonsAsync);
}


// single entry point to start all the sagas at once
export default function * rootSaga() {
    yield [
        watchFetchPokemons(),
        watchFetchPokemonById()
    ];
}
