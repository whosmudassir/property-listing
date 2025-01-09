"use client";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();

  return (
    <main className="flex items-center  min-h-screen justify-center flex-grow bg-gray-100">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">
          Welcome to Property Listings!
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Explore a variety of properties to rent or buy. Whether you're looking
          for a cozy apartment, a spacious house, or an investment property, we
          have something for everyone. Start by browsing available properties or
          searching based on your preferences.
        </p>
        <div className="space-y-4">
          <button
            onClick={() => router.push("/properties")}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700 transition-all"
          >
            View Properties
          </button>
          <button
            onClick={() => router.push("/properties/search")}
            className="w-full bg-gray-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-gray-700 transition-all"
          >
            Search Properties
          </button>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
