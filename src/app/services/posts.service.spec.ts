import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PostsService, PostServiceResponse } from './posts.service';

describe('PostsService', () => {
  let service: PostsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostsService],
    });
    service = TestBed.inject(PostsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch posts correctly', () => {
    const dummyPosts: PostServiceResponse[] = [
      { userId: 1, id: 1, title: 'Post 1', body: 'This is the first post' },
      { userId: 1, id: 2, title: 'Post 2', body: 'This is the second post' },
    ];

    service.getAll().subscribe((posts) => {
      expect(posts.length).toBe(2);
      expect(posts).toEqual(dummyPosts);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyPosts);
  });
});
