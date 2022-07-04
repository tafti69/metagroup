import { EventEmitter } from '@angular/core';

export class SignUpModel {
  email: string;
  firstNameEN: string;
  firstNameKA: string;
  lastNameEN: string;
  lastNameKA: string;
  phoneNumber: string;
  whatsAppNumber: string;
  personalID: string;
  region: string;
  address: string;
  password: string;
  cabinetId: string;
  isOrganization: boolean;
  userId?: string;
}

export class SignInModel {
  email: string;
  password: string;
  id: string;
  token: string;
  isAdmin: boolean;
  userName: string;
  // userType: string;
}

export class Emitters {
  static user = new EventEmitter<boolean>();
  static successDecl = new EventEmitter<boolean>();
}
