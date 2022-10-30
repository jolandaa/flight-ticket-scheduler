import { Component, OnInit } from '@angular/core';
import {TicketService} from "../../services/ticket.service";

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {

  currentUser = JSON.parse(<string>localStorage.getItem('currentUser'))
  constructor(private ticketService: TicketService) { }

  ngOnInit(): void {
    this.ticketService.getFlightTicketList()
  }


  addTicket() {
    this.ticketService.addFlightTicket()
  }
}
