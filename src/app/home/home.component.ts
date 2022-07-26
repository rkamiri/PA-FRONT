import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserForumRelationService} from "../shared/services/userForumRelationService";
import {AuthService} from "../shared/services/authService";
import {HiddenParamsService} from "../shared/services/hiddenParamsService";
import {PostService} from "../shared/services/postService";
import {PostVote} from "../shared/entities/PostVote";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
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
    if(!this.authService.loggedUser) {
      setTimeout(() => {
        this.loggedUser = this.authService.loggedUser}, 1000);
    }
  }

  ngOnInit(): void {
    this.getPost();
  }

  createPost() {
    this.router.navigate(
      ['/post-create']);
  }

  getPost() {
    if(this.stopCalls) {
      return;
    }
    this.postService.getPostsForHome(this.category, this.offset, this.limit).subscribe(data => {
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


  @HostListener("window:scroll", [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= (document.body.scrollHeight -1)) {
      this.offset = this.limit;
      this.loading = true;
      this.getPost();
    }
  }
}
