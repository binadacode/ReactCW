import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const PropertyPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/properties.json")
      .then((res) => res.json())
      .then((data) => {
        // Find property by id
        const foundProperty = data.properties.find(
          (prop) => prop.id.toString() === id
        );
        setProperty(foundProperty);

        // Set first image as default
        if (foundProperty?.pictures?.length > 0) {
          setActiveImage(`/${foundProperty.pictures[0]}`); // add leading slash
        }
      })
      .catch((err) => console.error("Error fetching property data:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading property...</p>;
  if (!property) return <p>Property not found.</p>;

  const { type, price, location, description, pictures = [] } = property;

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    location
  )}&output=embed`;

  return (
    <div className="property-page">
      {/* GALLERY */}
      <div className="gallery">
        <div className="main-image">
          {activeImage && (
            <img
              src={activeImage}
              alt={`Main view of ${type} in ${location}`}
            />
          )}
        </div>

        <div className="thumbnails">
          {pictures.map((pic, index) => (
            <img
              key={index}
              src={`/${pic}`} // add leading slash for correct path
              alt={`Thumbnail ${index + 1} of ${type} in ${location}`}
              className={activeImage === `/${pic}` ? "active" : ""}
              onClick={() => setActiveImage(`/${pic}`)}
            />
          ))}
        </div>
      </div>

      {/* PROPERTY INFO */}
      <div className="property-info">
        <h2>{type}</h2>
        <p className="price">Price: LKR {price.toLocaleString()}</p>
        <p className="location">Location: {location}</p>
      </div>

      {/* TABS */}
      <div className="tabs">
        <button
          className={activeTab === "description" ? "active" : ""}
          onClick={() => setActiveTab("description")}
        >
          Description
        </button>
        <button
          className={activeTab === "floorplan" ? "active" : ""}
          onClick={() => setActiveTab("floorplan")}
        >
          Floor Plan
        </button>
        <button
          className={activeTab === "map" ? "active" : ""}
          onClick={() => setActiveTab("map")}
        >
          Map
        </button>
      </div>

      <div className="tab-content">
        <div className="tab-inner">
          {activeTab === "description" && (
            <>
              {description.split("\n\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </>
          )}

          {activeTab === "floorplan" && (
            <div className="floorplan">
              {property.floorplan ? (
                <img
                  src={`/${property.floorplan}`}
                  alt="Floor Plan"
                  style={{ width: "100%", maxWidth: "800px" }}
                />
              ) : (
                <p>No floor plan available.</p>
              )}
            </div>
          )}
          {activeTab === "map" && (
            <div className="map-container" style={{ marginTop: "1rem" }}>
              <iframe
                title="Property Location Map"
                src={mapSrc}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyPage;
