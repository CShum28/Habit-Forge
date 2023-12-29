const express = require("express");
const router = express.Router();
const Users = require("../models/user");

router.get("/", (req, res) => {
  Users.find({}, { username: 1, _id: 0 })
    .then((users) => {
      const usersArr = users.map((user) => user.username);
      res.status(200).send(usersArr);
    })
    .catch((err) => res.status(400).send(err));
});

module.exports = router;
