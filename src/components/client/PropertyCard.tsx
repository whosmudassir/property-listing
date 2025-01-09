// components/client/PropertyCard.tsx
"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import DetailsModal from "./DetailsModal";
import { Property } from "../../../lib/types";

interface PropertyCardProps {
  data: Property;
}

export default function PropertyCard({ data }: PropertyCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  // Fetch favorites on initial load
  useEffect(() => {
    const fetchFavorites = async () => {
      const response = await fetch(`/api/properties/favorite`, {
        method: "GET",
      });
      const favoriteData = await response.json();
      setFavorites(favoriteData);
    };

    fetchFavorites();
  }, []);

  const openModal = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation on card click
    setIsModalOpen(true);
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(data.id);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = async (id: string) => {
    const response = await fetch(`/api/properties/favorite`, {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" },
    });

    const updatedFavorites = await response.json();
    setFavorites(updatedFavorites);
  };

  const isFavorite = favorites.includes(data.id);
  return (
    <>
      {/* Card Wrapper */}
      <div
        className="bg-white shadow-md rounded-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
        onClick={() => router.push(`/properties/${data.id}`)}
      >
        <img
          src={data.images[0]}
          alt={data.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-900">{data.title}</h3>
          <p className="text-lg text-gray-600">{data.location}</p>
          <p className="text-sm text-gray-600">
            {data.specs.beds} Beds, {data.specs.baths} Baths, {data.specs.area}{" "}
            sq.ft.
          </p>
          <p className="font-bold text-xl text-gray-900">${data.price}</p>
          {/* Buttons Container */}
          <div className="flex justify-between items-center mt-4">
            <button
              className="w-1/2 mr-2 p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={openModal}
            >
              View Details
            </button>
            <button
              onClick={handleFavorite}
              className={`w-1/2 ml-2 p-3 ${
                isFavorite
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 text-gray-800"
              } rounded-md`}
            >
              {isFavorite ? "Unfavorite" : "Favorite"}
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && <DetailsModal closeModal={closeModal} data={data} />}
    </>
  );
}
