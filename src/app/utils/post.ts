import { PostsModel } from "../store/posts/posts.model";

type PostModelKey = keyof PostsModel;

// post keys and their order
// on post card click, we are showing first title then body and so on
// if we want to change the order, we can do so here.
export const postKeys: PostModelKey[] = ['title', 'body', 'userId', 'id'];
