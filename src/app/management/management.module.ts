import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TicketListComponent } from './components/ticket-list/ticket-list.component';
import { MainComponent } from './components/main/main.component';
import { AddTicketComponent } from './components/add-ticket/add-ticket.component';
import { ViewTicketComponent } from './components/view-ticket/view-ticket.component';
import {ManagementRoutingModule} from "./management.routing";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {NgChartsModule} from "ng2-charts";

@NgModule({
  declarations: [

    TicketListComponent,
       MainComponent,
       AddTicketComponent,
       ViewTicketComponent,
       DashboardComponent
  ],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgChartsModule
  ]
})
export class ManagementModule { }
