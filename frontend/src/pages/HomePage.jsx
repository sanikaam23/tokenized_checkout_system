import React, { useState } from 'react';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // 🔗 Integrate your search API call here later
  };

  return (
    <div className="w-full px-4 py-8 bg-gray-900 text-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-gray-800 rounded-lg p-8 mb-8 shadow flex flex-col md:flex-row items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Welcome to DealNova</h1>
          <p className="text-lg mb-4">
            Explore trending products with secure one-click checkout.
          </p>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded">
            Shop Now
          </button>
        </div>
        <img
          src="https://source.unsplash.com/400x300?shopping"
          alt="Shopping Promo"
          className="mt-6 md:mt-0 md:ml-8 rounded-lg shadow-lg w-full md:w-1/3 object-cover"
        />
      </section>

      {/* 🔍 Search Bar */}
      <form onSubmit={handleSearch} className="mb-8 max-w-2xl mx-auto">
        <div className="flex">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for products..."
            className="w-full p-3 rounded-l bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-4 rounded-r font-semibold"
          >
            Search
          </button>
        </div>
      </form>

      {/* Promotional Banner */}
      <div className="bg-yellow-500 text-gray-900 p-6 rounded-lg shadow mb-8">
        <h2 className="text-2xl font-bold">Limited Time Offer!</h2>
        <p className="mt-2">Get up to 50% off on select items. Shop now before the sale ends.</p>
      </div>
    </div>
  );
};

export default HomePage;
