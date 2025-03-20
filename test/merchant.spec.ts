import { describe, expect, test } from "vitest";
import { Merchant } from "../src/merchant.js"; // Ajusta la ruta según tu estructura de archivos

describe("Merchant class", () => {
  test("should create a Merchant object correctly", () => {
    const merchant = new Merchant(1, "Hattori", "Blacksmith", "Novigrad");

    expect(merchant.id).toBe(1);
    expect(merchant.name).toBe("Hattori");
    expect(merchant.type).toBe("Blacksmith");
    expect(merchant.location).toBe("Novigrad");
  });

  test("should allow modifying the location of a Merchant", () => {
    const merchant = new Merchant(2, "Fergus Graem", "Blacksmith", "Crow's Perch");

    expect(merchant.location).toBe("Crow's Perch");

    merchant.location = "Novigrad";
    expect(merchant.location).toBe("Novigrad");
  });

  test("should allow modifying the type of a Merchant", () => {
    const merchant = new Merchant(3, "Keira Metz", "Alchemist", "Midcopse");

    expect(merchant.type).toBe("Alchemist");

    merchant.type = "Sorceress";
    expect(merchant.type).toBe("Sorceress");
  });
});
