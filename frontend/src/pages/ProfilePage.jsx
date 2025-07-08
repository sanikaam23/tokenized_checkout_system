import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const ProfilePage = () => {
  const { user, updateProfile } = useContext(AuthContext);
  const [editableUser, setEditableUser] = useState(user || {});

  const handleChange = (e) => {
    setEditableUser({ ...editableUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(editableUser);
  };

  if (!user) {
    return (
      <div className="bg-gray-900 text-white min-h-screen px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 border-b border-gray-700 pb-4">
            My Profile
          </h1>
          <p className="text-red-500">You are not logged in.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 border-b border-gray-700 pb-4">
          My Profile
        </h1>

        <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg p-6 shadow space-y-6">
          <div>
            <label className="block mb-2 font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={editableUser.name || ''}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={editableUser.email || ''}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Phone</label>
            <input
              type="text"
              name="phone"
              value={editableUser.phone || ''}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold px-6 py-3 rounded w-full"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
