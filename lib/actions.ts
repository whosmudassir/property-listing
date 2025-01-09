"use server";

import { dummyProperties } from "./dummy";
import { Property } from "./types";

// Simulated favorite store
const favoriteProperties = new Set<string>();

// Pagination logic to slice the properties based on the page and limit
const paginate = (properties: Property[], page: number, limit: number) => {
  const offset = (page - 1) * limit;
  return properties.slice(offset, offset + limit);
};

// Search properties or fetch by ID
export async function searchProperties(filters: {
  query?: string | null | undefined;
  id?: string | null | undefined;
  page?: number;
  limit?: number;
}) {
  const allProperties = dummyProperties; // Simulated database fetch

  // Handle search by ID
  if (filters.id) {
    const property = allProperties.find(
      (property) => property.id === filters.id
    );
    if (!property) {
      throw new Error("Property not found");
    }
    return property; // Return a single property
  }

  const query = filters.query?.toLowerCase();

  // Perform search filtering
  const filteredProperties = allProperties.filter((property) =>
    query
      ? property.title.toLowerCase().includes(query) ||
        property.location.toLowerCase().includes(query) ||
        property.price.toString().includes(query) ||
        property.id === query
      : true
  );

  // Apply pagination if page and limit are provided
  if (filters.page && filters.limit) {
    return paginate(filteredProperties, filters.page, filters.limit);
  }

  return filteredProperties; // Return all properties if no pagination
}

export async function favoriteProperty(id: string) {
  if (favoriteProperties.has(id)) {
    favoriteProperties.delete(id);
  } else {
    favoriteProperties.add(id);
  }

  return Array.from(favoriteProperties); // Return the list of favorite IDs
}

export async function getFavorites() {
  return Array.from(favoriteProperties); // Return the current favorites
}
