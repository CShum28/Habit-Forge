const express = require("express");
const router = express.Router();
const Users = require("../models/user");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const saltRounds = 10;

// Get - get all users route
// use to check when creating a user, if the username already exists
router.get("/", (req, res) => {
  console.log("get all users");
  Users.find({}, { username: 1, _id: 0 })
    .then((users) => {
      const usersArr = users.map((user) => user.username);
      res.status(200).send(usersArr);
    })
    .catch((err) => res.status(400).send(err));
});

// Post - create a new user route
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
      res.status(201).json({ message: "user created" });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// Post - sign in a user
router.post("/sign-in", (req, res) => {
  const { username, password } = req.body;

  Users.findOne({ username: username }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, function (err, results) {
        if (err) {
          // error happened during auth process
          console.log("Error occured during authentication process");
        } else if (results) {
          // login is successful
          // grab ACCESS TOKEN SECRET from .env file
          const token = jwt.sign(
            { username: user.username, _id: user._id },
            process.env.ACCESS_TOKEN_SECRET
          );

          res.cookie("jwt", token, {
            httpOnly: true,
          });

          res.status(200).json({
            message: "Logged in successfully",
            username: username,
            firstName: user.firstName,
            lastName: user.lastName,
          });
        } else {
          // passwords dont match
          console.log("passwords do not match");
          res.status(401).json({ message: "passwords do not match" });
        }
      });
    } else {
      console.log("user not found");
      res.status(401).json({ message: "user not found" });
    }
  });
  //   bcrypt.compareSync(myPlaintextPassword, hash);
});

// post - sign out user route
router.post("/sign-out", (req, res) => {
  // Set the cookie value to an empty string and expire it in the past
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0), // or use maxAge: 0
  });
  res.status(200).send("Logged out & cookie cleared");
});

module.exports = router;
