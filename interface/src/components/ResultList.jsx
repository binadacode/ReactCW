import { Link } from "react-router-dom";
import PropertyCard from "./PropertyCard";

const ResultList = ({ results = [], favourites = [], onFavouriteToggle }) => {
  const favs = Array.isArray(favourites) ? favourites : [];

  if (!results || results.length === 0) return <p>No properties found.</p>;

  return (
    <div className="results-grid">
      {results.map((property) => {
        const propId = property.id.toString();
        const isFav = favs.includes(propId);

        return (
          <Link
            key={propId}
            to={`/property/${propId}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <PropertyCard
              property={property}
              isFavourite={isFav}
              onFavouriteToggle={(id, e) => {
                e.preventDefault();
                e.stopPropagation();
                onFavouriteToggle(id.toString());
              }}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default ResultList;
