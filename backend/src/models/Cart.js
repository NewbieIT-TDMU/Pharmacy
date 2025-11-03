const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: false
  },
  name: String,
  price: Number,
  image: String,
  quantity: {
    type: Number,
    default: 1
  }
});

const cartSchema = new mongoose.Schema({
  items: {
    type: [cartItemSchema],
    default: [] 
  }
});

module.exports = mongoose.model("Cart", cartSchema);
