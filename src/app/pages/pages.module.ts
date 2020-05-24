import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { IncrementerComponent } from '../components/incrementer/incrementer.component';

import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages-routing.module';
import { FormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts';
import { GraphicComponent } from '../components/graphic/graphic.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

const components = [
  PagesComponent,
  DashboardComponent,
  ProgressComponent,
  Graficas1Component,
  IncrementerComponent,
  GraphicComponent
];

@NgModule({
  declarations: [
    ...components,
    AccountSettingsComponent
  ],
  exports: [
    ...components
  ],
  imports: [
    SharedModule,
    PagesRoutingModule,
    FormsModule,
    ChartsModule
  ]
})
export class PagesModule { }
