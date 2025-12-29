import {
  getFavouriteProperties,
  addFavouriteProperty,
  removeFavouriteProperty,
  clearFavouriteProperties,
} from "../utils/favourites";

describe("Favourites Utility", () => {
  // Mock localStorage
  beforeEach(() => {
    localStorage.clear();
  });

  it("should return empty array if no favourites exist", () => {
    expect(getFavouriteProperties()).toEqual([]);
  });

  it("should add a property to favourites", () => {
    const added = addFavouriteProperty("prop1");
    expect(added).toBe(true);
    expect(getFavouriteProperties()).toEqual(["prop1"]);
  });

  it("should prevent adding duplicate favourites", () => {
    addFavouriteProperty("prop1");
    const addedAgain = addFavouriteProperty("prop1");
    expect(addedAgain).toBe(false);
    expect(getFavouriteProperties()).toEqual(["prop1"]);
  });

  it("should remove a property from favourites", () => {
    addFavouriteProperty("prop1");
    addFavouriteProperty("prop2");
    removeFavouriteProperty("prop1");
    expect(getFavouriteProperties()).toEqual(["prop2"]);
  });

  it("should clear all favourites", () => {
    addFavouriteProperty("prop1");
    addFavouriteProperty("prop2");
    clearFavouriteProperties();
    expect(getFavouriteProperties()).toEqual([]);
    expect(localStorage.getItem("favouriteProperties")).toBeNull();
  });
});
