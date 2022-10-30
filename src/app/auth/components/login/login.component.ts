import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private firebaseService: AuthenticationService,
              private snackBar: MatSnackBar) { }

  public loginForm = new FormGroup({
    email: new FormControl('', [ Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl('',  Validators.required),

  });

  login(formData: any){
    if (this.loginForm.invalid) {
      this.snackBar.open('Please fill form with correct values!')
      return;
    }
    this.firebaseService.login(formData.email, formData.password)
  }

  ngOnInit(): void {
  }

}
