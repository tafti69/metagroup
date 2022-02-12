import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss'],
})
export class ShopsComponent implements OnInit {
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
}
