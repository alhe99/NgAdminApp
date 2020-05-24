import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  settings: Settings = {
    themeurl: 'assets/css/colors/default.css',
    theme: 'default'
  };

  constructor(
    @Inject(DOCUMENT) private _document,
  ) {
    this.loadSettings();
  }

  saveSettings() {
    localStorage.setItem('settings', JSON.stringify(this.settings));
  }

  loadSettings() {
    if (localStorage.getItem('settings')) {
      this.settings = JSON.parse(localStorage.getItem('settings'));
    }
    this.setTheme(this.settings.theme);
  }

  setTheme(theme: string) {
    const URL: string = `assets/css/colors/${theme}.css`;
    this._document.getElementById('theme').setAttribute('href', URL);
    this.settings.theme = theme;
    this.settings.themeurl = URL;
    this.saveSettings();
  }
}

interface Settings {
  themeurl: string;
  theme: string;
}
