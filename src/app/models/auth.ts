import { EventEmitter } from '@angular/core';

export class SignUpModel {
  email: string;
  firstNameAndLastNameEN: string;
  firstNameAndLastNameKA: string;
  phoneNumber: string;
  additionalPhoneNumber: string;
  personalID: string;
  region: string;
  address: string;
  password: string;
}

export class SignInModel {
  email: string;
  password: string;
  id: string;
  token: string;
  isAdmin: boolean;
  name: string;
  // userType: string;
}

export class Emitters {
  static user = new EventEmitter<boolean>();
  static successDecl = new EventEmitter<boolean>();
}
