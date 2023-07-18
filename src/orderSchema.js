const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  OrderID: Number,
  Customer: String,
  OrderDate: Date,
  products: [
    {
      ItemName: String,
      Quantity: Number,
      UnitPrice: Number,
    },
  ],
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
