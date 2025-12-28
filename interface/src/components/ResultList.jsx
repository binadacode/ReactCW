import { Link } from "react-router-dom";
import PropertyCard from "./PropertyCard";

const ResultList = ({ results, favourites = [], onFavouriteToggle }) => {
  if (!results || results.length === 0) return <p>No properties found.</p>;

  return (
    <div className="results-grid">
      {results.map((property) => (
        <Link
          key={property.id}
          to={`/property/${property.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <PropertyCard
            property={property}
            isFavourite={favourites.includes(property.id)}
            onFavouriteToggle={(id, e) => {
              e.preventDefault(); // stop Link navigation
              e.stopPropagation();
              onFavouriteToggle(id);
            }}
          />
        </Link>
      ))}
    </div>
  );
};

export default ResultList;
