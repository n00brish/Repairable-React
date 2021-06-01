const express = require("express");
const Customer = require("../../db/models/customers");
const router = express.Router();

//Get all customers
router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Get one customer
router.get("/:id", getCustomer, (req, res) => {
  res.json(res.customer);
});

//Create one customer
router.post("/", async (req, res) => {
  const customer = new Customer({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
  });

  try {
    const newCustomer = await customer.save();
    res.status(201).json(newCustomer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Update one customer
router.patch("/:id", getCustomer, async (req, res) => {
  if (req.body.firstName != null) {
    res.customer.firstName = req.body.firstName;
  }

  if (req.body.lastName != null) {
    res.customer.lastName = req.body.lastName;
  }

  if (req.body.email != null) {
    res.customer.email = req.body.email;
  }

  if (req.body.phoneNumber != null) {
    res.customer.phoneNumber = req.body.phoneNumber;
  }

  try {
    const updatedCustomer = await res.customer.save();
    res.json(updatedCustomer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Delete one customer
router.delete("/:id", getCustomer, async (req, res) => {
  try {
    await res.customer.remove();
    res.json({ message: "Deleted this customer" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getCustomer(req, res, next) {
  try {
    customer = await Customer.findById(req.params.id);
    if (customer == null) {
      return res.status(404).json({ message: "Cant find customer" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.customer = customer;
  next();
}

module.exports = router;
