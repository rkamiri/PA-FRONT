import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {UserForumRelationService} from "../shared/services/userForumRelationService";
import {AuthService} from "../shared/services/authService";
import {HiddenParamsService} from "../shared/services/hiddenParamsService";
import {PostService} from "../shared/services/postService";
import {PostVote} from "../shared/entities/PostVote";

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {
  public forum: any
  public hasJoinned = false;
  public loggedUser = this.authService.loggedUser;
  posts = <any[]>([]);
  private category: string = 'Popular';
  private limit: number  = 10;
  private offset: number = 0;
  private loading: boolean = true;
  private stopCalls: boolean = false;

  constructor(private route: ActivatedRoute, private userForumRelationService: UserForumRelationService,
              private authService: AuthService, private router: Router, private hiddenParamsService: HiddenParamsService,
              private postService: PostService) {
    this.forum = route.snapshot.data['forumResolver'];
  }
  @HostListener("window:scroll", [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
      this.offset = this.limit;
      this.loading = true;
      this.getPost();
    }
  }
  ngOnInit(): void {
    this.getUserForumRelation();
    this.getPost();
  }

  joinOrQuit() {
    if (this.hasJoinned) {
      this.userForumRelationService.deleteUserForumRelation(this.forum.id).subscribe(value => {
        this.hasJoinned = !value;
      }, error => {
        this.hasJoinned = true;
      });
    } else {
      if (this.loggedUser) {
        this.userForumRelationService.addUserForumRelation(this.forum.id).subscribe(value => {
            this.hasJoinned = !!value;
          }
        );
      }
    }
  }

  getUserForumRelation() {
    this.userForumRelationService.getUserForumRelation(this.forum.id).subscribe(value => {
      if (value === null) {
        this.hasJoinned = false;
      } else {
        this.hasJoinned = true;
      }
    }, error => {
      this.hasJoinned = false;
    })
  }

  createPost() {
    this.hiddenParamsService.setParam(this.forum.id);
    this.router.navigate(
      ['/post-create']);
  }

  getPost() {
    if(this.stopCalls) {
      return;
    }
    this.postService.getPostsForForum(this.forum.id, this.category, this.offset, this.limit).subscribe(data => {
      data.forEach((item: any) => {
        this.posts.push(item);
      })
      if(data.length < this.limit) {
        this.stopCalls = true;
      }
      this.loading = false;
    })
  }

  isSameDate(date1Str : string, date2Str: string): boolean {
    const date1 = new Date(date1Str);
    const date2 = new Date(date2Str);
    return( date1.getDate() == date2.getDate() && date1.getFullYear() == date2.getFullYear()
      && date1.getMonth() == date2.getMonth() && date1.getHours() == date2.getHours());

  }

  goToPost(id: Number) {
    this.router.navigate(['/post/' + id])
  }

  isSelected(category: string) {
    return this.category === category ? 'selected' : '';
  }

  select(category: string) {
    this.category = category;
    this.offset = 0;
    this.posts = [];
    this.stopCalls = false;
    this.getPost();
  }

  upvote(isUpvote: boolean, postItem: any) {
    const upvote: PostVote = {
      id: null,
      upvote: isUpvote,
      postId: postItem.post.id,
      userId: null
    }
    this.postService.upvote(upvote).subscribe(data => {
          postItem.upvote = data ? data.upvote : null;
          postItem.hasUpvote = !!data;
          this.postService.getPostById(postItem.post.id).subscribe(post => {
            postItem.post = post;
      });
    });
  }

}
