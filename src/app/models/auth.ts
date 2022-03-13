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
}
