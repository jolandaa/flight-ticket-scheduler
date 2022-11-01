import { Component, OnInit } from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {TicketService} from "../../services/ticket.service";
import {ActivatedRoute} from "@angular/router";
import {TicketDetailsModel} from "../../models/ticket-details.model";

@Component({
  selector: 'app-view-ticket',
  templateUrl: './view-ticket.component.html',
  styleUrls: ['./view-ticket.component.scss']
})
export class ViewTicketComponent implements OnInit {

  ticketForm = new UntypedFormGroup({
    inbound: new UntypedFormControl({value: null, disabled: true}, Validators.required),
    outbound: new UntypedFormControl({value: null, disabled: true}, Validators.required),
    ticket_type: new UntypedFormControl({value: null, disabled: true}, Validators.required),
    from_date: new UntypedFormControl({value: null, disabled: true}, Validators.required),
    to_date: new UntypedFormControl({value: null, disabled: true}, Validators.required),
    seat_number: new UntypedFormControl({value: null, disabled: true}, Validators.required),
    price: new UntypedFormControl({value: null, disabled: true}, Validators.required),
  });

  ticketId = this.route.snapshot.params['ticketId'];
  ticketDetails: TicketDetailsModel | undefined = {}

  constructor(private ticketService: TicketService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.ticketService.getSingleTicket(this.ticketId).then(res => {
      console.log(res.data())
      if (res.exists) {
        this.ticketDetails = res.data();
        this.ticketForm.patchValue({
          inbound: this.ticketDetails?.inbound,
          outbound: this.ticketDetails?.outbound,
          ticket_type: this.ticketDetails?.ticket_type,
          from_date: this.ticketDetails?.from_date,
          to_date: this.ticketDetails?.to_date,
          seat_number: this.ticketDetails?.seat_number,
          price: this.ticketDetails?.price,
        })
      }
    })
  }

}
