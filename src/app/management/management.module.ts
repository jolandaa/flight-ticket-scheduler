import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import { TicketListComponent } from './components/ticket-list/ticket-list.component';
import { MainComponent } from './components/main/main.component';
import { AddTicketComponent } from './components/add-ticket/add-ticket.component';
import { EditTicketComponent } from './components/edit-ticket/edit-ticket.component';
import {ManagementRoutingModule} from "./management.routing";

@NgModule({
  declarations: [

    TicketListComponent,
       MainComponent,
       AddTicketComponent,
       EditTicketComponent
  ],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    ReactiveFormsModule
  ]
})
export class ManagementModule { }
