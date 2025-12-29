import { describe, it, expect } from "vitest";
import { searchProperties } from "./searchProperties.js";

//Mock data for testing
const properties = [
  {
    id: "prop1",
    type: "House",
    bedrooms: 3,
    price: 750000,
    location: "Petts Wood Road Orpington BR5",
    postcode: "BR5",
    added: { month: "October", day: 12, year: 2022 },
  },
  {
    id: "prop2",
    type: "Flat",
    bedrooms: 2,
    price: 399995,
    location: "Crofton Road Orpington BR6",
    postcode: "BR6",
    added: { month: "September", day: 14, year: 2022 },
  },
  {
    id: "prop3",
    type: "House",
    bedrooms: 4,
    price: 925000,
    location: "High Street Bromley BR1",
    postcode: "BR1",
    added: { month: "August", day: 3, year: 2023 },
  },
];

describe("searchProperties", () => {
  it("returns all properties when no filters are applied", () => {
    const results = searchProperties(properties, {});
    expect(results.length).toBe(3);
  });

  it("filters by property type", () => {
    const results = searchProperties(properties, { type: "House" });
    expect(results.length).toBe(2);
    expect(results.every((prop) => prop.type === "House")).toBe(true);
  });

  it("filters by minimum price", () => {
    const results = searchProperties(properties, { minPrice: 800000 });
    expect(results.length).toBe(1);
    expect(results[0].price).toBeGreaterThanOrEqual(800000);
  });

  it("filters by bedroom range", () => {
    const results = searchProperties(properties, {
      minBedrooms: 2,
      maxBedrooms: 3,
    });
    expect(results.length).toBe(2);
    expect(
      results.every((prop) => prop.bedrooms >= 2 && prop.bedrooms <= 3)
    ).toBe(true);
  });

  it("filters by postcode", () => {
    const results = searchProperties(properties, { location: "BR1" });
    expect(results.length).toBe(1);
    expect(results[0].location.endsWith("BR1")).toBe(true);
  });

  it("filters by date added (after a given date)", () => {
    const results = searchProperties(properties, {
      dateFrom: new Date(2023, 0, 1),
    });
    expect(results.length).toBe(1);
    expect(results[0].id).toBe("prop3");
  });

  it("applies multiple filters simultaneously", () => {
    const results = searchProperties(properties, {
      type: "House",
      minPrice: 800000,
    });
    expect(results.length).toBe(1);
    expect(results[0].id).toBe("prop3");
  });
});
