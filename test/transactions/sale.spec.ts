import { describe, expect, test } from "vitest";
import { Sale } from "../../src/transactions/sale.js";
import { Good } from "../../src/characters/good.js";

describe("Sale class", () => {
  test("should create a Sale object correctly", () => {
    const itemsSold = [
      new Good(1, "Silver Sword", "A witcher's silver blade.", "Silver", 3.5, 250, 1),
      new Good(2, "Swallow Potion", "A healing potion for witchers.", "Alchemy", 0.5, 50, 2),
    ];
    const sale = new Sale(1, new Date("2025-03-21"), 101, itemsSold, 350);
    expect(sale.id).toBe(1);
    expect(sale.date).toEqual(new Date("2025-03-21"));
    expect(sale.hunterId).toBe(101);
    expect(sale.itemsSold).toHaveLength(2);
    expect(sale.totalAmount).toBe(350);
  });

  test("should allow modifying the total amount of a Sale", () => {
    const itemsSold = [
      new Good(1, "Silver Sword", "A witcher's silver blade.", "Silver", 3.5, 250, 1),
    ];
    const sale = new Sale(2, new Date("2025-03-22"), 102, itemsSold, 250);
    expect(sale.totalAmount).toBe(250);
    sale.totalAmount = 300;
    expect(sale.totalAmount).toBe(300);
  });

  test("should allow modifying the items sold in a Sale", () => {
    const itemsSold = [
      new Good(1, "Silver Sword", "A witcher's silver blade.", "Silver", 3.5, 250, 1),
    ];
    const sale = new Sale(3, new Date("2025-03-23"), 103, itemsSold, 250);
    expect(sale.itemsSold).toHaveLength(1);
    sale.itemsSold.push(new Good(2, "Swallow Potion", "A healing potion.", "Alchemy", 0.5, 50, 1));
    expect(sale.itemsSold).toHaveLength(2);
  });
});