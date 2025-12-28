import { useEffect, useState } from "react";
import ResultList from "./ResultList";
import SearchBar from "./SearchBar";
import { searchProperties } from "../utils/searchProperties";

const Gallery = () => {
  const [properties, setProperties] = useState([]);
  const [results, setResults] = useState([]);
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    fetch("/properties.json")
      .then((res) => res.json())
      .then((data) => {
        setProperties(data.properties);
        setResults(data.properties);
      });
  }, []);

  const handleSearch = (query) => {
    setResults(searchProperties(properties, query));
  };

  const toggleFavourite = (id) => {
    setFavourites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("propertyId");
    if (!favourites.includes(id)) {
      setFavourites((prev) => [...prev, id]);
    }
  };

  return (
    <div className="gallery-layout">
      {/* MAIN CONTENT (LEFT) */}
      <div className="gallery-main">
        <SearchBar onSearch={handleSearch} />
        <ResultList
          results={results}
          favourites={favourites}
          onFavouriteToggle={toggleFavourite}
        />
      </div>

      {/* SIDEBAR (RIGHT) */}
      <aside
        className="favourites-sidebar"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <h3>Favourites ({favourites.length})</h3>

        {favourites.length === 0 && <p>Drag properties here ⭐</p>}

        {favourites.map((fid) => {
          const prop = properties.find((p) => p.id === fid);
          return (
            <div key={fid} className="favourite-item">
              {prop?.type} – {prop?.location}
            </div>
          );
        })}
      </aside>
    </div>
  );
};

export default Gallery;
