import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'app/services.service';

@Component({
  selector: 'app-flights-view',
  templateUrl: './flights-view.component.html',
  styleUrls: ['./flights-view.component.scss'],
})
export class FlightsViewComponent implements OnInit {
  constructor(private service: ServicesService) {}

  flights: any = [];

  ngOnInit(): void {
    this.getFlights();
  }

  getFlights() {
    this.service.getFlights().subscribe((res) => {
      this.flights = res;
    });
  }
}
