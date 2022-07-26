import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {User} from "../shared/entities/User";
import {Observable} from "rxjs";
import {UserService} from "../shared/services/userService";

@Injectable({ providedIn: 'root' })
export class UserResolver implements Resolve<User> {
  constructor(private service: UserService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<User>|Promise<User>|User {
    const id = route.paramMap.get('id');
    if(!id && isNaN(Number(id))){
      this.router.navigate(['404']);
    }

    const value = this.service.getUserById(Number(id));
    value.subscribe(value1 => {}, error => {
      this.router.navigate(['404']);
    })

    return value;
  }
}
