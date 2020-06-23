import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API: string = '';
  public user: User;
  public token: string;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.API = environment.URL_API;
    this.loadStorage();
  }

  public createUser(user: User): Observable<any> {
    return this.http.post(this.API + '/user', user)
      .pipe(map((data: any) => {

        Swal.fire('User created!', user.email, 'success');
        return data.user;
      }));
  }

  public googleLogin(token: string): Observable<any> {
    return this.http.post(this.API + '/login/google', { token })
      .pipe(map((resp: any) => {
        this.saveStore(resp.id, resp.token, resp.body);
        return true;
      }));
  }

  public isLoggin(): boolean {
    return (this.token.length > 1) ? true : false;
  }

  private loadStorage(): void {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
    } else {
      this.token = '';
      this.user = null;
    }
  }

  public login(user: User, remember: boolean = false) {

    if (remember) {
      localStorage.setItem('remember', user.email);
    } else {
      localStorage.removeItem('remember');
    }
    return this.http.post(this.API + '/login', user)
      .pipe(map((data: any) => {
        this.saveStore(data.id, data.token, data.body);
        return true;
      }), catchError(err => {
        Swal.fire('Login Error!', err.error.message, 'error');
        return throwError(err);
      }));
  }

  private saveStore(id: string, token: string, user: User): void {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    this.user = user;
    this.token = token;
  }

  public logout(): void {
    this.user = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('id');

    this.router.navigateByUrl('/login');
  }
}
