import { postsSelector, postStatusSelector, currentPostSelector } from './../../core/store/post/post.selector';
import { AppState } from './../../core/store/app.state';
import { Post } from './../../core/models/post.model';
import { ChangeDetectionStrategy, Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable, map } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { getPost, getPosts } from 'src/app/core/store/post/post.actions';

interface PostListVm {
  posts: Observable<Post[]>,
  post: Observable<Post|null>,
  isLoading: Observable<string>
}

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  vm$?: PostListVm

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(getPosts())
    this.store.dispatch(getPost({
      id: 'AKx797LxADXHHN07qsnc'
    }))

    this.vm$ = {
      posts: this.store.pipe(select(postsSelector)),
      isLoading: this.store.pipe(select(postStatusSelector), map(status => status = 'loading')),
      post: this.store.pipe(select(currentPostSelector))
    }
  }

}
