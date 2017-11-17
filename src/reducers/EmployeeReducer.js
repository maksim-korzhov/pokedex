import {
    FETCH_EMPLOYEES_SUCCEEDED
} from "../actions/types";

export const initialState = {
    employeesList: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_EMPLOYEES_SUCCEEDED:
            return {
                ...state,
                employeesList: action.payload
            };
    }

    return state;
}