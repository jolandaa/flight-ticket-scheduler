import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import {TicketService} from "../../services/ticket.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      { data: [], label: 'Inbound' },
      { data: [], label: 'Outbound' },
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };

  dataArr: any = [];

  constructor(public ticketService: TicketService) {
    this.ticketService.flightTicketList.subscribe(ticketArr => {
      if (ticketArr) {
        this.dataArr = ticketArr;
        ticketArr.forEach(ticketEl => {
          if (this.barChartData.labels?.indexOf(ticketEl.inbound) === -1) {
            this.barChartData.labels?.push(ticketEl.inbound)
          }
          if (this.barChartData.labels?.indexOf(ticketEl.outbound) === -1) {
            this.barChartData.labels?.push(ticketEl.outbound)
          }
        })
        this.barChartData.labels?.forEach(ticket => {
          const inboundFilterValue = ticketArr.filter(el => el.inbound === ticket).length;
          this.barChartData.datasets[0].data.push(inboundFilterValue)
          const outboundFilterValue = ticketArr.filter(el => el.outbound === ticket).length;
          this.barChartData.datasets[1].data.push(outboundFilterValue)
        })
      }
    })
  }

  ngOnInit(): void {
    this.ticketService.getFlightTicketList()
  }

}
