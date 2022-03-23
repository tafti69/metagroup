import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ServicesService } from 'app/services.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private router: Router,
    private service: ServicesService,
    private snackBar: MatSnackBar
  ) {}

  user;
  cols: any[];
  count: any = [];

  lang: any;
  userId: any;
  name: any;

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

  ngOnInit(): void {
    this.name = localStorage.getItem('name');

    this.cols = [
      { header: 'სახელი / Name / Ad:', field: this.name },
      { header: 'გვარი / Surname / Soyad:', field: 'Berishvili' },
      { header: 'ტელეფონი / Telephone / Telefon:', field: '05523917530' },
      { header: 'პროვინცია / Province / İl:', field: 'Istambul' },
      { header: 'რაიონი / District / lice:', field: 'Kadikoy' },
      { header: 'სამეზობლო / Neighborhood / mahalle:', field: 'Osmanaga Mah' },
      {
        header: 'მისამართი / Address / adres:',
        field:
          'Aksaray Mahallesi Abdullatif Paşa sok no 21 kat 2 daire 3 Fatih İstanbul 28001106931',
      },
      {
        header: 'ელ. ფოსტა / E-mail / Email:',
        field: 'aicargo2022@gmail.com',
      },
    ];

    this.lang = localStorage.getItem('lang');
    if (this.lang === undefined || this.lang === null) {
      this.lang = 'AZE';
      localStorage.setItem('lang', 'AZE');
    }

    this.userId = localStorage.getItem('id');

    this.getDashboardInfo();
  }

  getDashboardInfo() {
    this.service.getDashboardInfo(this.lang, this.userId).subscribe((res) => {
      this.count = res;
    });
  }
}
