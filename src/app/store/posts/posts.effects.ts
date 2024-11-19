import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { PostsService } from '../../services/posts.service';
import {
  LOAD_POSTS,
  loadPostsFailure,
  loadPostsSuccess,
} from './posts.actions';

@Injectable()
export class PostsEffects {
  loadPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LOAD_POSTS),
      exhaustMap(() =>
        this.postsService.getAll().pipe(
          map((posts) => loadPostsSuccess({ posts })),
          catchError((error) => of(loadPostsFailure({ error })))
        )
      )
    );
  });

  constructor(private actions$: Actions, private postsService: PostsService) {}
}
