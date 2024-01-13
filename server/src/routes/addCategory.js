const express = require("express");
const router = express.Router();
const Categories = require("../models/category");

const userAuth = require("../middleware/userAuth");

router.post("/", userAuth, (req, res) => {
  const { category, color } = req.body;
  // The user object here is attached by the userAuth middleware
  // after verifying the JWT token and fetching the user from the database.
  const user = req.user;

  Categories.create({
    name: category,
    color: color,
    user_id: user._id,
  })
    .then((category) => {
      res.status(201).json(category);
    })
    .catch((err) => {
      res.status(400).json({ message: err.messsage });
    });
});

module.exports = router;
