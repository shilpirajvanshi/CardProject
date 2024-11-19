import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsModel } from '../../store/posts/posts.model';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [CommonModule, PostComponent],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.scss',
})
export class PostsListComponent {
  @Input() posts: PostsModel[] = [];

  trackByFn(_: number, post: PostsModel) {
    return post.id;
  }
}
