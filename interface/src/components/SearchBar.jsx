import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [location, setLocation] = useState("");
  const [type, setType] = useState("Any");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minBedrooms, setMinBedrooms] = useState("");
  const [maxBedrooms, setMaxBedrooms] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onSearch({
      location,
      type,
      minPrice,
      maxPrice,
      minBedrooms,
      maxBedrooms,
      dateFrom,
      dateTo,
    });
  };

  return (
    <section className="search-container">
      <h1 className="main-heading">MoveToday</h1>
      <h3>Search for the property you are looking for</h3>

      <form onSubmit={handleSubmit} className="search-form">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="location">Postcode Area</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. BR5"
            />
          </div>

          <div className="form-group">
            <label htmlFor="type">Property Type</label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="Any">Any</option>
              <option value="House">House</option>
              <option value="Flat">Flat</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="minPrice">Min Price (£)</label>
            <input
              type="number"
              id="minPrice"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="maxPrice">Max Price (£)</label>
            <input
              type="number"
              id="maxPrice"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="minBedrooms">Min Bedrooms</label>
            <input
              type="number"
              id="minBedrooms"
              value={minBedrooms}
              onChange={(e) => setMinBedrooms(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="maxBedrooms">Max Bedrooms</label>
            <input
              type="number"
              id="maxBedrooms"
              value={maxBedrooms}
              onChange={(e) => setMaxBedrooms(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="dateFrom">Date Added (From)</label>
            <input
              type="date"
              id="dateFrom"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="dateTo">Date Added (To)</label>
            <input
              type="date"
              id="dateTo"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit">Search</button>
        </div>
      </form>
    </section>
  );
};

export default SearchBar;
