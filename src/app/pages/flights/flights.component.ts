import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FlightModel } from 'app/models/flightandtarif';
import { ServicesService } from 'app/services.service';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss'],
})
export class FlightsComponent implements OnInit {
  constructor(private service: ServicesService) {}

  form: FormGroup;

  flights: any = [];
  isLoading: boolean;

  ngOnInit(): void {
    this.form = new FormGroup({
      code: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
    });

    this.getFlights();
  }

  onCreateFlight() {
    const form = this.form.value;

    const model = new FlightModel();

    model.code = form.code;
    model.date = form.date;

    this.isLoading = true;
    this.service.createFlight(model).subscribe((res) => {
      this.isLoading = false;
      window.location.reload();
    });
  }

  getFlights() {
    this.service.getFlights().subscribe((res) => {
      this.flights = res;
    });
  }

  deleteFlight(id: number) {
    this.service.DeleteFlight(id).subscribe((res) => {
      window.location.reload();
    });
  }
}
