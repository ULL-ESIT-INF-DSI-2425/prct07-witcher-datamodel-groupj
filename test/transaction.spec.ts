import { describe, expect, test } from "vitest";
import { Sale, Purchase, Return } from "../src/transaction.js"; // Ajusta la ruta según tu estructura de archivos
import { Good } from "../src/good.js"; // Asegúrate de que la ruta sea correcta

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