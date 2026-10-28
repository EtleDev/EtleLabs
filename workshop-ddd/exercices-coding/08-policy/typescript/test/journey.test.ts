import { describe, expect, it } from "vitest";
import { Journey } from "../src/journey";

describe("Journey", () => {
  // Regle 1 : prix = distance x 100.
  it("facture 100 par kilometre", () => {
    expect(new Journey().calculatePrice(30).amount()).toBe(3000);
  });
});
