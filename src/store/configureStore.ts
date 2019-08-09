import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import {postReducer} from "../reducers/posts";
import { AppActions } from '../types/actions';
import { userReducer } from '../reducers/users';
import { commentReducer } from '../reducers/comments';

export const rootReducer = combineReducers({
    users: userReducer,
    posts: postReducer,
    comments: commentReducer
});

export type AppState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>));