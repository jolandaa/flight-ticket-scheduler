import {Component, OnDestroy, OnInit} from '@angular/core';
import {TicketService} from "../../services/ticket.service";
import {distinctUntilChanged, map, Observable, tap} from "rxjs";
import {TicketDetailsModel} from "../../models/ticket-details.model";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit, OnDestroy {

  currentUser = JSON.parse(<string>localStorage.getItem('currentUser'))


  filterByTicketType = '';

  flightTicketList$:Observable<any> = this.ticketService.flightTicketList
    .pipe(
      distinctUntilChanged(),
      map((data: any) => data),
      tap((data: TicketDetailsModel[]) => {
        return data;
      }),
    );

  constructor(public ticketService: TicketService) {
  }

  ngOnInit(): void {
    this.ticketService.getFlightTicketList()
  }

  filterTicketFlight(fieldPath: string, condition:string, filterValue: string) {
    if (filterValue != 'null') {
      this.ticketService.getFlightTicketList({fieldPath:fieldPath, condition:condition, filterValue: filterValue})
    } else {
      this.ticketService.getFlightTicketList()
    }
  }

  clearFilters(){
    this.ticketService.getFlightTicketList()
    this.filterByTicketType = '';
  }

  ngOnDestroy() {
    this.ticketService.flightTicketList.next([])
  }
}
