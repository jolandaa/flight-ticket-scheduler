import {Injectable, NgZone} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from 'firebase/compat/app';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserDetailsModel} from "../models/user-details.model";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userData: Observable<firebase.User | null>;

  public currentUser!: UserDetailsModel | any;
  public userStatus!: string;
  public userStatusChanges: BehaviorSubject<string> = new BehaviorSubject<string>(this.userStatus);

  constructor(private angularFireAuth: AngularFireAuth,
              private firestore: AngularFirestore,
              private router: Router,
              private ngZone: NgZone,
              private snackBar: MatSnackBar) {
    this.userData = angularFireAuth.authState;
  }

  setUserStatus(userStatus: any): void {
    this.userStatus = userStatus;
    this.userStatusChanges.next(userStatus);
  }

  /* Sign up */
  signUp(email: string, password: string) {
    this.angularFireAuth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {

        let user = {
          id: res?.user?.uid,
          username: res?.user?.email,
          role: "user",
        }

        //add the user to the database
        this.firestore.collection("users").add(user)
          .then(user => {
            user.get().then(x => {
              //return the user data
              console.log(x.data());
              this.router.navigate(['/auth/login'])
            })
          }).catch(err => {
          console.log(err);
        })
      })
      .catch(error => {
        console.log('Something is wrong:', error.message);
        this.snackBar.open('Something went wrong:' + error.message)
      });
  }

  /* Sign in */
  login(email: string, password: string) {
    this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        this.firestore.collection("users").ref.where("username", "==", res.user?.email).onSnapshot(snap =>{
          snap.forEach(userRef => {
            this.currentUser = userRef.data();
            this.currentUser = {...this.currentUser, uid: res.user?.uid, id: userRef.id}

            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            this.setUserStatus(this.currentUser);
            this.router.navigate(["/manage/ticket-list"]);

          })
        })
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
        this.snackBar.open('Something went wrong:' + err.message)
      });
  }

  /* Sign out */
  logOut() {
    this.angularFireAuth.signOut()
      .then(()=>{
        this.currentUser = null;
        this.setUserStatus(null);
        localStorage.removeItem('currentUser');
        this.ngZone.run(() => this.router.navigate(["/auth/login"]));

      }).catch((err) => {
      console.log(err);
      this.snackBar.open('Something went wrong:' + err.message)
    })
  }

  userChanges(){
    this.angularFireAuth.onAuthStateChanged(currentUser => {
      if (currentUser) {

        this.firestore.collection("users").ref.where("username", "==", currentUser.email).onSnapshot(snap => {
          snap.forEach(userRef => {
            this.currentUser = userRef.data();
            this.currentUser = {...this.currentUser, uid: currentUser.uid, id: userRef.id}
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            this.setUserStatus(this.currentUser);
          })
        })
      } else {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
      }
    }).then(r =>{})
  }
}
