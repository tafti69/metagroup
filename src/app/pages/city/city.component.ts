import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateCitiesModel } from 'src/app/models/cities';
import { ServicesService } from 'src/app/services.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss'],
})
export class CityComponent implements OnInit {
  constructor(private service: ServicesService) {}

  form: FormGroup;

  cities: any = [];
  lang: any;
  isLoading = false;

  ngOnInit(): void {
    this.lang = localStorage.getItem('lang');
    if (this.lang === undefined || this.lang === null) {
      this.lang = 'AZE';
      localStorage.setItem('lang', 'AZE');
    }

    this.form = new FormGroup({
      kaCity: new FormControl('', Validators.required),
      azCity: new FormControl('', Validators.required),
      ruCity: new FormControl('', Validators.required),
    });

    this.getCity();
  }

  onCreateCity() {
    const form = this.form.value;
    let model = new CreateCitiesModel();

    model.azName = form.azCity;
    model.kaName = form.kaCity;
    model.ruName = form.ruCity;

    this.service.createCity(model).subscribe((res) => {
      window.location.reload();
    });
  }

  getCity() {
    this.service.getCity(this.lang).subscribe((res) => {
      this.cities = res;
    });
  }
}
