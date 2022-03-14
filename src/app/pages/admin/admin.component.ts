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
      trackingId: new FormControl('', Validators.required),
      personalId: new FormControl('', Validators.required),
    });

    this.getDeliveryTypes();
    this.getStatuses();
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
