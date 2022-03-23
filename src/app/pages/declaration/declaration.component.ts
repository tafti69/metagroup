import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Emitters } from 'app/models/auth';
import { Declaration } from 'app/models/orders';
import { ServicesService } from 'app/services.service';

@Component({
  selector: 'app-declaration',
  templateUrl: './declaration.component.html',
  styleUrls: ['./declaration.component.scss'],
})
export class DeclarationComponent implements OnInit {
  constructor(
    private service: ServicesService,
    private route: ActivatedRoute
  ) {}

  form: FormGroup;
  orderId: any;
  trackId: any;
  lang: any;
  isLoading = false;
  success = false;
  ifPaidAmount;

  currencies: any = [];
  partners: any = [];
  products: any = [];

  ngOnInit(): void {
    this.lang = localStorage.getItem('lang');
    if (this.lang === undefined || this.lang === null) {
      this.lang = 'AZE';
      localStorage.setItem('lang', 'AZE');
    }

    this.form = new FormGroup({
      trackingId: new FormControl('', Validators.required),
      paidAmount: new FormControl('', Validators.required),
      currencyId: new FormControl('', Validators.required),
      partnerId: new FormControl('', Validators.required),
      productNameId: new FormControl('', Validators.required),
      comment: new FormControl(''),
    });

    this.orderId = this.route.snapshot.params.id;

    this.getCurrencies();
    this.getDecl();
    this.getPartners();
    this.getProduct();
  }

  getCurrencies() {
    this.service.getCurrency().subscribe((res) => {
      this.currencies = res;
    });
  }

  getPartners() {
    this.service.getPartners(this.lang).subscribe((res) => {
      this.partners = res;
    });
  }

  getProduct() {
    this.service.getProduct(this.lang).subscribe((res) => {
      this.products = res;
    });
  }

  createDeclaration() {
    let val = this.form.value;
    let model = new Declaration();

    model.orderId = this.orderId;
    model.paidAmount = val.paidAmount;
    model.currencyId = val.currencyId;
    model.partnerId = val.partnerId;
    model.productNameId = val.productNameId;
    model.comment = val.comment;

    console.log(model);

    this.isLoading = true;
    this.service.createDeclaration(model).subscribe((res) => {
      console.log(res);
      this.isLoading = false;
      this.success = true;
      Emitters.successDecl.emit(true);
    });
  }

  getDecl() {
    this.isLoading = true;
    this.service.getDeclaration(this.lang, this.orderId).subscribe((res) => {
      this.trackId = res.trackingId;
      this.ifPaidAmount = res.paidAmount;
      console.log(res);
      this.isLoading = false;
      this.form.patchValue({
        trackingId: this.trackId,
        paidAmount: res.paidAmount,
        currencyId: res.currency.id,
        partnerId: res.partner.id,
        productNameId: res.productName.id,
        comment: res.comment,
      });
    });
  }
}
