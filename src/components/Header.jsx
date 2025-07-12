import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaTimes, FaUser } from 'react-icons/fa';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  

  return (
    <header className="bg-gray-800 text-white px-8 py-4">
      <div className="flex justify-between items-center">
        {/* Left: Site name */}
        <Link to="/" className="text-2xl font-bold">🛒 DealNova</Link>

        {/* Center: Search bar */}
        <form
          onSubmit={handleSearch}
          className="flex items-center bg-white rounded-full px-3 py-1 w-1/3"
        >
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search here"
            className="flex-grow text-gray-800 focus:outline-none bg-transparent"
          />
          {searchQuery && (
            <FaTimes
              className="text-gray-500 ml-2 cursor-pointer"
              onClick={() => setSearchQuery('')}
            />
          )}
        </form>

        {/* Right: Nav links */}
        <div className="flex items-center space-x-6">
          <Link to="/" className="hover:underline">HOME</Link>
          <Link to="/about" className="hover:underline">ABOUT</Link>
          <Link to="/contact" className="hover:underline">CONTACT</Link>

          {/* Profile icon - navigates to /profile */}
          <Link to="/profile" className="text-xl hover:text-yellow-400">
            <FaUser />
          </Link>

          <Link to="/login">
            <button className="bg-yellow-400 text-gray-900 px-4 py-2 rounded">LOGIN</button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
