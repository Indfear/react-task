import { User } from './User';
import { Post } from "./Post";
import { Comment } from "./Comment";

export const FETCH_USERS = "FETCH_USERS";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_ERROR = "FETCH_USERS_ERROR";
export const FETCH_POSTS = "FETCH_POSTS";
export const FETCH_POSTS_SUCCESS = "FETCH_POSTS_SUCCESS";
export const FETCH_POSTS_ERROR = "FETCH_POSTS_ERROR";
export const ADD_POST = "ADD_POST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_ERROR = "ADD_POST_ERROR";
export const DELETE_POST = "DELETE_POST";
export const DELETE_POST_SUCCESS = "DELETE_POST_SUCCESS";
export const DELETE_POST_ERROR = "DELETE_POST_ERROR";
export const FETCH_COMMENTS = "FETCH_COMMENTS";
export const FETCH_COMMENTS_SUCCESS = "FETCH_COMMENTS_SUCCESS";
export const FETCH_COMMENTS_ERROR = "FETCH_COMMENTS_ERROR";
export const ADD_COMMENT = "ADD_COMMENT";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_ERROR = "ADD_COMMENT_ERROR";

export interface FetchUsersAction {
    type: typeof FETCH_USERS;
}

export interface FetchUsersSuccessAction {
    type: typeof FETCH_USERS_SUCCESS;
    users: User[];
}

export interface FetchUsersErrorAction {
    type: typeof FETCH_USERS_ERROR;
    error: any;
}

export interface FetchPostsAction {
    type: typeof FETCH_POSTS;
}

export interface FetchPostsSuccessAction {
    type: typeof FETCH_POSTS_SUCCESS;
    posts: Post[];
}

export interface FetchPostsErrorAction {
    type: typeof FETCH_POSTS_ERROR;
    error: any;
}

export interface AddPostAction {
    type: typeof ADD_POST;
}

export interface AddPostSuccessAction {
    type: typeof ADD_POST_SUCCESS;
    post: Post;
}

export interface AddPostErrorAction {
    type: typeof ADD_POST_ERROR;
    error: any;
}

export interface DeletePostAction {
    type: typeof DELETE_POST;
}

export interface DeletePostSuccessAction {
    type: typeof DELETE_POST_SUCCESS;
    postId: string;
}

export interface DeletePostErrorAction {
    type: typeof DELETE_POST_ERROR;
    error: any;
}

export interface FetchCommentsAction {
    type: typeof FETCH_COMMENTS;
}

export interface FetchCommentsSuccessAction {
    type: typeof FETCH_COMMENTS_SUCCESS;
    comments: Comment[];
}

export interface FetchCommentsErrorAction {
    type: typeof FETCH_COMMENTS_ERROR;
    error: any;
}

export interface AddCommentAction {
    type: typeof ADD_COMMENT;
}

export interface AddCommentSuccessAction {
    type: typeof ADD_COMMENT_SUCCESS;
    comment: Comment;
}

export interface AddCommentErrorAction {
    type: typeof ADD_COMMENT_ERROR;
    error: any;
}

export type UserActionTypes =
    | FetchUsersAction
    | FetchUsersSuccessAction
    | FetchUsersErrorAction;

export type PostActionTypes =
    | FetchPostsAction
    | FetchPostsSuccessAction
    | FetchPostsErrorAction
    | AddPostAction
    | AddPostSuccessAction
    | AddPostErrorAction
    | DeletePostAction
    | DeletePostSuccessAction
    | DeletePostErrorAction;

export type CommentActionTypes =
    | FetchCommentsAction
    | FetchCommentsSuccessAction
    | FetchCommentsErrorAction
    | AddCommentAction
    | AddCommentSuccessAction
    | AddCommentErrorAction

export type AppActions = UserActionTypes| PostActionTypes | CommentActionTypes;
