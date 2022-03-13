import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
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
