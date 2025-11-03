const Cart = require("../models/Cart");

exports.getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne();

    if (!cart) {
      cart = new Cart({ items: [] });
      await cart.save();
    }

    res.json(cart);
  } catch (error) {
    console.error("Lỗi getCart:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { product } = req.body;
    if (!product || !product.productId) {
      return res.status(400).json({ message: "Thiếu thông tin sản phẩm" });
    }

    let cart = await Cart.findOne();
    if (!cart) {
      cart = new Cart({ items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.productId.toString() === product.productId
    );

    if (existingItem) {
      existingItem.quantity += product.quantity;
    } else {
      cart.items.push(product);
    }

    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    console.error("Lỗi addToCart:", error);
    res.status(400).json({ message: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;

    let cart = await Cart.findOne();
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error("Lỗi removeFromCart:", error);
    res.status(500).json({ message: error.message });
  }
};
