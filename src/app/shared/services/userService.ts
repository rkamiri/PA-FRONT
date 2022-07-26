import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from "../entities/User";
import {Friend} from "../entities/Friend";
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL= environment.API_URL;

  constructor(private httpclient: HttpClient) {}


  getUserById(id: number): Observable<User> {
    return this.httpclient.get<User>(
      this.API_URL + 'users/' + id
    );
  }

  updateUserById(id: number, user: User): Observable<User> {
    return this.httpclient.put<User>(
      this.API_URL + 'users/' + id, user
    )
  }

  changePasswordEmail() : Observable<boolean>{
    return this.httpclient.post<boolean>(this.API_URL + 'users/send-password-edit', {})
  }

  changePassword(password: String, token: String) : Observable<boolean>{
    return this.httpclient.post<boolean>(this.API_URL + 'users/change-password/' + password + "/token/" + token, {})
  }

  checkToken(token: any): Observable<boolean> {
    return this.httpclient.get<boolean>(this.API_URL + 'users/token/' + token);

  }

  lostPassword(email: String) {
    return this.httpclient.post<boolean>(this.API_URL + 'users/lost-password/' + email, {});
  }

  uploadPp(image: any): Observable<String> {
    var fd = new FormData();
    fd.append(image.name, image);

    return this.httpclient.post(this.API_URL + 'users/profile-picture', fd,  {responseType: 'text'})
  }

  addFriend(id: Number): Observable<Friend> {
    return this.httpclient.post<Friend>(this.API_URL + 'friends/add-friend/' + id, {});
  }

  getIsFriend(id: Number): Observable<Friend> {
    return this.httpclient.get<Friend>(this.API_URL + 'friends/is-friend/' + id, {});
  }

  getFriendList(id: Number): Observable<any> {
    return this.httpclient.get<any>(this.API_URL + 'friends/list/' + id, {});
  }

  acceptFriend(id: Number): Observable<any> {
    return this.httpclient.post<any>(this.API_URL + 'friends/accept-friend/' + id, {});
  }

  test(program: String): Observable<any>  {

    return this.httpclient.post<any>( this.API_URL + "users/test-code", program);
  }
}
