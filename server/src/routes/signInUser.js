const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const Users = require("../models/user");

const bcrypt = require("bcrypt");

router.post("/", (req, res) => {
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
            { username: username },
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

module.exports = router;
