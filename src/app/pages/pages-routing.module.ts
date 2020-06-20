import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuardGuard } from '../services/guards/auth-guard.guard';

const pagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [AuthGuardGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent, data: { tittle: 'Dashboard' } },
      { path: 'progress', component: ProgressComponent, data: { tittle: 'Progress Bar' } },
      { path: 'graficas1', component: Graficas1Component, data: { tittle: 'Gráficas' } },
      { path: 'promesas', component: PromesasComponent, data: { tittle: 'Promises' } },
      { path: 'rxjs', component: RxjsComponent, data: { tittle: 'RxJS' } },
      { path: 'account-settings', component: AccountSettingsComponent, data: { tittle: 'Settings' } },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(pagesRoutes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
