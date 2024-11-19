import { createReducer, on } from '@ngrx/store';
import * as PostsActions from './posts.actions';
import { PostsModel } from './posts.model';
import { postKeys } from '../../utils/post';

export interface PostsState {
  posts: PostsModel[];
  loading: boolean;
  error: any;
  active: PostsModel | null;
}

export const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
  active: null,
};

const _postsReducer = createReducer(
  initialState,
  on(PostsActions.loadPostsSuccess, (state, { posts }) => ({
    ...state,
    loading: false,
    posts: posts.map((item) => ({ ...item, activeText: item.title })),
  })),
  on(PostsActions.loadPostsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(PostsActions.activatePost, (state, { post }) => {
    const newPosts = state.posts.map((item) => {
      if (item.id === post.id) {
        return { ...item, activeText: item[postKeys[1]] };
      }

      return { ...item, activeText: item[postKeys[0]] };
    });

    return {
      loading: false,
      error: false,
      active: post,
      posts: newPosts,
    };
  })
);

export function postsReducer(state: PostsState, action: any) {
  return _postsReducer(state, action);
}
