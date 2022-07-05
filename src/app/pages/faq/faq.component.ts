import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'app/services.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent implements OnInit {
  constructor(private service: ServicesService) {}

  userId: any;
  userName: any;

  ngOnInit(): void {
    this.userId = localStorage.getItem('id');

    this.getUser();
  }

  getUser() {
    this.service.getUserInfo(this.userId).subscribe((res) => {
      this.userName = res.firstNameEN + ' ' + res.lastNameEN;
    });
  }
}
