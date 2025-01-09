import React from "react";
import { Property } from "../../../lib/types";
import PropertyCard from "../client/PropertyCard";

interface PropertyListProps {
  properties: Property[];
}

function PropertyList({ properties }: PropertyListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {properties.map((property) => (
        <PropertyCard key={property.id} data={property} />
      ))}
    </div>
  );
}

export default React.memo(PropertyList);
