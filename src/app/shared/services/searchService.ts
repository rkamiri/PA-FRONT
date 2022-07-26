import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private API_URL= environment.API_URL;

  constructor(private httpclient: HttpClient) {}


  lightSearch(search: String): Observable<any> {
    return this.httpclient.get<any>(
      this.API_URL + 'search/light-search/' + search
    );
  }

  fullSearch(searchString: string) : Observable<any> {
    return this.httpclient.get<any>(
      this.API_URL + 'search/' + searchString
    );
  }
}
