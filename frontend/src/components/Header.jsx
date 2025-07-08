import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const { user } = useContext(AuthContext);

  return (
    <header className="bg-gray-900 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link
          to="/"
          className="text-2xl font-bold text-yellow-400 hover:text-yellow-500 transition-colors"
        >
          🛒 DealNova
        </Link>

        <nav className="flex items-center space-x-6">
          <Link to="/" className="hover:text-yellow-400">Home</Link>
          <Link to="/cart" className="hover:text-yellow-400">Cart</Link>
          <Link to="/login" className="hover:text-yellow-400">Login</Link>

          <Link to="/profile" className="hover:text-yellow-400 flex items-center space-x-1">
            <FaUserCircle size={24} />
            {user && <span className="hidden md:inline">{user.name}</span>}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
