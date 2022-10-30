import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TicketService} from "../../services/ticket.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.scss']
})
export class AddTicketComponent implements OnInit {

  createTicketForm = new FormGroup({
    inbound: new FormControl(null, Validators.required),
    outbound: new FormControl(null, Validators.required),
    ticket_type: new FormControl(null, Validators.required),
    from_date: new FormControl(null, Validators.required),
    to_date: new FormControl(null, Validators.required),
    seat_number: new FormControl(null, Validators.required),
    price: new FormControl(null, Validators.required),
  });

  constructor(private ticketService: TicketService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  createTicket() {
    if (this.createTicketForm.invalid) {
      return;
    }
    this.ticketService.addFlightTicket(this.createTicketForm.value).then(res => {
      if (res) {
        this.createTicketForm.reset({})
        this.snackBar.open('Ticket is added successfully!')
      }
    }).catch(err => {
      this.snackBar.open(err.message)
    })
  }
}
