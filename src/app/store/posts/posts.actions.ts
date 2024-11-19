import { createAction, props } from '@ngrx/store';
import { PostsModel } from './posts.model';
import { PostServiceResponse } from '../../services/posts.service';

export const LOAD_POSTS = '[posts] load';
export const LOAD_POSTS_SUCCESS = '[posts] success';
export const LOAD_POSTS_FAILURE = '[posts] failure';
export const ACTIVATE_POST = '[posts] activate';

export const loadPosts = createAction(LOAD_POSTS);
export const loadPostsSuccess = createAction(
  LOAD_POSTS_SUCCESS,
  props<{ posts: PostServiceResponse[] }>()
);
export const loadPostsFailure = createAction(
  LOAD_POSTS_FAILURE,
  props<{ error: any }>()
);
export const activatePost = createAction(
  ACTIVATE_POST,
  props<{ post: PostsModel }>()
);
