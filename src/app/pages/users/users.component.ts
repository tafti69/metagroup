import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'app/services.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  constructor(private service: ServicesService) {}

  users: any;
  isLoading: boolean;

  ngOnInit(): void {
    this.isLoading = true;
    this.service.getUsers().subscribe((res) => {
      this.users = res;
      this.isLoading = false;
      console.log(res);
    });
  }
}
