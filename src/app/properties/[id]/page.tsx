"use client";

import React, { useEffect, useState } from "react";
import PropertyDetail from "@/components/server/ProperyDetails";

export default function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [property, setProperty] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Unwrap the params using React.use()
  const { id } = React.use(params);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/properties?id=${id}`, {
          cache: "no-store",
        });
        if (!response.ok) {
          throw new Error("Property not found");
        }
        const propertyData = await response.json();

        setProperty(propertyData.data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProperty();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="text-center text-lg font-semibold text-gray-500">
        Loading property details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-lg font-semibold text-red-500">
        {error}
      </div>
    );
  }

  if (!property) {
    return (
      <div className="text-center text-lg font-semibold text-red-500">
        Property not found.
      </div>
    );
  }

  return <PropertyDetail data={property} />;
}
