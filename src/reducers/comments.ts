import { CommentActionTypes } from "../types/actions";
import { CommentReducerState } from "../types/reducers";

const commentReducerDefaultState: CommentReducerState = {
    loading: false,
    comments: [],
    error: null
};

const commentReducer = (
    state = commentReducerDefaultState,
    action: CommentActionTypes
): CommentReducerState => {
    switch (action.type) {
        case "FETCH_COMMENTS":
            return {
                loading: true,
                comments: state.comments,
                error: null
            };
        case "FETCH_COMMENTS_SUCCESS":
            return {
                loading: false,
                comments: action.comments,
                error: null
            };
        case "FETCH_COMMENTS_ERROR":
            return {
                loading: false,
                comments: state.comments,
                error: action.error
            };
        case "ADD_COMMENT":
            return {
                loading: true,
                comments: state.comments,
                error: null
            };
        case "ADD_COMMENT_SUCCESS":
            return {
                loading: false,
                comments: [...state.comments, action.comment],
                error: null
            };
        case "ADD_COMMENT_ERROR":
            return {
                loading: false,
                comments: state.comments,
                error: action.error
            };
        default:
            return state;
    }
};

export { commentReducer };
