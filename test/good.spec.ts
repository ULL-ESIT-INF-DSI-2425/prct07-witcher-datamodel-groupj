import { describe, expect, test } from "vitest";
import { Good } from "../src/good.js";

describe("Good class", () => {
  test("should create a Good object correctly", () => {
    const good = new Good(1,"Silver Sword","A witcher's silver blade.","Silver",3.5,250,10);
    expect(good.id).toBe(1);
    expect(good.name).toBe("Silver Sword");
    expect(good.description).toBe("A witcher's silver blade.");
    expect(good.material).toBe("Silver");
    expect(good.weight).toBe(3.5);
    expect(good.value).toBe(250);
    expect(good.quantity).toBe(10);
  });

  test("should allow modifying quantity", () => {
    const good = new Good(2,"Steel Sword","A standard steel sword.","Steel",4.0,100,5);
    expect(good.quantity).toBe(5);
    good.quantity = 8;
    expect(good.quantity).toBe(8);
  });

  test("should allow modifying price", () => {
    const good = new Good(3,"Elixir of Swallow","A healing potion for witchers.","Alchemy",0.5,50,20);
    expect(good.value).toBe(50);
    good.value = 75;
    expect(good.value).toBe(75);
  });
});
