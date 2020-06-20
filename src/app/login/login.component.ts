import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user/user.service';
import { User } from '../models/user.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public remember = false;
  public email: string;
  public auth2: any;

  constructor(
    private router: Router,
    private _us: UserService
  ) { }

  ngOnInit(): void {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('remember') || '';
    if (this.email.length > 0) {
      this.remember = true;
    }
  }

  private googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '333301943299-0om7ip82le74t4favbgnnenhroudmn7i.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin(document.getElementById('btnGoogle'));
    });
  }

  public attachSignin(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      // const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;
      this._us.googleLogin(token)
        .subscribe(response => window.location.href = '#/dashboard');

    });
  }

  login(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const user = new User(
      null,
      form.value.email,
      form.value.password
    );

    this._us.login(user, form.value.remember)
      .subscribe(response => window.location.href = '#/dashboard');
  }
}
