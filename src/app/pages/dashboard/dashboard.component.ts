import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor() {}

  user;
  cols: any[];

  ngOnInit(): void {
    this.cols = [
      { header: 'სახელი / Name / Ad:', field: 'Giorgi' },
      { header: 'გვარი / Surname / Soyad:', field: 'Berishvili' },
      { header: 'ტელეფონი / Telephone / Telefon:', field: '05523917530' },
      { header: 'პროვინცია / Province / İl:', field: 'Istambul' },
      { header: 'რაიონი / District / lice:', field: 'Kadikoy' },
      { header: 'სამეზობლო / Neighborhood / mahalle:', field: 'Osmanaga Mah' },
      {
        header: 'მისამართი / Address / adres:',
        field:
          'Osmanağa mah.çuhadarağa sk.Gallerium iş merkezi 23/48 kadiköy istanbul 28001106931',
      },
      {
        header: 'ელ. ფოსტა / E-mail / Email:',
        field: 'ilkin.gojaev@gmail.com',
      },
    ];
  }
}
