import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})
export class CustomComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

    icons = [{image: '/assets/clock.svg', head: "Working Hours", text: "10:00 AM - 22:00 PM"}, {image: '/assets/phone.svg', head: "Contacts", text: "+995 593 39 03 01", text2: "aicargo2022@gmail.com"}, {image: '/assets/location.svg', head: "Address", text: "Aksaray Mahallesi Abdullatif Paşa sok no 21 kat 2 daire 3 Fatih İstanbul"}]
}
