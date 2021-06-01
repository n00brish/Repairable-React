const mongoose = require("mongoose");

const rent = new mongoose.Schema({
  productId: {
    type: Number,
    require: true,
  },
  productName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phoneNumber: {
    type: Number,
    require: true,
  },
  size: {
    type: String,
  },
  comments: {
    type: String,
  },
  rentedDate: {
    type: Date,
    default: Date.now,
  },
  returnDate: {
    type: Date,
  },
});

module.exports = mongoose.model("Utleie", rent);
