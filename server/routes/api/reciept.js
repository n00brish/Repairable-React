const express = require("express");
const Reciept = require("../../db/models/reciepts");
const router = express.Router();

//Get all reciepts
router.get("/", async (req, res) => {
  try {
    const reciepts = await Reciept.find();
    res.json(reciepts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Get one reciept
router.get("/:id", getReciept, (req, res) => {
  res.json(res.reciept);
});

//Create one reciept
router.post("/", async (req, res) => {
  const reciept = new Reciept({
    productId: req.body.productId,
    rentedDate: req.body.rentedDate,
    email: req.body.email,
  });

  try {
    const newReciept = await reciept.save();
    res.status(201).json(newReciept);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Update one reciept
router.patch("/:id", getReciept, async (req, res) => {
  if (req.body.productId != null) {
    res.reciept.productId = req.body.productId;
  }

  if (req.body.rentedDate != null) {
    res.reciept.rentedDate = req.body.rentedDate;
  }

  if (req.body.email != null) {
    res.reciept.email = req.body.email;
  }

  try {
    const updatedReciept = await res.reciept.save();
    res.json(updatedReciept);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Delete one reciept
router.delete("/:id", getReciept, async (req, res) => {
  try {
    await res.reciept.remove();
    res.json({ message: "Deleted this reciept" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getReciept(req, res, next) {
  try {
    reciept = await Reciept.findById(req.params.id);
    if (reciept == null) {
      return res.status(404).json({ message: "Cant find reciept" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.reciept = reciept;
  next();
}

module.exports = router;
