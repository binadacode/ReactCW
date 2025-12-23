// Converts the provided object into a JS date
const toDate = (date) => {
  return new Date(
    date.year,
    new Date(`${date.month} 1, 2000`).getMonth(),
    date.day
  );
};

export const searchProperties = (properties, filters) => {
  const minPrice =
    filters.minPrice !== undefined ? Number(filters.minPrice) : undefined;
  const maxPrice =
    filters.maxPrice !== undefined ? Number(filters.maxPrice) : undefined;
  const minBedrooms =
    filters.minBedrooms !== undefined ? Number(filters.minBedrooms) : undefined;
  const maxBedrooms =
    filters.maxBedrooms !== undefined ? Number(filters.maxBedrooms) : undefined;

  return properties.filter((property) => {
    if (filters.type && filters.type !== "Any") {
      if (property.type !== filters.type) {
        return false;
      }
    }

    if (minPrice !== undefined) {
      if (property.price < minPrice) {
        return false;
      }
    }

    if (maxPrice !== undefined) {
      if (property.price > maxPrice) {
        return false;
      }
    }

    if (minBedrooms !== undefined) {
      if (property.bedrooms < minBedrooms) {
        return false;
      }
    }

    if (maxBedrooms !== undefined) {
      if (property.bedrooms > maxBedrooms) {
        return false;
      }
    }

    if (filters.postcode) {
      const propertyPostcode = property.location.split(" ").pop();
      if (!propertyPostcode.startsWith(filters.postcode.toUpperCase())) {
        return false;
      }
    }

    if (filters.dateFrom) {
      const propertyDate = toDate(property.added);
      if (propertyDate < filters.dateFrom) {
        return false;
      }
    }

    return true;
  });
};
