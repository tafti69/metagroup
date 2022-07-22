import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'app/services.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  constructor(private service: ServicesService) {}

  brands: any = [];
  flights: any = [];
  tarifs: any = [];

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
    this.getFlights();
    this.getTarifs();
    this.getUser();
  }

  getUser() {
    this.service.getUserInfo(this.userId).subscribe((res) => {
      this.userName = res.firstNameEN + ' ' + res.lastNameEN;
    });
  }

  getFlights() {
    this.service.getFlights().subscribe((res) => {
      this.flights = res.slice(0, 2);
    });
  }

  getTarifs() {
    this.service.getTarifs().subscribe((res) => {
      this.tarifs = res.slice(0, 3);
    });
  }

  getPartners() {
    this.isLoading = true;
    this.service.getPartners(this.lang).subscribe((res) => {
      this.brands = res;
      this.isLoading = false;
    });
  }

  footer = [
    { image: '/assets/clock.svg', text: '10:00 AM - 22:00 PM' },
    { image: '/assets/phone.svg', text: '+995 593 39 03 01' },
    { image: '/assets/mail.svg', text: 'aicargo2022@gmail.com' },
    {
      image: '/assets/location.svg',
      head: 'Address',
      text: 'Aksaray Mahallesi Abdullatif Paşa sok no 21 kat 2 daire 3 Fatih İstanbul',
    },
  ];
}
