import React from 'react';

const CartPage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 border-b border-gray-700 pb-4">
          Your Cart
        </h1>

        <p className="text-lg mb-8">
          View and manage items added to your Cart.
        </p>

        {/* Example empty cart UI */}
        <div className="bg-gray-800 rounded-lg p-8 text-center shadow">
          <p className="text-gray-400 mb-4">
            Your cart is currently empty.
          </p>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
