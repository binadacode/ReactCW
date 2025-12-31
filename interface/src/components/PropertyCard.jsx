import { Link } from "react-router-dom";

const monthMap = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
};

const PropertyCard = ({ property, isFavourite, onFavouriteToggle }) => {
  const { id, type, bedrooms, price, location, pictures, description, added } =
    property;

  const shortDescription = description
    ? description.split("\n")[0]
    : "No description available.";

  // Convert the 'added' object to a proper Date
  const displayDate = added
    ? new Date(added.year, monthMap[added.month], added.day)
    : new Date();

  return (
    <div
      className="property-card"
      draggable
      onDragStart={(e) => e.dataTransfer.setData("propertyId", id)}
    >
      {/* IMAGE */}
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

      {/* INFO */}
      <div className="property-info">
        <h3>{type}</h3>
        <p className="property-date">
          Added on{" "}
          {displayDate.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>

        <p className="property-short-description">{shortDescription}</p>
        <p>{location}</p>
        <p className="property-price">£{price.toLocaleString()}</p>

        {/* ACTIONS */}
        <div className="property-actions">
          <Link to={`/property/${id}`} className="details-link">
            View Details
          </Link>

          <button
            className={`favourite-button ${isFavourite ? "favourited" : ""}`}
            onClick={(e) => onFavouriteToggle(id, e)}
            aria-label="Add to favourites"
          >
            ★
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
