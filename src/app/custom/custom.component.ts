import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss'],
})
export class CustomComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  icons = [
    {
      image: '/assets/clock.svg',
      head: 'workhours',
      text: '10:00 AM - 22:00 PM',
    },
    {
      image: '/assets/phone.svg',
      head: 'contacts',
      text: '+995 558 67 27 47',
      text2: '2022metagroup@gmail.com',
    },
    {
      image: '/assets/location.svg',
      head: 'address',
      text: 'Marneuli Rustavelis Qucha 62B, Tbilisi Gabriel Salosis 15 ADD',
    },
  ];
}
