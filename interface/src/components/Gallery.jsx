import { useEffect, useState, useMemo } from "react";
import ResultList from "./ResultList";
import SearchBar from "./SearchBar";
import { searchProperties } from "../utils/searchProperties";

const Gallery = ({ favourites, setFavourites }) => {
  const [properties, setProperties] = useState([]);
  const [results, setResults] = useState([]);

  // Drag-and-drop helpers
  const [draggedFavourite, setDraggedFavourite] = useState(null);
  const [droppedInsideFavs, setDroppedInsideFavs] = useState(false);

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
    properties.forEach((p) => map.set(p.id, p));
    return map;
  }, [properties]);

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

  const removeFavourite = (id) => {
    setFavourites((prev) => prev.filter((f) => f !== id));
  };

  const clearFavourites = () => {
    setFavourites([]);
  };

  return (
    <div className="gallery-layout">
      {/* MAIN CONTENT */}
      <div className="gallery-main">
        <SearchBar onSearch={handleSearch} />
        <ResultList
          results={results}
          favourites={favourites}
          onFavouriteToggle={toggleFavourite}
        />
      </div>

      {/* FAVOURITES SIDEBAR */}
      <aside
        className="favourites-sidebar"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          handleDrop(e);
          setDroppedInsideFavs(true);
        }}
      >
        <h3>Favourites ({favourites.length})</h3>

        {favourites.length === 0 && <p>Drag properties here ⭐</p>}

        {favourites.length > 0 && (
          <button
            type="button"
            className="clear-favs-btn"
            onClick={clearFavourites}
          >
            Clear All
          </button>
        )}

        {favourites.map((fid) => {
          const prop = propertyMap.get(fid);

          return (
            <div
              key={fid}
              className="favourite-item"
              draggable
              onDragStart={() => {
                setDraggedFavourite(fid);
                setDroppedInsideFavs(false);
              }}
              onDragEnd={() => {
                if (!droppedInsideFavs) {
                  removeFavourite(draggedFavourite);
                }
                setDraggedFavourite(null);
              }}
            >
              {prop?.type} – {prop?.location}
              <button
                type="button"
                className="remove-fav-btn"
                onClick={(e) => {
                  e.stopPropagation(); // prevent drag interference
                  removeFavourite(fid);
                }}
              >
                ❌
              </button>
            </div>
          );
        })}
      </aside>
    </div>
  );
};

export default Gallery;
