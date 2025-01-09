export default function PropertySearch() {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between">
        {/* Logo/Title */}
        <h1 className="text-2xl font-bold flex-grow sm:flex-grow-0 mb-2 sm:mb-0">
          Property Listings
        </h1>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center space-x-4 text-sm sm:text-base">
          <a href="/" className="hover:underline">
            Home
          </a>
          <a href="/properties" className="hover:underline">
            Properties
          </a>
          <a href="/properties/search" className="hover:underline">
            Search
          </a>
        </nav>
      </div>
    </header>
  );
}
