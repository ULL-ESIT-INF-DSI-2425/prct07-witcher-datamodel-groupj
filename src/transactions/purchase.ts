import { Good } from "../characters/good.js";

export class Purchase {
  constructor(
    public id: number,
    public date: Date,
    public merchantId: number,
    public itemsPurchased: Good[],
    public totalAmount: number
  ) {}
};