import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'app/services.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  constructor(private service: ServicesService) {}

  users: any[] = [];
  isLoading: boolean;
  cabId;

  sortFieldName;
  sortFieldOrder;
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
    let sortField = '';
    if (this.sortFieldName !== null && this.sortFieldName !== undefined) {
      sortField = this.sortFieldName;
    }
    let sortOrder = 0;
    if (this.sortFieldOrder != null && this.sortFieldOrder !== undefined) {
      sortOrder = this.sortFieldOrder;
    }

    let lang = 'KA';
    this.isLoading = true;
    this.service
      .getUsersPaging(this.startPage, this.numRows, sortOrder, sortField, lang)
      .subscribe((res) => {
        this.users = res.items;
        this.totalRecords = res.totalCount;
        this.isLoading = false;
      });
  }

  searchUser(cabinetId) {
    let sortField = '';
    if (this.sortFieldName !== null && this.sortFieldName !== undefined) {
      sortField = this.sortFieldName;
    }
    let sortOrder = 0;
    if (this.sortFieldOrder != null && this.sortFieldOrder !== undefined) {
      sortOrder = this.sortFieldOrder;
    }

    this.cabId = cabinetId;
    if (cabinetId === '') {
      this.getUsersPaging();
    }
    let lang = 'KA';
    this.service
      .searchUsers(
        this.cabId,
        sortOrder,
        sortField,
        this.startPage,
        this.numRows,
        lang
      )
      .subscribe((res) => {
        this.users = res.items;
        this.totalRecords = res.totalCount;
      });
  }

  public pageEvent(event) {
    if (event === null || event === undefined) {
      return;
    }

    this.startPage = event.first / 10 + 1;

    if (
      event.multiSortMeta !== null &&
      event.multiSortMeta !== undefined &&
      event.multiSortMeta.length > 0
    ) {
      const meta = event.multiSortMeta[0];
      if (meta !== null || meta !== undefined) {
        const field = meta.field;
        if (field !== null && field !== undefined) {
          this.sortFieldName = field;
        }
        const order = meta.order;
        if (order !== null && order !== undefined) {
          this.sortFieldOrder = order;
        }
      }
    }

    this.getUsersPaging();
    // this.sort(event);
  }

  sort(event) {
    if (event.sortField) {
      this.users.sort((data1, data2) => {
        let value1 = data1[event.sortField];
        let value2 = data2[event.sortField];
        let result = null;

        if (value1 == null && value2 != null) result = -1;
        else if (value1 != null && value2 == null) result = 1;
        else if (value1 == null && value2 == null) result = 0;
        else if (typeof value1 === 'string' && typeof value2 === 'string')
          result = value1.localeCompare(value2);
        else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
        return event.sortOrder * result;
      });
    }
  }
}
