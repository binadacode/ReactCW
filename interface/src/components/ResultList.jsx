import PropertyCard from './PropertyCard';

const ResultList = ({ results }) => {
    if (results.length === 0) { 
        return <p>No properties found.</p>; 
    }
    return (
        <div className="results-grid">
            {results.map(property => (
                <PropertyCard key={property.id} property={property} />
            ))}
        </div>
    );
}

export default ResultList;