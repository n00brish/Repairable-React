const mongoose = require("mongoose");

const reciepts = new mongoose.Schema({
  productId: {
    type: Number,
  },
  rentedDate: {
    type: Date,
    default: Date.now,
  },
  email: {
    type: String,
  },
});

module.exports = mongoose.model("Reciepts", reciepts);
