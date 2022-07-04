import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'app/services.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  constructor(private service: ServicesService) { }

  userId: any;
  userName: any;

  ngOnInit(): void {
    this.userId = localStorage.getItem('id');
    this.getUser();
  }

  
  getUser() {
    this.service.getUserInfo(this.userId).subscribe(res => {
        this.userName = res.firstNameEN + " " + res.lastNameEN;
    })
  }

}
