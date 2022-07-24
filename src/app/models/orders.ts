export class CreateOrder {
  trackingId: string;
  id: string;
  weight: string;
  turkishCargo: string;
}

export class Declaration {
  orderId: string;
  trackingId: string;
  paidAmount: number;
  currencyId: number;
  partnerId: string;
  productNameId: string;
  comment: string;
  weight: string;
  turkishCargo: string;
}

export class WeightModel {
  orderId: string;
  weight: string;
}

export class UpdateAll {
  orderIds: string[];
  statusId: string;
  deliveryTypeId: string;
  allSellected: boolean;
  from: any;
  to: any;
}

export class OrdersDTO {
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
  isChecked: boolean;
  deliveryPrice: number;
}

export class ExcelModel {
  from: number;
  to: number;
  SearchText: string;
}
