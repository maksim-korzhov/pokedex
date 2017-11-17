import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import {
    FETCH_EMPLOYEES,
    FETCH_EMPLOYEES_SUCCEEDED,
    FETCH_EMPLOYEES_FAILED
} from "../actions/types";

const ROOT_URL = `http://${window.location.hostname}:3000`;

// get list of employees
export function * fetchEmployeesAsync () {
    try {
        const result = yield call(axios.get, `${ROOT_URL}/employee`);
        yield put({ type: FETCH_EMPLOYEES_SUCCEEDED, payload: result.data });
    } catch (error) {
        yield put({ type: FETCH_EMPLOYEES_FAILED, payload: error });
    }
}

// employees watcher
function * watchFetchEmployees () {
    yield takeEvery(FETCH_EMPLOYEES, fetchEmployeesAsync);
}

// single entry point to start all the sagas at once
export default function * rootSaga () {
    yield [
        watchFetchEmployees()
    ];
}
