import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateCitiesModel } from 'src/app/models/cities';
import { CreateCurrency } from 'src/app/models/currency';
import { CreateOrder } from 'src/app/models/orders';
import { CreateProductModel } from 'src/app/models/product';
import { ServicesService } from 'src/app/services.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  constructor(private service: ServicesService) {}

  form: FormGroup;

  currencies: any = [];
  cities: any = [];
  products: any = [];
  orders: any = [];
  partners: any = [];
  statuses: any = [];
  deliveries: any = [];

  lang: any;
  isLoading = false;

  ngOnInit(): void {
    this.lang = localStorage.getItem('lang');
    if (this.lang === undefined || this.lang === null) {
      this.lang = 'AZE';
      localStorage.setItem('lang', 'AZE');
    }

    this.form = new FormGroup({
      currencyName: new FormControl('', Validators.required),
      kaCity: new FormControl('', Validators.required),
      azCity: new FormControl('', Validators.required),
      ruCity: new FormControl('', Validators.required),
      kaProduct: new FormControl('', Validators.required),
      azProduct: new FormControl('', Validators.required),
      ruProduct: new FormControl('', Validators.required),
      trackingId: new FormControl('', Validators.required),
      personalId: new FormControl('', Validators.required),
    });

    this.getDeliveryTypes();
    this.getStatuses();
    this.getProduct();
    this.getCity();
    this.getCurrencies();
    this.getOrders();
    this.getPartners();
  }

  getStatuses() {
    this.service.getStatuses(this.lang).subscribe((res) => {
      this.statuses = res;
    });
  }

  getDeliveryTypes() {
    this.service.getDeliveryType(this.lang).subscribe((res) => {
      console.log(res);
      this.deliveries = res;
    });
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

  onCreateProduct() {
    const form = this.form.value;
    let model = new CreateProductModel();

    model.azName = form.azProduct;
    model.kaName = form.kaProduct;
    model.ruName = form.ruProduct;

    this.service.createProduct(model).subscribe((res) => {
      window.location.reload();
    });
  }

  getProduct() {
    this.service.getProduct(this.lang).subscribe((res) => {
      this.products = res;
    });
  }

  onCreateOrder() {
    const form = this.form.value;
    let model = new CreateOrder();

    model.id = form.personalId;
    model.trackingId = form.trackingId;

    this.service.createOrder(model).subscribe((res) => {
      window.location.reload();
    });
  }

  getOrders() {
    this.isLoading = true;
    this.service.getOrder(this.lang).subscribe((res) => {
      console.log(res);
      this.orders = res;
      this.isLoading = false;
    });
  }

  getPartners() {
    this.service.getPartners(this.lang).subscribe((res) => {
      this.partners = res;
    });
  }
}
