const express = require("express");
const router = express.Router();
const Categories = require("../models/category");

const userAuth = require("../middleware/userAuth");

router.get("/", userAuth, (req, res) => {
  // The user object here is attached by the userAuth middleware
  // after verifying the JWT token and fetching the user from the database.
  const user = req.user;
  Categories.find({ user_id: user._id })
    .then((categories) => {
      // console.log(categories);
      res.status(200).json(categories);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
