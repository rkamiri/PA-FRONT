import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {ForumService} from "../shared/services/forumService";
import {Forum} from "../shared/entities/Forum";
import {Post} from "../shared/entities/Post";
import {PostService} from "../shared/services/postService";

@Injectable({ providedIn: 'root' })
export class PostResolver implements Resolve<Post> {
  constructor(private service: PostService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Post>|Promise<Post>|Post {
    const id = route.paramMap.get('id');
    if(!id && isNaN(Number(id))){
      this.router.navigate(['404']);
    }

    const value = this.service.getPostById(Number(id));
    value.subscribe(value1 => {}, error => {
      this.router.navigate(['404']);
    })

    return value;
  }
}
