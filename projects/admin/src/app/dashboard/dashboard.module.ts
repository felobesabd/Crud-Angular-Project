import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    LayoutComponent
  ],

  imports: [
    CommonModule,
    DashboardRoutingModule,
    ToastrModule
  ]

})
export class DashboardModule { }
