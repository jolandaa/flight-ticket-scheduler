import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./components/main/main.component";
import {TicketListComponent} from "./components/ticket-list/ticket-list.component";
import {AddTicketComponent} from "./components/add-ticket/add-ticket.component";
import {EditTicketComponent} from "./components/edit-ticket/edit-ticket.component";

const routes: Routes = [
  {
    path: "",
    component: MainComponent,
    children: [
      {
        path: "ticket-list",
        component: TicketListComponent,
      },
      {
        path: "add-ticket",
        component: AddTicketComponent,
      },
      {
        path: "edit-ticket",
        component: EditTicketComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
