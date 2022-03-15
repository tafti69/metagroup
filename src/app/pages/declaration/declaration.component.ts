import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Declaration } from 'src/app/models/orders';
import { ServicesService } from 'src/app/services.service';

@Component({
  selector: 'app-declaration',
  templateUrl: './declaration.component.html',
  styleUrls: ['./declaration.component.scss']
})
export class DeclarationComponent implements OnInit {

  constructor(private service: ServicesService, private route: ActivatedRoute) { }

  form: FormGroup;
  orderId: any;
  trackId: any;
  lang: any;
  isLoading = false;

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
   })



   this.orderId = this.route.snapshot.params.id;

   this.getCurrencies();
   this.getDecl();
   this.getPartners();
   this.getProduct();
  }

  getCurrencies() {
    this.service.getCurrency().subscribe((res) => {
      this.currencies = res;
      // this.form.patchValue({
      //   currencyId: res.id
      // })
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

    this.isLoading = true;
    this.service.createDeclaration(model).subscribe(res => {
      console.log(res);
      this.isLoading = false;
    })
  }

  getDecl() {
    this.isLoading = true
    this.service.getDeclaration(this.lang, this.orderId).subscribe(res => {
      this.trackId = res.trackingId;
      console.log(res);
      this.isLoading = false;
      this.form.patchValue({
        trackingId: this.trackId,
        paidAmount: res.paidAmount,
        currencyId: res.currency,
        partnerId: res.partner,
        productNameId: res.productName,
        comment: res.comment
      })
    })
  }

  onChange(e) {
    console.log((e.target as HTMLSelectElement).value);
  }


}
