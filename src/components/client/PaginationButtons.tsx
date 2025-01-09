"use client";

interface PaginationButtonsProps {
  currentPage: number;
  totalPages: number;
  searchParams: { [key: string]: string | undefined };
}

export default function PaginationButtons({
  currentPage,
  totalPages,
  searchParams,
}: PaginationButtonsProps) {
  const handlePageChange = (newPage: number) => {
    // Filter out undefined values
    const cleanedParams = Object.fromEntries(
      Object.entries(searchParams).filter(
        ([value]) => value !== undefined // Remove unused variable warning by using the key here
      ) as [string, string][]
    );

    const params = new URLSearchParams(cleanedParams);
    params.set("page", newPage.toString());

    // Update the URL with the new page
    window.location.search = params.toString();
  };

  return (
    <div className="flex justify-between mt-4">
      <button
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        disabled={currentPage <= 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Previous
      </button>
      <button
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        disabled={currentPage >= totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}
