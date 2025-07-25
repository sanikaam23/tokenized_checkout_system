const { Order } = require('../models');

// ✅ Create Order
exports.createOrder = async (req, res) => {
  const { productId, productName, productPrice } = req.body;
  const userId = req.user.id; // Assuming JWT middleware sets req.user

  try {
    const order = await Order.create({
      userId,
      productId,
      productName,
      productPrice,
      status: 'pending',
    });

    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get All Orders for Logged-in User
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({ where: { userId: req.user.id } });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get Orders by User ID (Admin use or viewing other user's orders if required)
exports.getUserOrders = async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Order.findAll({ where: { userId } });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch user orders' });
  }
};

// ✅ Get Single Order by Order ID
exports.getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
};
