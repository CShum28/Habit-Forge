require("./db/mongoose");
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Replace this with your frontend domain, gives 5173 ability to access backend resources
    credentials: true, // this part sends the cookies to the frontend
  })
);

const port = 3001;

const getAllUsers = require("./routes/getAllUsers");
const insertUser = require("./routes/insertUser");
const signInUser = require("./routes/signInUser");
const logoutUser = require("./routes/logoutUser");
const AddCategory = require("./routes/addCategory");

app.use("/get-users", getAllUsers);
app.use("/insert-user", insertUser);
app.use("/sign-in", signInUser);
app.use("/api/logout", logoutUser);
app.use("/api/add-category", AddCategory);

app.listen(port, () => {
  console.log("App is running on port", port);
});
