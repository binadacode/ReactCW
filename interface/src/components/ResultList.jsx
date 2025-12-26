import { Link } from "react-router-dom";
import PropertyCard from "./PropertyCard";

const ResultList = ({ results, favourites = [], toggleFavourites }) => {
  if (results.length === 0) {
    return <p>No properties found.</p>;
  }
  return (
    <div className="results-grid">
      {results.map((property) => (
        <Link key={property.id} to={`/property/${property.id}`}>
          <PropertyCard
            key={property.id}
            property={property}
            isFavourite={favourites.includes(property.id)}
            onFavouriteToggle={toggleFavourites}
          />
        </Link>
      ))}
    </div>
  );
};

export default ResultList;
