import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const ProfilePage = () => {
  const { user, updateProfile } = useContext(AuthContext);
  const [editableUser, setEditableUser] = useState({
    firstname: user?.firstname || '',
    lastname: user?.lastname || '',
    username: user?.username || '',
    password: '',
    contact: user?.contact || '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'contact') {
      const filtered = value.replace(/\D/g, '').slice(0, 10);
      setEditableUser({ ...editableUser, contact: filtered });
    } else {
      setEditableUser({ ...editableUser, [name]: value });
    }
  };

  const validatePassword = (password) => {
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return password.length >= 6 && hasSpecialChar;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editableUser.password && !validatePassword(editableUser.password)) {
      setError('Password must be at least 6 characters and include at least one special character.');
      return;
    }

    setError('');
    updateProfile(editableUser);
  };

  if (!user) {
    return (
      <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-lg font-medium">You are not logged in.</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[#1a2a47] to-[#0f172a] text-white min-h-screen px-6 py-10 flex flex-col md:flex-row items-center justify-center space-y-10 md:space-y-0 md:space-x-16">
      
      {/* Profile Image & Button */}
      <div className="flex flex-col items-center space-y-4">
        <div className="bg-gradient-to-tr from-yellow-500 to-pink-500 animate-pulse rounded-full w-48 h-48 flex items-center justify-center shadow-lg">
          <span className="text-4xl font-semibold text-black">👤</span>
        </div>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold px-6 py-2 rounded-full shadow transition duration-300">
          My Profile
        </button>
      </div>

      {/* Profile Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-[#223c64] bg-opacity-80 p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center mb-4 tracking-wide">Edit Profile</h2>

        <div>
          <label htmlFor="firstname" className="block mb-1 font-medium tracking-wide">Firstname</label>
          <input
            type="text"
            name="firstname"
            value={editableUser.firstname}
            onChange={handleChange}
            placeholder="Enter your firstname"
            className="w-full bg-transparent border-b border-gray-500 focus:border-yellow-500 placeholder-gray-400 focus:outline-none py-1 transition duration-300"
          />
        </div>

        <div>
          <label htmlFor="lastname" className="block mb-1 font-medium tracking-wide">Lastname</label>
          <input
            type="text"
            name="lastname"
            value={editableUser.lastname}
            onChange={handleChange}
            placeholder="Enter your lastname"
            className="w-full bg-transparent border-b border-gray-500 focus:border-yellow-500 placeholder-gray-400 focus:outline-none py-1 transition duration-300"
          />
        </div>

        <div>
          <label htmlFor="username" className="block mb-1 font-medium tracking-wide">Username</label>
          <input
            type="text"
            name="username"
            value={editableUser.username}
            onChange={handleChange}
            placeholder="Enter your username"
            className="w-full bg-transparent border-b border-gray-500 focus:border-yellow-500 placeholder-gray-400 focus:outline-none py-1 transition duration-300"
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-1 font-medium tracking-wide">Password</label>
          <input
            type="password"
            name="password"
            value={editableUser.password}
            onChange={handleChange}
            placeholder="Enter new password"
            className="w-full bg-transparent border-b border-gray-500 focus:border-yellow-500 placeholder-gray-400 focus:outline-none py-1 transition duration-300"
          />
        </div>

        <div>
          <label htmlFor="contact" className="block mb-1 font-medium tracking-wide">Contact Number</label>
          <input
            type="tel"
            name="contact"
            value={editableUser.contact}
            maxLength={10}
            onChange={handleChange}
            placeholder="Enter your contact number"
            className="w-full bg-transparent border-b border-gray-500 focus:border-yellow-500 placeholder-gray-400 focus:outline-none py-1 transition duration-300"
          />
        </div>

        {error && (
          <p className="text-red-400 text-sm text-center">{error}</p>
        )}

        <button
          type="submit"
          className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold px-6 py-3 rounded-full w-full shadow-md transition duration-300"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;