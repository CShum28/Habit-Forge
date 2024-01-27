const express = require("express");
const router = express.Router();
const ToDoItem = require("../models/toDoItem");

const userAuth = require("../middleware/userAuth");

// Create new habit route
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

// router.patch("/:id/toggleCheck", userAuth, (req, res) => {
//   const habitId = req.params.id;

//   console.log(habitId);
//   res.send(habitId);
//   // UPDATE THE PATCH ROUTE AFTER SUBMITTING A PATCH
// });

// Get habits for category
router.get("/", userAuth, (req, res) => {
  const categoryId = req.query.categoryId;

  ToDoItem.find({ category_id: categoryId })
    .then((habits) => {
      res.status(200).json(habits);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

// // Delete habit path
router.delete("/:id", userAuth, (req, res) => {
  const { id } = req.params;

  ToDoItem.deleteOne({ _id: id })
    .then(() => res.status(200).json({ message: "Habit deleted" }))
    .catch((err) =>
      res.status(500).json({ message: "Error deleting habit: ", err })
    );
});

module.exports = router;
