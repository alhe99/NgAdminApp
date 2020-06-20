import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from '../services/user/user.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  public form: FormGroup;

  constructor(
    private _us: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    init_plugins();

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      conditions: new FormControl(false)
    }, { validators: this.areEquals('password', 'password2') });

    this.form.setValue({
      name: 'test',
      email: 'test@test.com',
      password: '123456',
      password2: '123456',
      conditions: true
    });
  }

  areEquals(val1: string, val2: string) {
    return (group: FormGroup) => {
      let pass1 = group.controls[val1].value;
      let pass2 = group.controls[val2].value;

      if (pass1 === pass2) {
        return null;
      }

      return {
        areEquals: true
      };
    }
  }
  public registerUser(): void {

    if (this.form.invalid) {
      return;
    }

    if (!this.form.value.conditions) {
      Swal.fire({
        title: 'Warning!',
        text: 'Conditions is required!',
        icon: 'warning',
        confirmButtonText: 'Ok'
      });
      return;
    }

    const user = new User(
      this.form.value.name,
      this.form.value.email,
      this.form.value.password
    );

    this._us.createUser(user)
      .subscribe(response => this.router.navigate(['/login']));

  }

}
