import { UserReducerState } from '../types/reducers';
import { UserActionTypes } from "../types/actions";

const userReducerDefaultState: UserReducerState = {
    loading: false,
    users: [],
    error: null
};

const userReducer = (
    state = userReducerDefaultState,
    action: UserActionTypes
): UserReducerState => {
    switch (action.type) {
        case "FETCH_USERS":
            return {
                loading: true,
                users: state.users,
                error: null
            };
        case "FETCH_USERS_SUCCESS":
            return {
                loading: false,
                users: action.users,
                error: null
            };
        case "FETCH_USERS_ERROR":
            return {
                loading: false,
                users: state.users,
                error: action.error
            };
        default:
            return state;
    }
};

export { userReducer };
