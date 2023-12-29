require("./db/mongoose");

const express = require("express");
var cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const port = 3001;

app.get("/api/hello", (req, res) => {
  res.json({ message: "hello world" });
});

app.listen(port, () => {
  console.log("App is running on port", port);
});
