import { useEffect, useState, useMemo } from "react";
import ResultList from "./ResultList";
import SearchBar from "./SearchBar";
import FavouritesSidebar from "./FavouritesSidebar";
import { searchProperties } from "../utils/searchProperties";

const Gallery = ({ favourites, setFavourites }) => {
  const [properties, setProperties] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch("/properties.json")
      .then((res) => res.json())
      .then((data) => {
        setProperties(data.properties);
        setResults(data.properties);
      });
  }, []);

  const propertyMap = useMemo(() => {
    const map = new Map();
    properties.forEach((p) => map.set(p.id.toString(), p));
    return map;
  }, [properties]);

  const handleSearch = (query) =>
    setResults(searchProperties(properties, query));

  const toggleFavourite = (id) => {
    const strId = id.toString();
    setFavourites((prev) =>
      prev.includes(strId) ? prev.filter((f) => f !== strId) : [...prev, strId]
    );
  };

  const removeFavourite = (id) =>
    setFavourites((prev) => prev.filter((f) => f !== id));
  const clearFavourites = () => setFavourites([]);

  return (
    <div className="gallery-layout">
      <div className="gallery-main">
        <SearchBar onSearch={handleSearch} />
        <ResultList
          results={results}
          favourites={favourites}
          onFavouriteToggle={toggleFavourite}
        />
      </div>

      <FavouritesSidebar
        favourites={favourites}
        setFavourites={setFavourites}
        propertyMap={propertyMap}
        removeFavourite={removeFavourite}
        clearFavourites={clearFavourites}
      />
    </div>
  );
};

export default Gallery;
