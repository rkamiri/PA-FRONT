import {Component, OnInit} from '@angular/core';
import {ForumService} from "../shared/services/forumService";
import {Forum} from "../shared/entities/Forum";
import {AuthService} from "../shared/services/authService";
import {UserForumRelation} from "../shared/entities/UserForumRelation";
import {UserForumRelationService} from "../shared/services/userForumRelationService";

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.scss']
})
export class RecommendationComponent implements OnInit {

  private limit: number = 5;
  private offset: number = 0;
  public forums: Array<Forum> = [];
  public loadMore: boolean = true;
  public joinnedForums: Array<number> = [];
  public isUserLogged: boolean = false;
  constructor(private forumService: ForumService, private userForumRelationService: UserForumRelationService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.getForums();
  }

  private getForums(): void {

    this.forumService.getForums(this.limit, this.offset).subscribe((data) => {
      this.loadMore = data.length === this.limit;
      (data.forEach(item => {
        this.forums.push(item);
      }))
    });

    this.authService.getCurrentUser().subscribe(value => {
      if (!!value) {
        this.isUserLogged = true;
        this.userForumRelationService.getAllLoggedUserRelations().subscribe(data => {
          data.forEach(item => {
            this.joinnedForums.push(item.forumId);
          })
        })
      }
    });
  }

  getMore()
    :
    void {
    this.offset++;
    this.getForums();
  }

  joinForum(forumId: number) {
    this.userForumRelationService.addUserForumRelation(forumId).subscribe(value =>{
      if (!!value){
        this.joinnedForums.push(value.forumId);
      }
    })
  }
}
