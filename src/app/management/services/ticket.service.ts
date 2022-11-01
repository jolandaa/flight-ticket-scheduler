import {Injectable, NgZone} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../auth/services/authentication.service";
import {BehaviorSubject} from "rxjs";
import {TicketDetailsModel, WhereFilterOp} from "../models/ticket-details.model";

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  flightTicketList: BehaviorSubject<TicketDetailsModel[]> = new BehaviorSubject<TicketDetailsModel[]>([]);
  currentUser = JSON.parse(<string>localStorage.getItem('currentUser'))

  constructor(private angularFireAuth: AngularFireAuth,
              private firestore: AngularFirestore,
              private router: Router,
              private ngZone: NgZone,
              private authenticationService: AuthenticationService) {
  }


  getFlightTicketList() {
    this.firestore.collection('users').doc(this.currentUser.id).collection('flight-ticket-scheduler').ref.onSnapshot(snap => {
      const flightTicketList: any[] = []
      snap.forEach(res => {
        flightTicketList.push({...res.data(), id: res.id})
      })
      this.flightTicketList.next(flightTicketList)
    })
  }

  async addFlightTicket(data: TicketDetailsModel) {
    const hasWithSameInbound = await this.filterTicketFlight('inbound', '==', data.inbound);
    const hasWithSameOutbound = await this.filterTicketFlight('outbound', '==', data.outbound);
    const hasWithSameFromDate = await this.filterTicketFlight('from_date', '==', data.from_date);
    const hasWithSameToDate = await this.filterTicketFlight('to_date', '==', data.to_date);
    const hasWithSameSeatNumber = await this.filterTicketFlight('seat_number', '==', data.seat_number);

    const filtersArr = [hasWithSameInbound,hasWithSameOutbound,hasWithSameFromDate,hasWithSameToDate,hasWithSameSeatNumber]
    const hasAllSameValue = filtersArr.every(e => e);

    if (!hasAllSameValue) {
      return this.firestore.collection('users').doc(this.currentUser.id).collection('flight-ticket-scheduler').add(data)

    }
    return;
  }

  getSingleTicket(id: string) {
    return this.firestore.collection('users').doc(this.currentUser.id).collection('flight-ticket-scheduler').doc(id).ref.get()
  }


  filterTicketFlight(fieldPath: string, condition: WhereFilterOp, filterValue: string | number | Date | undefined) {
    return new Promise<any>((resolve)=> {
      this.firestore.collection('users').doc(this.currentUser.id).collection('flight-ticket-scheduler').ref
        .where(fieldPath, condition, filterValue).onSnapshot(filteredList => resolve(!filteredList.empty))
    })
  }

}
