import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PostsContainerComponent } from './containers/posts-container/posts-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PostsContainerComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Cards';
}
