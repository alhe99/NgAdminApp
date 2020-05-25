import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu: any = [
    {
      tittle: 'Principal',
      icon: 'mdi mdi-gauge',
      submenu: [
        {
          tittle: 'Dashboard',
          url: '/dashboard'
        },
        {
          tittle: 'ProgressBar',
          url: '/progress'
        },
        {
          tittle: 'Gráficas',
          url: '/graficas1'
        },
        {
          tittle: 'Promesas',
          url: '/promesas'
        },
        {
          tittle: 'RxJS',
          url: '/rxjs'
        }
      ]
    }
  ];

  constructor() { }
}
