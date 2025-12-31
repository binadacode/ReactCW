import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ImageGallery from "../components/ImageGallery";

const PropertyPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/properties.json")
      .then((res) => res.json())
      .then((data) => {
        const foundProperty = data.properties.find(
          (prop) => prop.id.toString() === id
        );
        setProperty(foundProperty);
      })
      .catch((err) => console.error("Error fetching property data:", err))
      .finally(() => setLoading(false));
  }, [id]);

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
    <div className="property-page">
      {/* GALLERY */}
      <div className="gallery">
        <ImageGallery images={pictures} />
      </div>

      {/* PROPERTY INFO */}
      <div className="property-info">
        <h2>{type}</h2>
        <p className="price">Price: LKR {price.toLocaleString()}</p>
        <p className="location">Location: {location}</p>
      </div>

      {/* TABS */}
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

      {/* TAB CONTENT */}
      <div className={`tab-content ${activeTab === "map" ? "map" : ""}`}>
        {activeTab === "description" && (
          <>
            {description.split("\n\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </>
        )}

        {activeTab === "floorplan" && (
          <div className="floorplan">
            {floorplan ? (
              <img
                src={`/${floorplan}`}
                alt="Floor Plan"
                style={{ width: "100%", maxWidth: "800px" }}
              />
            ) : (
              <p>No floor plan available.</p>
            )}
          </div>
        )}

        {activeTab === "map" && (
          <div
            className="map-container"
            style={{ marginTop: "1rem", width: "100%" }}
          >
            <iframe
              title="Property Location Map"
              src={mapSrc}
              width="100%"
              height="500"
              style={{ border: 0, borderRadius: "8px" }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyPage;
