import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostsContainerComponent } from './posts-container.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { loadPosts } from '../../store/posts/posts.actions';
import { selectPosts } from '../../store/posts/posts.selectors';
import { PostsModel } from '../../store/posts/posts.model';
import { of } from 'rxjs';

describe('PostsContainerComponent', () => {
  let component: PostsContainerComponent;
  let fixture: ComponentFixture<PostsContainerComponent>;
  let store: MockStore;
  const mockPosts: PostsModel[] = [
    { id: 1, title: 'Post 1', activeText: 'Active Text 1' } as PostsModel,
    { id: 2, title: 'Post 2', activeText: 'Active Text 2' } as PostsModel,
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostsContainerComponent], // Add PostsContainerComponent to imports
      providers: [
        provideMockStore({
          initialState: {},
          selectors: [{ selector: selectPosts, value: mockPosts }],
        }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsContainerComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store) as MockStore;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with posts from the store', () => {
    component.ngOnInit();
    expect(component.posts.length).toBe(2);
    expect(component.posts).toEqual(mockPosts);
  });

  it('should dispatch loadPosts on ngOnInit', () => {
    spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(loadPosts());
  });
});
