import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private firebaseService: AuthenticationService,
              private snackBar: MatSnackBar) { }

  public loginForm = new UntypedFormGroup({
    email: new UntypedFormControl('', [ Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new UntypedFormControl('',  Validators.required),

  });

  login(formData: any){
    if (this.loginForm.invalid) {
      this.snackBar.open('Please fill form with correct values!')
      return;
    }
    this.firebaseService.login(formData.email, formData.password)
  }


}
