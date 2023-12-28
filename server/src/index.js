require("./db/mongoose");

const express = require("express");
const app = express();
app.use(express.json());

const port = 3000;

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log("App is running on port", port);
});
