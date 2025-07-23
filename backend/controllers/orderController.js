const { Order } = require('../models');

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

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({ where: { userId: req.user.id } });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
