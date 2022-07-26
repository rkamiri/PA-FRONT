import { Content } from "./Content";
import { Post } from "./Post";

export interface IPostContent {
  post: Post;
  contentPost: Content[];
}

export class PostContent implements IPostContent {
  post: Post;
  contentPost: Content[];

  constructor(post: Post, contentPost: Content[]) {
    this.post = post;
    this.contentPost = contentPost;
  }
}
