import { describe, expect, test } from "vitest";
import { Return } from "../../src/transactions/return.js";
import { Good } from "../../src/characters/good.js";

describe("Return class", () => {
  test("should create a Return object correctly", () => {
    const itemsReturned = [
      new Good(1, "Silver Sword", "A witcher's silver blade.", "Silver", 3.5, 250, 1),
    ];

    const returnTransaction = new Return(1, new Date("2025-03-21"), 301, itemsReturned);

    expect(returnTransaction.id).toBe(1);
    expect(returnTransaction.date).toEqual(new Date("2025-03-21"));
    expect(returnTransaction.customerId).toBe(301);
    expect(returnTransaction.itemsReturned).toHaveLength(1);
  });

  test("should allow modifying the items in a Return", () => {
    const itemsReturned = [
      new Good(1, "Silver Sword", "A witcher's silver blade.", "Silver", 3.5, 250, 1),
    ];

    const returnTransaction = new Return(2, new Date("2025-03-22"), 302, itemsReturned);

    expect(returnTransaction.itemsReturned).toHaveLength(1);

    returnTransaction.itemsReturned.push(new Good(2, "Swallow Potion", "A healing potion.", "Alchemy", 0.5, 50, 1));
    expect(returnTransaction.itemsReturned).toHaveLength(2);
  });

  test("should allow modifying the customer ID in a Return", () => {
    const itemsReturned = [
      new Good(1, "Silver Sword", "A witcher's silver blade.", "Silver", 3.5, 250, 1),
    ];

    const returnTransaction = new Return(3, new Date("2025-03-23"), 303, itemsReturned);

    expect(returnTransaction.customerId).toBe(303);

    returnTransaction.customerId = 304;
    expect(returnTransaction.customerId).toBe(304);
  });
});