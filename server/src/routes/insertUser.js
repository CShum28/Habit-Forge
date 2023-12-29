const express = require("express");
const router = express.Router();
const Users = require("../models/user");

const bcrypt = require("bcrypt");
const saltRounds = 10;

router.post("/", (req, res) => {
  const { firstName, lastName, username, password } = req.body;

  bcrypt
    .hash(password, saltRounds)
    .then((hash) => {
      return Users.create({
        username,
        password: hash,
        firstName,
        lastName,
      });
    })
    .then(() => {
      console.log("user created");
      res.status(201).json({ message: "user created" });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

module.exports = router;
