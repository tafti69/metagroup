import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  footer = [
    { image: '/assets/clock.svg', text: '10:00 AM - 22:00 PM' },
    { image: '/assets/phone.svg', text: '+995 558 67 27 47' },
    { image: '/assets/mail.svg', text: 'metagroup2022@gmail.com' },
    {
      image: '/assets/location.svg',
      head: 'Address',
      text: 'MKK Pelitli Mahallesi Şelale Sokak',
    },
  ];
}
