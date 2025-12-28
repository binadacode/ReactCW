//Key for storing favourite properties in local storage
const FAV_KEY = "favouriteProperties";

//Get current fvaourites
export const getFavouriteProperties = () => {
  const favs = localStorage.getItem(FAV_KEY);
  return favs ? JSON.parse(favs) : [];
};

//Add a property to favourites
export const addFavouriteProperty = (propertyId) => {
  const favs = getFavouriteProperties();
  const exists = favs.some((fav) => fav === propertyId);
  if (!exists) {
    favs.push(propertyId);
    localStorage.setItem(FAV_KEY, JSON.stringify(favs));
    return true; // Indicate property was added
  }
  return false; // Indicate property was already in favourites
};

//Remove a property from favourites
export const removeFavouriteProperty = (propertyId) => {
  const favs = getFavouriteProperties().filter((fav) => fav !== propertyId);
  localStorage.setItem(FAV_KEY, JSON.stringify(favs));
};

//Clear all favourites
export const clearFavouriteProperties = () => {
  localStorage.removeItem(FAV_KEY);
};
