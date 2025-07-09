import React from 'react';

const orders = [
  {
    id: 'ORD123456',
    date: '2025-07-01',
    total: 1499.99,
    status: 'Delivered',
    items: 2,
  },
  {
    id: 'ORD123457',
    date: '2025-07-04',
    total: 899.5,
    status: 'Pending',
    items: 1,
  },
];

const OrderPages = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 border-b border-gray-700 pb-4">My Orders</h1>

        {orders.length === 0 ? (
          <p className="text-gray-400">You have no orders yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Order ID</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Items</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Total (₹)</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-700 hover:bg-gray-600">
                    <td className="px-6 py-4">{order.id}</td>
                    <td className="px-6 py-4">{order.date}</td>
                    <td className="px-6 py-4">{order.items}</td>
                    <td className="px-6 py-4">{order.total.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          order.status === 'Delivered'
                            ? 'bg-green-600 text-white'
                            : 'bg-yellow-500 text-gray-900'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPages;
