import { Component, ElementRef, HostListener, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import {Comment} from "../shared/entities/Comment";
import {ActivatedRoute, Router} from "@angular/router";
import {Post} from "../shared/entities/Post";
import {UserService} from "../shared/services/userService";
import {ForumService} from "../shared/services/forumService";
import {PostService} from "../shared/services/postService";
import {AuthService} from "../shared/services/authService";
import {PostVote} from "../shared/entities/PostVote";
import {CommentVote} from "../shared/entities/CommentVote";
import { Content } from '../shared/entities/Content';
import { NewContentItem } from '../shared/entities/NewContentItem';
import { ContentEditorComponent } from '../shared/entities/ContentEditorComponent';
import { TextEditorComponent } from '../text-editor/text-editor.component';
import { CodeEditorComponent } from '../code-editor/code-editor.component';
import { CommentContent } from '../shared/entities/CommentContent';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @ViewChild('addContentDiv')
  addContentDiv!: ElementRef;

  @ViewChild('codeEditorBox', { read: ViewContainerRef })
  codeEditorBox!: ViewContainerRef;

  allContent: NewContentItem[] = [];
  allContentPost: Content[] = []
  defaultCode = "# Write your code here";

  post: Post;
  contents: Content[] | undefined;
  user: any;
  forum: any;
  comments: any;
  commentValue: String = "";
  respondId: any;
  respondUsername: string | undefined;
  public loggedUser = this.authService.loggedUser;
  editMessage: any | null | undefined;
  commentCount: any;
  userPostVote: any;


  constructor(private route: ActivatedRoute, private userService: UserService, private forumService: ForumService, private postService: PostService, private authService: AuthService, private router: Router) {
    this.post = route.snapshot.data['postResolver'];

    this.userService.getUserById(Number(this.post.userId)).subscribe(value => {
      this.user = value
    });

    this.forumService.getForumById(Number(this.post.forumId)).subscribe(value => {
      this.forum = value
    });

    this.postService.getPostContentByPostId(Number(this.post.id)).subscribe(value => {
      this.contents = value
    });


    this.getComments();
    if(this.post.id && this.loggedUser) {
      this.postService.getUserUpvote(this.post.id).subscribe(data => {
        this.userPostVote = data;
      });
    }
  }

  ngOnInit(): void {
  }

  scrollToElement($element: any): void {
    $element.scrollIntoView({behavior: "smooth", block: "end", inline: "end"});
  }

  getComments(): void {
    this.postService.getPostComments(Number(this.post.id)).subscribe(value => {
      this.comments = value;
      this.getPostCommentCount();
    })
  }


  sendComment() {
    if(this.editMessage) {
      this.editComment();
      return;
    }

    if(this.respondUsername){
      this.commentValue =  '@' + this.respondUsername.toString() + ' ' + this.commentValue.toString();
    }
    const comment: Comment = {
      id: null,
      content: this.commentValue.toString(),
      commentParentId: this.respondId ?? null,
      userId: null,
      code: null,
      postId: Number(this.post.id),
      creationDate: null,
      lastUpdateDate: null
    }

    this.pushCodeAndTextInAllContentPost();
    let commentPost = new CommentContent(comment, this.allContentPost)

    this.postService.sendComment(commentPost).subscribe(value => {
      this.getComments();
      this.commentValue = "";
      this.respondUsername = undefined;
      this.respondId = null;

      this.allContent = [];
      this.codeEditorBox.clear();
    });
  }

  deleteComment(commentId: number) {
    if (confirm('Are you sure you want to delete your comment ?')) {
      this.postService.deleteComment(commentId).subscribe(response =>{
        this.getComments();
        this.allContent = [];
        this.codeEditorBox.clear();
      });
    }
  }
  deletePost() {
    if (this.loggedUser?.id === this.post.userId && confirm('Are you sure you want to delete your post ?')) {
      this.postService.deletePost(this.post.id).subscribe(response =>{
        this.router.navigate(['/']);
      });
    }
  }

  editSetup(comment: any) {
    this.editMessage = comment;
    this.commentValue = this.editMessage.content;
  }

  editComment(): void {
    this.editMessage.content = this.commentValue.toString();
    this.postService.editComment(this.editMessage).subscribe(data => {
      this.getComments();
      this.commentValue = '';
      this.respondId ='';
      this.respondUsername ='';
    });
  }

  getPostCommentCount(): void {
    this.postService.getCommentCount(Number(this.post.id)).subscribe(data => {
      this.commentCount = data;
    })
  }

  upvote(isUpvote: boolean) {
    const upvote: PostVote = {
      id: this.userPostVote ? this.userPostVote.id : null,
      upvote: isUpvote,
      postId: this.post.id,
      userId: null
    }
    this.postService.upvote(upvote).subscribe(data => {
      if(this.post.id) {
        this.postService.getPostById(this.post.id).subscribe(post => {
          this.post = post;
        });
        this.postService.getUserUpvote(this.post.id).subscribe(data => {
          this.userPostVote = data;
        }, error => {
          this.userPostVote = null;
        });
      }
    });
  }
  upvoteComment(isUpvote: boolean, comment: any, parentId: number|null) {
    const upvote: CommentVote = {
      id:  comment.optionalCommentVote ? comment.optionalCommentVote.id : null,
      upvote: isUpvote,
      commentId: comment.comment.id,
      userId: null
    }

    this.postService.upvoteComment(upvote).subscribe(data => {
      this.postService.getCommentById(comment.comment.id).subscribe(commentValue => {
        if(!!parentId) {
          let parentIndex = this.comments.findIndex((x: any) => x.comment.comment.id === parentId);
          let currentCommentIndex = this.comments[parentIndex].responses.findIndex((y:any) => y.comment.id === comment.comment.id);
          this.comments[parentIndex].responses[currentCommentIndex].comment = commentValue.comment.comment;
          this.comments[parentIndex].responses[currentCommentIndex].optionalCommentVote = commentValue.comment.optionalCommentVote;
        } else {
          let index = this.comments.findIndex((x: any) => x.comment.comment.id === comment.comment.id);
          this.comments[index] = commentValue;
        }
      });
    });
  }

  addContent(event: any) {
    this.addContentDiv.nativeElement.style.visibility = "visible";
    this.addContentDiv.nativeElement.style.top = event.pageY - 50 + "px";
    this.addContentDiv.nativeElement.style.left = event.pageX - 55 + "px";
  }

  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event: any): void {
     if (!this.addContentDiv.nativeElement.contains(event.target)) {
        this.addContentDiv.nativeElement.style.visibility = "hidden";
     }
  }

  addText(){
    this.allContent.push(new NewContentItem(TextEditorComponent, {index: uuidv4(), text: ""}));
    let newCode = this.codeEditorBox.createComponent<ContentEditorComponent>(this.allContent[this.allContent.length - 1].component);
    newCode.instance.data = this.allContent[this.allContent.length - 1].data;

    newCode.instance.deleteEvent.pipe().subscribe((value: any) => {
      let currentContent = this.allContent.find(x => x.data.index === value);
      if (currentContent) {
        this.allContent.splice(this.allContent.indexOf(currentContent), 1);
      }
      newCode.destroy();
    });


    this.addContentDiv.nativeElement.style.visibility = "hidden";
  }

  addCode(){
    this.allContent.push(new NewContentItem(CodeEditorComponent, {index: uuidv4(), code: this.defaultCode, language: "python"}));
    let newCode = this.codeEditorBox.createComponent<ContentEditorComponent>(this.allContent[this.allContent.length - 1].component);
    newCode.instance.data = this.allContent[this.allContent.length - 1].data;

    newCode.instance.deleteEvent.pipe().subscribe((value: any) => {
      let currentContent = this.allContent.find(x => x.data.index === value);
      if (currentContent) {
        this.allContent.splice(this.allContent.indexOf(currentContent), 1);
      }
      newCode.destroy();
    });

    this.addContentDiv.nativeElement.style.visibility = "hidden";
  }

  pushCodeAndTextInAllContentPost() {

    let i = 0;
    this.allContentPost = [];
    this.allContent.forEach(value => {
      if (value.component === CodeEditorComponent) {
        this.allContentPost.push(new Content(null, value.data.code, null, 1, i, value.data.language));
      } else if (value.component === TextEditorComponent) {
        this.allContentPost.push(new Content(null, value.data.text, null, 0, i, null));
      }

      i++;
    }
    )
  }
  isSameDate(date1Str : any, date2Str: any): boolean {
    const date1 = new Date(date1Str);
    const date2 = new Date(date2Str);
    return( date1.getDate() == date2.getDate() && date1.getFullYear() == date2.getFullYear()
      && date1.getMonth() == date2.getMonth() && date1.getHours() == date2.getHours());

  }
}
