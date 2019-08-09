import { Post } from '../types/Post';
import { AppActions } from '../types/actions';
import { Dispatch } from 'redux';
import { AppState } from '../store/configureStore';

export const fetchUsers = (): AppActions => ({
    type: "FETCH_USERS"
})

export const fetchUsersSuccess = (users: any): AppActions => ({
    type: "FETCH_USERS_SUCCESS",
    users
})

export const fetchUsersError = (error: any): AppActions => ({
    type: "FETCH_USERS_ERROR",
    error: error
})

export const startFetchUsers = () => {
    return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
        dispatch(fetchUsers());
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then((res: any) => {
            dispatch(fetchUsersSuccess(res));
            return res;
        })
        .catch((error: any) => {
            dispatch(fetchUsersError(error));
        })
    }
}