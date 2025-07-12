import React, { useState, useContext } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
  const { login, loginWithGoogle } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  const handleGoogleLogin = async () => {
    await loginWithGoogle();
  };

  return (
    <div className="w-full min-h-screen bg-[#1a2a47] flex items-center justify-center px-4">
      <div className="relative bg-white rounded-xl shadow-lg p-8 pt-14 w-full max-w-sm">
        {/* User Icon */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-[#1a2a47] p-4 rounded-full">
          <FaUser className="text-white text-2xl" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center bg-blue-200 rounded px-3 py-2">
            <FaUser className="text-gray-700 mr-3" />
            <input
              type="email"
              placeholder="Email id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-transparent flex-grow focus:outline-none text-gray-800"
            />
          </div>

          <div className="flex items-center bg-blue-200 rounded px-3 py-2">
            <FaLock className="text-gray-700 mr-3" />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-transparent flex-grow focus:outline-none text-gray-800"
            />
          </div>

          <div className="text-right">
            <a href="#" className="text-sm text-gray-700 hover:underline">forget password?</a>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 text-gray-900 py-2 rounded font-semibold hover:bg-yellow-500"
          >
            Login/SignUp
          </button>
        </form>

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center space-x-3 border border-gray-300 rounded px-4 py-2 hover:bg-gray-100"
          >
            <FcGoogle className="text-2xl" />
            <span className="text-gray-700">Sign in with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;