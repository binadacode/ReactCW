import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const PropertyPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    fetch("/properties.json")
      .then((response) => response.json())
      .then((data) => {
        const foundProperty = data.properties.find((prop) => prop.id === id);
        setProperty(foundProperty);
      })
      .catch((error) => console.error("Error fetching property data:", error));
  }, [id]);

  if (!property) {
    return <p>Property not found.</p>;
  }

  return (
    <div className="property-page">
      <h2>
        {property.type} in {property.location}
      </h2>
      <p>Price: £{property.price}</p>
      <p>Bedrooms: {property.bedrooms}</p>
      {/* TODO: add gallery, tabs, description, google maps */}
    </div>
  );
};

export default PropertyPage;
