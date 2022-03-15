export class CreateOrder {
  trackingId: string;
  id: string;
}

export class Declaration {
  orderId: string;
  trackingId: string;
  paidAmount: number;
  currencyId: number;
  partnerId: string;
  productNameId: string;
  comment: string;
}
