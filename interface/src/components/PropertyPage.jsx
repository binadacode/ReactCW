import { useParams } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import ImageGallery from "./ImageGallery";
import FavouritesSidebar from "./FavouritesSidebar";

const PropertyPage = ({ favourites, setFavourites }) => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [properties, setProperties] = useState([]);
  const [activeTab, setActiveTab] = useState("description");
  const [loading, setLoading] = useState(true);
  const propertyId = id.toString();
  const isFavourite = favourites.includes(propertyId);

  useEffect(() => {
    fetch("/properties.json")
      .then((res) => res.json())
      .then((data) => {
        setProperties(data.properties);
        const foundProperty = data.properties.find(
          (prop) => prop.id.toString() === id
        );
        setProperty(foundProperty);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const propertyMap = useMemo(() => {
    const map = new Map();
    properties.forEach((p) => map.set(p.id.toString(), p));
    return map;
  }, [properties]);

  const toggleFavourite = () => {
    setFavourites((prev) =>
      prev.includes(propertyId)
        ? prev.filter((f) => f !== propertyId)
        : [...prev, propertyId]
    );
  };

  const removeFavourite = (fid) =>
    setFavourites((prev) => prev.filter((f) => f !== fid));
  const clearFavourites = () => setFavourites([]);

  // drag-out removal
  const handleRemoveDrop = (e) => {
    e.preventDefault();
    const removeId = e.dataTransfer.getData("removeId");
    if (removeId) removeFavourite(removeId);
  };

  if (loading) return <p>Loading property...</p>;
  if (!property) return <p>Property not found.</p>;

  const {
    type,
    price,
    location,
    description,
    pictures = [],
    floorplan,
  } = property;
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    location
  )}&output=embed`;

  return (
    <div className="property-page-layout" style={{ display: "flex" }}>
      <div
        className="property-main"
        style={{ flex: 1 }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleRemoveDrop}
      >
        <ImageGallery images={pictures} />
        <div className="property-info">
          <h2>{type}</h2>

          <button
            className={`favourite-btn ${isFavourite ? "favourited" : ""}`}
            onClick={toggleFavourite}
          >
            {isFavourite ? "★ Remove from favourites " : "☆ Add to Favourites"}
          </button>

          <p className="price">Price: £{price.toLocaleString()}</p>
          <p className="location">Location: {location}</p>
        </div>

        <div className="tabs-container">
          <div
            className={`tab ${activeTab === "description" ? "active" : ""}`}
            onClick={() => setActiveTab("description")}
          >
            Description
          </div>
          <div
            className={`tab ${activeTab === "floorplan" ? "active" : ""}`}
            onClick={() => setActiveTab("floorplan")}
          >
            Floor Plan
          </div>
          <div
            className={`tab ${activeTab === "map" ? "active" : ""}`}
            onClick={() => setActiveTab("map")}
          >
            Map
          </div>
        </div>

        <div className={`tab-content ${activeTab === "map" ? "map" : ""}`}>
          {activeTab === "description" &&
            description.split("\n\n").map((p, i) => <p key={i}>{p}</p>)}
          {activeTab === "floorplan" &&
            (floorplan ? (
              <img
                src={`/${floorplan}`}
                alt="Floor Plan"
                style={{ width: "100%", maxWidth: "800px" }}
              />
            ) : (
              <p>No floor plan available.</p>
            ))}
          {activeTab === "map" && (
            <iframe
              title="Property Location Map"
              src={mapSrc}
              width="100%"
              height="500"
              style={{ border: 0, borderRadius: "8px" }}
              allowFullScreen=""
              loading="lazy"
            />
          )}
        </div>
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

export default PropertyPage;
