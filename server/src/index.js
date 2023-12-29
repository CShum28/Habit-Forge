require("./db/mongoose");

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

const port = 3001;

const getAllUsers = require("./routes/getAllUsers");
const insertUser = require("./routes/insertUser");

app.use("/get-users", getAllUsers);
app.use("/insert-user", insertUser);

app.listen(port, () => {
  console.log("App is running on port", port);
});
