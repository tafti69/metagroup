import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServicesService } from './services.service';
import { SignInModel } from './models/auth';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private service: ServicesService) {}

  signInReq: SignInModel = new SignInModel()

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {

    // var time = parseInt(localStorage.getItem('expiration'));
    // if (time < Date.now()) {
    //   console.log('refreshed');

    //   this.service.refreshToken();
    // }

    req = req.clone({
      setHeaders: {
        'Content-Type': 'application/json; charset=utf-8',
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    return next.handle(req);
  }
}
