const express = require("express");
const router = express.Router();
const Categories = require("../models/category");
const ToDoItem = require("../models/toDoItem");

const userAuth = require("../middleware/userAuth");

// Get all categories by Id
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

// Post add category route
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

// Delete category by Id
router.delete("/:id", userAuth, (req, res) => {
  const { id } = req.params;

  // Use deleteMany to delete all ToDoItems associated with the category_id
  ToDoItem.deleteMany({ category_id: id })
    .then(() => {
      // Proceed to delete the category after successfully deleting todo items
      Categories.deleteOne({ _id: id })
        .then(() =>
          res
            .status(200)
            .json({ message: "Category and all associated todo items deleted" })
        )
        .catch((err) =>
          res.status(500).json({ message: "Error deleting category", err })
        );
    })
    .catch((err) =>
      res.status(500).json({
        message: "Error deleting todo items associated with the category",
        err,
      })
    );
});

// Update category
router.put("/:id", userAuth, (req, res) => {
  const { id } = req.params; // grab id for the search
  const { category, color } = req.body;

  const filter = { _id: id };
  const update = { name: category, color };

  Categories.findOneAndUpdate(filter, update, { new: true })
    .then(() => {
      res.status(200).json({ message: "Category updated" });
    })
    .catch((err) =>
      res.status(500).json({ message: "Error updating category", error: err })
    );
});

module.exports = router;
