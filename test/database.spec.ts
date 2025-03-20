import { describe, expect, test, beforeEach, vi } from "vitest";
import { Database } from "../src/database"; // Ajusta la ruta si es necesario
import { Good } from "../src/good.js";
import { Merchant } from "../src/merchant.js";
import { Hunter } from "../src/hunter.js";
import { Sale, Purchase, Return } from "../src/transaction.js";

describe("Database class", () => {
  let db: Database;

  beforeEach(async () => {
    db = new Database();
    await db.init(); // Inicializar la base de datos vacía
  });

  // 🔹 Test para agregar y obtener bienes (Goods)
  test("should add and retrieve goods", () => {
    const good = new Good(1, "Silver Sword", "A witcher's silver blade.", "Silver", 3.5, 250, 10);
    db.addGood(good);

    const goods = db.getAllGoods();
    expect(goods).toHaveLength(1);
    expect(goods[0].name).toBe("Silver Sword");

    const foundGood = db.getGoodByID(1);
    expect(foundGood).toBeDefined();
    expect(foundGood?.name).toBe("Silver Sword");
  });

  // 🔹 Test para agregar y obtener mercaderes (Merchants)
  test("should add and retrieve merchants", () => {
    const merchant = new Merchant(1, "Hattori", "Blacksmith", "Novigrad");
    db.addMerchant(merchant);

    const merchants = db.getAllMerchants();
    expect(merchants).toHaveLength(1);
    expect(merchants[0].name).toBe("Hattori");

    const foundMerchant = db.getMerchantByID(1);
    expect(foundMerchant).toBeDefined();
    expect(foundMerchant?.type).toBe("Blacksmith");
  });

  // 🔹 Test para agregar y obtener cazadores de monstruos (Hunters)
  test("should add and retrieve hunters", () => {
    const hunter = new Hunter(1, "Geralt of Rivia", "Human", "Kaer Morhen");
    db.addHunter(hunter);

    const hunters = db.getAllHunters();
    expect(hunters).toHaveLength(1);
    expect(hunters[0].name).toBe("Geralt of Rivia");

    const foundHunter = db.getHunterByID(1);
    expect(foundHunter).toBeDefined();
    expect(foundHunter?.race).toBe("Human");
  });

  // 🔹 Test para actualizar un bien (Good)
  test("should update a good", () => {
    const good = new Good(1, "Silver Sword", "A witcher's silver blade.", "Silver", 3.5, 250, 10);
    db.addGood(good);

    db.updateGood(1, { value: 300, quantity: 5 });

    const updatedGood = db.getGoodByID(1);
    expect(updatedGood?.value).toBe(300);
    expect(updatedGood?.quantity).toBe(5);
  });

  // 🔹 Test para eliminar un mercader (Merchant)
  test("should delete a merchant", () => {
    const merchant = new Merchant(1, "Hattori", "Blacksmith", "Novigrad");
    db.addMerchant(merchant);

    db.deleteMerchant(1);
    expect(db.getAllMerchants()).toHaveLength(0);
  });

  // 🔹 Test para registrar una venta (Sale)
  test("should add a sale and retrieve it", () => {
    const itemsSold = [
      new Good(1, "Silver Sword", "A witcher's silver blade.", "Silver", 3.5, 250, 1),
    ];
    const sale = new Sale(1, new Date("2025-03-21"), 101, itemsSold, 250);
    db.addSale(sale);

    const sales = db.getAllSales();
    expect(sales).toHaveLength(1);
    expect(sales[0].totalAmount).toBe(250);
  });

  // 🔹 Test para registrar una compra (Purchase)
  test("should add a purchase and retrieve it", () => {
    const itemsPurchased = [
      new Good(2, "Swallow Potion", "A healing potion.", "Alchemy", 0.5, 50, 2),
    ];
    const purchase = new Purchase(1, new Date("2025-03-21"), 201, itemsPurchased, 100);
    db.addPurchase(purchase);

    const purchases = db.getAllPurchases();
    expect(purchases).toHaveLength(1);
    expect(purchases[0].totalAmount).toBe(100);
  });

  // 🔹 Test para registrar una devolución (Return)
  test("should add a return and retrieve it", () => {
    const itemsReturned = [
      new Good(3, "Silver Dagger", "A small but deadly silver blade.", "Silver", 1.2, 150, 1),
    ];
    const returnTransaction = new Return(1, new Date("2025-03-21"), 301, itemsReturned);
    db.addReturn(returnTransaction);

    const returns = db.getAllReturns();
    expect(returns).toHaveLength(1);
    expect(returns[0].itemsReturned[0].name).toBe("Silver Dagger");
  });

  // 🔹 Test para eliminar una venta (Sale)
  test("should delete a sale", () => {
    const sale = new Sale(1, new Date("2025-03-21"), 101, [], 250);
    db.addSale(sale);

    db.deleteSale(1);
    expect(db.getAllSales()).toHaveLength(0);
  });

  // 🔹 Test para eliminar una compra (Purchase)
  test("should delete a purchase", () => {
    const purchase = new Purchase(1, new Date("2025-03-21"), 201, [], 100);
    db.addPurchase(purchase);

    db.deletePurchase(1);
    expect(db.getAllPurchases()).toHaveLength(0);
  });

  // 🔹 Test para eliminar una devolución (Return)
  test("should delete a return", () => {
    const returnTransaction = new Return(1, new Date("2025-03-21"), 301, []);
    db.addReturn(returnTransaction);

    db.deleteReturn(1);
    expect(db.getAllReturns()).toHaveLength(0);
  });
});