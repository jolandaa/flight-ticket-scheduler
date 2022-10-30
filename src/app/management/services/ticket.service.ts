import {Injectable, NgZone} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../auth/services/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private angularFireAuth: AngularFireAuth,
              private firestore: AngularFirestore,
              private router: Router,
              private ngZone: NgZone,
              private authenticationService: AuthenticationService) {
  }


  getFlightTicketList() {
    const currentUser = JSON.parse(<string>localStorage.getItem('currentUser'))
    this.firestore.collection('users').doc(currentUser.id).collection('flight-ticket-scheduler').valueChanges().subscribe(res => {
      console.log(res)
    })
  }

  addFlightTicket() {
    const currentUser = this.authenticationService.currentUser
    this.firestore.collection('users').doc(currentUser.id).collection('flight-ticket-scheduler').add({
      password: 'this.password',
      name: 'this.name',
      rollno:' this.rollno'
    })
  }
}
