import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./components/main/main.component";
import {TicketListComponent} from "./components/ticket-list/ticket-list.component";
import {AddTicketComponent} from "./components/add-ticket/add-ticket.component";
import {ViewTicketComponent} from "./components/view-ticket/view-ticket.component";
import {RoleGuard} from "../auth/guards/role.guard";

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
        canActivate:[RoleGuard]
      },
      {
        path: "view-ticket/:ticketId",
        component: ViewTicketComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
