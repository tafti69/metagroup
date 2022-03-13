import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignInModel, SignUpModel } from './models/auth';
import { CreateCitiesModel } from './models/cities';
import { CreateCurrency } from './models/currency';
import { AddFileInvoice } from './models/invoice';
import { CreateOrder } from './models/orders';
import { CreateProductModel } from './models/product';
import { CreatePartner } from './models/shops';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    Accept: 'application/json',
  }),
  params: {},
};

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  constructor(private http: HttpClient) {}

  url = 'http://webapi.aicargo.site/api/';

  createUser(model: SignUpModel) {
    const userUrl = this.url + 'Accounts/Create';
    return this.http.post<SignUpModel>(userUrl, model, httpOptions);
  }

  loginUser(model: SignInModel) {
    const userUrl = this.url + 'Accounts/SignIn';
    return this.http.post<SignInModel>(userUrl, model, httpOptions);
  }

  createPartner(model: CreatePartner) {
    const userUrl = this.url + 'Partners/CreatePartner';
    return this.http.post<CreatePartner>(userUrl, model, httpOptions);
  }

  getPartners(lang: string) {
    const httpOptionsLoc = httpOptions;
    httpOptionsLoc.params = { lang: lang };
    const userUrl = this.url + 'Partners/getPartners';
    return this.http.get(userUrl, httpOptionsLoc);
  }

  createCurrency(model: CreateCurrency) {
    const userUrl = this.url + 'Currencies/CreateCurrency';
    return this.http.post<CreateCurrency>(userUrl, model);
  }

  getCurrency() {
    const userUrl = this.url + 'Currencies/GetCurrencies';
    return this.http.get(userUrl);
  }

  createCity(model: CreateCitiesModel) {
    const userUrl = this.url + 'Cities/CreateCity';
    return this.http.post<CreateCitiesModel>(userUrl, model);
  }

  getCity(lang: string) {
    const httpOptionsLoc = httpOptions;
    httpOptionsLoc.params = { lang: lang };
    const userUrl = this.url + 'Cities/GetCities';
    return this.http.get(userUrl, httpOptionsLoc);
  }

  createProduct(model: CreateProductModel) {
    const userUrl = this.url + 'ProductNames/CreateProductName';
    return this.http.post<CreateProductModel>(userUrl, model);
  }

  getProduct(lang: string) {
    const httpOptionsLoc = httpOptions;
    httpOptionsLoc.params = { lang: lang };
    const userUrl = this.url + 'ProductNames/GetNames';
    return this.http.get(userUrl, httpOptionsLoc);
  }

  createOrder(model: CreateOrder) {
    const userUrl = this.url + 'Orders/Create';
    return this.http.post<CreateOrder>(userUrl, model);
  }

  getOrder(lang: string) {
    const httpOptionsLoc = httpOptions;
    httpOptionsLoc.params = { lang: lang };
    const userUrl = this.url + 'Orders/GetAll';
    return this.http.get(userUrl, httpOptionsLoc);
  }

  getStatuses(lang: string) {
    const httpOptionsLoc = httpOptions;
    httpOptionsLoc.params = { lang: lang };
    const userUrl = this.url + 'Statuses/GetStatuses';
    return this.http.get(userUrl, httpOptionsLoc);
  }

  addFileForInvoice(model: AddFileInvoice) {
    const userUrl = this.url + 'Orders/AddFile';
    return this.http.post<AddFileInvoice>(userUrl, model);
  }

  downloadInvoiceFile(orderId: any) {
    const userUrl = this.url + `Orders/DownloadFile/${orderId}`;
    return this.http.get(userUrl, {
      responseType: 'blob',
    });
  }

  getFileName(orderId: any) {
    const userUrl = this.url + `Orders/GetFileName/${orderId}`;
    return this.http.get(userUrl);
  }

  getDeliveryType(lang: string) {
    const httpOptionsLoc = httpOptions;
    httpOptionsLoc.params = { lang: lang };
    const userUrl = this.url + 'DeliveryTypes/GetTypes';
    return this.http.get(userUrl, httpOptionsLoc);
  }
}
