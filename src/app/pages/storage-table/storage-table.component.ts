import { Component, Input, OnInit } from '@angular/core';
import { UpdateStatuses } from 'app/models/status';
import { ServicesService } from 'app/services.service';

@Component({
  selector: 'app-storage-table',
  templateUrl: './storage-table.component.html',
  styleUrls: ['./storage-table.component.scss'],
})
export class StorageTableComponent implements OnInit {
  constructor(private service: ServicesService) {}

  lang: any;
  userId: any;
  isLoading: any = false;

  storage: any = [];
  partners: any = [];
  statuses: any = [];
  deliveries: any = [];
  currencies: any = [];

  ngOnInit(): void {
    this.lang = localStorage.getItem('lang');
    if (this.lang === undefined || this.lang === null) {
      this.lang = 'AZE';
      localStorage.setItem('lang', 'AZE');
    }

    this.userId = localStorage.getItem('id');

    this.getFirst();
    this.getDeliveryTypes();
    this.getPartners();
    this.getCurrencies();
  }

  onUpdateDelivery(e: Event, id: string) {
    const deliveryId = (e.target as HTMLSelectElement).value;

    let model = new UpdateStatuses();

    model.orderId = id;
    model.deliveryTypeId = deliveryId;

    this.service.updateDeliveryType(model).subscribe((res) => {});
  }

  getFirst() {
    this.isLoading = true;
    this.service.getMyFirst(this.lang, this.userId).subscribe((res) => {
      console.log(res);
      this.storage = res;
      this.isLoading = false;
    });
  }

  getCurrencies() {
    this.service.getCurrency().subscribe((res) => {
      this.currencies = res;
    });
  }

  getPartners() {
    this.service.getPartners(this.lang).subscribe((res) => {
      this.partners = res;
    });
  }

  getDeliveryTypes() {
    this.service.getDeliveryType(this.lang).subscribe((res) => {
      this.deliveries = res;
    });
  }
}
