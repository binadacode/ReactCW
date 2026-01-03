import { useParams } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import ImageGallery from "./ImageGallery";
import FavouritesSidebar from "./FavouritesSidebar";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const PropertyPage = ({ favourites = [], setFavourites }) => {
  const { id } = useParams();
  const propertyId = id.toString();

  const [property, setProperty] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const isFavourite = favourites.includes(propertyId);

  /* ---------------- Fetch properties ---------------- */
  useEffect(() => {
    fetch("/properties.json")
      .then((res) => res.json())
      .then((data) => {
        setProperties(data.properties);
        const found = data.properties.find(
          (p) => p.id.toString() === propertyId
        );
        setProperty(found);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [propertyId]);

  /* ---------------- Map for sidebar ---------------- */
  const propertyMap = useMemo(() => {
    const map = new Map();
    properties.forEach((p) => map.set(p.id.toString(), p));
    return map;
  }, [properties]);

  /* ---------------- Favourites logic ---------------- */
  const toggleFavourite = () => {
    setFavourites((prev) =>
      prev.includes(propertyId)
        ? prev.filter((f) => f !== propertyId)
        : [...prev, propertyId]
    );
  };

  const removeFavourite = (fid) => {
    setFavourites((prev) => prev.filter((f) => f !== fid));
  };

  const clearFavourites = () => setFavourites([]);

  /* ---------------- Drag-out removal ---------------- */
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
    <div className="gallery-layout">
      {/* ---------------- MAIN CONTENT ---------------- */}
      <div
        className="property-main"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleRemoveDrop}
      >
        <ImageGallery images={pictures} />

        {/* --------- Centered Property Info --------- */}
        <div className="property-info">
          <h2>{type}</h2>

          <button
            className={`favourite-btn ${isFavourite ? "favourited" : ""}`}
            onClick={toggleFavourite}
          >
            {isFavourite ? "★ Remove from favourites" : "☆ Add to favourites"}
          </button>

          <p className="price">£{price.toLocaleString()}</p>
          <p className="location">{location}</p>
        </div>

        {/* ---------------- TABS ---------------- */}
        <Tabs>
          <TabList className="tabs-container">
            <Tab>Description</Tab>
            <Tab>Floor Plan</Tab>
            <Tab>Map</Tab>
          </TabList>

          <TabPanel>
            <div className="tab-content">
              {description.split("\n\n").map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </TabPanel>

          <TabPanel>
            <div className="tab-content">
              {floorplan ? (
                <img
                  src={`/${floorplan}`}
                  alt="Floor Plan"
                  className="floorplan-img"
                />
              ) : (
                <p>No floor plan available.</p>
              )}
            </div>
          </TabPanel>

          <TabPanel>
            <div className="tab-content map">
              <iframe
                title="Property Location Map"
                src={mapSrc}
                width="100%"
                height="500"
                style={{ border: 0, borderRadius: "8px" }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </TabPanel>
        </Tabs>
      </div>

      {/* ---------------- SIDEBAR ---------------- */}
      <FavouritesSidebar
        favourites={favourites}
        propertyMap={propertyMap}
        removeFavourite={removeFavourite}
        clearFavourites={clearFavourites}
      />
    </div>
  );
};

export default PropertyPage;
