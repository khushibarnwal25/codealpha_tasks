const express = require("express");
const router = express.Router();
const Product = require("../models/Product");


// ==========================
// GET ALL PRODUCTS
// ==========================
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ==========================
// ADD PRODUCT
// ==========================
router.post("/", async (req, res) => {
  try {
    const newProduct = new Product({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      image: req.body.image,
    });

    const savedProduct = await newProduct.save();

    res.json(savedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ==========================
// DELETE PRODUCT
// ==========================
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.json({
      message: "Product deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ==========================
// UPDATE PRODUCT
// ==========================
router.put("/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        image: req.body.image,
      },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;