import { Link } from "react-router-dom";

const PropertyCard = ({ property, isFavourite, onFavouriteToggle }) => {
  const { id, type, bedrooms, price, location, pictures } = property;

  return (
    <div
      className="property-card"
      draggable
      onDragStart={(e) => e.dataTransfer.setData("propertyId", id)}
    >
      <div className="property-image-wrapper">
        {pictures && pictures.length > 0 ? (
          <img
            src={pictures[0]}
            alt={`${type} in ${location}`}
            className="property-image"
          />
        ) : (
          <div className="no-image">No Image Available</div>
        )}
      </div>

      <div className="property-info">
        <h3>{type}</h3>
        <p>{bedrooms} Bedrooms</p>
        <p>{location}</p>
        <p>£{price.toLocaleString()}</p>

        <div className="property-actions">
          <Link to={`/property/${id}`} className="details-link">
            View Details
          </Link>

          <button
            className={`favourite-button ${isFavourite ? "favourited" : ""}`}
            onClick={(e) => onFavouriteToggle(id, e)}
          >
            {isFavourite ? "★" : "☆"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
