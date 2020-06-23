import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserService } from '../user/user.service';
import { resolve } from 'dns';
import { NodeWithI18n } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class CheckTokenGuard implements CanActivate {

  constructor(
    private _us: UserService
  ) { }

  canActivate(): Promise<boolean> | boolean {
    const TOKEN = this._us.token;
    const payload = JSON.parse(atob(TOKEN.split('.')[1]));
    const expired = this.expiredToken(payload.exp);

    if (expired) {
      return false;
    }
    return this.checkToken(payload.exp);
  }

  private checkToken(dateExp: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const tokenExp = new Date(dateExp * 1000);
      const now = new Date();

      //SI falta 1 hora para que expire el token se renovara
      now.setTime(now.getTime() + (1 * 60 * 60 * 1000));

      if (tokenExp.getTime() > now.getTime()) {
        resolve(true);
      } else {
        //REFRESH TOKEN
        resolve(true);
      }
    });
  }
  private expiredToken(date: number) {
    const now = new Date().getTime() / 1000;
    if (date < now) {
      return true;
    } else {
      return false;
    }
  }

}
