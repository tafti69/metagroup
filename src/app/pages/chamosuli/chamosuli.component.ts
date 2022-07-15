import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpdateAll } from 'app/models/orders';
import { UpdateStatuses } from 'app/models/status';
import { ServicesService } from 'app/services.service';

@Component({
  selector: 'app-chamosuli',
  templateUrl: './chamosuli.component.html',
  styleUrls: ['./chamosuli.component.scss'],
})
export class ChamosuliComponent implements OnInit {
  constructor(
    private service: ServicesService,
    private snackBar: MatSnackBar
  ) {}

  lang: any;
  userId: any;
  isLoading: any = false;
  selectedOrderIds: any = [];
  masterSelected: boolean = false;

  arrived: any = [];
  partners: any = [];
  statuses: any = [];
  deliveries: any = [];
  currencies: any = [];
  iban: string = 'GE91TB7034736080100019';
  deliveryPrice: number = 0;
  deliveryPrice2: number = 0;

  ngOnInit(): void {
    this.lang = localStorage.getItem('lang');
    if (this.lang === undefined || this.lang === null) {
      this.lang = 'AZE';
      localStorage.setItem('lang', 'AZE');
    }

    this.userId = localStorage.getItem('id');

    this.getThird();
    this.getDeliveryTypes();
    this.getPartners();
    this.getCurrencies();
    // this.getUSD();
  }

  onUpdateDelivery(e: Event, id: string) {
    const deliveryId = (e.target as HTMLSelectElement).value;

    let model = new UpdateStatuses();

    model.orderId = id;
    model.deliveryTypeId = deliveryId;


    this.service.updateDeliveryType(model).subscribe((res) => {
      this.snackBar.open('Delivery Type Updated');
    });
  }

  checkUncheckAll() {
    for (var i = 0; i < this.arrived.length; i++) {
      this.arrived[i].isChecked = this.masterSelected;
    }
  }

  onUpdateAllDeliveries(e: Event) {
    this.selectedOrderIds = this.arrived.filter((x) => x.isChecked === true);
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

  getThird() {
    this.isLoading = true;
    this.service.getMyThird(this.lang, this.userId).subscribe((res) => {
      this.arrived = res;
      this.isLoading = false;
      this.arrived.forEach((item) => {
        this.deliveryPrice += item.deliveryPrice;
      });
    });
  }

  // getUSD() {
  //   this.service.getUSD().subscribe((res) => {
  //     this.deliveryPrice2 = this.deliveryPrice * res.price;
  //   });
  // }

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

  copy2(text) {
    const elem = document.createElement('textarea');
    elem.value = text;
    document.body.appendChild(elem);
    elem.select();
    document.execCommand('copy');
    document.body.removeChild(elem);
    this.snackBar.open('Copied to clipboard', '', {
      duration: 1000,
    });
  }
}
