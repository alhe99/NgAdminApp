import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(
    private _us: UserService,
    private router: Router
  ) {

  }
  canActivate(): boolean {

    if (this._us.isLoggin()) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }

}
