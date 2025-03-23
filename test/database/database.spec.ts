import { describe, expect, test, beforeEach, vi } from "vitest";
import { Good } from "../../src/characters/good.js";
import { Merchant } from "../../src/characters/merchant.js";
import { Hunter } from "../../src/characters/hunter.js";
import { Sale } from "../../src/transactions/sale.js"
import { Purchase } from "../../src/transactions/purchase.js";
import { Return } from "../../src/transactions/return.js";
import { Database } from "../../src/database/database.js";

describe("Database class", () => {
  let db: Database;

  beforeEach(async () => {
    db = new Database();
    await db.init();
    db.db.data = { goods: [], merchants: [], hunters: [], sales: [], purchases: [], returns: [] }; // ⚠️ IMPORTANTE: Vaciar la base de datos
  });

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

  test("should update a good", () => {
    const good = new Good(1, "Silver Sword", "A witcher's silver blade.", "Silver", 3.5, 250, 10);
    db.addGood(good);
    db.updateGood(1, { value: 300, quantity: 5 });
    const updatedGood = db.getGoodByID(1);
    expect(updatedGood?.value).toBe(300);
    expect(updatedGood?.quantity).toBe(5);
  });

  test("should delete a merchant", () => {
    const merchant = new Merchant(1, "Hattori", "Blacksmith", "Novigrad");
    db.addMerchant(merchant);
    db.deleteMerchant(1);
    expect(db.getAllMerchants()).toHaveLength(0);
  });

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

  test("should delete a sale", () => {
    const sale = new Sale(1, new Date("2025-03-21"), 101, [], 250);
    db.addSale(sale);
    db.deleteSale(1);
    expect(db.getAllSales()).toHaveLength(0);
  });

  test("should delete a purchase", () => {
    const purchase = new Purchase(1, new Date("2025-03-21"), 201, [], 100);
    db.addPurchase(purchase);
    db.deletePurchase(1);
    expect(db.getAllPurchases()).toHaveLength(0);
  });

  test("should delete a return", () => {
    const returnTransaction = new Return(1, new Date("2025-03-21"), 301, []);
    db.addReturn(returnTransaction);
    db.deleteReturn(1);
    expect(db.getAllReturns()).toHaveLength(0);
  });

  test("should retrieve a good by name", () => {
    const good = new Good(1, "Silver Sword", "A witcher's silver blade.", "Silver", 3.5, 250, 10);
    db.addGood(good);
    const foundGood = db.getGoodByName("Silver Sword");
    expect(foundGood).toBeDefined();
    expect(foundGood?.name).toBe("Silver Sword");
  });

  test("should retrieve a good by description", () => {
    const good = new Good(2, "Swallow Potion", "A healing potion for witchers.", "Alchemy", 0.5, 50, 5);
    db.addGood(good);
    const foundGood = db.getGoodByDescription("A healing potion for witchers.");
    expect(foundGood).toBeDefined();
    expect(foundGood?.description).toBe("A healing potion for witchers.");
  });

  test("should retrieve a merchant by name", () => {
    const merchant = new Merchant(1, "Hattori", "Blacksmith", "Novigrad");
    db.addMerchant(merchant);
    const foundMerchant = db.getMerchantByName("Hattori");
    expect(foundMerchant).toBeDefined();
    expect(foundMerchant?.name).toBe("Hattori");
  });

  test("should retrieve a merchant by type", () => {
    const merchant = new Merchant(2, "Keira Metz", "Alchemist", "Midcopse");
    db.addMerchant(merchant);
    const foundMerchant = db.getMerchantByType("Alchemist");
    expect(foundMerchant).toBeDefined();
    expect(foundMerchant?.type).toBe("Alchemist");
  });

  test("should retrieve a merchant by location", () => {
    const merchant = new Merchant(3, "Fergus Graem", "Blacksmith", "Crow's Perch");
    db.addMerchant(merchant);
    const foundMerchant = db.getMerchantByLocation("Crow's Perch");
    expect(foundMerchant).toBeDefined();
    expect(foundMerchant?.location).toBe("Crow's Perch");
  });

  test("should retrieve a hunter by name", () => {
    const hunter = new Hunter(1, "Geralt of Rivia", "Human", "Kaer Morhen");
    db.addHunter(hunter);
    const foundHunter = db.getHunterByName("Geralt of Rivia");
    expect(foundHunter).toBeDefined();
    expect(foundHunter?.name).toBe("Geralt of Rivia");
  });

  test("should retrieve a hunter by race", () => {
    const hunter = new Hunter(2, "Iorveth", "Elf", "Vergen");
    db.addHunter(hunter);
    const foundHunter = db.getHunterByRace("Elf");
    expect(foundHunter).toBeDefined();
    expect(foundHunter?.race).toBe("Elf");
  });

  test("should retrieve a hunter by location", () => {
    const hunter = new Hunter(3, "Letho of Gulet", "Human", "Nilfgaard");
    db.addHunter(hunter);
    const foundHunter = db.getHunterByLocation("Nilfgaard");
    expect(foundHunter).toBeDefined();
    expect(foundHunter?.location).toBe("Nilfgaard");
  });

  test("should update a merchant", () => {
    const merchant = new Merchant(1, "Hattori", "Blacksmith", "Novigrad");
    db.addMerchant(merchant);

    db.updateMerchant(1, { type: "Master Blacksmith", location: "Beauclair" });

    const updatedMerchant = db.getMerchantByID(1);
    expect(updatedMerchant).toBeDefined();
    expect(updatedMerchant?.type).toBe("Master Blacksmith");
    expect(updatedMerchant?.location).toBe("Beauclair");
  });

  test("should update a hunter", () => {
    const hunter = new Hunter(1, "Geralt of Rivia", "Human", "Kaer Morhen");
    db.addHunter(hunter);
    db.updateHunter(1, { location: "Toussaint" });
    const updatedHunter = db.getHunterByID(1);
    expect(updatedHunter).toBeDefined();
    expect(updatedHunter?.location).toBe("Toussaint");
  });

  test("should delete a good", () => {
    const good = new Good(1, "Silver Sword", "A witcher's silver blade.", "Silver", 3.5, 250, 10);
    db.addGood(good);
    expect(db.getAllGoods()).toHaveLength(1);
    db.deleteGood(1);
    expect(db.getAllGoods()).toHaveLength(0);
  });

  test("should delete a hunter", () => {
    const hunter = new Hunter(2, "Letho of Gulet", "Human", "Nilfgaard");
    db.addHunter(hunter);
    db.deleteHunter(2);
    const hunters = db.getAllHunters();
    expect(hunters).toHaveLength(0);
  });

  test("should not update a non-existent merchant", () => {
    expect(() => {
      db.updateMerchant(99, { type: "Alchemist" });
    }).toThrow("No se encontró un Merchant con ID 99");
  });
  
  test("should not update a non-existent hunter", () => {
    expect(() => {
      db.updateHunter(99, { location: "Skellige" });
    }).toThrow("No se encontró un Hunter con ID 99");
  });
  

  test("should not delete a non-existent good", () => {
    db.deleteGood(99);
    expect(db.getAllGoods()).toHaveLength(0);
  });

  test("should not delete a non-existent hunter", () => {
    db.deleteHunter(99);
    expect(db.getAllHunters()).toHaveLength(0);
  });
});