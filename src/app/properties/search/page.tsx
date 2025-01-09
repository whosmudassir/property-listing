"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PropertyList from "../../../components/server/PropertyList";
import useDebounce from "@/hooks/useDebounce";
import Skeleton from "@/components/server/Skeleton";

export default function PropertySearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("query") || "";
  const pageParam = parseInt(searchParams.get("page") || "1", 10);
  const [query, setQuery] = useState(queryParam);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(pageParam);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;
  const debouncedValue = useDebounce(query, 500);

  useEffect(() => {
    const fetchFilteredProperties = async () => {
      setLoading(true);
      const response = await fetch(
        `/api/properties?query=${debouncedValue}&page=${page}&limit=${limit}`
      );
      const data = await response.json();
      setFilteredProperties(data.data);
      setTotalPages(data.totalPages);
      setLoading(false);
    };

    fetchFilteredProperties();
  }, [debouncedValue, page]);

  const handleSearchChange = (value: string) => {
    setQuery(value);
    setPage(1);
    router.push(`/properties/search?query=${value}&page=1`);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    router.push(`/properties/search?query=${query}&page=${newPage}`);
  };

  return (
    <div className="container  min-h-screen  mx-auto p-6">
      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-md"
          placeholder="Search properties by title or location..."
          value={query}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </div>

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
          {/* Property List */}
          {filteredProperties.length > 0 ? (
            <>
              <PropertyList properties={filteredProperties} />

              {/* Pagination Controls */}
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
          ) : (
            <div className="text-center text-xl font-semibold text-gray-600">
              No properties found.
            </div>
          )}
        </>
      )}
    </div>
  );
}
