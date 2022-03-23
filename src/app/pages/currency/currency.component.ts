import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateCurrency } from 'app/models/currency';
import { ServicesService } from 'app/services.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss'],
})
export class CurrencyComponent implements OnInit {
  constructor(private service: ServicesService) {}

  form: FormGroup;

  currencies: any = [];

  ngOnInit(): void {
    this.form = new FormGroup({
      currencyName: new FormControl('', Validators.required),
    });

    this.getCurrencies();
  }

  getCurrencies() {
    this.service.getCurrency().subscribe((res) => {
      this.currencies = res;
    });
  }

  onCreateCurrency() {
    let model = new CreateCurrency();
    model.value = this.form.value.currencyName;

    this.service.createCurrency(model).subscribe((res) => {
      window.location.reload();
    });
  }
}
