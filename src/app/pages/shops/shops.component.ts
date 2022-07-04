import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'app/services.service';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss'],
})
export class ShopsComponent implements OnInit {
  constructor(private service: ServicesService) {}

  brands: any = [];

  isLoading = false;
  lang: any;
  userId: any;
  userName: any;

  ngOnInit(): void {
    this.lang = localStorage.getItem('lang');
    if (this.lang === undefined || this.lang === null) {
      this.lang = 'AZE';
      localStorage.setItem('lang', 'AZE');
    }

    this.userId = localStorage.getItem('id');

    this.getPartners();
    this.getUser();
  }

  getUser() {
    this.service.getUserInfo(this.userId).subscribe((res) => {
      this.userName = res.firstNameEN + ' ' + res.lastNameEN;
    });
  }

  getPartners() {
    this.isLoading = true;
    this.service.getPartners(this.lang).subscribe((res) => {
      this.brands = res;
      this.isLoading = false;
    });
  }
}
