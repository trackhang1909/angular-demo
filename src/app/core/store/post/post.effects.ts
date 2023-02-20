import { PostService } from 'src/app/core/services/post.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as postActions from './post.actions'
import { of } from 'rxjs';

@Injectable()
export class PostEffects {
  loadPosts$ = createEffect(() => this.actions$.pipe(
    ofType(postActions.getPosts),
    mergeMap(() => this.postService.getPosts()),
    map((posts) => {
      return postActions.getPostsSuccess({ posts })
    }),
    catchError(error => of(postActions.getPostsFailed({ error })))
  ));

  loadPost$ = createEffect(() => this.actions$.pipe(
    ofType(postActions.getPost),
    mergeMap(post => this.postService.getPostById(post.id)),
    map((item) => {
      console.log(item);

      return postActions.getPostSuccess({ item })
    }),
    catchError(error => of(postActions.getPostFailed({ error })))
  ));

  constructor(
    private actions$: Actions,
    private postService: PostService
  ) {}
}
