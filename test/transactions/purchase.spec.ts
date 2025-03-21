import { describe, expect, test } from "vitest";
import { Purchase } from "../../src/transactions/purchase.js";
import { Good } from "../../src/characters/good.js";

describe("Purchase class", () => {
  test("should create a Purchase object correctly", () => {
    const itemsPurchased = [
      new Good(1, "Silver Sword", "A witcher's silver blade.", "Silver", 3.5, 250, 1),
      new Good(2, "Swallow Potion", "A healing potion.", "Alchemy", 0.5, 50, 2),
    ];

    const purchase = new Purchase(1, new Date("2025-03-21"), 201, itemsPurchased, 350);

    expect(purchase.id).toBe(1);
    expect(purchase.date).toEqual(new Date("2025-03-21"));
    expect(purchase.merchantId).toBe(201);
    expect(purchase.itemsPurchased).toHaveLength(2);
    expect(purchase.totalAmount).toBe(350);
  });

  test("should allow modifying the total amount of a Purchase", () => {
    const itemsPurchased = [
      new Good(1, "Silver Sword", "A witcher's silver blade.", "Silver", 3.5, 250, 1),
    ];

    const purchase = new Purchase(2, new Date("2025-03-22"), 202, itemsPurchased, 250);

    expect(purchase.totalAmount).toBe(250);

    purchase.totalAmount = 300;
    expect(purchase.totalAmount).toBe(300);
  });

  test("should allow modifying the items purchased in a Purchase", () => {
    const itemsPurchased = [
      new Good(1, "Silver Sword", "A witcher's silver blade.", "Silver", 3.5, 250, 1),
    ];

    const purchase = new Purchase(3, new Date("2025-03-23"), 203, itemsPurchased, 250);

    expect(purchase.itemsPurchased).toHaveLength(1);

    purchase.itemsPurchased.push(new Good(2, "Swallow Potion", "A healing potion.", "Alchemy", 0.5, 50, 1));
    expect(purchase.itemsPurchased).toHaveLength(2);
  });
});