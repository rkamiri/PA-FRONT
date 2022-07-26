import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
import {Post} from "../entities/Post";
import {Comment} from "../entities/Comment";
import {PostVote} from "../entities/PostVote";
import {CommentVote} from "../entities/CommentVote";
import { PostContent } from '../entities/PostContent';
import { Content } from '../entities/Content';
import { CommentContent } from '../entities/CommentContent';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private API_URL= environment.API_URL;

  constructor(private httpclient: HttpClient) {
  }

  public addPost(postContent: PostContent): Observable<Post> {
    return this.httpclient.post<Post>(
      this.API_URL + 'posts/add' , postContent
    );
  }


  public getPostById(id: number): Observable<Post> {
    return this.httpclient.get<Post>(this.API_URL + 'posts/' + id);
  }

  public getPostContentByPostId(id: number): Observable<Content[]> {
    return this.httpclient.get<Content[]>(this.API_URL + 'posts/' + id + '/content');
  }

  public getPostComments(id: number): Observable<any> {
    return this.httpclient.get<any>(this.API_URL + 'comments/comment/post/' + id)
  }

  sendComment(commentContent: CommentContent) {
    return this.httpclient.post<Comment>(
      this.API_URL + 'comments' , commentContent
    );
  }

  deleteComment(commentId : number) {
    return this.httpclient.delete<boolean>(
      this.API_URL + 'comments/comment/' + commentId
    );
  }

  editComment(comment: any) {
    return this.httpclient.put<Comment>(
      this.API_URL + 'comments' , comment
    );
  }

  getCommentCount(postId: number) {
    return this.httpclient.get<number>(
      this.API_URL + 'comments/comment/post/' + postId + '/count'
    )
  }

  upvote(comment: PostVote) {
    return this.httpclient.put<PostVote>(
      this.API_URL + 'posts-vote' , comment
    );
  }
  getUserUpvote(postId: number) {
    return this.httpclient.get<PostVote>(
      this.API_URL + 'posts-vote/post/' + postId
    );
  }

  upvoteComment(upvote: CommentVote) {
    return this.httpclient.put<CommentVote>(
      this.API_URL + 'comment-votes' , upvote
    );
  }

  getCommentById(commentId: number) {
    return this.httpclient.get<any>(
      this.API_URL + 'comments/comment-post/' + commentId
    )
  }

  getPostsForForum(id: Number, category: String, offset: number, limit: number) {
    return this.httpclient.get<any>(
      this.API_URL + 'posts/post-list/forum/' + id + '/category/' + category + '/offset/' + offset + '/limit/' + limit
    )
  }

  getPostsForHome(category: string, offset: number, limit: number) {
    return this.httpclient.get<any>(
      this.API_URL + 'posts/post-list/category/' + category + '/offset/' + offset + '/limit/' + limit
    )
  }

  deletePost(id: any) {
    return this.httpclient.delete(this.API_URL + 'posts/' + id);
  }

  getPostsForUser(id: number | undefined, category: string, offset: number, limit: number) {
    return this.httpclient.get<any>(
      this.API_URL + 'posts/post-list/user/' + id +'/category/' + category + '/offset/' + offset + '/limit/' + limit
    )
  }
}
