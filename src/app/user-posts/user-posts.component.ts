import {Component, HostListener, OnInit} from '@angular/core';
import {PostVote} from "../shared/entities/PostVote";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../shared/services/authService";
import {HiddenParamsService} from "../shared/services/hiddenParamsService";
import {PostService} from "../shared/services/postService";
import {UserService} from "../shared/services/userService";
import {User} from "../shared/entities/User";

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.scss']
})
export class UserPostsComponent implements OnInit {

  public forum: any
  public loggedUser = this.authService.loggedUser;
  posts = <any[]>([]);
  private category: string = 'Popular';
  private limit: number  = 10;
  private offset: number = 0;
  private loading: boolean = true;
  private stopCalls: boolean = false;
  private userId: any = this.route.snapshot.params['userId'];
  user: any = null;

  constructor(private route: ActivatedRoute,
              private authService: AuthService, private router: Router, private hiddenParamsService: HiddenParamsService,
              private postService: PostService, private userService: UserService) {
    if(!this.userId) {
      this.router.navigate(['/']);
    }

    this.userService.getUserById(this.userId).subscribe(data => {
      this.user = data;
    })
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
    this.getPost();
  }

  isSameDate(date1Str : string, date2Str: string): boolean {
    const date1 = new Date(date1Str);
    const date2 = new Date(date2Str);
    return( date1.getDate() == date2.getDate() && date1.getFullYear() == date2.getFullYear()
      && date1.getMonth() == date2.getMonth() && date1.getHours() == date2.getHours());

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

  goToPost(id: Number) {
    this.router.navigate(['/post/' + id])
  }
  getPost() {
    if(this.stopCalls) {
      return;
    }
    this.postService.getPostsForUser(this.userId, this.category, this.offset, this.limit).subscribe(data => {
      data.forEach((item: any) => {
        this.posts.push(item);
      })
      if(data.length < this.limit) {
        this.stopCalls = true;
      }
      this.loading = false;
    })
  }

}
