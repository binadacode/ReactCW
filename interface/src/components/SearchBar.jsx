import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [location, setLocation] = useState("");
  const [type, setType] = useState("Any");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minBedrooms, setMinBedrooms] = useState("");
  const [maxBedrooms, setMaxBedrooms] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); //for SPA behavior
    onSearch({
      location,
      type,
      minPrice,
      maxPrice,
      minBedrooms,
      maxBedrooms,
    });
  };

  return (
    <section className="search-container">
      <h1>Believe in Finding it</h1>
      <h3>Search for the property you are looking for</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="term">Search Postcode Area</label>
        <br />
        <input
          type="text"
          id="term"
          name="term"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <br />

        <label htmlFor="type">Property Type</label>
        <br />
        <select
          id="type"
          name="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="Any">Any</option>
          <option value="House">House</option>
          <option value="Apartment">Flat</option>
        </select>
        <br />

        <label htmlFor="minPrice">Min Price (£)</label>
        <br />
        <input
          type="number"
          id="minPrice"
          name="minPrice"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <br />

        <label htmlFor="maxPrice">Max Price (£)</label>
        <br />
        <input
          type="number"
          id="maxPrice"
          name="maxPrice"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <br />

        <label htmlFor="minBedrooms">Min Bedrooms</label>
        <br />
        <input
          type="number"
          id="minBedrooms"
          name="minBedrooms"
          value={minBedrooms}
          onChange={(e) => setMinBedrooms(e.target.value)}
        />
        <br />

        <label htmlFor="maxBedrooms">Max Bedrooms</label>
        <br />
        <input
          type="number"
          id="maxBedrooms"
          name="maxBedrooms"
          value={maxBedrooms}
          onChange={(e) => setMaxBedrooms(e.target.value)}
        />
        <br />

        <button type="submit">Search</button>
      </form>
    </section>
  );
};

export default SearchBar;
