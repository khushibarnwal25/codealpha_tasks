const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const productRoutes = require('./routes/productRoutes');
const authRoutes = require("./routes/authRoutes");

app.use('/api/products', productRoutes);
app.use("/api/auth", authRoutes);

// MongoDB connection
mongoose.connect("mongodb://unknown47here_db_user:khushi25@ac-sopx9ly-shard-00-00.uohiyix.mongodb.net:27017,ac-sopx9ly-shard-00-01.uohiyix.mongodb.net:27017,ac-sopx9ly-shard-00-02.uohiyix.mongodb.net:27017/ecommerce?ssl=true&replicaSet=atlas-12z5d8-shard-0&authSource=admin&retryWrites=true&w=majority")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));
// Test route
app.get('/', (req, res) => {
    res.send("Server is running 🚀");
});
app.get('/add-test', async (req, res) => {
    const Product = require('./models/Product');

    const p = new Product({
        name: "Phone",
        price: 20000,
        description: "Test product",
        image: "img.jpg"
    });

    await p.save();
    res.send("Product Added");
});

// Start server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});