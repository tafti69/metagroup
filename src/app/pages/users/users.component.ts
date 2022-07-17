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
  cabId;

  startPage: number = 1;
  numRows: number = 10;
  totalRecords: number;

  ngOnInit(): void {
    this.getUsersPaging();
    //  this.getUsers();
  }

  // getUsers() {
  //   this.isLoading = true;
  //   this.service.getUsers().subscribe((res) => {
  //     this.users = res;
  //     this.isLoading = false;
  //   });
  // }

  getUsersPaging() {
    this.isLoading = true;
    this.service
      .getUsersPaging(this.startPage, this.numRows)
      .subscribe((res) => {
        this.users = res.items;
        this.totalRecords = res.totalCount;
        this.isLoading = false;
      });
  }

  searchUser(cabinetId) {
    this.cabId = cabinetId;
    let lang = 'ff';
    this.service
      .searchUsers(this.cabId, this.startPage, this.numRows, lang)
      .subscribe((res) => {
        this.users = res.items;
      });
  }

  public pageEvent(event) {
    if (event === null || event === undefined) {
      return;
    }
    this.startPage = event.first / 10;
    this.getUsersPaging();
  }
}
