const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  const { items, address, totalAmount } = req.body;

  // ✅ BACKEND VALIDATION
  if (
    !address ||
    !address.name ||
    !address.phone ||
    !address.city ||
    !address.pincode ||
    !address.addressLine
  ) {
    return res.status(400).json({
      message: "All address fields are required",
    });
  }

  if (!items || items.length === 0) {
    return res.status(400).json({
      message: "Order items cannot be empty",
    });
  }

  try {
    const order = await Order.create({
      user: req.user,
      items,
      address,
      totalAmount,
    });

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET USER ORDERS
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user })
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};