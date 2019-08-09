import { Post } from '../types/Post';
import { AppActions } from '../types/actions';
import { Dispatch } from 'redux';
import { AppState } from '../store/configureStore';

export const fetchPosts = (): AppActions => ({
    type: "FETCH_POSTS"
})

export const fetchPostsSuccess = (posts: any): AppActions => ({
    type: "FETCH_POSTS_SUCCESS",
    posts
})

export const fetchPostsError = (error: any): AppActions => ({
    type: "FETCH_POSTS_ERROR",
    error: error
})

export const addPost = (): AppActions => ({
    type: "ADD_POST"
})

export const addPostSuccess = (post: Post): AppActions => ({
    type: "ADD_POST_SUCCESS",
    post
})

export const addPostError = (error: any): AppActions => ({
    type: "ADD_POST_ERROR",
    error: error
})

export const deletePost = (): AppActions => ({
    type: "DELETE_POST"
})

export const deletePostSuccess = (postId: string): AppActions => ({
    type: "DELETE_POST_SUCCESS",
    postId
})

export const deletePostError = (error: any): AppActions => ({
    type: "DELETE_POST_ERROR",
    error: error
})

export const startFetchPosts = (userId: string) => {
    return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
        dispatch(fetchPosts());
        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then(res => res.json())
        .then((res: any) => {
            dispatch(fetchPostsSuccess(res));
            return res;
        })
        .catch((error: any) => {
            dispatch(fetchPostsError(error));
        })
    }
}

export const startAddPost = (postData: {title: string, body: string, userId: string}) => {
    return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
        dispatch(addPost());
        fetch(`https://jsonplaceholder.typicode.com/posts`, {
            method: 'POST',
            body: JSON.stringify({
                title: postData.title,
                body: postData.body,
                userId: postData.userId
            })
        })
        .then(res => res.json())
        .then((res: any) => {
            const post: Post = {
                id: res.id,
                title: postData.title,
                body: postData.body,
                userId: Number(postData.userId)
            }
            dispatch(addPostSuccess(post));
            return res;
        })
        .catch((error: any) => {
            dispatch(addPostError(error));
        })
    }
}

export const startDeletePost = (postId: string) => {
    return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
        dispatch(deletePost());
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then((res: any) => {
            dispatch(deletePostSuccess(postId));
            return res;
        })
        .catch((error: any) => {
            dispatch(deletePostError(error));
        })
    }
}