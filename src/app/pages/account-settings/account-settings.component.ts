import { Component, OnInit, Inject } from '@angular/core';
import { SettingsService } from 'src/app/services/settings/settings.service';


@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(
    private _ss: SettingsService
  ) { }

  ngOnInit(): void {
    this.setCheck();
  }

  changeTheme(color: string, link: any) {
    this.doCheck(link);
    this._ss.setTheme(color);
  }

  doCheck(link: any) {
    const selectors: any = document.getElementsByClassName('selector');

    for (const ref of selectors) {
      ref.classList.remove('working');
    }

    link.classList.add('working');
  }
  setCheck() {
    const selectors: any = document.getElementsByClassName('selector');
    const theme = this._ss.settings.theme;

    for (const ref of selectors) {
      if (ref.getAttribute('data-theme') === theme) {
        ref.classList.add('working');
        break;
      }
    }
  }
}
