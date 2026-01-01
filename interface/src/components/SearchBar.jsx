import { useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import Slider from "rc-slider";

import "react-datepicker/dist/react-datepicker.css";
import "rc-slider/assets/index.css";

/* Property type options */
const typeOptions = [
  { value: "Any", label: "Any" },
  { value: "House", label: "House" },
  { value: "Flat", label: "Flat" },
];

const SearchBar = ({ onSearch }) => {
  const [location, setLocation] = useState("");
  const [type, setType] = useState(typeOptions[0]);
  const [priceRange, setPriceRange] = useState([0, 2000000]);
  const [bedroomRange, setBedroomRange] = useState([0, 6]);
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSearch({
      location,
      type: type.value,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      minBedrooms: bedroomRange[0],
      maxBedrooms: bedroomRange[1],
      dateFrom,
      dateTo,
    });
  };

  return (
    <section className="search-container">
      <h1 className="main-heading">MoveToday</h1>
      <h3>Search for the property you are looking for</h3>

      <form className="search-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          {/* Postcode */}
          <div className="form-group">
            <label>Postcode Area</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value.toUpperCase())}
              placeholder="e.g. BR5"
            />
          </div>

          {/* Property Type */}
          <div className="form-group">
            <label>Property Type</label>
            <Select
              classNamePrefix="react-select"
              options={typeOptions}
              value={type}
              onChange={setType}
              isSearchable={false}
            />
          </div>

          {/* Date Added (From) */}
          <div className="form-group">
            <label>Date Added (From)</label>
            <DatePicker
              selected={dateFrom}
              onChange={setDateFrom}
              placeholderText="Start date"
              dateFormat="dd/MM/yyyy"
              className="date-picker"
            />
          </div>

          {/* Price Range */}
          <div className="form-group">
            <label>Price (£)</label>
            <Slider
              range
              min={0}
              max={2000000}
              step={50000}
              value={priceRange}
              onChange={setPriceRange}
            />
            <small>
              £{priceRange[0].toLocaleString()} – £
              {priceRange[1].toLocaleString()}
            </small>
          </div>

          {/* Bedrooms */}
          <div className="form-group">
            <label>Bedrooms</label>
            <Slider
              range
              min={0}
              max={6}
              step={1}
              value={bedroomRange}
              onChange={setBedroomRange}
            />
            <small>
              {bedroomRange[0]} – {bedroomRange[1]} beds
            </small>
          </div>

          {/* Date Added (To) aligned with bottom row */}
          <div className="form-group">
            <label>Date Added (To)</label>
            <DatePicker
              selected={dateTo}
              onChange={setDateTo}
              placeholderText="End date"
              dateFormat="dd/MM/yyyy"
              className="date-picker"
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
