import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  public user: User;
  constructor(
    public _us: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = this._us.user;
  }

  public logout(): void {
    this._us.logout();
  }

  public search(query: string) {
    this.router.navigate(['/search', query.trim()]);
  }

}
