import { activatePost } from './../../store/posts/posts.actions';
import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { PostsModel } from '../../store/posts/posts.model';
import { Store } from '@ngrx/store';
import { selectActivePost } from '../../store/posts/posts.selectors';
import { first } from 'rxjs';
import { postKeys } from '../../utils/post';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent implements OnChanges {
  @Input() post!: PostsModel;
  activeText: string | number = '';
  activeIndex: number = 0;

  constructor(private store: Store<any>) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['post'].currentValue?.activeText !==
      changes['post'].previousValue?.activeText
    ) {
      this.activeText = this.post.activeText;
    }
  }

  postClick() {
    this.store
      .select(selectActivePost)
      .pipe(first())
      .subscribe((activePost) => {
        this.activeIndex =
          this.activeIndex === postKeys.length - 1 ? 0 : this.activeIndex + 1;

        // different card click
        // we can do dispatch for same card click as well but if there would have been 1000s of cards then it might lead to performance issue since it re-renders all the cards
        // also it depends on requirement, if we need activeText of card somewhere else then updating state on all click would be mandatory and in that case activeText should be updated from reducer
        if (!activePost || activePost?.id !== this.post.id) {
          this.store.dispatch(activatePost({ post: this.post }));
        } else {
          this.activeText = this.post[postKeys[this.activeIndex]];
        }
      });
  }
}
