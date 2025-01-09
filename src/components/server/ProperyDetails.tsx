interface PropertyDetailProps {
  data: {
    id: string;
    title: string;
    price: number;
    location: string;
    specs: { beds: number; baths: number; area: number };
    images: string[];
    status: "available" | "sold" | "pending";
    description: string;
  };
}

export default function PropertyDetail({ data }: PropertyDetailProps) {
  return (
    <div className="container  min-h-screen  mx-auto p-6">
      {/* Breadcrumb */}
      <nav className="mb-4">
        <a href="/properties" className="hover:underline">
          Properties
        </a>{" "}
        / <span className="text-gray-600">{data.title}</span>
      </nav>

      {/* Property Details */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <img
          src={data.images[0]}
          alt={data.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {data.title}
          </h1>
          <p className="text-lg text-gray-600 mb-4">{data.location}</p>
          <p className="text-lg text-gray-600 mb-4">
            <span className="font-semibold">Price: </span>${data.price}
          </p>
          <p className="text-lg text-gray-600 mb-4">
            <span className="font-semibold">Status: </span>
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
          </p>
          <p className="text-lg text-gray-600 mb-4">
            <span className="font-semibold">Specifications: </span>
            {data.specs.beds} Beds, {data.specs.baths} Baths, {data.specs.area}{" "}
            sq.ft.
          </p>
          <p className="text-gray-700 text-base mb-4">{data.description}</p>
        </div>
      </div>
    </div>
  );
}
