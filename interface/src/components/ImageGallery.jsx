import { useState, useEffect } from "react";

const ImageGallery = ({ images }) => {
  const [activeImage, setActiveImage] = useState("");
  const [viewAll, setViewAll] = useState(false);

  // Set the first image as active when images load
  useEffect(() => {
    if (images && images.length > 0) {
      setActiveImage(`/${images[0]}`);
    }
  }, [images]);

  if (!images || images.length === 0) {
    return <p>No images available.</p>;
  }

  return (
    <div className="image-gallery">
      {/* Main active image */}
      <div className="active-image">
        {activeImage && (
          <img
            src={activeImage}
            alt="Property"
            className="main-gallery-image"
          />
        )}
        <button
          type="button"
          className="view-all-btn"
          onClick={() => setViewAll(true)}
        >
          View All Images
        </button>
      </div>

      {/* Thumbnails */}
      <div className="thumbnail-images">
        {images.map((pic, index) => (
          <img
            key={index}
            src={`/${pic}`}
            alt={`Property ${index + 1}`}
            className={`thumbnail ${
              activeImage === `/${pic}` ? "active-thumbnail" : ""
            }`}
            onClick={() => setActiveImage(`/${pic}`)}
          />
        ))}
      </div>

      {/* View All Modal */}
      {viewAll && (
        <div className="view-all-overlay">
          <button
            type="button"
            className="close-btn"
            onClick={() => setViewAll(false)}
          >
            ×
          </button>
          <div className="view-all-grid">
            {images.map((pic, index) => (
              <img
                key={index}
                src={`/${pic}`}
                alt={`Property ${index + 1}`}
                className="view-all-image"
                onClick={() => {
                  setActiveImage(`/${pic}`);
                  setViewAll(false);
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
