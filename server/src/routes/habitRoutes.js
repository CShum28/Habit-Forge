const express = require("express");
const router = express.Router();
const ToDoItem = require("../models/toDoItem");

const userAuth = require("../middleware/userAuth");

router.post("/", userAuth, (req, res) => {
  const { habit, days, category_id } = req.body;
  // The user object here is attached by the userAuth middleware
  // after verifying the JWT token and fetching the user from the database.
  const user = req.user;
  ToDoItem.create({
    name: habit,
    days: days,
    category_id: category_id,
    user_id: user._id,
  })
    .then((habit) => {
      res.status(200).json(habit);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

module.exports = router;
