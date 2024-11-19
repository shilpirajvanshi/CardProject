import { Component } from '@angular/core';
import { PostsModel } from '../../store/posts/posts.model';
import { Store } from '@ngrx/store';
import { loadPosts } from '../../store/posts/posts.actions';
import { PostsListComponent } from '../../components/posts-list/posts-list.component';
import { selectPosts } from '../../store/posts/posts.selectors';

@Component({
  selector: 'app-posts-container',
  standalone: true,
  imports: [PostsListComponent],
  templateUrl: './posts-container.component.html',
  styleUrl: './posts-container.component.scss',
})
export class PostsContainerComponent {
  posts: PostsModel[] = [];

  constructor(private store: Store<any>) {
    this.store.select(selectPosts).subscribe((data) => {
      this.posts = data;
    });
  }

  ngOnInit(): void {
    this.store.dispatch(loadPosts());
  }
}
