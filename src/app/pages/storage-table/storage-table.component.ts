import { Component, Input, OnInit } from '@angular/core';
import { UpdateAll } from 'app/models/orders';
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
  masterSelected: boolean = false;
  selectedOrderIds = [];
  storage: any = [];
  partners: any = [];
  statuses: any = [];
  deliveries: any = [];
  currencies: any = [];
  deliveryPrice: number = 0;
  deliveryPrice2: number = 0;

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
    this.getUSD();
  }

  checkUncheckAll() {
    for (var i = 0; i < this.storage.length; i++) {
      this.storage[i].isChecked = this.masterSelected;
    }
  }

  onUpdateAllDeliveries(e: Event) {
    this.selectedOrderIds = this.storage.filter((x) => x.isChecked === true);
    let model = new UpdateAll();
    let newIds: string[] = [];

    if (this.selectedOrderIds.length !== 0) {
      this.selectedOrderIds.forEach((element) => {
        let newId: string = element.id;
        newIds.push(newId);
      });
    }
    const deliveryId = (e.target as HTMLSelectElement).value;
    model.deliveryTypeId = deliveryId;
    model.orderIds = newIds;

    this.service.updateAll(model).subscribe((res) => {
      window.location.reload();
    });
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
      this.storage.forEach((item) => {
        this.deliveryPrice += +item.weight;
      });
    });
  }

  getUSD() {
    this.service.getUSD().subscribe((res) => {
      this.deliveryPrice2 = this.deliveryPrice * res.price;
      console.log(res, 'usd');
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
