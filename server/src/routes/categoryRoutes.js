const express = require("express");
const router = express.Router();
const Categories = require("../models/category");

const userAuth = require("../middleware/userAuth");

router.delete("/:id", userAuth, (req, res) => {
  const { id } = req.params;
  console.log("##: ", id);

  Categories.deleteOne({ _id: id })
    .then(() => res.status(200).json({ message: "Category deleted" }))
    .catch((err) =>
      res.status(500).json({ message: "Error deleting category: ", err })
    );
});

router.put("/:id", userAuth, (req, res) => {
  const { id } = req.params; // grab id for the search
  const { category, color } = req.body;

  const filter = { _id: id };
  const update = { name: category, color };

  console.log(update);

  Categories.findOneAndUpdate(filter, update, { new: true })
    .then(() => res.status(200).json({ message: "Category updated" }))
    .catch((err) =>
      res.status(500).json({ message: "Error updating category", error: err })
    );
});

module.exports = router;
