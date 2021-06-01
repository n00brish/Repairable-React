const express = require("express");
const connectDB = require("./db/connection");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");

//Middleware
app = express();
app.use(cors());
//BodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

//Connect to DB
connectDB();

app.get("/", (req, res) => {
  res.send("HOME");
});

app.use(express.static(__dirname + "/public"));

//Import routes
const products = require("./routes/api/product");
const customers = require("./routes/api/customer");
const reciepts = require("./routes/api/reciept");
const rents = require("./routes/api/rent");
const users = require("./routes/api/user");

app.use("/products", products);
app.use("/customers", customers);
app.use("/reciepts", reciepts);
app.use("/rents", rents);
app.use("/api/users", users);

//Express server
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log("Started server on port " + port);
});
