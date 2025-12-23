// Converts the provided object into a JS date
const toDate = (date) => {
  return new Date(
    date.year,
    new Date(`${date.month} 1, 2000`).getMonth(),
    date.day
  );
};

export const searchProperties = (properties, filters) => {
  return properties.filter((property) => {
    if (filters.type && filters.type !== "Any") {
      if (property.type !== filters.type) {
        return false;
      }
    }

    if (filters.minPrice) {
      if (property.price < filters.minPrice) {
        return false;
      }
    }

    if (filters.maxPrice) {
      if (property.price > filters.maxPrice) {
        return false;
      }
    }

    if (filters.minBedrooms !== undefined) {
      if (property.bedrooms < filters.minBedrooms) {
        return false;
      }
    }

    if (filters.maxBedrooms) {
      if (property.bedrooms > filters.maxBedrooms) {
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
