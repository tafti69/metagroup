import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services.service';

@Component({
  selector: 'app-ontheroad-table',
  templateUrl: './ontheroad-table.component.html',
  styleUrls: ['./ontheroad-table.component.scss'],
})
export class OntheroadTableComponent implements OnInit {
  constructor(private service: ServicesService) {}

  lang: any;
  userId: any;

  storage: any = [];

  ngOnInit(): void {
    this.lang = localStorage.getItem('lang');
    if (this.lang === undefined || this.lang === null) {
      this.lang = 'AZE';
      localStorage.setItem('lang', 'AZE');
    }

    this.userId = localStorage.getItem('id');

    this.getSecond();
  }

  getSecond() {
    this.service.getMySecond(this.lang, this.userId).subscribe((res) => {
      console.log(res);
      this.storage = res;
    });
  }
}
