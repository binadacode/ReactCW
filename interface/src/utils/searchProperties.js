// Converts the provided object into a JS date
const toTimestamp = (date) => {
  if (!date) return null;

  const monthIndex = new Date(`${date.month} 1, 2000`).getMonth();
  return new Date(date.year, monthIndex, date.day).getTime();
};

export const searchProperties = (properties, filters) => {
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
    if (filters.type && filters.type !== "Any") {
      if (property.type !== filters.type) {
        return false;
      }
    }

    if (minPrice !== null) {
      if (property.price < minPrice) {
        return false;
      }
    }

    if (maxPrice !== null) {
      if (property.price > maxPrice) {
        return false;
      }
    }

    if (minBedrooms !== null) {
      if (property.bedrooms < minBedrooms) {
        return false;
      }
    }

    if (maxBedrooms !== null) {
      if (property.bedrooms > maxBedrooms) {
        return false;
      }
    }

    if (filters.location && filters.location.trim() !== "") {
      const location = filters.location.toLowerCase();
      if (!property.location.toLowerCase().includes(location)) {
        return false;
      }
    }

    if (dateFrom !== null) {
      const propertyDate = toTimestamp(property.added);
      if (propertyDate < dateFrom) {
        return false;
      }
    }

    return true;
  });
};
