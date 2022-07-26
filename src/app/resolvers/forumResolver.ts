import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {ForumService} from "../shared/services/forumService";
import {Forum} from "../shared/entities/Forum";

@Injectable({ providedIn: 'root' })
export class ForumResolver implements Resolve<Forum> {
  constructor(private service: ForumService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Forum>|Promise<Forum>|Forum {
    const id = route.paramMap.get('id');
    if(!id && isNaN(Number(id))){
      this.router.navigate(['404']);
    }

    const value = this.service.getForumById(Number(id));
    value.subscribe(value1 => {}, error => {
      this.router.navigate(['404']);
    })

    return value;
  }
}
