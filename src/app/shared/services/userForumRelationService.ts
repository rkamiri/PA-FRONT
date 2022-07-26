import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
import {UserForumRelation} from "../entities/UserForumRelation";
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserForumRelationService {
  private API_URL= environment.API_URL;

  constructor(private httpclient: HttpClient) {
  }

  public addUserForumRelation(forumId: number): Observable<UserForumRelation> {
    return this.httpclient.post<UserForumRelation>(
      this.API_URL + 'user-forum-relation/add/forum/' + forumId, {}
    );
  }

  public getUserForumRelation(forumId: number): Observable<UserForumRelation> {
    return this.httpclient.get<UserForumRelation>(
      this.API_URL + 'user-forum-relation/forum/' + forumId
    );
  }

  public deleteUserForumRelation(forumId: number): Observable<boolean> {
    return this.httpclient.delete<boolean>(
      this.API_URL + 'user-forum-relation/delete/forum/' + forumId, {}
    );
  }

  getAllLoggedUserRelations(): Observable<Array<UserForumRelation>>{
    return this.httpclient.get<Array<UserForumRelation>>(
      this.API_URL + 'user-forum-relation/all-by-logged-user'
    );
  }
}
