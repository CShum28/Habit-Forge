const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  // Set the cookie value to an empty string and expire it in the past
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0), // or use maxAge: 0
  });
  res.status(200).send("Logged out & cookie cleared");
});

module.exports = router;
