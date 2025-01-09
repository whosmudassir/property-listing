"use client";
import { useState, useEffect, useCallback } from "react";
import PropertyList from "@/components/server/PropertyList";
import Skeleton from "@/components/server/Skeleton";
import { Property } from "../../../lib/types";

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/properties?page=${page}&limit=10`);

      const data = await response.json();
      setProperties(data.data);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Failed to fetch properties:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProperties();
  }, [page]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2>Properties</h2>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, index) => (
            <div key={index} className="p-4 bg-white rounded-md shadow-md">
              <Skeleton className="h-48 w-full mb-4" />
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-2" />
              <Skeleton className="h-4 w-1/4 mb-2" />
              <Skeleton className="h-6 w-1/4" />
            </div>
          ))}
        </div>
      ) : (
        <>
          <PropertyList properties={properties} />
          <div className="flex justify-center items-center mt-6 space-x-4">
            <button
              className={`px-4 py-2 border rounded-md ${
                page === 1 ? "cursor-not-allowed opacity-50" : "bg-gray-200"
              }`}
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              Previous
            </button>

            <span className="font-semibold">
              Page {page} of {totalPages}
            </span>

            <button
              className={`px-4 py-2 border rounded-md ${
                page === totalPages
                  ? "cursor-not-allowed opacity-50"
                  : "bg-gray-200"
              }`}
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
