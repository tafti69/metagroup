import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateProductModel } from 'app/models/product';
import { ServicesService } from 'app/services.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  constructor(private service: ServicesService) {}

  form: FormGroup;

  products: any = [];
  lang: any;
  isLoading = false;

  ngOnInit(): void {
    this.lang = localStorage.getItem('lang');
    if (this.lang === undefined || this.lang === null) {
      this.lang = 'AZE';
      localStorage.setItem('lang', 'AZE');
    }

    this.form = new FormGroup({
      kaProduct: new FormControl('', Validators.required),
      azProduct: new FormControl('', Validators.required),
      ruProduct: new FormControl('', Validators.required),
    });

    this.getProduct();
  }

  onCreateProduct() {
    const form = this.form.value;
    let model = new CreateProductModel();

    model.azName = form.azProduct;
    model.kaName = form.kaProduct;
    model.ruName = form.ruProduct;

    this.isLoading = true;
    this.service.createProduct(model).subscribe((res) => {
      this.isLoading = false;
      window.location.reload();
    });
  }

  getProduct() {
    this.service.getProduct(this.lang).subscribe((res) => {
      this.products = res;
    });
  }
}
