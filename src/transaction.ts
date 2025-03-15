import { Good } from "./good.js";

export class Sale {
  constructor(
    public id: number,
    public date: Date,
    public hunterId: number,
    public itemsSold: Good[],
    public totalAmount: number
  ) {}
};

export class Purchase {
  constructor(
    public id: number,
    public date: Date,
    public merchantId: number,
    public itemsPurchased: Good[],
    public totalAmount: number
  ) {}
};

export class Return {
  constructor(
    public id: number,
    public date: Date,
    public customerId: number,
    public itemsReturned: Good[]
  ) {}
};