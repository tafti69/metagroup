import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateCitiesModel } from 'src/app/models/cities';
import { CreateCurrency } from 'src/app/models/currency';
import { CreateOrder } from 'src/app/models/orders';
import { CreateProductModel } from 'src/app/models/product';
import { Statuses, UpdateStatuses } from 'src/app/models/status';
import { ServicesService } from 'src/app/services.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  constructor(
    private service: ServicesService,
    private snackbar: MatSnackBar
  ) {}

  form: FormGroup;

  orders: any = [];
  partners: any = [];
  statuses: any = [];
  deliveries: any = [];
  currencies: any = [];
  selectedStatusId: any;

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
    this.getCurrencies();
  }

  getCurrencies() {
    this.service.getCurrency().subscribe((res) => {
      this.currencies = res;
    });
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

  onStatusChange(e: Event, id: string) {
    this.selectedStatusId = (e.target as HTMLSelectElement).value;
    let model = new Statuses();

    model.orderId = id;
    model.statusId = this.selectedStatusId;

    console.log(model);

    this.service.updateStatus(model).subscribe((res) => {
      console.log(res);

      this.snackbar.open('Status Updated', '', {
        duration: 3000,
      });
    });
  }

  onUpdateDelivery(e: Event, id: string) {
    const deliveryId = (e.target as HTMLSelectElement).value;

    let model = new UpdateStatuses();

    model.orderId = id;
    model.deliveryTypeId = deliveryId;

    console.log(model);

    this.service.updateDeliveryType(model).subscribe((res) => {
      console.log(res);
      this.snackbar.open('Delivery Type Updated');
    });
  }
}
