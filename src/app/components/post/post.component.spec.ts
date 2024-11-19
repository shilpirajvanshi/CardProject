import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostComponent } from './post.component';
import { Store, StoreModule } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CommonModule } from '@angular/common';
import { activatePost } from './../../store/posts/posts.actions';
import { selectActivePost } from './../../store/posts/posts.selectors';
import { PostsModel } from './../../store/posts/posts.model';
import { By } from '@angular/platform-browser';
import { postKeys } from '../../utils/post';
import { of } from 'rxjs';
import { SimpleChanges, SimpleChange } from '@angular/core';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  let store: MockStore;
  const mockPost: PostsModel = {
    id: 1,
    activeText: 'Active Text',
  } as PostsModel;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, StoreModule.forRoot({}), PostComponent],
      providers: [
        provideMockStore({
          initialState: {},
          selectors: [{ selector: selectActivePost, value: null }],
        }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store) as MockStore;
    component.post = mockPost;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should update activeText on ngOnChanges', () => {
    const changes: SimpleChanges = {
      post: new SimpleChange(
        { activeText: 'Active Text' },
        { activeText: 'Updated Text' },
        false
      ),
    };

    component.post = { ...component.post, activeText: 'Updated Text' };
    component.ngOnChanges(changes);
    fixture.detectChanges(); 

    expect(component.activeText).toBe('Updated Text');
  });

  it('should handle postClick and dispatch action if post is different', () => {
    spyOn(store, 'dispatch');
    spyOn(store, 'select').and.returnValue(of(null));
    component.postClick();
    expect(store.dispatch).toHaveBeenCalledWith(
      activatePost({ post: mockPost })
    );
  });

  it('should handle postClick and update activeText if post is the same', () => {
    spyOn(store, 'select').and.returnValue(of(mockPost));
    component.postClick();
    expect(component.activeText).toBe(
      mockPost[postKeys[component.activeIndex]]
    );
  });

  it('should find HTML elements using By.css()', () => {
    const element = fixture.debugElement.query(By.css('.card-block'));
    expect(element).toBeTruthy();
  });
});
