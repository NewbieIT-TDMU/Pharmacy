const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

router.get("/", async (req, res) => {
  try {
    let cart = await Cart.findOne();
    if (!cart) {
      cart = new Cart({ items: [] });
      await cart.save();
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { productId, name, price, image, quantity } = req.body;
    let cart = await Cart.findOne();
    if (!cart) cart = new Cart({ items: [] });

    const existingItem = cart.items.find(
      (item) => item.productId?.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, name, price, image, quantity });
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/remove", async (req, res) => {
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
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
