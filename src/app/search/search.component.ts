import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";
import {SearchService} from "../shared/services/searchService";
import {UserService} from "../shared/services/userService";
import {AuthService} from "../shared/services/authService";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public searchResults: any;
  public loggedUser = this.authService.loggedUser;

  constructor(private authService: AuthService, private route: ActivatedRoute, private searchService: SearchService, private routing: Router, private userService: UserService) {
    if(!this.authService.loggedUser) {
      setTimeout(() => {
        this.loggedUser = this.authService.loggedUser}, 1000);
    }
  }
  private searchString: string = "";
  ngOnInit(): void {
    const search = this.route.snapshot.paramMap.get("search");
    this.searchString = search ? search : "";
    this.searchService.fullSearch(this.searchString).subscribe(data => {
      this.searchResults = data;
    })
  }

  goToUser(id: number) {
    this.routing.navigate(["account/" + id]);
  }

  goToPost(id: number) {
    this.routing.navigate(["post/" + id]);

  }

  addFriend(userResult: any) {
    this.userService.addFriend(userResult.user.id).subscribe(data => {
      userResult.friend = true;
      userResult.accepted = data.isAccepted;
    });
  }
}
