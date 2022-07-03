import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Emitters } from './models/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  isAdmin: boolean = false;
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!!localStorage.getItem('token')) {
      return true;
    }

    return this.router.createUrlTree(['/home']);
  }
}
