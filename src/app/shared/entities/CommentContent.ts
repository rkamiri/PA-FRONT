import { Content } from "./Content";
import {Comment} from "./Comment";

export interface ICommentContent {
  comment: Comment;
  contentPost: Content[];
}

export class CommentContent implements ICommentContent {
  comment: Comment;
  contentPost: Content[];

  constructor(comment: Comment, contentPost: Content[]) {
    this.comment = comment;
    this.contentPost = contentPost;
  }
}
