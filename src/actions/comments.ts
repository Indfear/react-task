import { Comment } from '../types/Comment';
import { AppActions } from '../types/actions';
import { Dispatch } from 'redux';
import { AppState } from '../store/configureStore';
import ModalBody from 'react-bootstrap/ModalBody';

export const fetchComments = (): AppActions => ({
    type: "FETCH_COMMENTS"
})

export const fetchCommentsSuccess = (comments: any): AppActions => ({
    type: "FETCH_COMMENTS_SUCCESS",
    comments
})

export const fetchCommentsError = (error: any): AppActions => ({
    type: "FETCH_COMMENTS_ERROR",
    error: error
})

export const addComment = (): AppActions => ({
    type: "ADD_COMMENT"
})

export const addCommentSuccess = (comment: Comment): AppActions => ({
    type: "ADD_COMMENT_SUCCESS",
    comment
})

export const addCommentError = (error: any): AppActions => ({
    type: "ADD_COMMENT_ERROR",
    error: error
})

export const startFetchComments = (postId: string) => {
    return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
        dispatch(fetchComments());
        fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
        .then(res => res.json())
        .then((res: any) => {
            dispatch(fetchCommentsSuccess(res));
            return res;
        })
        .catch((error: any) => {
            dispatch(fetchCommentsError(error));
        })
    }
}

export const startAddComment = (commentData: {name: string, email: string, body: string, postId: string}) => {
    return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
        dispatch(addComment());
        fetch(`https://jsonplaceholder.typicode.com/comments`, {
            method: 'POST',
            body: JSON.stringify({
                name: commentData.name,
                email: commentData.email,
                body: commentData.body,
                postId: commentData.postId
            })
        })
        .then(res => res.json())
        .then((res: any) => {
            const comment: Comment = {
                id: res.id,
                name: commentData.name,
                email: commentData.email,
                body: commentData.body,
                postId: Number(commentData.postId)
            }
            dispatch(addCommentSuccess(comment));
            return res;
        })
        .catch((error: any) => {
            dispatch(addCommentError(error));
        })
    }
}