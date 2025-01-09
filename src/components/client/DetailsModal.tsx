import React from "react";
import { Property } from "../../../lib/types";
import Image from "next/image";

interface DetailsModalProps {
  closeModal: () => void;
  data: Property;
}

const DetailsModal = ({ closeModal, data }: DetailsModalProps) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={closeModal} // Close modal on background click
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg"
        onClick={(e) => e.stopPropagation()} // Prevent modal close on content click
      >
        <h3 className="text-2xl font-semibold mb-4">{data.title}</h3>
        <Image
          src={data.images[0]}
          alt={data.title}
          className="w-full h-48 object-cover mb-4"
          width={100}
          height={48}
        />
        <p className="text-lg text-gray-600">{data.location}</p>
        <p className="text-sm text-gray-600">
          {data.specs.beds} Beds, {data.specs.baths} Baths, {data.specs.area}{" "}
          sq.ft.
        </p>
        <span
          className={`${
            data.status === "available"
              ? "text-green-600"
              : data.status === "sold"
              ? "text-red-600"
              : "text-yellow-600"
          } capitalize`}
        >
          {data.status}
        </span>
        <p className="font-bold text-xl text-gray-900">${data.price}</p>
        <button
          className="mt-4 w-full p-3 bg-red-600 text-white rounded-md hover:bg-red-700"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default DetailsModal;
