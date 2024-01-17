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

module.exports = router;
