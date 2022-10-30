import {Component, OnDestroy, OnInit} from '@angular/core';
import {TicketService} from "../../services/ticket.service";
import {distinctUntilChanged, map, Observable, tap} from "rxjs";
import {TicketDetailsModel} from "../../models/ticket-details.model";

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit, OnDestroy {

  currentUser = JSON.parse(<string>localStorage.getItem('currentUser'))


  flightTicketList$:Observable<any> = this.ticketService.flightTicketList
    .pipe(
      distinctUntilChanged(),
      map((data: any) => data),
      tap((data: TicketDetailsModel[]) => {
        return data;
      }),
    );

  constructor(private ticketService: TicketService) { }

  ngOnInit(): void {
    this.ticketService.getFlightTicketList()
  }

  ngOnDestroy() {
    this.ticketService.flightTicketList.next([])
  }
}
