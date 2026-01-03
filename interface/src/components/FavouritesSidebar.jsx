import React from "react";

const FavouritesSidebar = ({
  favourites = [],
  setFavourites,
  propertyMap = new Map(),
  removeFavourite,
  clearFavourites,
}) => {
  const favs = Array.isArray(favourites) ? favourites : [];

  // drop to add favourite
  const handleDrop = (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("propertyId");
    if (!id) return;
    if (!favs.includes(id)) {
      setFavourites((prev) => [...prev, id]);
    }
  };

  return (
    <aside
      className="favourites-sidebar"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <h3>Favourites ({favs.length})</h3>

      {favs.length === 0 && <p>Add properties here ⭐</p>}

      {favs.length > 0 && (
        <button className="clear-favs-btn" onClick={clearFavourites}>
          Clear All
        </button>
      )}

      {favs.map((fid) => {
        const prop = propertyMap.get(fid);
        if (!prop) return null;

        return (
          <div
            key={fid}
            className="favourite-item"
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData("removeId", fid);
            }}
          >
            {prop.type} – {prop.location}
            <button
              className="remove-fav-btn"
              onClick={() => removeFavourite(fid)}
            >
              ❌
            </button>
          </div>
        );
      })}
    </aside>
  );
};

export default FavouritesSidebar;
