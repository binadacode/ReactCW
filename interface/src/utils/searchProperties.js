// Converts the provided object into a JS timestamp
const toTimestamp = (date) => {
  if (!date) return null;
  const monthIndex = new Date(`${date.month} 1, 2000`).getMonth();
  return new Date(date.year, monthIndex, date.day).getTime();
};

export const searchProperties = (properties, filters) => {
  console.log("Filters received:", filters);

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

  const dateFrom = filters.dateFrom
    ? new Date(filters.dateFrom).getTime()
    : null;

  return properties.filter((property) => {
    console.log("Checking property:", property.id);

    // Type filter
    if (filters.type && filters.type !== "Any") {
      if (property.type !== filters.type) {
        console.log(`Property ${property.id} filtered out by type`);
        return false;
      }
    }

    // Price filters
    if (minPrice !== null && property.price < minPrice) {
      console.log(`Property ${property.id} filtered out by minPrice`);
      return false;
    }
    if (maxPrice !== null && property.price > maxPrice) {
      console.log(`Property ${property.id} filtered out by maxPrice`);
      return false;
    }

    // Bedrooms filters
    if (minBedrooms !== null && property.bedrooms < minBedrooms) {
      console.log(`Property ${property.id} filtered out by minBedrooms`);
      return false;
    }
    if (maxBedrooms !== null && property.bedrooms > maxBedrooms) {
      console.log(`Property ${property.id} filtered out by maxBedrooms`);
      return false;
    }

    // Postcode filter (using filters.location)
    if (filters.location && filters.location.trim() !== "") {
      const filterPostcode = filters.location.trim().toLowerCase();
      const propertyPostcode = property.postcode.trim().toLowerCase();

      if (!propertyPostcode.startsWith(filterPostcode)) {
        console.log(
          `Property ${property.id} filtered out by postcode: ${filterPostcode}`
        );
        return false;
      }
    }

    // Date filter
    if (dateFrom !== null) {
      const propertyDate = toTimestamp(property.added);
      if (propertyDate < dateFrom) {
        console.log(`Property ${property.id} filtered out by date`);
        return false;
      }
    }

    console.log(`Property matches all filters: ${property.id}`);
    return true;
  });
};
