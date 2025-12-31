// Converts the provided { month, day, year } object into a JS timestamp
const toTimestamp = (date) => {
  if (!date) return null;

  const monthIndex = new Date(`${date.month} 1, 2000`).getMonth();
  return new Date(date.year, monthIndex, date.day).getTime();
};

export const searchProperties = (properties, filters) => {
  // Convert numeric filters safely
  const minPrice =
    filters.minPrice !== "" && filters.minPrice !== undefined
      ? Number(filters.minPrice)
      : null;

  const maxPrice =
    filters.maxPrice !== "" && filters.maxPrice !== undefined
      ? Number(filters.maxPrice)
      : null;

  const minBedrooms =
    filters.minBedrooms !== "" && filters.minBedrooms !== undefined
      ? Number(filters.minBedrooms)
      : null;

  const maxBedrooms =
    filters.maxBedrooms !== "" && filters.maxBedrooms !== undefined
      ? Number(filters.maxBedrooms)
      : null;

  // Convert date inputs from search form
  const dateFrom = filters.dateFrom
    ? new Date(filters.dateFrom).getTime()
    : null;

  const dateTo = filters.dateTo ? new Date(filters.dateTo).getTime() : null;

  return properties.filter((property) => {
    // TYPE FILTER
    if (filters.type && filters.type !== "Any") {
      if (property.type !== filters.type) {
        return false;
      }
    }

    // PRICE FILTERS
    if (minPrice !== null && property.price < minPrice) {
      return false;
    }

    if (maxPrice !== null && property.price > maxPrice) {
      return false;
    }

    // BEDROOM FILTERS
    if (minBedrooms !== null && property.bedrooms < minBedrooms) {
      return false;
    }

    if (maxBedrooms !== null && property.bedrooms > maxBedrooms) {
      return false;
    }

    // LOCATION / POSTCODE FILTER
    if (filters.location && filters.location.trim() !== "") {
      const filterPostcode = filters.location.trim().toLowerCase();
      const propertyPostcode = property.postcode.trim().toLowerCase();

      const regex = new RegExp(`\\b${filterPostcode}$`, "i");
      if (!regex.test(propertyPostcode)) {
        return false;
      }
    }

    // DATE ADDED FILTER
    const propertyDate = toTimestamp(property.added);

    if (dateFrom !== null && propertyDate < dateFrom) {
      return false;
    }

    if (dateTo !== null && propertyDate > dateTo) {
      return false;
    }

    return true;
  });
};
