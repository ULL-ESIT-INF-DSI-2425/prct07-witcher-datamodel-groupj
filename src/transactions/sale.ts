import { Good } from "../characters/good.js";

export class Sale {
  constructor(
    public id: number,
    public date: Date,
    public hunterId: number,
    public itemsSold: Good[],
    public totalAmount: number
  ) {}
};