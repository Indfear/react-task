import { User } from './User';
import { Post } from "./Post";
import { Comment } from './Comment';

export interface UserReducerState {
    loading: boolean;
    users: User[];
    error: any;
}

export interface PostReducerState {
    loading: boolean;
    posts: Post[];
    error: any;
}

export interface CommentReducerState {
    loading: boolean;
    comments: Comment[];
    error: any;
}