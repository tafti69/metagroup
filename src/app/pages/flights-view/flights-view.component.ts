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
  userId: any;
  userName: any;

  ngOnInit(): void {
    this.userId = localStorage.getItem('id');

    this.getUser();
    this.getFlights();
  }

  getUser() {
    this.service.getUserInfo(this.userId).subscribe((res) => {
      this.userName = res.firstNameEN + ' ' + res.lastNameEN;
    });
  }

  getFlights() {
    this.service.getFlights().subscribe((res) => {
      this.flights = res;
    });
  }
}
