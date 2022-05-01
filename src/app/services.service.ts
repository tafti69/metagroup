import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignInModel, SignUpModel } from './models/auth';
import { CreateCitiesModel } from './models/cities';
import { CreateCurrency } from './models/currency';
import { AddFileInvoice } from './models/invoice';
import { CreateOrder, Declaration } from './models/orders';
import { CreateProductModel } from './models/product';
import { CreatePartner } from './models/shops';
import { Statuses, UpdateStatuses } from './models/status';

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

  url = 'http://maestro2033-002-site1.ftempurl.com/api/';

  createUser(model: SignUpModel) {
    const userUrl = this.url + 'Accounts/Create';
    return this.http.post<SignUpModel>(userUrl, model);
  }

  loginUser(model: SignInModel) {
    const userUrl = this.url + 'Accounts/SignIn';
    localStorage.setItem('expiration', (Date.now() + 11 * 3600000).toString());
    return this.http.post<SignInModel>(userUrl, model);
  }

  refreshToken() {
    var model = new SignInModel();
    model.email = localStorage.getItem('email');
    model.password = localStorage.getItem('password');
    const userUrl = this.url + 'Accounts/SignIn';
    this.http.post<SignInModel>(userUrl, model).subscribe((x) => {
      localStorage.setItem('token', x.token);
      localStorage.setItem(
        'expiration',
        (Date.now() + 11 * 3600000).toString()
      );
    });
  }

  createPartner(model: CreatePartner) {
    const userUrl = this.url + 'Partners/CreatePartner';
    return this.http.post<CreatePartner>(userUrl, model);
  }

  getPartners(lang: string) {
    const httpOptionsLoc = httpOptions;
    httpOptionsLoc.params = { lang: lang };
    const userUrl = this.url + 'Partners/getPartners';
    return this.http.get<any>(userUrl, httpOptionsLoc);
  }

  createCurrency(model: CreateCurrency) {
    const userUrl = this.url + 'Currencies/CreateCurrency';
    return this.http.post<CreateCurrency>(userUrl, model);
  }

  getCurrency() {
    const userUrl = this.url + 'Currencies/GetCurrencies';
    return this.http.get<any>(userUrl);
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
    return this.http.get<any>(userUrl, httpOptionsLoc);
  }

  createOrder(model: CreateOrder) {
    const userUrl = this.url + 'Orders/Create';
    return this.http.post<CreateOrder>(userUrl, model);
  }

  getOrder(lang: string) {
    const httpOptionsLoc = httpOptions;
    httpOptionsLoc.params = { lang: lang };
    const userUrl = this.url + 'Orders/GetAll';
    return this.http.get<any>(userUrl, httpOptionsLoc);
  }
  getById(lang: string, id: any) {
    const httpOptionsLoc = httpOptions;
    httpOptionsLoc.params = { lang: lang, id: id };
    const userUrl = this.url + 'Orders/GetById';
    return this.http.get<any>(userUrl, httpOptionsLoc);
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

  DeleteOrder(orderId: any) {
    const userUrl = this.url + `Orders/Delete/${orderId}`;
    return this.http.delete(userUrl);
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

  getUserInfo(userId: any) {
    const userUrl = this.url + `Accounts/GetUserInfo/${userId}`;
    return this.http.get<SignUpModel>(userUrl);
  }

  getDeliveryType(lang: string) {
    const httpOptionsLoc = httpOptions;
    httpOptionsLoc.params = { lang: lang };
    const userUrl = this.url + 'DeliveryTypes/GetTypes';
    return this.http.get(userUrl, httpOptionsLoc);
  }

  updateStatus(model: Statuses) {
    const userUrl = this.url + 'Orders/UpdateStatus';
    return this.http.post<Statuses>(userUrl, model);
  }

  createDeclaration(model: Declaration) {
    const userUrl = this.url + 'Declarations/CreateDeclaration';
    return this.http.post<Declaration>(userUrl, model);
  }

  getDeclaration(lang: string, id: string) {
    const httpOptionsLoc = httpOptions;
    httpOptionsLoc.params = { Id: id, Lang: lang };
    const userUrl = this.url + `Declarations/GetDeclaration`;
    return this.http.get<any>(userUrl, httpOptionsLoc);
  }

  updateDeliveryType(model: UpdateStatuses) {
    const userUrl = this.url + 'Orders/UpdateDeliveryType';
    return this.http.post<UpdateStatuses>(userUrl, model);
  }

  getDashboardInfo(lang: string, id: string) {
    const httpOptionsLoc = httpOptions;
    httpOptionsLoc.params = { Id: id, Lang: lang };
    const userUrl = this.url + `Orders/GetDashboardInfo`;
    return this.http.get<any>(userUrl, httpOptionsLoc);
  }

  getMyFirst(lang: string, id: string) {
    const httpOptionsLoc = httpOptions;
    httpOptionsLoc.params = { Id: id, Lang: lang };
    const userUrl = this.url + `Orders/GetMyFirst`;
    return this.http.get<any>(userUrl, httpOptionsLoc);
  }

  getMySecond(lang: string, id: string) {
    const httpOptionsLoc = httpOptions;
    httpOptionsLoc.params = { Id: id, Lang: lang };
    const userUrl = this.url + `Orders/GetMySecond`;
    return this.http.get<any>(userUrl, httpOptionsLoc);
  }

  getMyThird(lang: string, id: string) {
    const httpOptionsLoc = httpOptions;
    httpOptionsLoc.params = { Id: id, Lang: lang };
    const userUrl = this.url + `Orders/GetMyThird`;
    return this.http.get<any>(userUrl, httpOptionsLoc);
  }

  getMyFourth(lang: string, id: string) {
    const httpOptionsLoc = httpOptions;
    httpOptionsLoc.params = { Id: id, Lang: lang };
    const userUrl = this.url + `Orders/GetMyFourth`;
    return this.http.get<any>(userUrl, httpOptionsLoc);
  }
}
