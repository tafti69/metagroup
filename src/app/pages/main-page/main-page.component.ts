import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  brands = [
    '/assets/zara-logo-1.png',
    '/assets/LC_Waikiki_logo.png',
    '/assets/DeFacto.jpg',
    '/assets/colins.png',
    '/assets/Koton.png',
    '/assets/bershka.png',
    '/assets/zara-logo-1.png',
    '/assets/LC_Waikiki_logo.png',
    '/assets/DeFacto.jpg',
    '/assets/colins.png',
    '/assets/Koton.png',
    '/assets/bershka.png',
  ];

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
