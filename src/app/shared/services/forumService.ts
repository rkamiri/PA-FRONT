import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Forum} from "../entities/Forum";
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  private API_URL= environment.API_URL;

  constructor(private httpclient: HttpClient) {
  }


  public getForums(limit: number, offset: number): Observable<Array<Forum>> {
    return this.httpclient.get<Array<Forum>>(
      this.API_URL + 'forums/all/limit/' + limit + '/offset/' + offset
    );
  }

  getForumById(id: number): Observable<Forum> {
    return this.httpclient.get<Forum>(
      this.API_URL + 'forums/0' + id)
  }
}
