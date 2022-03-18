import { Component, OnInit } from '@angular/core';
import { UpdateStatuses } from 'src/app/models/status';
import { ServicesService } from 'src/app/services.service';

@Component({
  selector: 'app-issued',
  templateUrl: './issued.component.html',
  styleUrls: ['./issued.component.scss']
})
export class IssuedComponent implements OnInit {

  constructor(private service: ServicesService) {}

  lang: any;
  userId: any;
  isLoading: any = false;

  issued: any = [];
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
    console.log(this.userId);
    

    this.getFourth();
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

  getFourth() {
    this.isLoading = true
    this.service.getMyFourth(this.lang, this.userId).subscribe((res) => {
      console.log(res);
      this.issued = res;
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
