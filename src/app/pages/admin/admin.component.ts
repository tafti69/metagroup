import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  CreateOrder,
  OrdersDTO,
  UpdateAll,
  WeightModel,
} from 'app/models/orders';
import { Statuses, UpdateStatuses } from 'app/models/status';
import { ServicesService } from 'app/services.service';
import { Emitters } from 'app/models/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  success: boolean = false;
  constructor(private service: ServicesService, private snackBar: MatSnackBar) {
    Emitters.successDecl.subscribe((data) => {
      this.success = data;
    });
  }

  subjectKey = new Subject<any>();

  form: FormGroup;
  formDate: FormGroup;

  startPage: number = 1;
  numRows: number = 5;
  totalRecords: number;

  orders: OrdersDTO[] = [];
  partners: any = [];
  statuses: any = [];
  deliveries: any = [];
  currencies: any = [];
  selectedStatusId: any;
  weight: any;
  deliveryPrice: number = 0;
  metaValue;

  updated = false;
  selectedOrderIds: any = [];
  masterSelected: boolean = false;

  isChecked: any;
  sortFieldName;
  sortFieldOrder;
  lang: any;
  isLoading = false;
  isLoading2 = false;
  cabId: any;
  ifSearch: boolean = false;
  ifFilter: boolean = false;

  ordersForCheck: any;

  ngOnInit(): void {
    this.lang = localStorage.getItem('lang');
    if (this.lang === undefined || this.lang === null) {
      this.lang = 'AZE';
      localStorage.setItem('lang', 'AZE');
    }

    this.form = new FormGroup({
      trackingId: new FormControl('', Validators.required),
      personalId: new FormControl('Meta-', Validators.required),
      weight: new FormControl('', Validators.required),
      turkishCargo: new FormControl('', Validators.required),
    });

    this.formDate = new FormGroup({
      fromDateTime: new FormControl(''),
      toDateTime: new FormControl(''),
    });

    // this.setDates();

    this.getDeliveryTypes();
    this.getStatuses();
    // this.getOrders();
    this.getOrderPaging();
    this.getPartners();
    this.getCurrencies();

    // this.subjectKey.subscribe((res) => {
    //   console.log(res);
    //   this.getOrders(res)
    // });
  }

  getCurrencies() {
    this.service.getCurrency().subscribe((res) => {
      this.currencies = res;
    });
  }

  getStatuses() {
    this.service.getStatuses(this.lang).subscribe((res) => {
      this.statuses = res;
    });
  }

  getDeliveryTypes() {
    this.service.getDeliveryType(this.lang).subscribe((res) => {
      this.deliveries = res;
    });
  }

  onFilterDate() {
    const form = this.formDate.value;
    let sortField = '';
    if (this.sortFieldName !== null && this.sortFieldName !== undefined) {
      sortField = this.sortFieldName;
    }
    let sortOrder = 0;
    if (this.sortFieldOrder != null && this.sortFieldOrder !== undefined) {
      sortOrder = this.sortFieldOrder;
    }
    console.log(form.fromDateTime + '' + form.toDateTime);

    this.service
      .filterRangeByDate(
        this.lang,
        form.fromDateTime,
        form.toDateTime,
        this.startPage,
        this.numRows,
        sortOrder,
        sortField
      )
      .subscribe((res: any) => {
        this.ifFilter = true;
        this.orders = res.items;
        this.totalRecords = res.totalCount;
        this.deliveryPrice = res.totalDeliveryPrice;
      });
  }

  checkUncheckAll(m) {
    this.masterSelected = m;
    this.masterSelected === true;
    console.log(this.masterSelected);

    for (var i = 0; i < this.orders.length; i++) {
      this.orders[i].isChecked = this.masterSelected;
    }
  }

  onUpdateAllStatuses(e: Event) {
    this.selectedOrderIds = this.orders.filter((x) => x.isChecked === true);
    let model = new UpdateAll();
    let newIds: string[] = [];

    if (this.selectedOrderIds.length !== 0) {
      this.selectedOrderIds.forEach((element) => {
        let newId: string = element.id;
        newIds.push(newId);
      });
    }
    const statusId = (e.target as HTMLSelectElement).value;
    model.statusId = statusId;
    model.orderIds = newIds;
    model.allSellected = this.masterSelected;

    this.service.updateAll(model).subscribe((res) => {
      // window.location.reload();
      this.searchByCabinetId2();
    });
  }

  onUpdateAllDeliveries(e: Event) {
    this.selectedOrderIds = this.orders.filter((x) => x.isChecked === true);
    let model = new UpdateAll();
    let newIds: string[] = [];

    if (this.selectedOrderIds.length !== 0) {
      this.selectedOrderIds.forEach((element) => {
        let newId: string = element.id;
        newIds.push(newId);
      });
    }
    const deliveryId = (e.target as HTMLSelectElement).value;
    model.deliveryTypeId = deliveryId;
    model.orderIds = newIds;
    model.allSellected = this.masterSelected;

    this.service.updateAll(model).subscribe((res) => {
      // window.location.reload();
      this.searchByCabinetId2();
    });
  }

  onCreateOrder() {
    const form = this.form.value;
    let model = new CreateOrder();

    model.id = form.personalId;
    model.trackingId = form.trackingId;
    model.weight = form.weight;
    model.turkishCargo = form.turkishCargo;

    this.isLoading2 = true;

    this.service.createOrder(model).subscribe((res) => {
      this.isLoading2 = false;
      window.location.reload();
    });
  }

  // getOrders() {
  //   this.isLoading = true;
  //   this.service.getOrder(this.lang).subscribe((res) => {
  //     this.orders = res;
  //     res.forEach((item) => {
  //       this.deliveryPrice += item.deliveryPrice;
  //     });
  //     this.isLoading = false;
  //   });
  // }

  searchByCabinetId(cabinetId: string) {
    const form = this.formDate.value;
    const dash = this.dashboardDTO;
    let sortField = '';
    if (this.sortFieldName !== null && this.sortFieldName !== undefined) {
      sortField = this.sortFieldName;
    }
    let sortOrder = 0;
    if (this.sortFieldOrder != null && this.sortFieldOrder !== undefined) {
      sortOrder = this.sortFieldOrder;
    }
    this.cabId = cabinetId.charAt(0).toUpperCase() + cabinetId.slice(1);
    this.isLoading = true;
    if (cabinetId === '') {
      this.getOrderPaging();
    } else {
      this.service
        .searchByCabinetId(
          this.cabId,
          sortOrder,
          sortField,
          this.startPage,
          this.numRows,
          this.lang,
          dash.fromDateTime,
          dash.toDateTime
        )
        .subscribe((res) => {
          console.log(res);

          this.orders = res.items;
          this.deliveryPrice = res.totalDeliveryPrice;
          this.isLoading = false;
          this.totalRecords = res.totalCount;
        });
    }
  }

  searchByCabinetId2() {
    const dash = this.dashboardDTO;
    const val = this.formDate.value;
    let sortField = '';
    if (this.sortFieldName !== null && this.sortFieldName !== undefined) {
      sortField = this.sortFieldName;
    }
    let sortOrder = 0;
    if (this.sortFieldOrder != null && this.sortFieldOrder !== undefined) {
      sortOrder = this.sortFieldOrder;
    }
    // this.cabId = cabinetId.charAt(0).toUpperCase() + cabinetId.slice(1);
    this.isLoading = true;

    this.service
      .searchByCabinetId(
        dash.cabinetId,
        sortOrder,
        sortField,
        this.startPage,
        this.numRows,
        this.lang,
        dash.fromDateTime,
        dash.toDateTime
      )
      .subscribe((res) => {
        this.ifSearch = true;
        this.orders = res.items;
        this.deliveryPrice = res.totalDeliveryPrice;
        this.isLoading = false;
        this.totalRecords = res.totalCount;
      });
  }

  getOrderPaging() {
    let sortField = '';
    if (this.sortFieldName !== null && this.sortFieldName !== undefined) {
      sortField = this.sortFieldName;
    }
    let sortOrder = 0;
    if (this.sortFieldOrder != null && this.sortFieldOrder !== undefined) {
      sortOrder = this.sortFieldOrder;
    }
    this.isLoading = true;
    this.service
      .getOrderPaging(
        this.startPage,
        this.numRows,
        sortOrder,
        sortField,
        this.lang
      )
      .subscribe((res) => {
        this.orders = res.items;
        this.ordersForCheck = res;
        this.totalRecords = res.totalCount;
        this.deliveryPrice = res.totalDeliveryPrice;
        this.isLoading = false;
        console.log(this.ordersForCheck);
      });
  }

  public pageEvent(event) {
    if (event === null || event === undefined) {
      return;
    }

    this.startPage = event.first / 5 + 1;

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

    this.searchByCabinetId2();

    // if (this.ifFilter === true) {
    //   this.onFilterDate();
    // }
    // this.getOrderPaging();
  }

  get dashboardDTO() {
    //  new Date(form.fromDateTime).getTime()

    const form = this.formDate.value;
    return {
      cabinetId: this.cabId ? this.cabId : '',
      fromDateTime: +new Date(form.fromDateTime).getTime()
        ? +new Date(form.fromDateTime).getTime()
        : '',
      toDateTime: +new Date(form.toDateTime).getTime()
        ? +new Date(form.toDateTime).getTime()
        : '',
    };
  }

  getPartners() {
    this.service.getPartners(this.lang).subscribe((res) => {
      this.partners = res;
    });
  }

  onDeleteOrder(id: any) {
    this.service.DeleteOrder(id).subscribe((res) => {
      window.location.reload();
    });
  }

  onStatusChange(e: Event, id: string) {
    this.selectedStatusId = (e.target as HTMLSelectElement).value;
    let model = new Statuses();

    model.orderId = id;
    model.statusId = this.selectedStatusId;

    this.snackBar.open('Status Updated', '', {
      duration: 2000,
    });

    this.service.updateStatus(model).subscribe((res) => {});
  }

  onUpdateDelivery(e: Event, id: string) {
    const deliveryId = (e.target as HTMLSelectElement).value;

    let model = new UpdateStatuses();

    model.orderId = id;
    model.deliveryTypeId = deliveryId;

    this.snackBar.open('Delivery Updated', '', {
      duration: 2000,
    });

    this.service.updateDeliveryType(model).subscribe((res) => {});
  }

  onUpdateWeight(e: Event, id: string) {
    this.weight = (e.target as HTMLSelectElement).value;
    let model = new WeightModel();

    model.orderId = id;
    model.weight = this.weight;

    this.snackBar.open('Weight Updated', '', {
      duration: 2000,
    });

    this.service.updateWeight(model).subscribe((res) => {});
  }
}
