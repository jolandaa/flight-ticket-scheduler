import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private firebaseService: AuthenticationService,
              private snackBar: MatSnackBar) { }

  public signUpForm = new FormGroup({
    email: new FormControl('', [ Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl('',  Validators.required),

  });

  signup(formData: any){
    if (this.signUpForm.invalid) {
      this.snackBar.open('Please fill form with correct values!')
      return;
    }
    this.firebaseService.signUp(formData.email, formData.password)
  }

  ngOnInit(): void {
  }

}
