import { searchProperties } from "../../../../lib/actions";
import { dummyProperties } from "../../../../lib/dummy";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const query = url.searchParams.get("query");
  const page = parseInt(url.searchParams.get("page") || "1", 10); // Default to page 1
  const limit = parseInt(url.searchParams.get("limit") || "10", 10); // Default to 10 items per page

  try {
    // Fetch the entire dataset
    const allProperties = dummyProperties;

    // Fetch data based on ID, query, and pagination parameters
    const filteredProperties = await searchProperties({ id, query });
    const paginatedData = await searchProperties({ id, query, page, limit });

    // Return paginated data along with total info
    return NextResponse.json({
      data: paginatedData, // Paginated data
      page,
      limit,
      totalItems: filteredProperties.length, // Total filtered items (before pagination)
      totalPages: Math.ceil(filteredProperties.length / limit), // Total pages
      totalDataLength: allProperties.length, // Total length of all properties (unfiltered)
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";

    return NextResponse.json({ error: errorMessage }, { status: 404 });
  }
}
