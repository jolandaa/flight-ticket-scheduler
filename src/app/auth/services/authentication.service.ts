import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from 'firebase/compat/app';
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userData: Observable<firebase.User | null>;

  constructor(private angularFireAuth: AngularFireAuth,
              private firestore: AngularFirestore) {
    this.userData = angularFireAuth.authState;
  }

}
