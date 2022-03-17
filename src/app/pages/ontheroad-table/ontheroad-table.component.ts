import { Component, OnInit } from '@angular/core';
import { UpdateStatuses } from 'src/app/models/status';
import { ServicesService } from 'src/app/services.service';

@Component({
  selector: 'app-ontheroad-table',
  templateUrl: './ontheroad-table.component.html',
  styleUrls: ['./ontheroad-table.component.scss'],
})
export class OntheroadTableComponent implements OnInit {
  constructor(private service: ServicesService) {}

  lang: any;
  userId: any;
  isLoading = false;

  dataRoad: any = [];
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

    this.getSecond();
    this.getDeliveryTypes();
    this.getPartners();
    this.getCurrencies();
  }

  onUpdateDelivery(e: Event, id: string) {
    const deliveryId = (e.target as HTMLSelectElement).value;

    let model = new UpdateStatuses();

    model.orderId = id;
    model.deliveryTypeId = deliveryId;

    console.log(model);

    this.service.updateDeliveryType(model).subscribe((res) => {
      console.log(res);
      //this.snackbar.open('Delivery Type Updated');
    });
  }

  getSecond() {
    this.isLoading = true
    this.service.getMySecond(this.lang, this.userId).subscribe((res) => {
      console.log(res);
      this.dataRoad = res;
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
      console.log(res);
      this.deliveries = res;
    });
  }
}
