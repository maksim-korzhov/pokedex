import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";

import reducers from "./reducers";
import sagas from "./sagas";

import Wrapper from "./components/Wrapper";
import PokemonsList from "./containers/PokemonsList";

import style from "../style/style.scss";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// compose saga with store
const createStoreWithMiddleware = composeWithDevTools(applyMiddleware(sagaMiddleware))(createStore);

const store = createStoreWithMiddleware(reducers);

// run the saga
sagaMiddleware.run(sagas);

// render the application
ReactDOM.render(
    <Provider store={store}>
        <Wrapper>
            <PokemonsList />
        </Wrapper>
    </Provider>,
    document.getElementById("root")
);
