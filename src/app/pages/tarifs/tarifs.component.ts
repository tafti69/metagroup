import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TarifModel } from 'app/models/flightandtarif';
import { ServicesService } from 'app/services.service';

@Component({
  selector: 'app-tarifs',
  templateUrl: './tarifs.component.html',
  styleUrls: ['./tarifs.component.scss'],
})
export class TarifsComponent implements OnInit {
  constructor(private service: ServicesService) {}

  form: FormGroup;

  tarifs: any = [];
  isLoading: boolean;
  rateId: string;
  USD: number;

  ngOnInit(): void {
    this.form = new FormGroup({
      kg: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
    });

    this.getTarifs();
    this.getUSD();
  }

  getUSD() {
    this.service.getUSD().subscribe((res) => {
      this.rateId = res.id;
      this.USD = res.price;
    });
  }

  createUSD() {
    this.service.updateUSD(this.rateId, this.USD).subscribe((res) => {
      window.location.reload();
    });
  }

  onCreateTarif() {
    const form = this.form.value;

    this.isLoading = true;
    this.service.createTarif(form.kg, form.price).subscribe((res) => {
      this.isLoading = false;
      window.location.reload();
    });
  }

  getTarifs() {
    this.service.getTarifs().subscribe((res) => {
      this.tarifs = res;
    });
  }

  deleteTarif(id: number) {
    this.service.DeleteTarif(id).subscribe((res) => {
      window.location.reload();
    });
  }
}
