import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services.service';

@Component({
  selector: 'app-storage-table',
  templateUrl: './storage-table.component.html',
  styleUrls: ['./storage-table.component.scss'],
})
export class StorageTableComponent implements OnInit {
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
    console.log(this.userId);
    

    this.getFirst();
  }

  getFirst() {
    this.service.getMyFirst(this.lang, this.userId).subscribe((res) => {
      console.log(res);
      this.storage = res;
    });
  }
}
