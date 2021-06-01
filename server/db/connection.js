const moongoose = require("mongoose");
require("dotenv/config");

const URI = process.env.DB_CONNECTION;

const connectDB = async () => {
  await moongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("db connected..");
};

module.exports = connectDB;
