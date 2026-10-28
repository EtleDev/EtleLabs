import { describe, expect, it } from "vitest";
import { HttpClient, PriceCalculator } from "../src/price-calculator";

// Filet de securite : le prix ne doit pas bouger pendant la refacto.
const RATIOS: Record<string, number> = { urban: 1.2, rural: 1.65 };

const httpClient: HttpClient = {
  get(url: string) {
    const name = new URL(url).searchParams.get("name") ?? "";
    return { ratio: RATIOS[name] };
  },
};

describe("PriceCalculator", () => {
  it("facture 1.20 EUR du km en intra-muros", () => {
    expect(new PriceCalculator(httpClient).calculate(10, "urban")).toBeCloseTo(12);
  });

  it("facture 1.65 EUR du km en extra-muros", () => {
    expect(new PriceCalculator(httpClient).calculate(10, "rural")).toBeCloseTo(16.5);
  });
});
