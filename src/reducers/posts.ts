import { PostActionTypes } from "../types/actions";
import { PostReducerState } from "../types/reducers";

const postReducerDefaultState: PostReducerState = {
    loading: false,
    posts: [],
    error: null
};

const postReducer = (
    state = postReducerDefaultState,
    action: PostActionTypes
): PostReducerState => {
    switch (action.type) {
        case "FETCH_POSTS":
            return {
                loading: true,
                posts: state.posts,
                error: null
            };
        case "FETCH_POSTS_SUCCESS":
            return {
                loading: false,
                posts: action.posts,
                error: null
            };
        case "FETCH_POSTS_ERROR":
            return {
                loading: false,
                posts: state.posts,
                error: action.error
            };
        case "ADD_POST":
            return {
                loading: true,
                posts: state.posts,
                error: null
            };
        case "ADD_POST_SUCCESS":
            return {
                loading: false,
                posts: [...state.posts, action.post],
                error: null
            };
        case "ADD_POST_ERROR":
            return {
                loading: false,
                posts: state.posts,
                error: action.error
            };
        case "DELETE_POST":
            return {
                loading: true,
                posts: state.posts,
                error: null
            };
        case "DELETE_POST_SUCCESS":
            let posts = state.posts;
            posts = posts.filter(post => post.id !== Number(action.postId));
            return {
                loading: false,
                posts: posts,
                error: null
            };
        case "DELETE_POST_ERROR":
            return {
                loading: false,
                posts: state.posts,
                error: action.error
            };
        default:
            return state;
    }
};

export { postReducer };
