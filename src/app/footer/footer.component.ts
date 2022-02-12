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
    { image: '/assets/phone.svg', text: '+995 593 39 03 01' },
    { image: '/assets/mail.svg', text: 'aicargo2022@gmail.com' },
    {
      image: '/assets/location.svg',
      head: 'Address',
      text: 'Aksaray Mahallesi Abdullatif Paşa sok no 21 kat 2 daire 3 Fatih İstanbul',
    },
  ];
}
