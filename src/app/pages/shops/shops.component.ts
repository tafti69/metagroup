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

  ngOnInit(): void {
    this.lang = localStorage.getItem('lang');
    if (this.lang === undefined || this.lang === null) {
      this.lang = 'AZE';
      localStorage.setItem('lang', 'AZE');
    }

    this.getPartners();
  }

  getPartners() {
    this.isLoading = true;
    this.service.getPartners(this.lang).subscribe((res) => {
      this.brands = res;
      this.isLoading = false;
    });
  }
}
