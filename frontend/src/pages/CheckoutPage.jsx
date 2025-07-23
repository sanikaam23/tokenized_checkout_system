import React, { useState } from 'react';

const CheckoutPage = () => {
  const [shipping, setShipping] = useState({ name: '', address: '', phone: '' });
  const [shippingSaved, setShippingSaved] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const handleSaveShipping = () => {
    const hasSpecial = /[^0-9]/;
    if (!hasSpecial.test(shipping.phone)) {
      setPhoneError('Phone must include at least one special character, e.g., + or -');
      return;
    }
    setPhoneError('');
    setShippingSaved(true);
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!shippingSaved) {
      alert('Please save your shipping details before placing order!');
      return;
    }
    console.log('Placing order with:', { shipping, cardName, cardNumber, expiry, cvv });
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#1a2a47] to-[#0f172a] flex items-center justify-center px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">

        {/* 🚚 Shipping Details */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-4 border border-gray-200">
          <h2 className="text-2xl font-semibold text-center text-yellow-500 border-b border-gray-300 pb-2">Shipping Details</h2>
          <p className="text-center text-gray-500 mb-2 text-sm">Enter your delivery address and phone number</p>

          <input
            type="text"
            placeholder="Full Name"
            value={shipping.name}
            onChange={(e) => { setShipping({ ...shipping, name: e.target.value }); setShippingSaved(false); }}
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="text"
            placeholder="Address"
            value={shipping.address}
            onChange={(e) => { setShipping({ ...shipping, address: e.target.value }); setShippingSaved(false); }}
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="text"
            placeholder="Phone (e.g., +123-456789)"
            value={shipping.phone}
            onChange={(e) => { setShipping({ ...shipping, phone: e.target.value }); setShippingSaved(false); }}
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          {phoneError && <p className="text-red-500 text-sm">{phoneError}</p>}

          <button
            onClick={handleSaveShipping}
            className={`w-full py-2 rounded-xl font-semibold transition duration-300 ${
              shippingSaved ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-yellow-400 hover:bg-yellow-500 text-gray-900'
            }`}
          >
            {shippingSaved ? 'Details Saved ✔' : 'Save Shipping Details'}
          </button>
        </div>

        {/* 💳 Payment Details */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-4 border border-gray-200">
          <h2 className="text-2xl font-semibold text-center text-yellow-500 border-b border-gray-300 pb-2">Payment Details</h2>
          <p className="text-center text-gray-500 mb-2 text-sm">Enter card details or use saved card</p>

          <form onSubmit={handlePlaceOrder} className="space-y-4">
            <input
              type="text"
              placeholder="Name on Card"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <input
              type="text"
              placeholder="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0,16))}
              required
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="MM/YY"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                required
                className="w-1/2 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <input
                type="text"
                placeholder="CVV"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0,4))}
                required
                className="w-1/2 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-2 rounded-xl font-semibold shadow transition"
            >
              Place Order
            </button>
          </form>

          <div className="mt-2 text-center">
            <button className="text-yellow-500 hover:underline">Use Saved Card (One-Click Checkout)</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;