import React from 'react';

const HomePage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome to MyShop</h1>
      <p>Explore our products and enjoy one-click secure checkout!</p>

       {/* Tailwind test block */}
      <div className="bg-blue-500 text-white p-4 rounded-lg mt-4">
        Tailwind is working!
      </div>
    </div>
  );
};

export default HomePage;
