import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SignUpModel } from 'app/models/auth';
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
  surname: any;
  phone: any;
  personalId: any;
  cabinetId: any;
  city: any;
  email: any;

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
    // this.name = localStorage.getItem('name');
    this.userId = localStorage.getItem('id');

    this.service.getUserInfo(this.userId).subscribe((res) => {
      console.log(res);
      this.cabinetId = res.cabinetId;
      this.name = res.firstNameEN;
      this.surname = res.lastNameEN;
      this.phone = res.phoneNumber;
      this.personalId = res.personalID;
      this.city = res.region;
      this.email = res.email;
      this.cols = [
        {
          header: 'Name:',
          field: this.city + ' ' + this.name,
        },
        {
          header: 'Surname:',
          field: this.surname,
        },
        { header: 'ტელეფონი / Telephone / Telefon:', field: '5349110518' },
        // {
        //   header: 'პირადი ნომერი / Personal Id / Piradi No:',
        //   field: this.personalId,
        // },
        { header: 'პროვინცია / Province / İl:', field: 'Trabzon' },
        { header: 'რაიონი / District / lice:', field: 'Ortahisar' },
        {
          header: 'სამეზობლო / Neighborhood / mahalle:',
          field: 'Pelitli Mah',
        },
        {
          header: 'მისამართი / Address / adres:',
          field: `MKK Pelitli Mahallesi Şelale Sokak No: 35A / ${this.cabinetId}`,
        },
        {
          header: 'Adres Başliqi:',
          field: `Meta Group`,
        },
        {
          header: 'ელ. ფოსტა / E-mail / Email:',
          field: this.email,
        },
        {
          header: 'Zip / Postal Code',
          field: '61010',
        },
      ];
    });

    this.lang = localStorage.getItem('lang');
    if (this.lang === undefined || this.lang === null) {
      this.lang = 'AZE';
      localStorage.setItem('lang', 'AZE');
    }

    this.getDashboardInfo();
  }

  getDashboardInfo() {
    this.service.getDashboardInfo(this.lang, this.userId).subscribe((res) => {
      this.count = res;
    });
  }
}
