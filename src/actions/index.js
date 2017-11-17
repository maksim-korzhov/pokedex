import {
    FETCH_EMPLOYEES
} from "./types";

export function fetchEmployees () {
    return {
        type: FETCH_EMPLOYEES
    };
}
