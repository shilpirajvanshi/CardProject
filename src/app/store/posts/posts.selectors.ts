import { createSelector } from '@ngrx/store';
import { PostsState } from './posts.reducer';

interface AppState {
  posts: PostsState;
}

export const selectPostsState = (state: AppState) => state.posts;

export const selectPosts = createSelector(
  selectPostsState,
  (state) => state.posts
);

export const selectActivePost = createSelector(
  selectPostsState,
  (state) => state.active
);
