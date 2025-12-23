const PropertyCard = ( {property}) => {
      const { id, type, bedrooms, price, location, picture } = property;

      return (
        <div className="property-card">
          <div className="property-image-wrapper">
            <img src={picture} alt={`${type} in ${location}`} className="property-image"/>
          </div>
            <div className="property-info">
                <h3>{type}</h3>
                <p>{bedrooms} Bedrooms</p>
                <p>{location}</p>
                <p>£{price.toLocaleString()}</p>
                <a href={`/properties/${id}`}>View Details</a>
            </div>
        </div>
      );
}

export default PropertyCard;