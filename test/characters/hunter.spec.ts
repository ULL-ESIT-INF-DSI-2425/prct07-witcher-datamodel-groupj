import { describe, expect, test } from "vitest";
import { Hunter } from "../../src/characters/hunter.js"; // Ajusta la ruta según tu estructura de archivos

describe("Hunter class", () => {
  test("should create a Hunter object correctly", () => {
    const hunter = new Hunter(1, "Geralt of Rivia", "Human", "Kaer Morhen");

    expect(hunter.id).toBe(1);
    expect(hunter.name).toBe("Geralt of Rivia");
    expect(hunter.race).toBe("Human");
    expect(hunter.location).toBe("Kaer Morhen");
  });

  test("should allow modifying the location of a Hunter", () => {
    const hunter = new Hunter(2, "Eskel", "Human", "Kaer Morhen");

    expect(hunter.location).toBe("Kaer Morhen");

    hunter.location = "Novigrad";
    expect(hunter.location).toBe("Novigrad");
  });

  test("should allow modifying the name of a Hunter", () => {
    const hunter = new Hunter(3, "Lambert", "Human", "Kaer Morhen");

    expect(hunter.name).toBe("Lambert");

    hunter.name = "Letho";
    expect(hunter.name).toBe("Letho");
  });
});
