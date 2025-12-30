import { useState } from "react";

const ImageGallery = ({ images }) => {
  if (!images || images.length === 0) {
    return <p>No images available.</p>;
  }

  const [activeImage, setActiveImage] = useState(`/${images[0]}`);
  const [viewAll, setViewAll] = useState(false);

  return (
    <div className="image-gallery">
      {/* Main active image */}
      <div className="active-image">
        <img src={activeImage} alt="Property" className="main-gallery-image" />
        <button className="view-all-btn" onClick={() => setViewAll(true)}>
          View All Images
        </button>
      </div>

      {/* Thumbnails (scrollable horizontally) */}
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
          <button className="close-btn" onClick={() => setViewAll(false)}>
            X
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
