import { Good } from "../characters/good.js";

export class Return {
  constructor(
    public id: number,
    public date: Date,
    public customerId: number,
    public itemsReturned: Good[]
  ) {}
};