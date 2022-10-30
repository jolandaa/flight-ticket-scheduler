import {Injectable, NgZone} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../auth/services/authentication.service";
import {BehaviorSubject} from "rxjs";
import {TicketDetailsModel} from "../models/ticket-details.model";

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  flightTicketList: BehaviorSubject<TicketDetailsModel[]> = new BehaviorSubject<TicketDetailsModel[]>([]);

  constructor(private angularFireAuth: AngularFireAuth,
              private firestore: AngularFirestore,
              private router: Router,
              private ngZone: NgZone,
              private authenticationService: AuthenticationService) {
  }


  getFlightTicketList() {
    const currentUser = JSON.parse(<string>localStorage.getItem('currentUser'))
    this.firestore.collection('users').doc(currentUser.id).collection('flight-ticket-scheduler').ref.onSnapshot(snap => {
      const flightTicketList: any[] = []
      snap.forEach(res => {
        flightTicketList.push({...res.data(), id: res.id})
      })
      this.flightTicketList.next(flightTicketList)
    })
  }

  addFlightTicket(data: any) {
    const currentUser = this.authenticationService.currentUser
    return this.firestore.collection('users').doc(currentUser.id).collection('flight-ticket-scheduler').add(data)
  }

  getSingleTicket(id: string) {
    const currentUser = JSON.parse(<string>localStorage.getItem('currentUser'))
    return this.firestore.collection('users').doc(currentUser.id).collection('flight-ticket-scheduler').doc(id).ref.get()
  }
}
