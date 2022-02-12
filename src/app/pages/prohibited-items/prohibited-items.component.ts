import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prohibited-items',
  templateUrl: './prohibited-items.component.html',
  styleUrls: ['./prohibited-items.component.scss']
})
export class ProhibitedItemsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  items = [
  "Firearm parts and accessories", 
  "Pneumatic guns with gas cylinders up to 0.177 (4.5 mm) caliber and their accessories;", 
  "Firearm parts and accessories", 
  "Pneumatic guns with gas cylinders up to 0.177 (4.5 mm) caliber and their accessories;",
   "Firearm parts and accessories", 
  "Pneumatic guns with gas cylinders up to 0.177 (4.5 mm) caliber and their accessories;", 
  "Firearm parts and accessories", 
  "Pneumatic guns with gas cylinders up to 0.177 (4.5 mm) caliber and their accessories;"
  ]

}
