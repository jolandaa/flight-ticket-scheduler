import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "./auth/services/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'flight-ticket-scheduler';

  userStatus = this.authenticationService.userStatus;

  constructor(private authenticationService: AuthenticationService){}


  ngOnInit() {
    this.authenticationService.userChanges();

    this.authenticationService.userStatusChanges.subscribe(x => this.userStatus = x);
  }


}
