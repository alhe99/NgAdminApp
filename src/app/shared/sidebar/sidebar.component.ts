import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/shared/sidebar.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor(
    public _ss: SidebarService,
    private _us: UserService
  ) { }

  ngOnInit(): void {
  }

  public logout(): void {
    this._us.logout();
  }

}
