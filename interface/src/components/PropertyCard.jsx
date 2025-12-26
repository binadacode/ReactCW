import { Link } from "react-router-dom";

const PropertyCard = ({ property, onFavouriteToggle, isFavourite }) => {
  const { id, type, bedrooms, price, location, pictures } = property;

  return (
    <div className="property-card">
      <div className="property-image-wrapper">
        {pictures && pictures.length > 0 && (
          <img
            src={pictures[0]}
            alt={`${type} in ${location}`}
            className="property-image"
          />
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
            onClick={() => onFavouriteToggle(id)}
          >
            {isFavourite ? "★" : "☆"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
