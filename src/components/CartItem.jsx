import React from 'react';

const CartItem = ({ item, removeFromCart }) => {
  return (
    <div className="flex justify-between items-center border-b py-2">
      <div>
        <h3 className="font-semibold">{item.name}</h3>
        <p>₹{item.price} x {item.quantity}</p>
      </div>
      <button 
        onClick={() => removeFromCart(item.id)} 
        className="text-red-500 hover:underline"
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
