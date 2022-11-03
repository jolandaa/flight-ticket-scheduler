import { Component, OnInit } from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {TicketService} from "../../services/ticket.service";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.scss']
})
export class AddTicketComponent {

  createTicketForm = new UntypedFormGroup({
    inbound: new UntypedFormControl(null, Validators.required),
    outbound: new UntypedFormControl(null, Validators.required),
    ticket_type: new UntypedFormControl(null, Validators.required),
    from_date: new UntypedFormControl(null, Validators.required),
    to_date: new UntypedFormControl(null, Validators.required),
    seat_number: new UntypedFormControl(null, Validators.required),
    price: new UntypedFormControl(null, Validators.required),
  });

  showFromDate = true;

  constructor(private ticketService: TicketService,
              private snackBar: MatSnackBar) { }


  createTicket() {
    if (this.createTicketForm.invalid) {
      return;
    }
    this.ticketService.addFlightTicket(this.createTicketForm.value).then(res => {
      console.log(res)
      if (res) {
        res.set({id: res.id, ticket_type_id: this.createTicketForm.value.ticket_type + '_' + res.id}, {merge: true}).then(() => {
          console.log("Your extra id field has been created");
        });
        this.createTicketForm.reset({})
        this.snackBar.open('Ticket is added successfully!')
      }
    }).catch(err => {
      this.snackBar.open(err.message)
    })
  }

  ticketTypeChange() {
    const ticket_type_value = this.createTicketForm.get('ticket_type')?.value
    if (ticket_type_value == 'one-way') {
      this.FromDate.clearValidators();
      this.FromDate.updateValueAndValidity();
      this.showFromDate = false;
    } else {
      this.FromDate.addValidators(Validators.required);
      this.FromDate.updateValueAndValidity()
      this.showFromDate = true;
    }
  }

  get FromDate() {
    return this.createTicketForm.get('from_date') as UntypedFormControl;
  }
}
