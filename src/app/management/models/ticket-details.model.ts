export interface TicketDetailsModel {
  id: string;
  inbound: string;
  outbound: string;
  ticket_type: string;
  ticket_type_id: string;
  price: number;
  from_date: Date;
  to_date: Date;
  seat_number: number
}
